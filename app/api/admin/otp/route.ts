import { NextResponse } from 'next/server';

const SID        = process.env.TWILIO_ACCOUNT_SID ?? '';
const TOKEN      = process.env.TWILIO_AUTH_TOKEN ?? '';
const VERIFY_SID = process.env.TWILIO_VERIFY_SID ?? '';
const TO         = process.env.ADMIN_PHONE ?? '';

const authHeader = 'Basic ' + Buffer.from(`${SID}:${TOKEN}`).toString('base64');

export async function POST(req: Request) {
  const { action, code, password } = await req.json() as {
    action: string; code?: string; password?: string;
  };
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin2m2024';

  // Step 1 — verify password, send OTP via Twilio Verify
  if (action === 'send_otp') {
    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const res = await fetch(
      `https://verify.twilio.com/v2/Services/${VERIFY_SID}/Verifications`,
      {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: TO, Channel: 'sms' }).toString(),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('Twilio Verify error:', err);
      return NextResponse.json({ error: 'SMS failed' }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  // Step 2 — verify OTP code
  if (action === 'verify_otp') {
    if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

    const res = await fetch(
      `https://verify.twilio.com/v2/Services/${VERIFY_SID}/VerificationCheck`,
      {
        method: 'POST',
        headers: { Authorization: authHeader, 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ To: TO, Code: code }).toString(),
      }
    );

    const data = await res.json() as { status?: string };
    if (!res.ok || data.status !== 'approved') {
      return NextResponse.json({ error: 'Invalid code' }, { status: 401 });
    }

    return NextResponse.json({ ok: true, token: Buffer.from(ADMIN_PASSWORD).toString('base64') });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
