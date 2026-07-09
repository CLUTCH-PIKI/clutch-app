const fs = require('fs-extra');
const path = require('path');

async function setupMonolith() {
  const rootDir = __dirname;
  const frontDist = path.join(rootDir, 'front', 'dist');
  const apiPublic = path.join(rootDir, 'api', 'public');
  const apiStatic = path.join(rootDir, 'api', '.next', 'static');
  
  const standaloneDir = path.join(rootDir, 'api', '.next', 'standalone');
  const standaloneApiDir = path.join(standaloneDir, 'api');
  const standalonePublic = path.join(standaloneApiDir, 'public');
  const standaloneStatic = path.join(standaloneApiDir, '.next', 'static');

  try {
    // 1. Copy Frontend dist to API public
    if (await fs.pathExists(frontDist)) {
      console.log(`Copying Frontend dist to ${apiPublic}...`);
      await fs.ensureDir(apiPublic);
      await fs.copy(frontDist, apiPublic);
    }

    // 2. If standalone mode is used, copy public and static to standalone
    if (await fs.pathExists(standaloneDir)) {
      console.log('Detected standalone mode. Copying assets to standalone folder...');
      
      await fs.ensureDir(standalonePublic);
      await fs.copy(apiPublic, standalonePublic);
      
      if (await fs.pathExists(apiStatic)) {
        await fs.ensureDir(standaloneStatic);
        await fs.copy(apiStatic, standaloneStatic);
      }
    }
    
    console.log('Monolith setup complete!');
  } catch (err) {
    console.error('Error during monolith setup:', err);
    process.exit(1);
  }
}

setupMonolith();
