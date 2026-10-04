import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { WIDTHS, toUrl, buildArgs } from './screenshot.mjs';

test('widths are the four review breakpoints', () => {
  assert.deepEqual(WIDTHS, [360, 768, 1280, 1440]);
});

test('http and https URLs pass through', () => {
  assert.equal(toUrl('https://example.com/a'), 'https://example.com/a');
  assert.equal(toUrl('http://localhost:4321'), 'http://localhost:4321');
});

test('local path with spaces becomes an encoded file URL', () => {
  const dir = mkdtempSync(join(tmpdir(), 'my site '));
  const file = join(dir, 'index.html');
  writeFileSync(file, '<!doctype html>');
  const url = toUrl(file);
  assert.ok(url.startsWith('file://'));
  assert.ok(url.includes('%20'));
  assert.ok(!url.includes(' '));
});

test('missing local path throws a clear error', () => {
  assert.throws(() => toUrl('/no/such/file.html'), /Not found: \/no\/such\/file\.html/);
});

test('buildArgs sets viewport, full page, and output', () => {
  assert.deepEqual(buildArgs('https://example.com', 'out/360.png', 360), [
    '--yes', 'playwright', 'screenshot',
    '--viewport-size', '360,800', '--full-page', '--wait-for-timeout', '1500',
    'https://example.com', 'out/360.png',
  ]);
});

test('buildArgs adds the dark colour scheme', () => {
  const args = buildArgs('https://example.com', 'out/360-dark.png', 360, { dark: true });
  assert.deepEqual(args.slice(3, 5), ['--color-scheme', 'dark']);
});
