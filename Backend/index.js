/**
 * InternCatalyst Modular Backend & Production SPA Server
 * Location: Backend/index.js
 * Start command: `npm start` or `node Backend/index.js`
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, CORS_HEADERS } from './config.js';
import { routeDispatcher } from './routes.js';
import { connectDB } from './db.js';
import { seedAdmins } from './seedAdmins.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// MIME types for static asset serving in production
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const serveStaticFile = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Failed to read asset');
      return;
    }
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': filePath.includes('assets') ? 'public, max-age=31536000, immutable' : 'no-cache'
    });
    res.end(data);
  });
};

const server = http.createServer(async (req, res) => {
  // Set CORS Headers
  Object.entries(CORS_HEADERS).forEach(([header, val]) => {
    res.setHeader(header, val);
  });

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  try {
    // 1. API Route Dispatcher
    const isHandled = await routeDispatcher(req, res, pathname);
    if (isHandled) return;

    // 2. Production Static Frontend Serving (if dist/ exists)
    if (fs.existsSync(DIST_DIR)) {
      const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
      const candidateFilePath = path.join(DIST_DIR, safePath);

      // Check if exact file exists
      if (fs.existsSync(candidateFilePath) && fs.statSync(candidateFilePath).isFile()) {
        const ext = path.extname(candidateFilePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        serveStaticFile(res, candidateFilePath, contentType);
        return;
      }

      // Single Page Application (SPA) HTML5 History Routing Fallback
      const indexPath = path.join(DIST_DIR, 'index.html');
      if (req.method === 'GET' && fs.existsSync(indexPath)) {
        serveStaticFile(res, indexPath, 'text/html; charset=utf-8');
        return;
      }
    }

    // 3. Fallback 404 for unhandled API or missing assets
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint or asset not found' }));
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
  }
});

server.listen(PORT, async () => {
  console.log(`🚀 InternCatalyst Production Server listening on http://localhost:${PORT}`);
  // Connect to MongoDB Atlas or Local Fallback
  const conn = await connectDB();
  if (conn) {
    await seedAdmins();
  }
});

// Process signal handling for cloud deployments
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM signal received: gracefully shutting down HTTP server.');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT signal received: closing server.');
  server.close(() => process.exit(0));
});
