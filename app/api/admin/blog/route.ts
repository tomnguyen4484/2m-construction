import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '2M@Huntsville#2026';
const GITHUB_TOKEN   = process.env.GITHUB_TOKEN ?? '';
const GITHUB_OWNER   = process.env.GITHUB_OWNER ?? 'tomnguyen4484';
const GITHUB_REPO    = process.env.GITHUB_REPO  ?? '2m-construction';
const POSTS_PATH     = 'data/posts.json';

function auth(req: Request) {
  const t = req.headers.get('x-admin-token') ?? '';
  return t && Buffer.from(t, 'base64').toString().startsWith(ADMIN_PASSWORD);
}

async function getFileSha(): Promise<{ sha: string; content: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POSTS_PATH}`,
    { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' } }
  );
  if (!res.ok) throw new Error('Cannot read posts from GitHub');
  const data = await res.json();
  return { sha: data.sha, content: Buffer.from(data.content, 'base64').toString('utf-8') };
}

async function writeFile(posts: BlogPost[], sha: string, message: string) {
  const content = Buffer.from(JSON.stringify(posts, null, 2)).toString('base64');
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${POSTS_PATH}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content, sha }),
    }
  );
  if (!res.ok) throw new Error('Failed to write posts to GitHub');
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  published: boolean;
}

// GET — list all posts
export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!GITHUB_TOKEN) return NextResponse.json({ error: 'NO_TOKEN', posts: [] });
  try {
    const { content } = await getFileSha();
    return NextResponse.json({ posts: JSON.parse(content) });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}

// POST — create or update post
export async function POST(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!GITHUB_TOKEN) return NextResponse.json({ error: 'NO_TOKEN' }, { status: 500 });

  const body = await req.json() as Partial<BlogPost>;
  if (!body.title?.trim()) return NextResponse.json({ error: 'Title required' }, { status: 400 });

  try {
    const { sha, content } = await getFileSha();
    const posts: BlogPost[] = JSON.parse(content);

    const now = new Date().toISOString();
    const slug = body.slug?.trim() || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const existing = posts.findIndex(p => p.id === body.id);

    const post: BlogPost = {
      id:               body.id || slug + '-' + Date.now(),
      title:            body.title.trim(),
      slug,
      excerpt:          body.excerpt?.trim() || '',
      content:          body.content?.trim() || '',
      coverImageUrl:    body.coverImageUrl?.trim() || '',
      tags:             body.tags || [],
      metaTitle:        body.metaTitle?.trim() || body.title.trim(),
      metaDescription:  body.metaDescription?.trim() || body.excerpt?.trim() || '',
      publishedAt:      existing >= 0 ? posts[existing].publishedAt : now,
      updatedAt:        now,
      published:        body.published ?? false,
    };

    if (existing >= 0) posts[existing] = post;
    else posts.unshift(post);

    await writeFile(posts, sha, `blog: ${existing >= 0 ? 'update' : 'add'} "${post.title}"`);
    return NextResponse.json({ ok: true, post });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE — remove post by id
export async function DELETE(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!GITHUB_TOKEN) return NextResponse.json({ error: 'NO_TOKEN' }, { status: 500 });

  const { id } = await req.json();
  try {
    const { sha, content } = await getFileSha();
    const posts: BlogPost[] = JSON.parse(content).filter((p: BlogPost) => p.id !== id);
    await writeFile(posts, sha, `blog: delete post ${id}`);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
// env refresh Fri Jun 26 00:48:42 UTC 2026
