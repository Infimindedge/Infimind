# Search Engine Indexing Guide for Infimind

This guide explains how to get your website **infimind.co.in** indexed on Google and Bing immediately using official consoles and custom automated API scripts.

---

## 📋 1. Search Console Registration (Standard Method)

### Google Search Console (GSC)
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Log in with your Google account.
3. Click **Add Property** and select **URL Prefix**, then enter `https://infimind.co.in/`.
4. Choose verification method:
   - **HTML File (Recommended)**: Download the verification file and place it in the `public/` directory of your project, commit, and push it live.
   - **DNS TXT Record**: Add the TXT verification record in your domain registrar's DNS settings (e.g. GoDaddy, Namecheap, Route 53).
5. Click **Verify**.
6. Once verified, navigate to **Sitemaps** on the left menu.
7. Enter `sitemap.xml` in the input field and click **Submit**.

### Bing Webmaster Tools (BWT)
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Log in and choose to **Import** your properties directly from Google Search Console (recommends instant verification) or verify manually using a TXT record.
3. Navigate to **Sitemaps** and submit `https://infimind.co.in/sitemap.xml`.

---

## ⚡ 2. Instant Indexing via Bing IndexNow

Bing supports **IndexNow**, a protocol that notifies search engines instantly when URLs are updated. We have pre-configured and automated this in your project.

### How it works:
1. When you run the IndexNow script, it automatically generates a unique verification key file inside the `public/` directory (e.g., `bc600a4ba57e2b6685b6f1da05c60b39.txt`).
2. It then submits all URLs from your `sitemap.xml` along with the key location to the IndexNow API endpoint.
3. Bing checks your website, reads the key file to verify your ownership, and immediately queues the pages for crawling.

### How to run it:
Simply run the following command in the website directory:
```bash
node scripts/indexnow.js
```
*Note: This script requires zero configuration and will succeed immediately.*

---

## 🚀 3. Instant Indexing via Google Indexing API

The Google Indexing API allows site owners to directly push updates to Google's index queue instead of waiting for Googlebot's standard crawl cycle.

### Step 1: Create a Google Service Account
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g. `Infimind Indexing`).
3. Search for **Web Search Indexing API** and click **Enable**.
4. Go to **IAM & Admin > Service Accounts**.
5. Click **Create Service Account**:
   - Provide a name (e.g., `indexing-bot`).
   - Assign the role of **Owner** or **Project Owner** (or just click next/done).
6. Once created, click on the service account email, navigate to the **Keys** tab, click **Add Key > Create New Key**, select **JSON**, and click **Create**.
7. Download the credentials JSON file.

### Step 2: Configure & Verify in Google Search Console
1. Copy the downloaded JSON file, rename it to `google-credentials.json`, and place it in the root folder of your project (`C:\Users\aasti\Desktop\Final Website\google-credentials.json`).
   *(Note: This file is ignored in Git for security purposes.)*
2. Open the JSON file and copy the `"client_email"` address (e.g., `indexing-bot@infimind-indexing.iam.gserviceaccount.com`).
3. Open your [Google Search Console](https://search.google.com/search-console).
4. Select the `https://infimind.co.in/` property.
5. Go to **Settings > Users and permissions**.
6. Click **Add User**, paste the service account email address, set the permission to **Owner**, and click **Add**.
   *(Note: Owner permission is required to submit indexing notifications on behalf of the domain.)*

### Step 3: Run the Indexer
Run the indexing script using Node:
```bash
node scripts/google-index.js
```
The script will authenticate with your service account, parse your `sitemap.xml`, and request instant indexing for all pages from Google.
