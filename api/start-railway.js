const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

// Determine the correct path to the next binary
let nextBin = path.join(__dirname, 'node_modules', '.bin', 'next');
if (!fs.existsSync(nextBin)) {
  // Try monorepo root node_modules if not in local
  nextBin = path.join(__dirname, '..', 'node_modules', '.bin', 'next');
}

// If still not found, fallback to 'npx next'
const cmd = fs.existsSync(nextBin) ? nextBin : 'npx';
const args = fs.existsSync(nextBin) ? ['start', '-p', port.toString(), '-H', host] : ['next', 'start', '-p', port.toString(), '-H', host];

console.log(`Starting Next.js using ${cmd} on ${host}:${port}`);
console.log(`Current directory: ${process.cwd()}`);
console.log(`__dirname: ${__dirname}`);

const next = spawn(cmd, args, {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname // Ensure we run in the api directory
});

next.on('close', (code) => {
  process.exit(code);
});

next.on('error', (err) => {
  console.error('Failed to start Next.js process:', err);
  process.exit(1);
});
