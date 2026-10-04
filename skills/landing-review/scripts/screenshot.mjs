#!/usr/bin/env node
// Fallback capture for when no browser tool is available.
// It does not emulate reduced motion: the Playwright CLI has no flag for it.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
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

// Node refuses to spawn npx.cmd without a shell, and a shell would interpret
// characters in the URL. Instead, on Windows use node to run npx-cli.js directly.
export function npxCommand(platform = process.platform, execPath = process.execPath, exists = existsSync) {
  if (platform !== 'win32') {
    return { command: 'npx', prefixArgs: [] };
  }
  const cli = join(dirname(execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
  if (!exists(cli)) {
    throw new Error('Cannot find npx-cli.js next to node.exe. Run the capture by hand: npx playwright screenshot --full-page <url> <file>');
  }
  return { command: execPath, prefixArgs: [cli] };
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

  let command, prefixArgs;
  try {
    ({ command, prefixArgs } = npxCommand());
  } catch (err) {
    console.error(err.message);
    process.exit(2);
  }

  mkdirSync(outDir, { recursive: true });
  let failed = false;
  for (const width of WIDTHS) {
    const outFile = join(outDir, `${width}${dark ? '-dark' : ''}.png`);
    const run = spawnSync(command, [...prefixArgs, ...buildArgs(url, outFile, width, { dark })], {
      stdio: 'inherit',
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
