import { NextResponse } from 'next/server';

const SID   = process.env.TWILIO_ACCOUNT_SID ?? '';
const TOKEN = process.env.TWILIO_AUTH_TOKEN ?? '';
const FROM  = process.env.TWILIO_PHONE ?? '';
const TO    = process.env.ADMIN_PHONE ?? '';

let pendingOtp: { code: string; expires: number } | null = null;

export async function POST(req: Request) {
  const { action, code, password } = await req.json() as {
    action: string; code?: string; password?: string;
  };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin2m2024';

  if (action === 'send_otp') {
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    pendingOtp = { code: otp, expires: Date.now() + 5 * 60 * 1000 };

    const body = new URLSearchParams({
      From: FROM, To: TO,
      Body: `2M Construction Admin — login code: ${otp} (expires 5 min)`,
    });
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${SID}:${TOKEN}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }
    );
    if (!res.ok) {
      const err = await res.text();
      console.error('Twilio error:', err);
      return NextResponse.json({ error: 'SMS failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === 'verify_otp') {
    if (!pendingOtp) return NextResponse.json({ error: 'No OTP pending' }, { status: 400 });
    if (Date.now() > pendingOtp.expires) {
      pendingOtp = null;
      return NextResponse.json({ error: 'Code expired' }, { status: 401 });
    }
    if (code !== pendingOtp.code) {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
    }
    pendingOtp = null;
    return NextResponse.json({ ok: true, token: Buffer.from(ADMIN_PASSWORD).toString('base64') });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
