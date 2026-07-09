const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

// Check for standalone server
const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js');
const standaloneDir = path.join(__dirname, '.next', 'standalone');

if (fs.existsSync(standaloneServer)) {
  console.log(`Starting Next.js in STANDALONE mode from ${standaloneServer}`);
  
  // In standalone mode, we run the server.js directly
  const server = spawn('node', [standaloneServer], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: port,
      HOSTNAME: host
    },
    cwd: standaloneDir
  });

  server.on('close', (code) => process.exit(code));
  server.on('error', (err) => {
    console.error('Failed to start standalone server:', err);
    process.exit(1);
  });
} else {
  console.log('Standalone server not found. Falling back to standard next start.');
  
  let nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');
  if (!fs.existsSync(nextBin)) {
    nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
  }

  const cmd = fs.existsSync(nextBin) ? nextBin : 'npx';
  const args = fs.existsSync(nextBin) ? ['start', '-p', port.toString(), '-H', host] : ['next', 'start', '-p', port.toString(), '-H', host];

  const next = spawn(cmd, args, {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });

  next.on('close', (code) => process.exit(code));
  next.on('error', (err) => {
    console.error('Failed to start Next.js process:', err);
    process.exit(1);
  });
}
