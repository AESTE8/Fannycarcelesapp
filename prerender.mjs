/**
 * Pré-rendu (SSG) post-build.
 * 1. `vite build`               -> dist/ (client + index.html template)
 * 2. `vite build --ssr ...`     -> dist-server/entry-server.js (fonction render)
 * 3. `node prerender.mjs`       -> injecte le HTML rendu dans dist/<route>/index.html
 */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const abs = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(abs('dist/index.html'), 'utf-8');
const { render, ROUTES } = await import('./dist-server/entry-server.js');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('Template dist/index.html ne contient pas <div id="root"></div> — pré-rendu impossible.');
}

for (const route of ROUTES) {
  const appHtml = render(route);
  const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const outFile = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  fs.mkdirSync(path.dirname(abs(outFile)), { recursive: true });
  fs.writeFileSync(abs(outFile), html);
  console.log('✓ pré-rendu', outFile, `(${(appHtml.length / 1024).toFixed(1)} kB de HTML)`);
}

// Nettoyage du bundle serveur intermédiaire.
fs.rmSync(abs('dist-server'), { recursive: true, force: true });
console.log('✓ pré-rendu terminé');
