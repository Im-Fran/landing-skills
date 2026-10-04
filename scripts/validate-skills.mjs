#!/usr/bin/env node
// Checks every skill under skills/ against the plugin's conventions.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Only flat "key: value" lines are supported. That is all a skill needs.
export function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const i = line.indexOf(':');
    if (i < 1 || /^\s/.test(line)) return null;
    const raw = line.slice(i + 1).trim();
    const quoted = raw.match(/^(["'])(.*)\1$/);
    data[line.slice(0, i).trim()] = { value: quoted ? quoted[2] : raw, quoted: Boolean(quoted) };
  }
  return data;
}

export function validateSkill(dir) {
  const file = join(dir, 'SKILL.md');
  if (!existsSync(file)) return ['missing SKILL.md'];
  const text = readFileSync(file, 'utf8');
  const fm = parseFrontmatter(text);
  if (!fm) return ['frontmatter missing or not flat "key: value" lines'];

  const errors = [];
  const keys = Object.keys(fm).sort().join(',');
  if (keys !== 'description,name') {
    errors.push(`frontmatter keys must be exactly name and description, got: ${keys}`);
  }

  const name = fm.name?.value ?? '';
  const dirName = basename(resolve(dir));
  if (name !== dirName) errors.push(`name must match directory: "${name}" vs "${dirName}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name) || name.length > 64) {
    errors.push('name must be kebab-case and at most 64 characters');
  }

  const d = fm.description;
  if (d) {
    if (!d.value.startsWith('Use when')) errors.push('description must start with "Use when"');
    if (d.value.length > 1024) errors.push('description must be at most 1024 characters');
    if (/[<>]/.test(d.value)) errors.push('description must not contain angle brackets');
    if (!d.quoted && d.value.includes(': ')) {
      errors.push('quote the description: an unquoted value containing ": " is invalid YAML');
    }
  }

  const lineCount = text.trimEnd().split(/\r?\n/).length;
  if (lineCount > 500) errors.push(`SKILL.md must be at most 500 lines, has ${lineCount}`);

  for (const [, rel] of text.matchAll(/\b((?:references|scripts)\/[\w./-]+\.\w+)/g)) {
    if (!existsSync(join(dir, rel))) errors.push(`referenced file not found: ${rel}`);
  }

  const refDir = join(dir, 'references');
  if (existsSync(refDir)) {
    for (const entry of readdirSync(refDir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        errors.push(`references/ must be one level deep, found directory: ${entry.name}`);
        continue;
      }
      if (!entry.name.endsWith('.md')) continue;
      const lines = readFileSync(join(refDir, entry.name), 'utf8').split(/\r?\n/);
      if (lines.length > 100 && !lines.slice(0, 20).some((l) => l.trim() === '## Contents')) {
        errors.push(`references/${entry.name} is over 100 lines and needs a "## Contents" heading in its first 20 lines`);
      }
    }
  }
  return errors;
}

function main() {
  const root = process.argv[2] ?? 'skills';
  if (!existsSync(root)) {
    console.error(`skills directory not found: ${root}`);
    process.exit(2);
  }
  const dirs = readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => join(root, e.name));
  if (dirs.length === 0) {
    console.error('no skills found');
    process.exit(1);
  }
  let failed = 0;
  for (const dir of dirs) {
    const errors = validateSkill(dir);
    if (errors.length === 0) {
      console.log(`ok   ${dir}`);
    } else {
      failed += 1;
      console.log(`FAIL ${dir}`);
      for (const e of errors) console.log(`       ${e}`);
    }
  }
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
