# LandingSkills: plugin design

Date: 2026-10-04
Status: awaiting review

## Purpose

`landing-skills` is a public Claude Code plugin for building modern landing
pages that look professionally made. The output must carry no recognisable
traces of AI generation, in either the visuals or the copy.

Success means a landing built with the plugin is visibly better than one built
without it from the same brief, and a reviewer cannot point to the usual
generated-page defaults in it.

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
- **Architecture:** a pipeline of five skills, one entry skill and four
  specialised skills that also work on their own.
- **Licence:** MIT.
- **Detection script:** Node, no dependencies.

## Repository layout

```
.claude-plugin/plugin.json
.claude-plugin/marketplace.json      source "./"
skills/
  landing-page/SKILL.md
  landing-copy/SKILL.md + references/
  landing-art-direction/SKILL.md + references/
  landing-build/SKILL.md + references/
  landing-review/SKILL.md + references/ + scripts/
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

## The five skills

### 1. `landing-page` (entry)

- Collects the brief: product, audience, the single conversion action, proof
  available, assets available, brand constraints, detected stack.
- Fixes the order of work: content before design, design before code, review
  before calling it done.
- Hands off to the other four by name.
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
- Catalogue of generated-looking visual clusters, each with its way out.

### 4. `landing-build`

- Semantic HTML and modern CSS: `clamp()`, container queries, `oklch()`,
  scroll-driven animations with a fallback.
- Motion: one orchestrated moment, response to user actions, reduced motion
  treated as less motion and not as none.
- Performance budget for the hero, fonts, and JavaScript.
- SEO and meta: title, description, social cards, favicon, structured data.
- Lead-capture forms and an accessibility floor: keyboard, visible focus,
  contrast, labels.
- `references/adapters.md` holds the per-stack notes.

### 5. `landing-review`

- Works on any landing, including ones not built with the plugin.
- `scripts/detect-tells.mjs`: static analysis of source files for known tells.
  It prints findings with file, line, tell, and suggested fix, and exits
  non-zero when it finds any. It is a heuristic aid and the skill says so.
- Screenshot procedure at 360, 768, 1280, and 1440 pixels wide, using whichever
  browser tool is available, with `npx playwright screenshot` as the fallback.
- Checks reduced motion, dark mode when present, overflow, and layout shift.
- Rubric and report format with severity and proposed fix per finding.

## Implementation phases

1. **Research.** Parallel agents with web search and browser screenshots. They
   cover real reference landings, curated galleries, typical output of AI site
   generators, type foundries and their licences, and conversion copywriting.
   Results go to `docs/research/` with a URL for every claim.
2. **Baseline.** Three briefs in `evals/`. Each is built without the skills and
   the failures are recorded with screenshots.
3. **Writing.** The five skills, their references, and the script, written
   against the baseline failures and the research.
4. **Packaging.** Plugin manifests, README, LICENSE.
5. **Verification.** See below.

## Error handling

- Missing brief information: the entry skill asks.
- Missing proof or assets: visible placeholders, listed in the final summary.
- No browser tool available: `landing-review` runs the static script, states
  that the visual pass was skipped, and does not report the page as reviewed.
- Unknown stack: `landing-build` falls back to plain HTML and CSS.

## Verification

- The skill-creator `quick_validate.py` passes on all five skills.
- `detect-tells.mjs --self-test` checks one fixture with known tells and one
  clean fixture.
- The plugin installs from the local directory through `/plugin marketplace add`
  and all five skills are listed.
- The three briefs are rebuilt with the skills. Screenshots are compared with
  the baseline and `landing-review` is run on each result.
- The user reviews the compared screenshots. The final aesthetic judgement is
  theirs.

## Out of scope

- Hosting and deployment.
- Analytics and A/B testing.
- Multi-page marketing sites, blogs, and CMS integration.
- 3D and WebGL recipes.
- Manifests for agents other than Claude Code.
