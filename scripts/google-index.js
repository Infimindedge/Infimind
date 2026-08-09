import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleAuth } from 'google-auth-library';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const CREDENTIALS_PATH = path.join(__dirname, '../google-credentials.json');

// Check credentials
if (!fs.existsSync(CREDENTIALS_PATH) && !process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('\n❌ Google credentials file not found.');
  console.error(`Please place your service account credentials JSON file at: ${CREDENTIALS_PATH}`);
  console.error('Or set the GOOGLE_APPLICATION_CREDENTIALS environment variable.\n');
  console.error('Refer to INDEXING_GUIDE.md for instructions on how to set this up.');
  process.exit(1);
}

// 1. Parse sitemap
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

console.log(`Found ${urls.length} URLs in sitemap to submit for indexing.`);

// 2. Auth with Google
const auth = new GoogleAuth({
  keyFile: fs.existsSync(CREDENTIALS_PATH) ? CREDENTIALS_PATH : undefined,
  scopes: ['https://www.googleapis.com/auth/indexing'],
});

async function main() {
  const client = await auth.getClient();
  
  for (const url of urls) {
    try {
      console.log(`Requesting indexing for: ${url}`);
      const res = await client.request({
        url: 'https://indexing.googleapis.com/v3/urlNotifications:publish',
        method: 'POST',
        data: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      console.log(`✅ Success: ${res.data.urlNotificationMetadata?.latestUpdate?.url || url} (Status: ${res.status})`);
    } catch (err) {
      console.error(`❌ Error submitting ${url}:`, err.response?.data?.error?.message || err.message);
    }
    // Sleep 200ms between requests to avoid rate limits
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

main().catch(console.error);
