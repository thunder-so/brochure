import { getCollection } from 'astro:content';
import fs from 'fs';
import path from 'path';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs');
  const entry = docs.find((e) => e.id === 'index.mdx');

  if (!entry) {
    return new Response('Not Found', { status: 404 });
  }

  // Read raw file content
  const filePath = path.join(process.cwd(), 'src/content/docs', 'index.mdx');
  let rawContent = '';
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    rawContent = 'File not found';
  }

  const canonicalUrl = `https://www.thunder.so/docs`;

  return new Response(rawContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Link': `<${canonicalUrl}>; rel="canonical"`
    }
  });
};

export const prerender = true;
