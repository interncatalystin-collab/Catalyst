/**
 * Vercel Serverless Catch-All API Route
 * Location: api/[...slug].js
 * Routes all subpath requests under /api/* (e.g. /api/auth/student/login) to the main handler
 */

import handler from './index.js';

export default handler;
