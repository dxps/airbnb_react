import { serve } from 'bun';
import index from './index.html';

const PUBLIC_BASE_PATH = './public';

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      async GET(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        });
      },
      async PUT(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        });
      },
    },

    '/api/hello/:name': async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    '/assets/:file': async (req) => {
      const filePath = PUBLIC_BASE_PATH + new URL(req.url).pathname;
      const file = Bun.file(filePath);
      return new Response(file);
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },

  port: 3010,
});

console.log(`🚀 Server running at ${server.url}`);
