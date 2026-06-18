const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 4000;

const staticBasePath = path.join(__dirname, 'dist');

function serveStatic(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  let filePath = path.join(staticBasePath, req.url === '/' ? 'index.html' : req.url);
  // Normalize path to prevent directory traversal attacks
  filePath = path.normalize(filePath);
  if (!filePath.startsWith(staticBasePath)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If file not found, serve index.html (for SPA fallback)
      filePath = path.join(staticBasePath, 'index.html');
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('500 Internal Server Error');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
    } else {
      // File exists, serve it
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'text/plain';
      switch (ext) {
        case '.html':
          contentType = 'text/html';
          break;
        case '.js':
          contentType = 'application/javascript';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.json':
          contentType = 'application/json';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.svg':
          contentType = 'image/svg+xml';
          break;
        case '.ico':
          contentType = 'image/x-icon';
          break;
        default:
          contentType = 'text/plain';
      }
      serveStatic(res, filePath, contentType);
    }
  });
});

server.listen(PORT, () => {
  console.log(`SPA server running at http://localhost:${PORT}/`);
});