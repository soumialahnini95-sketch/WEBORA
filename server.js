import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

function resolveFile(urlPath) {
  if (urlPath === '/') return path.join(root, 'index.html');
  if (urlPath === '/manus-routes.json') return path.join(root, 'public', 'manus-routes.json');
  if (urlPath === '/favicon.svg') return path.join(root, 'public', 'favicon.svg');
  return path.join(root, urlPath.slice(1));
}

createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  const filename = path.resolve(resolveFile(pathname));
  const relative = path.relative(root, filename);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  try {
    const details = await stat(filename);
    if (!details.isFile()) throw new Error('Not a file');
    const body = await readFile(filename);
    response.writeHead(200, {
      'Content-Type': mime[path.extname(filename)] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
      'Content-Length': body.length,
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Page introuvable');
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Webora prêt sur http://0.0.0.0:${port}`);
});
