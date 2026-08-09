import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'infimind.co.in';
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const PUBLIC_DIR = path.join(__dirname, '../public');

// 1. Generate or read key
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

let keyFile = fs.readdirSync(PUBLIC_DIR).find(f => /^[a-f0-9]{32}\.txt$/.test(f));
let key;
if (keyFile) {
  key = keyFile.replace('.txt', '');
  console.log(`Using existing IndexNow key file: public/${keyFile}`);
} else {
  key = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  keyFile = `${key}.txt`;
  fs.writeFileSync(path.join(PUBLIC_DIR, keyFile), key, 'utf8');
  console.log(`Generated new IndexNow key file: public/${keyFile}`);
}

// 2. Parse sitemap
if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`Sitemap not found at: ${SITEMAP_PATH}`);
  process.exit(1);
}

const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
const urls = [];
let match;
while ((match = urlRegex.exec(sitemapContent)) !== null) {
  urls.push(match[1]);
}

if (urls.length === 0) {
  console.error('No URLs found in sitemap.');
  process.exit(1);
}

console.log(`Found ${urls.length} URLs in sitemap.`);

// 3. Submit
const payload = {
  host: HOST,
  key: key,
  keyLocation: `https://${HOST}/${keyFile}`,
  urlList: urls
};

console.log('Sending IndexNow payload:', JSON.stringify(payload, null, 2));

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(payload)
  });

  if (response.status === 200 || response.status === 202) {
    console.log(`Successfully submitted to IndexNow! (Status: ${response.status})`);
  } else {
    const text = await response.text();
    console.error(`Failed to submit to IndexNow. Status: ${response.status}, Response: ${text}`);
  }
} catch (error) {
  console.error('Error submitting to IndexNow:', error);
}
