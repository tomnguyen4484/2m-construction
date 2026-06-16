import { NextResponse } from 'next/server';
import crypto from 'node:crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '2M@Huntsville#2026';

function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [pass] = decoded.split(':');
    return pass === ADMIN_PASSWORD;
  } catch { return false; }
}

async function getGAAccessToken(sa: { client_email: string; private_key: string }) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  })).toString('base64url');

  const signing = `${header}.${payload}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signing);
  const signature = sign.sign(sa.private_key, 'base64url');
  const jwt = `${signing}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const data = await res.json();
  return data.access_token as string;
}

export async function GET(req: Request) {
  const token = req.headers.get('x-admin-token') ?? '';
  if (!verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  const saJson     = process.env.GOOGLE_SA_JSON;

  if (!propertyId || !saJson) {
    return NextResponse.json({ configured: false });
  }

  try {
    const sa = JSON.parse(saJson);
    const accessToken = await getGAAccessToken(sa);

    // Chạy 3 báo cáo song song
    const [overviewRes, pagesRes, sourcesRes] = await Promise.all([
      // 30-day overview (sessions, users, pageviews)
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [
            { startDate: '30daysAgo', endDate: 'today', name: 'last30' },
            { startDate: '60daysAgo', endDate: '31daysAgo', name: 'prev30' },
          ],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'screenPageViews' },
            { name: 'averageSessionDuration' },
            { name: 'bounceRate' },
          ],
        }),
      }),
      // Top pages
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 8,
        }),
      }),
      // Traffic sources
      fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
          dimensions: [{ name: 'sessionDefaultChannelGroup' }],
          metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
          limit: 6,
        }),
      }),
    ]);

    const [overview, pages, sources] = await Promise.all([
      overviewRes.json(),
      pagesRes.json(),
      sourcesRes.json(),
    ]);

    // Daily trend (last 30 days)
    const trendRes = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
    });
    const trend = await trendRes.json();

    return NextResponse.json({ configured: true, overview, pages, sources, trend });
  } catch (err) {
    console.error('GA4 error:', err);
    return NextResponse.json({ configured: false, error: String(err) }, { status: 500 });
  }
}
