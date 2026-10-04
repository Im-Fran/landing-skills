#!/usr/bin/env node
// Fallback capture for when no browser tool is available.
// It does not emulate reduced motion: the Playwright CLI has no flag for it.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export const WIDTHS = [360, 768, 1280, 1440];

export function toUrl(target) {
  if (/^https?:\/\//.test(target)) return target;
  const path = resolve(target);
  if (!existsSync(path)) throw new Error(`Not found: ${target}`);
  return pathToFileURL(path).href;
}

export function buildArgs(url, outFile, width, { dark = false } = {}) {
  return [
    '--yes', 'playwright', 'screenshot',
    ...(dark ? ['--color-scheme', 'dark'] : []),
    '--viewport-size', `${width},800`, '--full-page', '--wait-for-timeout', '1500',
    url, outFile,
  ];
}

function main() {
  const args = process.argv.slice(2);
  const dark = args.includes('--dark');
  const [target, outDir] = args.filter((a) => !a.startsWith('--'));
  if (!target || !outDir) {
    console.error('usage: screenshot.mjs <url-or-file> <outDir> [--dark]');
    process.exit(2);
  }
  let url;
  try {
    url = toUrl(target);
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }
  mkdirSync(outDir, { recursive: true });
  let failed = false;
  for (const width of WIDTHS) {
    const outFile = join(outDir, `${width}${dark ? '-dark' : ''}.png`);
    const run = spawnSync('npx', buildArgs(url, outFile, width, { dark }), {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    if (run.status !== 0) {
      failed = true;
      console.error(`capture failed at ${width}px`);
    } else {
      console.log(outFile);
    }
  }
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
