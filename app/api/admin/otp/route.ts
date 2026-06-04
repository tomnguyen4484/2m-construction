import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin2m2024';
const OTP_SECRET     = process.env.OTP_SECRET ?? 'fallback-secret-change-me';

function signToken(payload: string): string {
  return createHmac('sha256', OTP_SECRET).update(payload).digest('hex');
}

export async function POST(req: Request) {
  const { action, password, code, pendingToken } = await req.json();

  // Step 1 — verify password, issue signed OTP challenge
  if (action === 'send_otp') {
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const otp     = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 5 * 60 * 1000; // 5 min
    const payload = `${otp}:${expires}`;
    const sig     = signToken(payload);
    const token   = Buffer.from(`${payload}:${sig}`).toString('base64');

    // Send OTP via email using SendGrid
    const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL  = process.env.ADMIN_EMAIL ?? 'info@2mhuntsville.com';

    if (SENDGRID_KEY) {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SENDGRID_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: ADMIN_EMAIL }] }],
          from: { email: ADMIN_EMAIL, name: '2M Construction Admin' },
          subject: 'Admin Login Code',
          content: [{
            type: 'text/plain',
            value: `Your 2M Construction admin login code: ${otp}\n\nExpires in 5 minutes.`,
          }],
        }),
      });
    } else {
      // Dev fallback: log to console
      console.log('[ADMIN OTP]', otp);
    }

    return NextResponse.json({ ok: true, pendingToken: token });
  }

  // Step 2 — verify OTP using the signed token (stateless)
  if (action === 'verify_otp') {
    if (!pendingToken || !code) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    let payload: string, sig: string, otpStored: string, expiresStr: string;
    try {
      const decoded = Buffer.from(pendingToken, 'base64').toString();
      const parts   = decoded.split(':');
      otpStored  = parts[0];
      expiresStr = parts[1];
      sig        = parts[2];
      payload    = `${otpStored}:${expiresStr}`;
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Verify signature
    const expectedSig = signToken(payload);
    const sigBuffer   = Buffer.from(sig, 'hex');
    const expBuffer   = Buffer.from(expectedSig, 'hex');
    if (sigBuffer.length !== expBuffer.length || !timingSafeEqual(sigBuffer, expBuffer)) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check expiry
    if (Date.now() > parseInt(expiresStr)) {
      return NextResponse.json({ error: 'Code expired' }, { status: 401 });
    }

    // Check OTP
    if (code.trim() !== otpStored) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
    }

    const authToken = Buffer.from(ADMIN_PASSWORD + ':' + Date.now()).toString('base64');
    return NextResponse.json({ ok: true, token: authToken });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
