import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// Public endpoint — returns published posts only
export async function GET() {
  try {
    const file = readFileSync(join(process.cwd(), 'data', 'posts.json'), 'utf-8');
    const posts = JSON.parse(file).filter((p: any) => p.published);
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
