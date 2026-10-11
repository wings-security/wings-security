import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { render, renderMetadata, publicPaths } from '../.prerender/entry-server.js';

const template = await readFile('dist/index.html', 'utf8');
for (const route of [...publicPaths, '/thank-you', '/404']) {
  const html = template
    .replace(/<!-- PAGE_METADATA_START -->[\s\S]*?<!-- PAGE_METADATA_END -->/, renderMetadata(route))
    .replace('<div id="root"></div>', `<div id="root" data-rendered-path="${route}">${render(route)}</div>`);
  const destination = route === '/' ? 'dist/index.html' : path.join('dist', route.slice(1) + '.html');
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicPaths.map((route) => `  <url><loc>https://wingssecurity.ie${route}</loc></url>`).join('\n')}
</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
await rm('.prerender', { recursive: true });
console.log(`Pre-rendered ${publicPaths.length} public pages, a thank-you page and a 404 page.`);
