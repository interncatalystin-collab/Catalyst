import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        // Dev server API router: handles /api/* directly through Backend routes
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            try {
              const { routeDispatcher } = await import('./Backend/routes.js');
              const host = req.headers.host || 'localhost:5173';
              const parsedUrl = new URL(req.url, `http://${host}`);
              const handled = await routeDispatcher(req, res, parsedUrl.pathname);
              if (handled) return;
            } catch (err) {
              console.error('API middleware error:', err);
              if (!res.writableEnded) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
              return;
            }
          }
          next();
        });
      }
    }
  ]
})
