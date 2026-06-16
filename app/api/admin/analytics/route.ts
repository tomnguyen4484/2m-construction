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

async function getServiceAccountToken(sa: { client_email: string; private_key: string }) {
  const now = Math.floor(Date.now() / 1000);
  const header  = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600, iat: now,
  })).toString('base64url');
  const signing = `${header}.${payload}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signing);
  const sig = sign.sign(sa.private_key, 'base64url');
  const jwt = `${signing}.${sig}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const d = await res.json();
  return d.access_token as string;
}

async function runGA4Reports(accessToken: string, propertyId: string) {
  const headers = { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' };
  const base = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}`;

  const [overviewRes, pagesRes, sourcesRes, trendRes] = await Promise.all([
    fetch(`${base}:runReport`, { method:'POST', headers, body: JSON.stringify({
      dateRanges: [
        { startDate: '30daysAgo', endDate: 'today',     name: 'last30' },
        { startDate: '60daysAgo', endDate: '31daysAgo', name: 'prev30' },
      ],
      metrics: [
        { name: 'sessions' }, { name: 'totalUsers' },
        { name: 'screenPageViews' }, { name: 'averageSessionDuration' }, { name: 'bounceRate' },
      ],
    })}),
    fetch(`${base}:runReport`, { method:'POST', headers, body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 8,
    })}),
    fetch(`${base}:runReport`, { method:'POST', headers, body: JSON.stringify({
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionDefaultChannelGroup' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 6,
    })}),
    fetch(`${base}:runReport`, { method:'POST', headers, body: JSON.stringify({
      dateRanges: [{ startDate: '29daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    })}),
  ]);

  const [overview, pages, sources, trend] = await Promise.all([
    overviewRes.json(), pagesRes.json(), sourcesRes.json(), trendRes.json(),
  ]);

  // Check for GA4 API error
  if (overview.error) throw new Error(overview.error.message ?? 'GA4 API error');

  return { overview, pages, sources, trend };
}

export async function GET(req: Request) {
  // Verify admin session
  const adminToken = req.headers.get('x-admin-token') ?? '';
  if (!verifyToken(adminToken)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Try OAuth token from client first (preferred)
  const gaToken    = req.headers.get('x-ga-token') ?? '';
  const gaProperty = req.headers.get('x-ga-property') ?? process.env.GA4_PROPERTY_ID ?? '';

  if (!gaProperty) {
    return NextResponse.json({ error: 'Thiếu GA4 Property ID' }, { status: 400 });
  }

  try {
    // Use client OAuth token if provided
    if (gaToken) {
      const data = await runGA4Reports(gaToken, gaProperty);
      return NextResponse.json(data);
    }

    // Fall back to service account if configured
    const saJson = process.env.GOOGLE_SA_JSON;
    if (saJson) {
      const sa = JSON.parse(saJson);
      const accessToken = await getServiceAccountToken(sa);
      const data = await runGA4Reports(accessToken, gaProperty);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Chưa kết nối Google Analytics' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
  }
}
