# landing-skills

landing-skills is a Claude Code plugin of seven skills for building landing pages. They take a page from brief to copy, visual direction, code, motion, review and launch, and they are written to avoid the defaults that make generated pages look alike.

## Install

```
/plugin marketplace add Im-Fran/landing-skills
/plugin install landing-skills@landing-skills
```

## The pipeline

Ask for a landing page and `landing-page` runs the others in this order. For example:

```
Build a landing page for my bakery in Valparaiso. Visitors should book a Saturday bread-baking class.
```

The pipeline stops after the copy so you can approve `landing/copy.md`, and it stops again before launch, which only goes ahead on your explicit yes.

The planning files go in the `landing/` folder of your project, and the next skill reads them. The page itself goes where your stack serves it. For plain HTML that is `public/`.

| Skill | What it is for | Reads | Writes |
|---|---|---|---|
| `landing-page` | Settles the brief and runs the rest in order | the conversation, the project | `landing/brief.md` |
| `landing-copy` | Writes every word of the page | `landing/brief.md` | `landing/copy.md` |
| `landing-art-direction` | Chooses typefaces, palette, layout and imagery, with a reason for each | `brief.md`, `copy.md` | `landing/direction.md`, `landing/tokens.css` |
| `landing-build` | Builds a static page that works without JavaScript | `brief.md`, `copy.md`, `direction.md`, `tokens.css` | the page; for a form, `form.js`, `/thanks/` and `/form-error/`. Plain HTML goes in `public/` with a copy of `tokens.css` |
| `landing-motion` | Adds animation, scroll effects and 3D that the direction asks for | `Motion and 3D intent` in `direction.md`, the page, `tokens.css` | motion on the page, in its own files |
| `landing-review` | Audits the page and writes a verdict | the page, `brief.md`, `copy.md`, `direction.md`, `tokens.css` | `landing/review.md`, `landing/review-checklist.md`, `landing/shots/` |
| `landing-launch` | Prepares hosting, analytics, the form backend and a launch checklist | the built page and its form fields; conversion action, domain and contact routes from `brief.md`; form messages from `copy.md` | hosting config; a form Worker when the form has no endpoint; analytics; `landing/launch.md` |

## Using one skill alone

Every skill works on its own. To review a site that already exists, ask for it by name:

```
Use landing-review on https://example.com
```

Without a brief, the skill asks what the product is, who it is for, what the one conversion action is and which facts are real. It reads the source, captures the page at 360, 768, 1280 and 1440 pixels, and writes `landing/review.md`.

Claude runs the review skill's two scripts for you during a review. To run them by hand, use the commands below from the project being reviewed. `<skill-dir>` is the folder that contains the review skill's `SKILL.md`. Find it with `find ~ -path '*landing-review/scripts/detect-tells.mjs' 2>/dev/null`.

```
node <skill-dir>/scripts/detect-tells.mjs index.html
node <skill-dir>/scripts/screenshot.mjs https://example.com landing/shots
```

`detect-tells.mjs` scans files for known tells of generated pages. `screenshot.mjs` captures the four widths; add `--dark` for the dark colour scheme.

## What the skills will not do

- They never invent testimonials, metrics or customer logos.
- Where only the client can supply something, they leave a visible `[PLACEHOLDER: ...]` on the page and list it.
- They prepare a launch without deploying or changing DNS until you say so.

## Requirements

- Node 20 or newer, for the scripts.
- When the environment has a browser tool, the review uses it. Otherwise `screenshot.mjs` starts Chromium through Playwright. If it reports that the executable does not exist, run `npx playwright install chromium`.

## Hosting

The launch skill recommends Cloudflare for hosting, analytics and A/B tests. The build is plain static output, so it works on any host. If you decline Cloudflare, the launch skill adds no Cloudflare files and works through the launch checklist. Choosing and configuring another host is left to you.

## Limits

- The tell detector is a heuristic static scan. A clean scan proves nothing, and the review skill's by-eye rubric is the real check.
- The skills reduce how alike generated pages look but cannot remove it. Two unrelated briefs can still land on the same typeface.
- A page built from a thin brief carries many placeholders and is not finished until the client fills them.
- The Cloudflare commands and limits were checked against the documentation on 2026-10-04 and change over time.
- The 3D recipes were tested with software rendering in a headless browser, not on phones.

## Development

From the repository root:

```
node --test
node scripts/validate-skills.mjs
node skills/landing-review/scripts/detect-tells.mjs --self-test
```

## Licence

GPL-3.0-only. See `LICENSE`.
