#!/usr/bin/env node
// Static scan of landing page source for known tells. A heuristic aid.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { TELLS } from './tells.mjs';

const EXTENSIONS = new Set([
  '.html', '.htm', '.css', '.scss', '.js', '.jsx', '.mjs', '.ts', '.tsx',
  '.astro', '.vue', '.svelte', '.md', '.mdx',
]);
const SKIP_DIRS = new Set([
  'node_modules', '.git', 'dist', 'build', '.next', '.astro', '.output', '.vercel', '.wrangler',
]);
const MAX_BYTES = 1_000_000;

export function scan(text, file) {
  const findings = [];
  text.split(/\r?\n/).forEach((line, i) => {
    for (const t of TELLS) {
      if (t.pattern.test(line)) {
        findings.push({ file, line: i + 1, id: t.id, message: t.message, fix: t.fix });
      }
    }
  });
  return findings;
}

// A file named directly is scanned whatever its extension. Directories are filtered.
export function collect(path) {
  const st = statSync(path);
  if (st.isFile()) return st.size <= MAX_BYTES ? [path] : [];
  const out = [];
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const p = join(path, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) out.push(...collect(p));
    } else if (entry.isFile() && EXTENSIONS.has(extname(entry.name)) && statSync(p).size <= MAX_BYTES) {
      out.push(p);
    }
  }
  return out;
}

export function selfTest() {
  const dir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
  const errors = [];
  const hit = new Set(scan(readFileSync(join(dir, 'tells.html'), 'utf8'), 'tells.html').map((f) => f.id));
  for (const t of TELLS) {
    if (!hit.has(t.id)) errors.push(`rule never fires on fixtures/tells.html: ${t.id}`);
  }
  for (const f of scan(readFileSync(join(dir, 'clean.html'), 'utf8'), 'clean.html')) {
    errors.push(`false positive on fixtures/clean.html line ${f.line}: ${f.id}`);
  }
  return errors;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const errors = selfTest();
    for (const e of errors) console.error(e);
    if (errors.length === 0) console.log(`self-test ok: ${TELLS.length} rules`);
    process.exit(errors.length ? 1 : 0);
  }
  const json = args.includes('--json');
  const paths = args.filter((a) => !a.startsWith('--'));
  if (paths.length === 0) {
    console.error('usage: detect-tells.mjs <path...> [--json] | --self-test');
    process.exit(2);
  }
  for (const p of paths) {
    if (!existsSync(p)) {
      console.error(`path not found: ${p}`);
      process.exit(2);
    }
  }
  const findings = paths
    .flatMap(collect)
    .flatMap((file) => scan(readFileSync(file, 'utf8'), file));
  if (json) {
    console.log(JSON.stringify(findings, null, 2));
  } else {
    for (const f of findings) {
      console.log(`${f.file}:${f.line}  [${f.id}] ${f.message}\n    fix: ${f.fix}`);
    }
    console.log(`${findings.length} finding(s). Heuristic scan: confirm each one by eye.`);
  }
  process.exit(findings.length ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
