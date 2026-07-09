const http = require('http');
const port = process.env.PORT || 3000;

console.log(`Debug server starting on port ${port}...`);

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
    status: 'debug-ok', 
    port: port, 
    uptime: process.uptime(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DATABASE_PATH: process.env.DATABASE_PATH
    }
  }));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Debug server listening on 0.0.0.0:${port}`);
});
