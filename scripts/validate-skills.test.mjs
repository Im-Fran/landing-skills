import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseFrontmatter, validateSkill } from './validate-skills.mjs';

const DESC = 'Use when testing the validator.';

function makeSkill(name, { frontmatter, body = '# Title\n', files = {}, eol = '\n' } = {}) {
  const dir = join(mkdtempSync(join(tmpdir(), 'skill-')), name);
  mkdirSync(dir, { recursive: true });
  const fm = frontmatter ?? `name: ${name}\ndescription: ${DESC}`;
  const text = `---\n${fm}\n---\n\n${body}`.replaceAll('\n', eol);
  writeFileSync(join(dir, 'SKILL.md'), text);
  for (const [rel, content] of Object.entries(files)) {
    mkdirSync(join(dir, rel, '..'), { recursive: true });
    writeFileSync(join(dir, rel), content);
  }
  return dir;
}

test('valid skill has no errors', () => {
  assert.deepEqual(validateSkill(makeSkill('good-skill')), []);
});

test('CRLF line endings parse the same as LF', () => {
  assert.deepEqual(validateSkill(makeSkill('crlf-skill', { eol: '\r\n' })), []);
});

test('missing SKILL.md', () => {
  const dir = mkdtempSync(join(tmpdir(), 'skill-'));
  assert.deepEqual(validateSkill(dir), ['missing SKILL.md']);
});

test('name must match directory', () => {
  const dir = makeSkill('dir-name', { frontmatter: `name: other-name\ndescription: ${DESC}` });
  assert.match(validateSkill(dir).join('\n'), /name must match directory/);
});

test('extra frontmatter key is rejected', () => {
  const dir = makeSkill('extra-key', { frontmatter: `name: extra-key\ndescription: ${DESC}\nlicense: MIT` });
  assert.match(validateSkill(dir).join('\n'), /keys must be exactly name and description/);
});

test('description must start with Use when', () => {
  const dir = makeSkill('bad-start', { frontmatter: 'name: bad-start\ndescription: Builds things.' });
  assert.match(validateSkill(dir).join('\n'), /must start with "Use when"/);
});

test('description must not contain angle brackets', () => {
  const dir = makeSkill('angle', { frontmatter: 'name: angle\ndescription: Use when writing <div> tags.' });
  assert.match(validateSkill(dir).join('\n'), /angle brackets/);
});

test('description over 1024 characters is rejected', () => {
  const dir = makeSkill('too-long', { frontmatter: `name: too-long\ndescription: Use when ${'x'.repeat(1024)}` });
  assert.match(validateSkill(dir).join('\n'), /at most 1024/);
});

test('unquoted description containing colon-space is rejected', () => {
  const dir = makeSkill('colon', { frontmatter: 'name: colon\ndescription: Use when writing text: headlines.' });
  assert.match(validateSkill(dir).join('\n'), /quote the description/);
});

test('quoted description containing colon-space is accepted', () => {
  const dir = makeSkill('colon-ok', { frontmatter: 'name: colon-ok\ndescription: "Use when writing text: headlines."' });
  assert.deepEqual(validateSkill(dir), []);
});

test('SKILL.md over 500 lines is rejected', () => {
  const dir = makeSkill('long-body', { body: 'line\n'.repeat(500) });
  assert.match(validateSkill(dir).join('\n'), /at most 500 lines/);
});

test('referenced file must exist', () => {
  const dir = makeSkill('missing-ref', { body: 'Read references/typography.md first.\n' });
  assert.match(validateSkill(dir).join('\n'), /referenced file not found: references\/typography\.md/);
});

test('referenced file that exists is accepted', () => {
  const dir = makeSkill('has-ref', {
    body: 'Read references/typography.md first.\n',
    files: { 'references/typography.md': '# Typography\n' },
  });
  assert.deepEqual(validateSkill(dir), []);
});

test('long reference needs a Contents heading', () => {
  const dir = makeSkill('long-ref', { files: { 'references/big.md': 'line\n'.repeat(150) } });
  assert.match(validateSkill(dir).join('\n'), /needs a "## Contents" heading/);
});

test('long reference with Contents heading is accepted', () => {
  const dir = makeSkill('long-ref-ok', {
    files: { 'references/big.md': `# Big\n\n## Contents\n\n${'line\n'.repeat(150)}` },
  });
  assert.deepEqual(validateSkill(dir), []);
});

test('references must be one level deep', () => {
  const dir = makeSkill('nested', { files: { 'references/deep/file.md': '# Deep\n' } });
  assert.match(validateSkill(dir).join('\n'), /one level deep/);
});

test('parseFrontmatter returns null without frontmatter', () => {
  assert.equal(parseFrontmatter('# Just a title\n'), null);
});
