# Colour

Read this at step 5 of the process, after the direction and the anchors are
written.

## Contents

- Why OKLCH
- Method: from the subject to a palette
- Tinted neutrals
- The accent and its one job
- Cream, paper and other warm grounds
- Dark mode designed on purpose
- Contrast: the pass or fail test
- Writing the tokens (text tokens per ground, dark theme skeleton)
- Browser support and fallbacks

## Why OKLCH

`oklch(L C H)` has three numbers: lightness L from 0 to 1, chroma C from 0
(grey) to about 0.37 on current screens, and hue H from 0 to 360. Hue 0 is
near magenta and about 41 is red, so HSL hue numbers do not carry over.

L is perceptually even across hues, which HSL's lightness is not. That lets
you build ramps where step 5 of the accent and step 5 of the neutral look
equally light, and change hue without the colour jumping in brightness.

OKLCH L is still not a contrast ratio. See "Contrast" below.

## Method: from the subject to a palette

1. Take the one to three anchors from `direction.md`: a material, a product
   colour, a place, a document. Estimate each as OKLCH and write the three
   numbers down. If a photo or logo exists, sample it. If not (the brief
   gives only names such as a colourway or a material, or a description),
   estimate from them and mark the value provisional in `direction.md`.
   Write which asset will confirm it, and what changes if the real colour
   differs: which tokens move, and which contrast pairs must be checked
   again.
2. Choose the brand hue from the dominant anchor. Do not start in the
   indigo and violet region (hue about 260 to 290) unless the subject is that
   colour or the brand requires it. That region is the most common default of
   generated pages, from Tailwind's indigo buttons.
3. Build the neutral ramp in the same hue (or the warm or cool partner of the
   accent) with low chroma. See "Tinted neutrals".
4. Build the accent ramp: 9 to 12 steps, L from about 0.97 down to 0.15. Put
   peak chroma in the middle of the ramp, at L 0.55 to 0.70, and reduce it
   towards both ends. Peak chroma about 0.12 to 0.20 for a calm brand, up to
   0.22 to 0.25 for a loud one. For comparison, Tailwind's blue-500 is
   `oklch(62.3% 0.214 259.815)`.
5. Give success, warning and danger their own hues at the same L steps as the
   accent, so they sit at the same visual weight. Landing pages often need
   only danger (form errors) and success (form sent).
6. Assign roles. A 12-step ramp maps well to roles: steps 1 and 2 page
   backgrounds, 3 to 5 component backgrounds (rest, hover, pressed), 6 to 8
   borders, 9 and 10 solid fills, 11 low-contrast text, 12 high-contrast text.
   A landing page usually needs eight to twelve colour tokens in total. Name
   tokens by role (`--color-ink`, `--color-action`), not by hue, so
   `landing-skills:landing-build` never has to guess.

Starting L steps for a 12-step ramp, a synthesis to adjust by eye:
0.98, 0.95, 0.91, 0.86, 0.79, 0.71, 0.62, 0.53, 0.44, 0.35, 0.26, 0.18.

Hover and pressed states can come from the token with relative colour
syntax, and tints from `color-mix()`. Both belong in the build CSS behind
`@supports`, since relative colour reaches fewer browsers:

```css
@supports (color: oklch(from red l c h)) {
  .button:hover { background: oklch(from var(--color-action) calc(l - 0.06) c h); }
}
.notice { background: color-mix(in oklch, var(--color-action) 12%, var(--color-bg)); }
```

When the state matters for contrast (a pressed button with text on it),
write it as its own token and check its ratio, as the worked example in
`SKILL.md` does with `--color-action-hover`.

### A worked derivation

Subject: a signal-maintenance contractor whose crews wear graphite overalls
and paint trackside markers in signal yellow. Anchors: graphite (hue 250, a
cool grey) and signal yellow (hue 95).

| Role | oklch | hex | Note |
|---|---|---|---|
| bg | 0.97 0.006 250 | #f2f5f9 | graphite hue, barely tinted |
| ink | 0.25 0.02 250 | #1a222b | 14.66:1 on bg |
| ink-muted | 0.48 0.02 250 | #555f69 | 5.98:1 on bg |
| marker (fill) | 0.84 0.15 95 | #e9c944 | large yellow fills; ink on it is 9.80:1 |
| marker-text | 0.50 0.11 95 | #776100 | the same hue as text on bg, 5.49:1 |

The yellow at full strength fails as text on a light ground, so the text
version drops to L 0.50 and chroma 0.11. Same hue, two jobs, two tokens.

## Tinted neutrals

Pure `#fff` and `#000` read as unconsidered next to a palette that has a
hue. Give the neutrals the brand hue at low chroma:

- Light end: C 0.004 to 0.02. Around 0.005 to 0.015 the tint is felt more
  than seen.
- Middle and dark end: up to about 0.03 to 0.045. Tailwind's slate runs
  0.003 at its lightest, 0.046 at 500 and 0.042 at 950.
- Above 0.03 on a background, it reads as a coloured page, not a neutral.
  That can be the point, but decide it.

Well-made pages keep neutral chroma tiny and the hue constant: Supabase's
dark ground is `oklch(0.19 0.0025 157.5)`, Linear's is `#08090A`, Cursor's
is a warm black `#14120B`.

## The accent and its one job

- One accent. Use it for the primary action, links, and at most one
  highlight per section. Neutrals carry everything else. The 60-30-10 split
  is a convention with no source behind it; the useful part is that the
  accent is the smallest share.
- The accent is the colour of "do this". If it also colours icons, borders,
  headings and backgrounds, it stops pointing at the action.
- No gradient as the main colour device. If the brand has a signature
  gradient (Stripe's animated canvas is one), it is a brand asset, recorded
  as such; otherwise use flat colour.
- No coloured glows, no blurred colour orbs, no coloured left border on
  cards. These fake emphasis; spacing, size and a plain rule do it honestly.
- A shadow, if any, is tinted with the ink colour, for example
  `0 1px 2px oklch(0.25 0.02 250 / 0.12)`, and used only on elements that
  really sit above others. A black shadow at 10 percent on every card is the
  framework default.
- Choose a temperature that departs from the category default when the brand
  allows. Observed: a warm brown on a mental-health page (Dawn, `#321C04`)
  where the category runs cold blue and green; a warm black on a coding tool
  (Cursor); a paper tone on an agent payments product (Agentcard,
  `#F2F1EC`) in a category that usually goes dark.

## Cream, paper and other warm grounds

Cream is not a tell by itself. Aesop (`#FFFEF2`), Agentcard, PostHog
(`#EEEFE9`) and Arc (`#FFFCEC`) use warm paper grounds, each for a reason in
the brand.

The tell is the bundle chosen from a fashionable list: cream background,
terracotta accent and Instrument Serif or Fraunces as the display face. It is
the second-order default that agents reach for when told to avoid the purple
look. Most unguided test pages for this skill also landed on cream with one
dark green or terracotta accent.

The separator is derivation. Use a warm ground when you can name the anchor
it comes from (the client's paper stock, undyed linen, a limewashed wall),
and record it in OKLCH. The accent follows the same rule: terracotta is fine
when it was derived from the subject, with the reason recorded, and a preset
when it was not. If you cannot name the anchor, the ground is a preset.

## Dark mode designed on purpose

Ship a dark theme only when the brand or the audience calls for it. Notion
commits to light, Linear to dark; both are fine. A dark theme made by
inverting the light one is a tell, and so is permanent dark mode with
medium-grey body text.

When you design one, design it as a second palette:

1. Keep the same hues.
2. Background L 0.15 to 0.20 with C 0.01 to 0.02 in the neutral hue. Avoid
   pure black.
3. Raise each elevation level (cards, menus) by L +0.02 to +0.04. Lighter
   surfaces show depth; shadows barely read on dark.
4. Body text L 0.90 to 0.93, not pure white. Secondary text L 0.72 to 0.78.
5. Accent: reduce chroma by 10 to 25 percent and raise L by 0.05 to 0.12, so
   it keeps contrast without glowing.
6. Re-check every pair. Do not assume the light theme's ratios carry over.

The graphite example above, as a dark theme:

| Role | oklch | hex | Contrast |
|---|---|---|---|
| bg | 0.18 0.014 250 | #0d1218 | |
| surface (one level up) | 0.21 0.015 250 | #13191f | |
| ink | 0.92 0.008 250 | #e1e5ea | 14.85:1 on bg |
| ink-muted | 0.75 0.012 250 | #a8afb5 | 8.46:1 on bg, 7.97:1 on surface |
| marker | 0.88 0.12 95 | #f0d777 | 13.14:1 on bg; chroma cut 20 percent |
| (rejected) grey text | 0.55 0.012 250 | #6c7278 | 3.88:1: fails body text |

In CSS, put the dark values in a `@media (prefers-color-scheme: dark)` block
that redefines the same `--color-*` tokens on `:root`. The build sets
`color-scheme: light dark` on the page so form controls follow. Support for
`light-dark()` was not confirmed by the research; the media query is the safe
route. "Writing the tokens" below shows how the dark block fits the
hex-first pattern.

## Contrast: the pass or fail test

WCAG 2.2 ratios decide pass or fail:

- Normal text: at least 4.5:1 (SC 1.4.3).
- Large text, at least 18pt (24px) or 14pt (about 18.7px) bold: at least 3:1.
- Controls and meaningful graphics (input borders, focus rings, icons that
  carry meaning) against what is next to them: at least 3:1 (SC 1.4.11).
- Do not round: 4.499:1 fails.
- Exempt: decoration, disabled controls, logotypes, incidental text.

APCA is a draft for WCAG 3, and the draft says the contrast algorithm is not
settled. You may look at APCA as an extra design check; it is not the test.

OKLCH lightness is not a contrast ratio. The same L gives different ratios
on different grounds and at different hues. Computed examples:

| Neutral grey at L | on white | on black |
|---|---|---|
| 0.40 | 9.21:1 | 2.28:1 |
| 0.50 | 6.00:1 | 3.50:1 |
| 0.55 | 4.85:1 | 4.33:1 |
| 0.60 | 3.95:1 | 5.32:1 |
| 0.70 | 2.67:1 | 7.86:1 |

Chromatic colours at C 0.15 on white: at L 0.55, hue 30 gives 5.22:1, hue
145 gives 4.56:1 and hue 260 gives 4.93:1, so all pass, hue 145 by a hair.
At L 0.60 the same hues give 4.23:1, 3.71:1 and 4.00:1, and all fail for
body text. Compute every pair.

### How to check

Save this as a scratch file (outside the user's project) and run it with
Node. It converts OKLCH to sRGB and prints the WCAG 2.2 ratio and the hex
value to use as the fallback.

```js
// contrast.mjs: node contrast.mjs "oklch(0.25 0.02 250)" "oklch(0.97 0.006 250)"
function toLinearSrgb(str) {
  const [L, C, H] = str.match(/[\d.]+/g).map(Number);
  const l = L > 1 ? L / 100 : L; // accepts 0.62 or 62%
  const a = C * Math.cos((H * Math.PI) / 180);
  const b = C * Math.sin((H * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ].map((v) => Math.min(1, Math.max(0, v))); // clipped: out-of-gamut colours are approximate
}
const luminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
const hex = (rgb) => '#' + rgb.map((v) => {
  const s = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  return Math.round(s * 255).toString(16).padStart(2, '0');
}).join('');
const [fg, bg] = process.argv.slice(2).map(toLinearSrgb);
const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
const ratio = (hi + 0.05) / (lo + 0.05);
console.log(`${hex(fg)} on ${hex(bg)}: ${ratio.toFixed(2)}:1`,
  ratio >= 4.5 ? 'passes 4.5:1 (body text)' : ratio >= 3 ? 'passes 3:1 only (large text, UI parts)' : 'fails');
```

It takes `oklch()` values with plain numbers (no `none`, no `from`). Values
with very high chroma may be outside sRGB; the script clips them, so treat
their ratio as approximate and pull chroma down. Once the page is built,
confirm with the browser's devtools contrast readout on the real rendering.

Record every pair you will use in the contrast table of `direction.md`,
including the pairs that fail and are kept only for decoration, with the
reason.

## Writing the tokens

Hex values first on `:root`, then the `oklch()` values in an `@supports`
block. Two declarations of one custom property in the same rule do not give a
fallback: the custom property takes the last value whether or not the
browser can use it as a colour.

```css
:root {
  --color-bg: #f2f5f9;
  --color-ink: #1a222b;
}
@supports (color: oklch(0 0 0)) {
  :root {
    --color-bg: oklch(0.97 0.006 250);
    --color-ink: oklch(0.25 0.02 250);
  }
}
```

### Text tokens for each ground

Every ground that carries text gets its own text token, named
`--color-on-<ground>`: `--color-on-surface`, `--color-on-band`,
`--color-on-action`. Add `--color-on-<ground>-muted` if captions sit there
too. The value may equal `--color-ink`; the separate name still matters,
because it tells `landing-skills:landing-build` which colour goes on which
ground, and it keeps a background token from being used as a text colour on
a dark or coloured band. Each pair gets a computed ratio in the contrast
table of `direction.md`.

```css
:root {
  --color-band: #1a222b;
  --color-on-band: #e1e5ea;
  --color-on-band-muted: #a8afb5;
}
```

Computed: on-band on band 12.62:1, on-band-muted on band 7.19:1.

### With a dark theme

Each block gets its own dark section. Order matters: inside `@supports`, the
dark rule comes after the light one so it wins in dark mode.

```css
:root {
  --color-bg: #f2f5f9;
  --color-ink: #1a222b;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: #0d1218;
    --color-ink: #e1e5ea;
  }
}
@supports (color: oklch(0 0 0)) {
  :root {
    --color-bg: oklch(0.97 0.006 250);
    --color-ink: oklch(0.25 0.02 250);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: oklch(0.18 0.014 250);
      --color-ink: oklch(0.92 0.008 250);
    }
  }
}
```

A browser without `oklch()` uses the first two blocks. A browser with it
reads all four in order, and the last matching block wins.

## Browser support and fallbacks

Figures from caniuse, read on 2026-10-04:

| Feature | Chrome, Edge | Safari | Firefox | Global |
|---|---|---|---|---|
| `oklch()` | 111 | 15.4 | 113 | 94.25% |
| `color-mix()` | 111 | 16.2 | 113 | 93.91% |
| Relative colour syntax | 131 | 18.0 | 133 | 92.29% |

About 6 percent of visitors need the hex fallback for `oklch()`, and about 8
percent cannot use relative colour. Hence hex first, and `@supports` around
anything relative.
