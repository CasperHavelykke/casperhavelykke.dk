// Lists everything that has to be done before the site goes online:
// TODO comments, <Todo> blocks in MDX and projects still marked as drafts.
// Exits with code 1 while anything is left, so it can guard a deploy.

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ignore = new Set([join('src', 'components', 'Todo.astro')]);
const extensions = /\.(astro|tsx?|mdx?|css)$/;
const markers = [
  { pattern: /<Todo\b|\bTODO\b/, label: 'TODO' },
  { pattern: /^draft:\s*true\b/, label: 'kladde' },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (extensions.test(entry.name)) yield path;
  }
}

const findings = [];

for await (const file of walk(join(root, 'src'))) {
  const name = relative(root, file);
  if (ignore.has(name)) continue;

  const lines = (await readFile(file, 'utf8')).split(/\r?\n/);
  lines.forEach((line, index) => {
    const marker = markers.find(({ pattern }) => pattern.test(line.trim()));
    if (marker) findings.push({ name, line: index + 1, label: marker.label, text: line.trim() });
  });
}

if (findings.length === 0) {
  console.log('Intet mangler. Siden er klar til at gå online.');
  process.exit(0);
}

let current = '';
for (const { name, line, label, text } of findings) {
  if (name !== current) {
    console.log(`\n${name}`);
    current = name;
  }
  console.log(`  ${String(line).padStart(4)}  ${label.padEnd(6)}  ${text.slice(0, 110)}`);
}

console.log(`\n${findings.length} ting mangler, før siden kan gå online.`);
process.exit(1);
