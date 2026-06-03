import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

const SENDGRID_KEY = process.env.SENDGRID_API_KEY ?? '';
const ADMIN_EMAIL  = process.env.ADMIN_EMAIL ?? 'tuannguyen44526@gmail.com';
const FROM_EMAIL   = 'info@2mhuntsville.com';
const SECRET       = process.env.OTP_SECRET ?? 'otp-secret-2m-2024';

// Stateless OTP: sign(code + expires) with HMAC — no in-memory state needed
function signOtp(code: string, expires: number): string {
  return createHmac('sha256', SECRET).update(`${code}:${expires}`).digest('hex').slice(0, 16);
}

function makeToken(code: string): string {
  const expires = Date.now() + 10 * 60 * 1000;
  const sig = signOtp(code, expires);
  return Buffer.from(`${code}:${expires}:${sig}`).toString('base64url');
}

function verifyToken(token: string, code: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const [storedCode, expiresStr, sig] = decoded.split(':');
    const expires = parseInt(expiresStr);
    if (Date.now() > expires) return false;
    if (storedCode !== code) return false;
    const expected = signOtp(storedCode, expires);
    return sig === expected;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const { action, code, password, token } = await req.json() as {
    action: string; code?: string; password?: string; token?: string;
  };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin2m2024';

  if (action === 'send_otp') {
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpToken = makeToken(otp);

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: ADMIN_EMAIL }] }],
        from: { email: FROM_EMAIL, name: '2M Construction Admin' },
        subject: `Admin Login Code: ${otp}`,
        content: [{
          type: 'text/html',
          value: `
            <div style="font-family:sans-serif;max-width:400px;margin:0 auto;padding:32px;background:#f8fafc;border-radius:12px">
              <h2 style="color:#1A3A5C;margin:0 0 16px">2M Construction Admin</h2>
              <p style="color:#374151;margin:0 0 24px">Your login verification code:</p>
              <div style="background:#1A3A5C;color:#F5C518;font-size:36px;font-weight:800;
                letter-spacing:12px;text-align:center;padding:20px;border-radius:8px;margin-bottom:20px">
                ${otp}
              </div>
              <p style="color:#6B7280;font-size:13px;margin:0">
                This code expires in 10 minutes.<br>
                If you did not request this, ignore this email.
              </p>
            </div>
          `
        }]
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('SendGrid error:', err);
      return NextResponse.json({ error: 'Email failed' }, { status: 500 });
    }

    // Return token to client — client sends it back with code
    return NextResponse.json({ ok: true, token: otpToken });
  }

  if (action === 'verify_otp') {
    if (!token || !code) {
      return NextResponse.json({ error: 'Missing token or code' }, { status: 400 });
    }
    if (!verifyToken(token, code)) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });
    }
    return NextResponse.json({ ok: true, token: Buffer.from(ADMIN_PASSWORD).toString('base64') });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
