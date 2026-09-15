/**
 * Vercel Serverless API Gateway
 * Location: api/index.js
 * Handles all /api/* requests for InternCatalyst when deployed on Vercel
 */

import { routeDispatcher } from '../Backend/routes.js';
import { connectDB } from '../Backend/db.js';
import { CORS_HEADERS } from '../Backend/config.js';
import { seedAdmins } from '../Backend/seedAdmins.js';

let isInitialized = false;

export default async function handler(req, res) {
  // 1. Set CORS Headers
  Object.entries(CORS_HEADERS).forEach(([header, val]) => {
    res.setHeader(header, val);
  });

  // 2. Handle HTTP OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 3. Connect to Database & Seed Admins on cold start
  if (!isInitialized) {
    try {
      await connectDB();
      await seedAdmins();
    } catch (dbErr) {
      console.warn('Serverless cold-start initialization note:', dbErr.message);
    }
    isInitialized = true;
  }

  // 4. Resolve the route pathname
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
  const rawUrl = req.url || '/api';
  const url = new URL(rawUrl, `http://${host}`);
  let pathname = url.pathname;

  // Handle dynamic routing query parameters (from [...slug] or rewrites)
  if (req.query && req.query.slug) {
    const slugParts = Array.isArray(req.query.slug) ? req.query.slug : [req.query.slug];
    pathname = '/api/' + slugParts.join('/');
  } else if (req.query && req.query.path) {
    const pathParts = Array.isArray(req.query.path) ? req.query.path : [req.query.path];
    pathname = '/api/' + pathParts.join('/');
  } else if (pathname === '/api' && req.headers['x-forwarded-uri']) {
    pathname = new URL(req.headers['x-forwarded-uri'], `http://${host}`).pathname;
  } else if (pathname === '/api' && req.headers['x-matched-path']) {
    pathname = req.headers['x-matched-path'];
  }

  // Ensure pathname always begins with /api
  if (!pathname.startsWith('/api')) {
    pathname = '/api' + (pathname.startsWith('/') ? pathname : '/' + pathname);
  }

  // 5. Dispatch request to modular backend routes
  try {
    const isHandled = await routeDispatcher(req, res, pathname);
    if (!isHandled) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: `API endpoint not found: ${pathname}` }));
    }
  } catch (error) {
    console.error('Serverless routeDispatcher error:', error);
    if (!res.writableEnded) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Internal Server Error', details: error.message }));
    }
  }
}
