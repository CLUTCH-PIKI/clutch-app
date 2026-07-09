const { spawn } = require('child_process');
const port = process.env.PORT || 3000;
const host = '0.0.0.0';

console.log(`Starting Next.js on ${host}:${port}`);

const next = spawn('./node_modules/.bin/next', ['start', '-p', port.toString(), '-H', host], {
  stdio: 'inherit',
  shell: true
});

next.on('close', (code) => {
  process.exit(code);
});

next.on('error', (err) => {
  console.error('Failed to start Next.js process:', err);
  process.exit(1);
});
