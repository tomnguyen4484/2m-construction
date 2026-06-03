import { NextResponse } from 'next/server';

const SENDGRID_KEY  = process.env.SENDGRID_API_KEY ?? '';
const ADMIN_EMAIL   = process.env.ADMIN_EMAIL ?? 'tuannguyen44526@gmail.com';
const FROM_EMAIL    = 'info@2mhuntsville.com';

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
    pendingOtp = { code: otp, expires: Date.now() + 10 * 60 * 1000 }; // 10 min

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
