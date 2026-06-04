import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '2M@Huntsville#2026';

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = Buffer.from(ADMIN_PASSWORD + ':' + Date.now()).toString('base64');
  return NextResponse.json({ ok: true, token });
}
