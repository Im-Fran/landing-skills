# LandingSkills: plugin design

Date: 2026-10-04
Status: awaiting review (revision 2)

## Purpose

`landing-skills` is a public Claude Code plugin for building modern landing
pages that look professionally made. The output must carry no recognisable
traces of AI generation, in either the visuals or the copy.

Success means a landing built with the plugin is visibly better than one built
without it from the same brief, and a reviewer cannot point to the usual
generated-page defaults in it.

The plugin aims to be complete: from brief and copy through art direction,
build, motion and 3D, review, and launch.

## Background

A survey of design skills already available for Claude Code found that none
cover conversion structure, marketing copywriting, concrete typeface selection,
a colour method, art direction, or visual quality control with screenshots.
Several recommend the exact defaults that mark a page as generated: Inter,
terracotta on cream, glassmorphism, a fade-up on every section.

## Decisions

- **Distribution:** a publishable plugin with its own marketplace. Skills are
  self-contained and do not depend on any other installed skill.
- **Stack:** agnostic. Recipes are written in HTML and modern CSS, with short
  adapters for Astro, Next, Vite with React, and Tailwind v4.
- **Language:** skills and README in English. The copy of each landing is
  written in the language of the project.
- **Architecture:** a pipeline of seven skills, one entry skill and six
  specialised skills that also work on their own.
- **Licence:** GNU GPL v3 (`GPL-3.0-only`). The full licence text goes in
  `LICENSE` and the identifier in `plugin.json`.
- **Scripts:** every script in the repository is written in Node as an ES
  module (`.mjs`) with no dependencies. This covers skill scripts, validation,
  and eval tooling. No shell or Python scripts are added.
- **Hosting, analytics, and A/B testing:** the plugin recommends Cloudflare
  for all three and documents that path. Other hosts still work, because the
  build output is plain static files.

## Repository layout

```
.claude-plugin/plugin.json
.claude-plugin/marketplace.json      source "./"
skills/
  landing-page/SKILL.md
  landing-copy/SKILL.md + references/
  landing-art-direction/SKILL.md + references/
  landing-build/SKILL.md + references/
  landing-motion/SKILL.md + references/
  landing-review/SKILL.md + references/ + scripts/
  landing-launch/SKILL.md + references/
scripts/                             repository tooling, Node only
docs/research/                       findings with sources
docs/superpowers/specs/              this document
evals/                               test briefs and results
README.md
LICENSE
```

Skills are discovered by convention at `skills/<name>/SKILL.md`.

## Skill conventions

- Each `SKILL.md` stays under 500 lines. Heavy detail lives in `references/`,
  one level deep. Reference files over 100 lines open with a table of contents.
- Frontmatter holds `name` and `description` only.
- Descriptions start with "Use when", list triggers only and never summarise
  the workflow, stay under 1024 characters, and contain no angle brackets.
- Skills refer to each other by name, for example `landing-skills:landing-copy`.
- Guidance is written as positive recipes with the reason attached. Each
  catalogued tell comes with a concrete alternative.

## The seven skills

### 1. `landing-page` (entry)

- Collects the brief: product, audience, the single conversion action, proof
  available, assets available, brand constraints, detected stack.
- Fixes the order of work: content, then design, then code, then motion, then
  review, then launch.
- Hands off to the other six by name.
- Asks when brief information is missing. It does not invent it.

### 2. `landing-copy`

- Section sequences by landing type: SaaS, product, service or studio,
  waitlist, event.
- Headlines, value proposition, benefit versus feature, objections, hierarchy
  of calls to action.
- Social proof and pricing.
- Tell-tale phrases in English and Spanish, each with a concrete alternative.
- Firm rule: never invent testimonials, metrics, or customer logos. Anything
  missing stays as a visible placeholder and is listed for the user.
- Output: a copy document, section by section, approved before design starts.

### 3. `landing-art-direction`

- Output: a direction document and design tokens, written before any code.
- Typography: curated pairings by tone, each with source and licence, plus the
  list of overused faces.
- Colour: a method in OKLCH derived from the client's subject, tinted neutrals,
  dark mode designed on purpose.
- Layout: grid, rhythm, variety between sections.
- Assets: photography, illustration, product shots, and what to do when there
  are no assets.
- Motion and 3D intent: whether the page calls for them at all, and what role
  they play. `landing-motion` implements what is decided here.
- Catalogue of generated-looking visual clusters, each with its way out.

### 4. `landing-build`

- Semantic HTML and modern CSS: `clamp()`, container queries, `oklch()`.
- Performance budget for the hero, fonts, and JavaScript.
- SEO and meta: title, description, social cards, favicon, structured data.
- Lead-capture forms and an accessibility floor: keyboard, visible focus,
  contrast, labels.
- `references/adapters.md` holds the per-stack notes.
- Builds the static, fully working page first. Motion and 3D are layered on
  top by `landing-motion`, so the page works without them.

### 5. `landing-motion`

Full recipes, each with code, when to use it, when not to, its cost, and its
fallback. One reference file per family:

- **Foundations:** easing, duration, springs, choreography, stagger, and the
  rules that keep motion from reading as generated.
- **Entrances and text:** orchestrated hero sequences, split-text reveals,
  masked and clip-path reveals, number and counter animation.
- **Scroll:** native scroll-driven animations with fallback, pinned and sticky
  sequences, horizontal sections, scrollytelling, smooth scrolling.
- **Parallax:** layered depth, pointer-driven parallax, image and video
  parallax, CSS-only and JavaScript variants.
- **Interaction:** hover and press states, magnetic elements, cursor effects,
  tilt, drag, page and view transitions.
- **3D and WebGL:** Three.js and React Three Fiber scenes, shader backgrounds,
  particle fields, product model viewers with glTF, scroll-driven camera
  moves, WebGL image effects, and WebGPU where it is ready. Includes asset
  pipeline notes: model compression, texture formats, lazy loading.
- **Libraries:** when to reach for GSAP, Motion, Lenis, Three.js, React Three
  Fiber, OGL, Rive, or Lottie, and when plain CSS is enough. Each entry lists
  its licence and bundle cost.
- **Safety rails:** a reduced-motion variant for every recipe, a static
  fallback when WebGL is unavailable, pausing off-screen work, frame-rate and
  main-thread budgets, and a check that motion never delays the hero content.

### 6. `landing-review`

- Works on any landing, including ones not built with the plugin.
- `scripts/detect-tells.mjs`: static analysis of source files for known tells.
  It prints findings with file, line, tell, and suggested fix, and exits
  non-zero when it finds any. It is a heuristic aid and the skill says so.
- Screenshot procedure at 360, 768, 1280, and 1440 pixels wide, using whichever
  browser tool is available, with `npx playwright screenshot` as the fallback.
- Checks reduced motion, dark mode when present, overflow, and layout shift.
- Motion and 3D checks: frame rate during scroll, behaviour with reduced
  motion, behaviour with WebGL disabled, and effect on loading metrics.
- Rubric and report format with severity and proposed fix per finding.

### 7. `landing-launch`

Recommends Cloudflare and documents the path end to end:

- **Hosting:** deploying the static build to Cloudflare, custom domain,
  caching and headers, preview deployments.
- **Analytics:** Cloudflare Web Analytics as the privacy-friendly default,
  plus conversion events for the single call to action defined in the brief.
- **A/B testing:** variant assignment at the edge with a Worker, sticky
  assignment by cookie, measuring conversion per variant, and how to decide
  when a test is finished.
- **Forms:** handling lead-capture submissions with a Worker and protecting
  them with Turnstile.
- A launch checklist: meta and social cards verified live, redirects, 404
  page, analytics receiving events.

Product names, commands, and limits are checked against current Cloudflare
documentation during the research phase, and the skill tells the reader to
confirm them in the docs, because they change.

## Implementation phases

1. **Research.** Parallel agents with web search and browser screenshots. They
   cover real reference landings, curated galleries, typical output of AI site
   generators, type foundries and their licences, conversion copywriting,
   award-level motion and WebGL sites and their techniques, current library
   versions and licences, and current Cloudflare documentation. Results go to
   `docs/research/` with a URL for every claim.
2. **Baseline.** Four briefs in `evals/`, one of them motion- and 3D-heavy.
   Each is built without the skills and the failures are recorded with
   screenshots.
3. **Writing.** The seven skills, their references, and the scripts, written
   against the baseline failures and the research.
4. **Packaging.** Plugin manifests, README, LICENSE.
5. **Verification.** See below.

## Error handling

- Missing brief information: the entry skill asks.
- Missing proof or assets: visible placeholders, listed in the final summary.
- No browser tool available: `landing-review` runs the static script, states
  that the visual pass was skipped, and does not report the page as reviewed.
- Unknown stack: `landing-build` falls back to plain HTML and CSS.
- WebGL unavailable or reduced motion requested: every `landing-motion` recipe
  ships its static fallback.
- User does not want Cloudflare: `landing-launch` says the build is plain
  static output and stops at the launch checklist.

## Verification

- `scripts/validate-skills.mjs` checks every skill: frontmatter keys, name
  format, description rules, line limit, and that referenced files exist.
- `detect-tells.mjs --self-test` checks one fixture with known tells and one
  clean fixture.
- The plugin installs from the local directory through `/plugin marketplace add`
  and all seven skills are listed.
- The four briefs are rebuilt with the skills. Screenshots are compared with
  the baseline and `landing-review` is run on each result.
- The motion-heavy brief is also checked with reduced motion and with WebGL
  disabled.
- The user reviews the compared screenshots. The final aesthetic judgement is
  theirs.

## Out of scope

- Multi-page marketing sites, blogs, and CMS integration.
- Hosting recipes for providers other than Cloudflare.
- Manifests for agents other than Claude Code.
- Authoring 3D models. The skills cover using and optimising existing models.
