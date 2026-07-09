import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | 2M Construction Huntsville AL',
  description: 'Home improvement tips, project guides, and local contractor insights for Huntsville, Alabama homeowners.',
};

interface Post {
  id: string; title: string; slug: string; excerpt: string;
  coverImageUrl: string; tags: string[]; publishedAt: string; published: boolean;
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/tomnguyen4484/2m-construction/contents/data/posts.json',
      { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
    return (JSON.parse(decoded) as Post[])
      .filter(p => p.published)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch { return []; }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <section style={{ background: 'linear-gradient(135deg, #0F2542 0%, #1A3A5C 100%)', color: '#fff', padding: '80px 24px 60px', textAlign: 'center' }}>
        <p style={{ color: '#F5C518', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px' }}>
          TIPS & GUIDES
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 800, margin: '0 0 14px' }}>
          Home Improvement Blog
        </h1>
        <p style={{ color: '#94A3B8', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>
          Project guides, pricing tips, and local contractor insights for Huntsville, AL homeowners.
        </p>
      </section>

      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 20px 80px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📝</p>
            <p style={{ color: '#94A3B8', fontSize: '16px' }}>Articles and guides coming soon.</p>
            <a href="/contact" style={{ display: 'inline-block', marginTop: '20px', background: '#F5C518', color: '#0F2542', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
              Contact Us
            </a>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {posts.map(post => {
              const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #E2E8F0', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {post.coverImageUrl && (
                      <img src={post.coverImageUrl} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                    )}
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {post.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                          {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} style={{ background: '#EFF6FF', color: '#1D4ED8', fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '20px' }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#0F2542', margin: '0 0 8px', lineHeight: 1.35 }}>
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p style={{ fontSize: '14px', color: '#64748B', margin: '0 0 16px', lineHeight: 1.6, flex: 1 }}>
                          {post.excerpt}
                        </p>
                      )}
                      <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>{date}</p>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
