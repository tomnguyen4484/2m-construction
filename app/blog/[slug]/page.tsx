import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

interface Post {
  id: string; title: string; slug: string; excerpt: string; content: string;
  coverImageUrl: string; tags: string[]; metaTitle: string; metaDescription: string;
  publishedAt: string; published: boolean;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/tomnguyen4484/2m-construction/contents/data/posts.json',
      { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find(p => p.slug === slug && p.published);
  if (!post) return { title: 'Not Found' };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: { title: post.metaTitle || post.title, description: post.metaDescription, images: post.coverImageUrl ? [post.coverImageUrl] : [] },
  };
}

// Simple markdown-lite renderer
function renderContent(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 style="font-size:20px;font-weight:700;color:#1E293B;margin:28px 0 12px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:24px;font-weight:800;color:#1E293B;margin:32px 0 14px">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:28px;font-weight:800;color:#1E293B;margin:36px 0 16px">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li style="margin:6px 0;padding-left:4px">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, m => `<ul style="margin:16px 0;padding-left:24px;list-style:disc">${m}</ul>`)
    .replace(/\n\n/g, '</p><p style="margin:16px 0;line-height:1.8;color:#374151;font-size:16px">')
    .replace(/^(?!<[hul])(.+)/, '<p style="margin:16px 0;line-height:1.8;color:#374151;font-size:16px">$1</p>');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find(p => p.slug === slug && p.published);
  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main style={{ background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <Link href="/blog" style={{ fontSize: '13px', color: '#64748B', display: 'inline-block', marginBottom: '24px' }}>
          ← Back to Blog
        </Link>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <h1 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#0F2542', lineHeight: 1.25, margin: '0 0 16px' }}>
          {post.title}
        </h1>

        <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 32px' }}>
          2M Construction · {date}
        </p>

        {/* Cover image — inside article */}
        {post.coverImageUrl && (
          <img
            src={post.coverImageUrl}
            alt={post.title}
            style={{ width: '100%', borderRadius: '12px', display: 'block', marginBottom: '32px', objectFit: 'cover', maxHeight: '460px' }}
          />
        )}

        {/* Content */}
        <article
          style={{ fontSize: '16px', lineHeight: 1.8, color: '#374151' }}
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {/* CTA */}
        <div style={{ marginTop: '48px', background: '#0F2542', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 800, margin: '0 0 8px' }}>
            Ready to start your project?
          </h3>
          <p style={{ color: '#94A3B8', fontSize: '14px', margin: '0 0 20px' }}>
            Free on-site estimate · Licensed & Insured · Huntsville, AL
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+19383026795" style={{ background: '#F5C518', color: '#0F2542', padding: '12px 24px', borderRadius: '8px', fontWeight: 800, fontSize: '14px', textDecoration: 'none' }}>
              📞 (938) 302-6795
            </a>
            <Link href="/estimate" style={{ background: 'transparent', color: '#F5C518', border: '2px solid #F5C518', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              Get Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
