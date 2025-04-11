
const { execSync } = require('child_process');
const fs = require('fs');

// Build the React application
console.log('Building React application...');
execSync('npm run build', { stdio: 'inherit' });

// Create workers-site directory if it doesn't exist
if (!fs.existsSync('workers-site')) {
  fs.mkdirSync('workers-site');
}

// Create index.js in workers-site directory
console.log('Setting up Workers site configuration...');
fs.writeFileSync('workers-site/index.js', `
import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    return await getAssetFromKV(event);
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(\`"$\{pathname}" not found\`, {
      status: 404,
      statusText: 'not found',
    });
  }
}
`);

// Deploy to Cloudflare Workers
console.log('Deploying to Cloudflare Workers...');
execSync('wrangler publish', { stdio: 'inherit' });

console.log('Deployment complete!');
