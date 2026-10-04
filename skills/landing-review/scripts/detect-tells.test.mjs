import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TELLS } from './tells.mjs';
import { scan, collect, selfTest } from './detect-tells.mjs';

const CLI = join(dirname(fileURLToPath(import.meta.url)), 'detect-tells.mjs');
const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });

test('rule ids are unique and patterns are not global', () => {
  assert.equal(new Set(TELLS.map((t) => t.id)).size, TELLS.length);
  for (const t of TELLS) assert.ok(!t.pattern.global, `${t.id} must not use the g flag`);
});

test('every rule has a message and a fix', () => {
  for (const t of TELLS) assert.ok(t.message && t.fix, t.id);
});

test('self-test passes: every rule fires on tells.html, none on clean.html', () => {
  assert.deepEqual(selfTest(), []);
});

test('scan reports file, 1-based line, and rule id', () => {
  const found = scan('<p>ok</p>\n<h1>Supercharge your team</h1>', 'a.html');
  assert.equal(found.length, 1);
  assert.deepEqual(
    { file: found[0].file, line: found[0].line, id: found[0].id },
    { file: 'a.html', line: 2, id: 'copy-inflated-en' },
  );
});

test('Spanish inflated copy is caught', () => {
  assert.equal(scan('Desbloquea el poder de tu negocio hoy', 'a.md')[0].id, 'copy-inflated-es');
});

test('scan handles CRLF', () => {
  assert.equal(scan('a\r\nSupercharge it\r\n', 'a.md')[0].line, 2);
});

test('collect skips node_modules, build output, unknown extensions, and large files', () => {
  const dir = mkdtempSync(join(tmpdir(), 'proj-'));
  mkdirSync(join(dir, 'node_modules/pkg'), { recursive: true });
  mkdirSync(join(dir, 'dist'));
  mkdirSync(join(dir, 'src'));
  writeFileSync(join(dir, 'node_modules/pkg/index.html'), 'x');
  writeFileSync(join(dir, 'dist/index.html'), 'x');
  writeFileSync(join(dir, 'src/page.html'), 'x');
  writeFileSync(join(dir, 'src/photo.png'), 'x');
  writeFileSync(join(dir, 'src/huge.js'), 'x'.repeat(1_000_001));
  assert.deepEqual(collect(dir), [join(dir, 'src/page.html')]);
});

test('CLI with no arguments exits 2 with usage and no stack trace', () => {
  const r = run();
  assert.equal(r.status, 2);
  assert.match(r.stderr, /usage:/);
  assert.doesNotMatch(r.stderr, /\n\s+at /);
});

test('CLI with a missing path exits 2 with a one-line message', () => {
  const r = run('/no/such/dir');
  assert.equal(r.status, 2);
  assert.match(r.stderr, /path not found: \/no\/such\/dir/);
  assert.doesNotMatch(r.stderr, /\n\s+at /);
});

test('CLI exits 1 and prints file:line when it finds tells', () => {
  const dir = mkdtempSync(join(tmpdir(), 'proj-'));
  writeFileSync(join(dir, 'index.html'), '<h1>Elevate your brand</h1>');
  const r = run(dir);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /index\.html:1\s+\[copy-inflated-en\]/);
});

test('CLI exits 0 on a clean project', () => {
  const dir = mkdtempSync(join(tmpdir(), 'proj-'));
  writeFileSync(join(dir, 'index.html'), '<h1>Bread at your door every Saturday</h1>');
  assert.equal(run(dir).status, 0);
});

test('CLI --json prints a JSON array', () => {
  const dir = mkdtempSync(join(tmpdir(), 'proj-'));
  writeFileSync(join(dir, 'index.html'), '<h1>Elevate your brand</h1>');
  const parsed = JSON.parse(run(dir, '--json').stdout);
  assert.equal(parsed[0].id, 'copy-inflated-en');
});

test('CLI --self-test exits 0', () => {
  assert.equal(run('--self-test').status, 0);
});

const firstId = (src) => scan(src, 'a.html')[0]?.id;

test('builder fingerprints are caught', () => {
  assert.equal(firstId('<a href="https://lovable.app">Edit with Lovable</a>'), 'builder-fingerprint');
  assert.equal(firstId('<a href="https://v0.dev/t/x">Built with v0</a>'), 'builder-fingerprint');
});

test('placeholder text and default titles are caught', () => {
  assert.equal(firstId('<p>Lorem ipsum dolor sit amet</p>'), 'placeholder-text');
  assert.equal(firstId('<p>[Your tagline here]</p>'), 'placeholder-text');
  assert.equal(firstId('<title>Vite + React</title>'), 'placeholder-text');
});

test('stock testimonial names and avatar services are caught', () => {
  assert.equal(firstId('<cite>Sarah Johnson, Head of Operations</cite>'), 'stock-testimonial');
  assert.equal(firstId('<img src="https://i.pravatar.cc/80" alt="">'), 'stock-testimonial');
});

test('Tailwind indigo defaults are caught', () => {
  assert.equal(firstId('<a class="bg-indigo-500 px-4">Go</a>'), 'indigo-default-accent');
  assert.equal(firstId('a { color: #6366F1; }'), 'indigo-default-accent');
  assert.equal(firstId('a { color: #0F172B; }'), undefined);
  assert.equal(firstId('<input class="focus:ring-indigo-500">'), undefined);
  assert.equal(firstId('a { color: #8B5CF6; }'), undefined);
});

test('stock effect components are caught', () => {
  assert.equal(firstId('<BorderBeam size={250} />'), 'stock-effect-component');
  assert.equal(firstId('import CountUp from "react-countup";'), 'stock-effect-component');
});

test('vague attribution is caught', () => {
  assert.equal(firstId('<p>Studies show that teams ship faster.</p>'), 'vague-attribution');
});

test('negation pivots are caught in English and Spanish', () => {
  assert.equal(firstId("<p>It's not a tool, it's a teammate.</p>"), 'copy-negation-pivot');
  assert.equal(firstId('<p>No se trata de planos, se trata de tu casa.</p>'), 'copy-negation-pivot');
});

test('more inflated openers and Spanish stock phrases are caught', () => {
  assert.equal(firstId("<p>Let's dive in.</p>"), 'copy-inflated-en');
  assert.equal(firstId('<p>Sumérgete en tu agenda</p>'), 'copy-inflated-es');
  assert.equal(firstId('<p>Tú decides, nosotros resolvemos lo demás.</p>'), 'copy-inflated-es');
});

test('dead forms and dead anchors are caught', () => {
  assert.equal(firstId('<form action="#" onsubmit="return false">'), 'dead-form');
  assert.equal(firstId('<a class="logo" href="#">Acme</a>'), 'dead-anchor');
  assert.equal(firstId('<a href="#pricing">Pricing</a>'), undefined);
});

test('gradient orbs and the sparkles icon are caught', () => {
  assert.equal(firstId('<div class="absolute rounded-full bg-purple-500 blur-3xl"></div>'), 'gradient-orb');
  assert.equal(firstId('import { Sparkles } from "lucide-react";'), 'sparkles-icon');
});

test('pill badge fires on a pill, not on a plain uppercase label', () => {
  assert.equal(firstId('<span class="rounded-full border px-3 text-xs uppercase tracking-wide">New</span>'), 'pill-badge');
  assert.equal(firstId('<p class="uppercase tracking-widest">Chapter one</p>'), undefined);
});

test('overused-font fires on a leading family, not on a fallback or a niche face', () => {
  assert.equal(firstId('body { font-family: Inter, sans-serif; }'), 'overused-font');
  assert.equal(firstId('body { font-family: "Literata", Inter, sans-serif; }'), undefined);
  assert.equal(firstId('h1 { font-family: Fraunces, serif; }'), undefined);
});

test('overused-font ignores companion and variant faces', () => {
  for (const f of ['Roboto Mono', 'Roboto Slab', 'Roboto Serif', 'Inter Tight', 'Geist Mono', 'Open Sans Condensed']) {
    assert.equal(firstId(`code { font-family: "${f}", monospace; }`), undefined, f);
  }
  assert.equal(firstId('<link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap">'), undefined);
  assert.equal(firstId('<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400">'), undefined);
  assert.equal(firstId('<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400">'), 'overused-font');
  assert.equal(firstId('h1 { font-family: "Instrument Serif", serif; }'), 'overused-font');
  assert.equal(firstId('body { font-family: Geist, sans-serif; }'), 'overused-font');
  assert.equal(firstId('body { font-family: Helvetica, Arial, sans-serif; }'), undefined);
  assert.equal(firstId('body { font-family: Lato, sans-serif; }'), undefined);
  assert.equal(firstId('body { font-family: Poppins, sans-serif; }'), undefined);
});

test('ordinary Spanish idioms are not flagged', () => {
  for (const s of [
    'Cuando se trata de menores, la ley exige autorización.',
    'Es importante señalar que el plazo es de 30 días.',
    'Vale la pena señalar el costo.',
    'Una instalación sin costuras visibles.',
    'Tecnología de vanguardia en el taller.',
    'En la era digital cambió el correo.',
    'Potencia tu motor con este filtro.',
  ]) assert.equal(firstId(s), undefined, s);
});

test('form placeholders are not flagged as stock names or placeholder text', () => {
  assert.equal(firstId('<input placeholder="John Doe">'), undefined);
  assert.equal(firstId('<input type="text" placeholder="Your Company Name">'), undefined);
  assert.equal(firstId('<input placeholder="John Smith">'), undefined);
  assert.equal(firstId('<p>Jane Smith, CTO</p>'), undefined);
  assert.equal(firstId('<p>Your Company Name</p>'), 'placeholder-text');
});

test('scan stays fast on very long single lines', () => {
  for (const unit of ['i<a.length;', '<a ', '<button ', '<li ', '<form ', 'class="rounded-full ', 'hover:scale-', 'from-purple-1 ', 'backdrop-blur ', ':hover{', 'placeholder="', 'Sparkles ', 'a', 'lorem ipsum dolor ']) {
    const line = unit.repeat(Math.ceil(500_000 / unit.length));
    const t0 = performance.now();
    scan(line, 'min.js');
    const ms = performance.now() - t0;
    assert.ok(ms < 500, `${unit} took ${ms.toFixed(0)} ms`);
  }
});

test('rules still fire with 500 characters in the gap', () => {
  const pad = ' flex-col items-center gap-4 text-sm'.repeat(15); // ~525 chars
  assert.ok(pad.length > 500);
  const cases = {
    'glass-card': `<div class="backdrop-blur-md${pad} bg-white/10">`,
    'purple-blue-gradient': `<div class="from-purple-500${pad} to-blue-500">`,
    'dead-anchor': `<a class="x${pad}" href="#">Home</a>`,
    'dead-form': `<form class="x${pad}" action="#">`,
    'arrow-in-button': `<a class="x${pad}" href="/go">Get started →</a>`,
    'pill-badge': `<span class="border${pad} rounded-full uppercase">New</span>`,
  };
  for (const [id, src] of Object.entries(cases)) assert.equal(firstId(src), id, id);
});

test('a quoted placeholder does not hide a later stock name', () => {
  assert.equal(firstId('<input placeholder="Your name"><p>Sarah Johnson, CEO</p>'), 'stock-testimonial');
});
