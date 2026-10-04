# Worked example

Read this once, after you have written the `Subject` and `Direction` sections
for your own client. It shows the level of detail `direction.md` and
`tokens.css` need. It is not a starting point.

## Contents

- Do not reuse these values
- The client
- direction.md
- tokens.css
- What came from where

## Do not reuse these values

Every face, colour, ratio and layout row below was derived from one invented
client's subject: a swimming pool. None of it transfers. If your finished
direction contains a face, a hue or a layout row from this example, go back
to your own anchors and check that they produced it. If you cannot point to
the anchor in your client's subject that leads to the value, replace it. Two
different clients run through this process should come out looking
different; this example is one of those outcomes, not the shared one.

## The client

Lowther Lane Swim School (invented) teaches adults who cannot swim, in small
evening groups, at a 1930s municipal baths. Conversion action: book a first
lesson. Proof: none yet, placeholders in the copy. Assets: none; the client
will send photographs of the pool hall and the two teachers later. No brand
rules, no logo file.

## direction.md

```markdown
# Direction: Lowther Lane Swim School

## Subject

- Things: the 1930s baths; glazed wall tiles, pale green-blue; painted black
  lane lines on the pool floor; red and white lane-rope floats; depth
  markings painted in tall narrow capitals ("1.0 M", "1.8 M"); the pace clock.
- Audience setting: an adult who is afraid of water, reading on a phone in
  the evening, deciding whether they would be embarrassed.
- How the copy sounds: plain, patient, specific about what happens and when.
- What the visitor must believe: "Nobody will watch me struggle, and the
  first lesson starts in the shallow end."
- Anchors: (1) the wall tile, (2) the lane lines, (3) the lane-rope red.

## Direction

Poolside signage: tall condensed capitals like the depth markings, set large
on tile-pale walls with black lane-line rules, and long passages set as a
calm printed letter.

Reason: the audience fears the place. Showing the real building's own signs
makes it familiar before they arrive, and the letter-like text slows the
reading down for the reassurance passages, which are the longest on the page.

Rejected:
- Fitness brand (near-black, neon accent, heavy italic display): signals
  performance to people afraid of being watched.
- Spa calm (cream background, light serif display, soft lifestyle photos):
  the category default for wellness; nothing in it belongs to this pool.

Swap test: a gym or a yoga studio cannot use depth-marking capitals, lane
lines and tile; the direction holds.

## Typography

Tone: calm and plain. Two faces: the depth-marking capitals would tire over
the long reassurance passages, so the text needs its own face. No mono: the
page shows times and prices but no code or aligned technical values; times
use the text face's tabular figures.

| Role | Face | Source | Licence | Weights | Why |
|---|---|---|---|---|---|
| Display | Barlow Condensed | Google Fonts | open licence, check the family page | 600 | narrow capitals echo the painted depth markings |
| Text | Source Serif 4 | Google Fonts | open licence, check the family page | 400, 400 italic, 600 | letter-like for long reassurance passages; has an optical size axis |

Display in capitals only for the hero and the depth-marking labels; headings
in sentence case.

Scale: major third (1.25) from a 17px body, because serif text reads small at
16px. `--text-sm` captions and labels, `--text-base` body, `--text-lg` lead
paragraphs, `--text-xl` H3, `--text-2xl` H2, `--text-display` the hero and
the one statement section. Leading: 0.92 for display capitals (no
descenders to collide), 1.1 for headings, 1.55 for serif body. Tracking:
+0.02em on display capitals, +0.08em on small capital labels.

## Colour

| Role | oklch | hex | Anchor |
|---|---|---|---|
| bg | 0.975 0.008 200 | #f1f8f9 | tile, faded to a wall |
| surface | 0.93 0.022 195 | #d8edec | tile |
| tile (band) | 0.86 0.05 190 | #acdcd8 | tile at full strength, one band |
| ink | 0.24 0.025 235 | #132129 | lane lines |
| ink-muted | 0.46 0.025 230 | #4a5b63 | lane lines, lighter |
| on-tile | 0.24 0.025 235 | #132129 | text on the tile band |
| on-tile-muted | 0.46 0.025 230 | #4a5b63 | captions on the tile band |
| line | 0.80 0.02 210 | #b0c2c5 | grout, decorative rules only |
| line-strong | 0.62 0.03 210 | #728b90 | form field borders |
| action | 0.55 0.19 27 | #c9302d | lane-rope red; booking buttons only |
| action-hover | 0.49 0.18 27 | #b01f1f | pressed red |
| on-action | 0.99 0.004 200 | #f9fdfd | text on red |

Provisional: the tile and lane-rope values are estimated from the
description of the building. The pool hall photograph will confirm them. If
the real tile is greener or darker, `bg`, `surface` and `tile` move with it
and the three pairs on `tile` must be checked again; if the rope red is
lighter, `action` stays at L 0.55 so the button label keeps its ratio.

Contrast (WCAG 2.2, computed):

| Pair | Ratio | Use |
|---|---|---|
| ink on bg | 15.29:1 | body text |
| ink-muted on bg | 6.60:1 | captions |
| ink-muted on surface | 5.80:1 | captions on surface |
| on-tile on tile | 10.92:1 | text in the tile band |
| on-tile-muted on tile | 4.71:1 | captions in the tile band |
| on-action on action | 5.20:1 | button label |
| on-action on action-hover | 6.69:1 | button label, pressed |
| action on bg | 4.98:1 | inline booking link |
| line-strong on bg | 3.36:1 | input borders (3:1 needed) |
| line on bg | 1.73:1 | decorative rules only, never a control edge |

Theme: light only. The baths are a daylight place and the client has no
dark material. No dark theme ships, so nothing is inverted.

## Layout

12-column grid, content max 75rem, side gutter `--space-gutter`. Text at
`--space-measure` (64ch). Spacing steps: `--space-2` to `--space-16` on a
4px base for gaps inside components and between blocks; two section
paddings, dense for logistics and open for the statement.

| Copy section | Layout |
|---|---|
| Hero | headline left on columns 1-8 in display capitals; booking button and the next start date under it; pool hall photo full-bleed below at 21:9 |
| You do not need to be able to swim | open rhythm; one statement at `--text-display`, columns 2-9; nothing else |
| What the first lesson is like | timeline set as real clock times (7:00 pm, 7:10 pm, ...) on a black lane-line rule; dense rhythm |
| The course: eight Tuesdays | full-bleed tile band; dates in a two-column list |
| Your teachers | two portraits at 4:5 beside short bios, columns 1-6 and 7-12 |
| Price and booking | one block styled as a printed ticket: price, what it includes, the button |
| Questions people ask before booking | dense; two columns on wide screens, one on phones |

Boldness: the hero headline, which shows the real place, and the "You do
not need to be able to swim" statement, which answers the must-believe
line. Everything else is quiet.

## Imagery and assets

| Visual | Ratio | Status |
|---|---|---|
| Pool hall, empty, from the shallow end | 21:9 (16:9 crop on phones) | placeholder |
| Teacher portraits x2, poolside, natural light | 4:5 | placeholder |
| Wordmark | n/a | proposal: "LOWTHER LANE" in Barlow Condensed 600 |

Request from the client:
1. Photograph of the empty pool hall from the shallow end, landscape, at
   least 2400 px wide.
2. A portrait of each teacher by the pool, 4:5, at least 1200 px wide.
3. Written permission from each teacher to publish their photo and name.
4. The school's logo as SVG, if one exists; otherwise approval of the
   typeset wordmark.

No stock swimmers or smiling-class photos: the audience would read them as
people who can already swim.

## Surfaces and details

- `--radius-none` on sections and images (tile is square);
  `--radius-control` 4px on buttons and inputs so they read as controls.
- Rules: 2px ink rules echo the lane lines; 1px `--color-line` elsewhere.
- No shadows: the page is flat like a painted wall.
- No icons: every item already has a word or a time.

## Motion and 3D intent

none. The audience is anxious, and nothing on the page should move unless
they ask it to. The page is complete as static.
```

## tokens.css

```css
/* Lowther Lane Swim School. Reasons for each value are in direction.md. */
:root {
  --color-bg: #f1f8f9;
  --color-surface: #d8edec;
  --color-tile: #acdcd8;
  --color-ink: #132129;
  --color-ink-muted: #4a5b63;
  --color-on-tile: #132129;
  --color-on-tile-muted: #4a5b63;
  --color-line: #b0c2c5;
  --color-line-strong: #728b90;
  --color-action: #c9302d;
  --color-action-hover: #b01f1f;
  --color-on-action: #f9fdfd;

  --font-display: "Barlow Condensed", "Arial Narrow", sans-serif;
  --font-text: "Source Serif 4", Georgia, serif;

  --text-sm: 0.875rem;
  --text-base: 1.0625rem;
  --text-lg: 1.3125rem;
  --text-xl: 1.625rem;
  --text-2xl: clamp(2rem, 1.4rem + 2.5vw, 3.5rem);
  --text-display: clamp(3rem, 1.25rem + 7vw, 7.5rem);
  --text-leading-display: 0.92;
  --text-leading-heading: 1.1;
  --text-leading-body: 1.55;
  --text-tracking-caps: 0.02em;
  --text-tracking-label: 0.08em;

  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;
  --space-gutter: clamp(1rem, 0.5rem + 2.5vw, 2.5rem);
  --space-section-dense: clamp(3rem, 2rem + 4vw, 5rem);
  --space-section-open: clamp(5rem, 2.5rem + 10vw, 11rem);
  --space-measure: 64ch;
  --space-content-max: 75rem;

  --radius-none: 0;
  --radius-control: 4px;
}

@supports (color: oklch(0 0 0)) {
  :root {
    --color-bg: oklch(0.975 0.008 200);
    --color-surface: oklch(0.93 0.022 195);
    --color-tile: oklch(0.86 0.05 190);
    --color-ink: oklch(0.24 0.025 235);
    --color-ink-muted: oklch(0.46 0.025 230);
    --color-on-tile: oklch(0.24 0.025 235);
    --color-on-tile-muted: oklch(0.46 0.025 230);
    --color-line: oklch(0.8 0.02 210);
    --color-line-strong: oklch(0.62 0.03 210);
    --color-action: oklch(0.55 0.19 27);
    --color-action-hover: oklch(0.49 0.18 27);
    --color-on-action: oklch(0.99 0.004 200);
  }
}
```

## What came from where

The hue of every neutral is the tile's. The ink is the lane line. The one
loud colour is the lane rope, and it has one job. The display face is the
painted depth marking. The number of faces, the absence of a mono face, the
missing dark theme and the `none` motion intent each have a reason in the
subject or the audience. A different client gives different anchors, so it
gives different values, and possibly a different number of faces, a dark
theme, or a named motion moment.
