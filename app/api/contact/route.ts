import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, note, service, estimate } = body;

    const msg = {
      to: 'info@2mhuntsville.com',
      from: 'info@2mhuntsville.com',
      subject: `New Quote Request: ${service || 'General'} — ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#1A3A5C;padding:24px;border-radius:8px 8px 0 0">
            <h2 style="color:#F5C518;margin:0">New Quote Request</h2>
            <p style="color:#94A3B8;margin:4px 0 0">2M Construction Website</p>
          </div>
          <div style="background:#F8FAFC;padding:24px;border-radius:0 0 8px 8px;border:1px solid #E2E8F0">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#64748B;width:140px">Name</td><td style="padding:8px 0;font-weight:600;color:#1E293B">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748B">Phone</td><td style="padding:8px 0;font-weight:600;color:#1E293B">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#64748B">Email</td><td style="padding:8px 0;color:#1E293B">${email || 'Not provided'}</td></tr>
              <tr><td style="padding:8px 0;color:#64748B">Service</td><td style="padding:8px 0;font-weight:600;color:#1A3A5C">${service || 'General'}</td></tr>
              ${estimate ? `<tr><td style="padding:8px 0;color:#64748B">Estimate</td><td style="padding:8px 0;font-weight:700;color:#15803D;font-size:18px">${estimate}</td></tr>` : ''}
              ${note ? `<tr><td style="padding:8px 0;color:#64748B;vertical-align:top">Notes</td><td style="padding:8px 0;color:#1E293B">${note}</td></tr>` : ''}
            </table>
            <div style="margin-top:20px;padding:16px;background:#FFF9E6;border-radius:8px;border:1px solid #F5C518">
              <p style="margin:0;color:#92400E;font-size:14px">
                📞 Call back: <strong>${phone}</strong><br>
                ⏰ Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })} CT
              </p>
            </div>
          </div>
        </div>
      `,
    };

    await sgMail.send(msg);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('SendGrid error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
