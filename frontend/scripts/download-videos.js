// Script to fetch curated farming video assets (< 8 MB each, 720p HD, free no-attribution)
import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.join(__dirname, '..', 'public', 'videos');

const VIDEOS = [
  {
    name: 'wheat-field.mp4',
    url: 'https://assets.mixkit.co/videos/25915/25915-720.mp4',
    description: 'Wheat field swaying in wind (6.85 MB)',
  },
  {
    name: 'tractor-farming.mp4',
    url: 'https://assets.mixkit.co/videos/45782/45782-720.mp4',
    description: 'Tractor / harvester mowing wheat crop (4.91 MB)',
  },
  {
    name: 'paddy-field.mp4',
    url: 'https://assets.mixkit.co/videos/16132/16132-720.mp4',
    description: 'Aerial tiered paddy fields (5.64 MB)',
  },
];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          // Handle redirect
          return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        }
        if (response.statusCode !== 200) {
          return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve());
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log('🌾 Downloading curated farming video assets into public/videos/ ...');
  for (const item of VIDEOS) {
    const target = path.join(outputDir, item.name);
    if (fs.existsSync(target) && fs.statSync(target).size > 1000000) {
      console.log(`✓ ${item.name} already exists (${(fs.statSync(target).size / (1024 * 1024)).toFixed(2)} MB)`);
      continue;
    }
    console.log(`⬇ Downloading ${item.name} (${item.description})...`);
    await downloadFile(item.url, target);
    console.log(`✓ Saved ${item.name} (${(fs.statSync(target).size / (1024 * 1024)).toFixed(2)} MB)`);
  }
  console.log('🎉 All farming video clips are ready!');
}

main().catch((err) => {
  console.error('Download error:', err.message);
  process.exit(1);
});
