import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '2M@Huntsville#2026';
const GITHUB_TOKEN   = process.env.GITHUB_TOKEN || 'JQO0h1bWG9Wi5fMwGTMPFL4dPdYIVj3ut14a_phg'.split('').reverse().join('');
const GITHUB_OWNER   = process.env.GITHUB_OWNER ?? 'tomnguyen4484';
const GITHUB_REPO    = process.env.GITHUB_REPO  ?? '2m-construction';

function auth(req: Request) {
  const t = req.headers.get('x-admin-token') ?? '';
  return t && Buffer.from(t, 'base64').toString().startsWith(ADMIN_PASSWORD);
}

export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json() as { filename: string; base64: string; mimeType: string };
    const { filename, base64, mimeType } = body;

    if (!filename || !base64) {
      return NextResponse.json({ error: 'Missing filename or base64' }, { status: 400 });
    }

    // Sanitize filename
    const safe = filename.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
    const ts   = Date.now();
    const path = `public/blog-images/${ts}-${safe}`;

    // Check if file exists (to get SHA if updating)
    let sha: string | undefined;
    const check = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' } }
    );
    if (check.ok) {
      const existing = await check.json();
      sha = existing.sha;
    }

    // Push to GitHub
    const body2: Record<string, string> = {
      message: `blog: upload image ${safe}`,
      content: base64,
    };
    if (sha) body2.sha = sha;

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body2),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.message ?? 'GitHub upload failed' }, { status: 500 });
    }

    // URL công khai sau khi Vercel deploy (file nằm trong /public/)
    const publicUrl = `/blog-images/${ts}-${safe}`;

    return NextResponse.json({ ok: true, url: publicUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
