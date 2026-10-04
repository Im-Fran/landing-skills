---
name: landing-art-direction
description: Use when choosing the visual direction of a landing page, including typefaces, colour palette, layout, imagery, or design tokens, or when a page looks templated, generic, or AI-generated.
---

# Landing art direction

You decide how the page looks before anyone writes markup. The output is two
files: `landing/direction.md`, a written direction with a reason for every
choice, and `landing/tokens.css`, the design tokens that
`landing-skills:landing-build` uses unchanged and `landing-skills:landing-motion`
reads for intent.

The job is to find the look that belongs to this client and no other. A
direction that would fit a different client in a different trade is a
template, however tasteful it looks.

## Why this skill exists

In a test for this skill, agents without guidance built landing pages for
unrelated clients in different trades. Most of them landed on the same look:
a cream or off-white background, a single dark green or terracotta accent,
and the system font stack or Georgia. The one exception was a dark product
page, and it chose near-black with one warm orange accent and the system
stack. None of those values came from anything in the clients' subjects.

That convergence is the failure this skill prevents. Your own first idea is
likely to land in the same place, so the process makes you write the reason
down before you pick a value.

The rule that follows from the research: a choice is a tell when it is the
unconsidered default, and fine when it is chosen for a reason specific to the
client. Cream is fine for a paper goods shop that photographs on paper. Inter
is fine on a developer tool that pairs it with a mono face and says why. The
system font stack, Arial or Roboto as the only face is always a tell, because
it means no typeface decision was made.

## Inputs

Read these from the user's project:

1. `landing/brief.md`: the product, audience, conversion action, assets,
   brand constraints, language and stack.
2. `landing/copy.md`: the approved copy, one H2 per section in page order,
   ending with `Placeholders`. The section list is your layout's skeleton and
   the words set the tone.

When one is missing:

- No brief: ask for the minimum before deciding anything. What is it, who is
  it for, what single action should a visitor take, which assets exist
  (photos, screenshots, logo), and which brand rules are fixed (colours,
  fonts, logo). Write the answers to `landing/brief.md`.
- No copy: the correct order is copy first, because the number and length of
  sections decide the layout. When you can, run `landing-skills:landing-copy`
  first. When you cannot (the user wants to go ahead, or that skill is not
  available), work from the brief, write `(provisional: no copy.md yet)` at
  the top of the `Layout` section of `direction.md`, and revisit the section
  map when the copy exists.
- Existing brand rules: they win. Use the client's colours and faces, record
  them as given, and spend your decisions on what the rules leave open (scale,
  neutrals, layout, imagery). If a brand colour is a default hue such as
  Tailwind indigo, keep it and write that it is the client's colour. If a
  brand font has a paid licence, ask the user to confirm they hold a web
  licence.
- Existing tokens or stylesheet: read them. Keep values that carry a decision,
  replace values that are framework defaults.

## Process

Do the steps in order. Steps 1 to 3 produce writing, not values. Do not open a
font catalogue or pick a colour until step 3 is written down.

A complete worked example of both output files, for an invented client, is in
`references/example.md`. Read it once, after you have written step 3 for your
own client, to see the level of detail expected. Its faces, colours and
layout came from its subject; reusing any of them for yours defeats the
process.

### 1. Inventory the subject

From the brief and the copy, list in plain nouns:

- The physical things: the product, its materials, the tools, the place where
  it is made or used. For software, the documents and objects it handles and
  the place where its users work.
- The setting of the audience when they meet the page: at a desk, on a phone
  between jobs, comparing specs late at night.
- Three to six words that describe how the copy sounds. Take them from the
  copy itself: short and dry, warm and plain, exact and technical.
- What the visitor must believe before taking the action, in one line.

Then choose one to three anchors: concrete things with a colour, a texture
or a typographic character you can name. For example, for other clients than
yours: "the enamel of an old tram stop sign", "the stamp ink on a library
card", "the brass of a ship's compass". These anchors are what the palette,
the type and the imagery derive from.

### 2. Write the direction and its reason

Write one or two sentences that name the look and tie it to the anchors. Then
write the reason: why this look serves this audience and this action.

Then write two directions you considered and rejected, each with the reason.
At least one of them should be the obvious default for the category (dark and
neon for a developer tool, cream and serif for a craft product, cold blue for
health). Writing the rejection down is what stops you from drifting back to
it while choosing values.

Run two tests on the sentence before you continue:

- The swap test. Replace the client with a business in another trade. If the
  direction still fits, it is generic. Rewrite it until it names something
  only this client has.
- The default test. Compare your plan with the defaults in "Why this skill
  exists" and with `references/visual-tells.md`. If your plan matches a
  default (cream with one dark green or terracotta accent, system or Georgia
  type, near-black with a warm accent, indigo or violet), either give the
  reason specific to this client in writing or change the plan.

### 3. Commit in writing

Write the first two sections of `landing/direction.md` (subject and direction)
now, before any token exists. Everything after this point must trace back to
them. When a later choice does not, change the choice or revise the direction
on purpose and say so in the file.

### 4. Typography

Choose the tone first. Take it from the copy's sound words and the "must
believe" line: the tone is how the visitor should feel at the moment of
acting. When two tones fit, take the one the category default does not use.

Then decide how many faces the page needs. Each face has to earn its place:

- One family is enough when the copy has one register and the family has the
  range (weights, widths, optical sizes) to separate headline from body.
- Two faces when the display face carries an anchor that would tire or blur
  at body size, or when the page has long passages that need a calmer text
  face.
- A mono face only when the page shows text whose meaning depends on fixed
  character widths: code, commands, terminal output, aligned technical
  values. Counts, prices and dates do not need a mono face; use the text
  face's tabular figures (`font-variant-numeric: tabular-nums`).

Write the number of faces and the reason in `direction.md`. Then pick the
faces. Read `references/typography.md` for the pairing table by tone,
licences, the overused faces with what to use instead, the type scale,
measure, leading, tracking and font loading.

Record for each face: role, source, licence, the weights you will load, and
the reason it fits the anchors. Where the licence is not confirmed by the
source (Fontshare self-hosting, Velvetyne per font, any paid foundry), say in
the file that the user must confirm the licence at the source before
shipping.

### 5. Colour

Derive the palette from the anchors in OKLCH. Read `references/colour.md` for
the method: anchors to hue, tinted neutrals, accent ramp, one job for the
accent, text tokens for each ground, a dark theme designed on purpose if the
page has one, and contrast checks with a script you can run.

Record every colour with its role, its `oklch()` value, its sRGB hex fallback
and the anchor it came from. Record the WCAG 2.2 contrast ratio of every text
and background pair you will use. OKLCH lightness is not a contrast ratio;
compute the ratio.

When the anchor colours cannot be sampled from real assets (no photographs
yet, only names or a description), estimate them and mark them as
provisional in `direction.md`. Write which asset will confirm them, and what
would change if the real colour differs: which tokens move, and which
contrast pairs must be checked again.

### 6. Layout

Map each H2 in `copy.md` to a layout decision: width, alignment, density,
background, what visual it carries. Read `references/layout.md` for the grid,
vertical rhythm, variation between sections, alignment, and where to spend
boldness.

Decide where the page is loud: one or two sections get scale, colour or
full-bleed treatment, and everything else stays quiet so those moments read.
Choose them by this test: the section that answers the "must believe" line
from step 1, and the section that shows the real thing (product, place,
work) when an asset or a strong type treatment can carry it. Short or
logistic sections (FAQ, specs, footer) are never the loud ones.

### 7. Imagery and assets

For each visual the section map needs, record what it shows, its aspect
ratio, and whether the asset exists. Read `references/assets.md` for
photography, illustration, product shots, icons, logos, and the no-assets
case.

When an asset does not exist yet, plan a labelled placeholder at the final
aspect ratio and add the asset to a request list. Do not plan stock photos of
people, or an invented screenshot presented as the real product.

When the client has no logo file, a wordmark typeset in the chosen display
face is an acceptable stand-in: record it as a proposal and list the real
logo in the asset request. Do not draw a symbol or mark and present it as the
client's logo.

### 8. Motion and 3D intent

Decide whether the page needs motion or 3D at all. `none` is a valid and
often correct answer. When you name a moment, give its place on the page,
what it shows, its purpose (explain the product, confirm an action, guide
attention to one thing), and what the reduced-motion version shows. A 3D
scene also needs a still poster image for loading and reduced motion.

Keep to one signature moment. More than one is justified when the brief asks
for them, or when each explains a different thing a still image cannot show
(how parts fit together, how a state changes). Each extra moment needs its
own role, and two signature moments never share a screen.

`landing-skills:landing-motion` implements exactly what you write here and
nothing else, so name each moment or write `none`.

### 9. Write the tokens

Write `landing/tokens.css` from the decisions above. Custom properties on
`:root` only, with these five prefixes and no others:

- `--color-*` for every colour role
- `--font-*` for the font stacks
- `--text-*` for sizes, leading and tracking
- `--space-*` for spacing, section rhythm and measure
- `--radius-*` for corner radii

Write the sRGB hex values in `:root`, then the `oklch()` values inside an
`@supports (color: oklch(0 0 0))` block. A custom property takes the last
declared value even when the browser cannot parse it as a colour, so two
declarations in one rule do not give a fallback. The `@supports` block does.
With a dark theme, each block gets its own `prefers-color-scheme: dark`
section; `references/colour.md` has the skeleton.

Every ground that carries text gets a paired text token:
`--color-surface` with `--color-on-surface`, `--color-band` with
`--color-on-band`, `--color-action` with `--color-on-action`. Never use a
background token as a text colour. Each pair has a computed ratio in the
contrast table.

Define only tokens the page will use, and remove the rest before hand-off.
Every colour and font token appears in `direction.md` with its reason. Each
scale (text, space, radius) is explained once: its base or ratio, and what
its steps are for.

### 10. Self-check, then hand off

Reread `references/visual-tells.md` and compare it with what you wrote. Then
run the checks in "Self-check". Then tell the user what you decided in a few
lines, list the assets to request, and name the next skill:
`landing-skills:landing-build`.

## Output format

### `landing/direction.md`

Use these H2s in this order. The last H2 is always `Motion and 3D intent`.

1. `Subject`: the inventory and the anchors from step 1.
2. `Direction`: the sentence, the reason, the rejected directions with
   reasons, and the result of the swap test.
3. `Typography`: the number of faces and why, then faces, source, licence,
   weights, roles, reasons, and the scale.
4. `Colour`: anchors with OKLCH (marked provisional when estimated), role
   table, contrast table, theme decision.
5. `Layout`: grid, rhythm, a row per copy section, where the boldness goes.
6. `Imagery and assets`: each visual with aspect ratio and status, then the
   asset request list.
7. `Surfaces and details`: radius, borders, shadows, icons, with reasons.
8. `Motion and 3D intent`: `none` with a reason, or one entry per moment.

### `landing/tokens.css`

Custom properties on `:root`, five prefixes, hex values first and `oklch()`
values in an `@supports` block. No selectors other than `:root`, no
`@font-face`, no component styles. `landing-skills:landing-build` loads the
fonts and writes the components.

## Self-check

Before handing off, confirm each line. Fix what fails.

- [ ] You reread `references/visual-tells.md` and checked your direction and
      tokens against every cluster and the table of tells the detector
      cannot see. This check is required.
- [ ] `direction.md` has the eight H2s in order and ends with
      `Motion and 3D intent`, which says `none` with a reason or names each
      moment with its purpose and its reduced-motion version.
- [ ] The direction names anchors from the subject and passes the swap
      test: it would not fit a business in another trade.
- [ ] At least two rejected directions are written down, one of them the
      category default.
- [ ] The number of faces has a reason. A mono face is there only for code,
      commands or aligned technical values.
- [ ] Each typeface has a source and a licence. Unconfirmed licences carry a
      note telling the user to confirm at the source before shipping.
- [ ] No system stack, Arial or Roboto as the only face. Georgia, Inter,
      Geist, Space Grotesk, Instrument Serif or Fraunces each have a written
      reason, and no two of the last four appear together.
- [ ] Every colour has an anchor or a role, an `oklch()` value and a hex
      fallback. Estimated anchors are marked provisional with the asset that
      will confirm them. The hue is not Tailwind indigo or violet unless it
      is a brand rule. If the background is cream or warm paper, the reason
      names the subject, and a terracotta accent is there only if it was
      derived from the subject, with the reason recorded.
- [ ] Every text pair you will use, including text on bands and buttons, has
      a WCAG 2.2 ratio of at least 4.5:1 (3:1 for large text and for control
      borders), computed and recorded.
- [ ] One accent with one job. No gradient as the main colour device.
- [ ] The section map covers every H2 in `copy.md` except `Placeholders`,
      and at least two sections differ in width, density or background.
- [ ] Every missing asset has a placeholder with its aspect ratio and a line
      in the request list. No stock people, no invented screenshots, no
      invented logo mark.
- [ ] `tokens.css` declares only `--color-*`, `--font-*`, `--text-*`,
      `--space-*` and `--radius-*` on `:root`, with oklch in `@supports`,
      and every token is used by the plan.
- [ ] Optional: if `landing-skills:landing-review` is available, its static
      detector can scan `landing/` as an extra check. That skill owns the
      scan; the by-eye check above is the one you must do.
