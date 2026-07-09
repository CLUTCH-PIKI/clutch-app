const fs = require('fs-extra');
const path = require('path');

async function copyDist() {
  const src = path.join(__dirname, 'front', 'dist');
  const dest = path.join(__dirname, 'api', 'public');

  try {
    if (await fs.pathExists(src)) {
      console.log(`Copying ${src} to ${dest}...`);
      await fs.ensureDir(dest);
      await fs.copy(src, dest);
      console.log('Copy successful!');
    } else {
      console.error(`Source directory ${src} does not exist. Build the front first.`);
    }
  } catch (err) {
    console.error('Error during copy:', err);
    process.exit(1);
  }
}

copyDist();
