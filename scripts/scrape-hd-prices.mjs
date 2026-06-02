/**
 * Home Depot Price Scraper
 * Runs quarterly via GitHub Actions
 * Sends email alert via SendGrid if scraping fails
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pricesFile = path.join(__dirname, '../data/hd-prices.json');

const SENDGRID_KEY = process.env.SENDGRID_API_KEY;
const ALERT_EMAIL  = 'tuannguyen44526@gmail.com';
const FROM_EMAIL   = 'info@2mhuntsville.com';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Connection': 'keep-alive',
};

async function sendAlert(failures) {
  if (!SENDGRID_KEY) {
    console.warn('No SENDGRID_API_KEY — skipping email alert');
    return;
  }
  const list = failures.map(f => `• ${f.name}: ${f.reason}`).join('\n');
  const body = {
    personalizations: [{ to: [{ email: ALERT_EMAIL }] }],
    from: { email: FROM_EMAIL, name: '2M Construction Bot' },
    subject: `⚠️ Home Depot Price Scraper — ${failures.length} item(s) failed`,
    content: [{
      type: 'text/html',
      value: `
        <h2>⚠️ Price Scraper Alert — 2M Construction</h2>
        <p>The quarterly Home Depot price update ran on <strong>${new Date().toDateString()}</strong>
           but failed to fetch prices for <strong>${failures.length}</strong> item(s).</p>
        <p>Old prices have been kept. Please review and update manually if needed:</p>
        <pre style="background:#f4f4f4;padding:12px;border-radius:6px">${list}</pre>
        <p>
          <a href="https://github.com/tomnguyen4484/2m-construction/blob/main/data/hd-prices.json"
             style="background:#1A3A5C;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none">
            View hd-prices.json on GitHub
          </a>
        </p>
        <p style="color:#64748b;font-size:12px">
          Next scheduled run: ${(() => {
            const d = new Date(); d.setMonth(d.getMonth() + 3);
            return d.toDateString();
          })()}
        </p>
      `
    }]
  };

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${SENDGRID_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) console.log('Alert email sent to', ALERT_EMAIL);
    else console.warn('Email send failed:', res.status, await res.text());
  } catch (e) {
    console.warn('Email error:', e.message);
  }
}

async function fetchPrice(id, url) {
  try {
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    const html = await res.text();
    const ldMatch  = html.match(/"price":\s*"?([\d.]+)"?/);
    if (ldMatch) return parseFloat(ldMatch[1]);
    const metaMatch = html.match(/content="\$?([\d.]+)"/);
    if (metaMatch) return parseFloat(metaMatch[1]);
    return null;
  } catch (e) {
    return null;
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(pricesFile, 'utf8'));
  const failures = [];
  let updated = 0;

  console.log('Scraping Home Depot prices...');

  for (const [id, product] of Object.entries(data.products)) {
    if (product.sku === 'varies') { console.log('  Skip (varies):', id); continue; }
    console.log('  Fetching:', product.name);
    const price = await fetchPrice(id, product.url);

    if (price && price > 0 && price < 10000) {
      const old = product.price;
      product.price = price;
      if (product.coverage_sqft) product.price_per_sqft = parseFloat((price / product.coverage_sqft).toFixed(2));
      if (product.coverage_lf)   product.price_per_lf   = parseFloat((price / product.coverage_lf).toFixed(2));
      console.log('    Updated:', old, '->', price);
      updated++;
    } else {
      console.warn('    FAILED — keeping old price:', product.price);
      failures.push({ name: product.name, url: product.url, reason: 'Could not fetch or parse price' });
    }
    await new Promise(r => setTimeout(r, 2000));
  }

  // Cập nhật ngày dù thất bại hay không
  const today = new Date();
  data.lastUpdated = today.toISOString().split('T')[0];
  const next = new Date(today); next.setMonth(next.getMonth() + 3);
  data.nextUpdate = next.toISOString().split('T')[0];
  fs.writeFileSync(pricesFile, JSON.stringify(data, null, 2), 'utf8');

  console.log(`\nResult: ${updated} updated, ${failures.length} failed`);

  // Gửi email nếu có lỗi
  if (failures.length > 0) {
    console.log('Sending alert email...');
    await sendAlert(failures);
  } else {
    console.log('All prices updated successfully — no alert needed');
  }
}

main();
