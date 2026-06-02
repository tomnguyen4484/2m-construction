/**
 * Home Depot Price Scraper
 * Runs quarterly via GitHub Actions
 * Updates data/hd-prices.json with current prices
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pricesFile = path.join(__dirname, '../data/hd-prices.json');

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
};

async function fetchPrice(sku, url) {
  try {
    const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
    if (!res.ok) return null;
    const html = await res.text();

    // Try JSON-LD price
    const ldMatch = html.match(/"price":\s*"?([\d.]+)"?/);
    if (ldMatch) return parseFloat(ldMatch[1]);

    // Try meta price
    const metaMatch = html.match(/content="\$?([\d.]+)"/);
    if (metaMatch) return parseFloat(metaMatch[1]);

    return null;
  } catch (e) {
    console.warn('  Could not fetch', sku, ':', e.message);
    return null;
  }
}

async function main() {
  const data = JSON.parse(fs.readFileSync(pricesFile, 'utf8'));
  let updated = 0;

  console.log('Scraping Home Depot prices...');

  for (const [id, product] of Object.entries(data.products)) {
    if (product.sku === 'varies') {
      console.log('  Skip (varies):', id);
      continue;
    }
    console.log('  Fetching:', product.name);
    const price = await fetchPrice(id, product.url);
    if (price && price > 0 && price < 10000) {
      const old = product.price;
      product.price = price;
      // Recalculate per-unit price
      if (product.coverage_sqft) product.price_per_sqft = parseFloat((price / product.coverage_sqft).toFixed(2));
      if (product.coverage_lf)   product.price_per_lf   = parseFloat((price / product.coverage_lf).toFixed(2));
      console.log('    Updated:', old, '->', price);
      updated++;
    } else {
      console.log('    Kept existing:', product.price);
    }
    // Rate limit
    await new Promise(r => setTimeout(r, 2000));
  }

  const today = new Date();
  data.lastUpdated = today.toISOString().split('T')[0];
  const next = new Date(today);
  next.setMonth(next.getMonth() + 3);
  data.nextUpdate = next.toISOString().split('T')[0];

  fs.writeFileSync(pricesFile, JSON.stringify(data, null, 2), 'utf8');
  console.log(`\nDone — ${updated} prices updated. Next run: ${data.nextUpdate}`);
}

main();
