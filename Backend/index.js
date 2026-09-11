/**
 * InternCatalyst Modular Backend Server Entry Point
 * Location: Backend/index.js
 * Start command: `node Backend/index.js` or `npm run backend`
 */

import http from 'http';
import { PORT, CORS_HEADERS } from './config.js';
import { routeDispatcher } from './routes.js';
import { connectDB } from './db.js';
import { seedAdmins } from './seedAdmins.js';

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

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    const isHandled = await routeDispatcher(req, res, pathname);

    if (!isHandled) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'API Endpoint Not Found' }));
    }
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', details: err.message }));
  }
});

server.listen(PORT, async () => {
  console.log(`🚀 InternCatalyst Backend API Server listening on http://localhost:${PORT}`);
  // Connect to MongoDB Atlas
  const conn = await connectDB();
  if (conn) {
    await seedAdmins();
  }
});


