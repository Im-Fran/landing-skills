# Typography

Read this at step 4 of the process, after the direction is written.

## Contents

- How to choose
- Licences and sources
- Pairings by tone
- Overused faces and what to use instead
- Scale
- Measure, leading and tracking
- Font loading notes
- Recording the decision

## How to choose

1. Take the tone from the direction you wrote, not from the product category.
   A developer tool can be warm and editorial; a bakery can be exact and
   technical. The tones below are a vocabulary, not a mapping from category.
2. Pick the display face first. It carries the anchor: the condensed
   capitals of a sign, the high contrast of a printed label, the even strokes
   of a technical drawing. Write one sentence on what in the subject it
   echoes.
3. Pick a text face that differs from the display in classification: a serif
   with a sans, or a grotesque with a humanist sans. Two faces that look alike
   read as a mistake. One family used for everything is also a real choice
   (Stripe and Pentagram load a single family), but then the weight and size
   contrast has to do the work, and you write that down.
4. Add a mono face only if the page shows text whose meaning depends on fixed
   character widths: code, commands, terminal output, aligned technical
   values. A mono companion was on 14 of 30 well-made landing pages studied,
   nearly all of them developer tools or studios, where code is the content.
   Counts, prices, dates and times do not need a mono face: use the text
   face's tabular figures (`font-variant-numeric: tabular-nums`).
5. Check the licence before you commit (next section).

How many faces is a decision, with a reason written in `direction.md`:

- One family when the copy has one register and the family has the range
  (weights, widths, optical sizes) to separate headline from body.
- Two faces when the display face carries an anchor that would tire or blur
  at body size, or the page has long passages that need a calmer text face.
- Three only when a mono face earns its place by the rule in point 4.

Display plus text plus mono is not the default shape. Three weights per
family is enough. More families cost load time and blur the voice.

When a pairing below fits the tone, use it. When none fits, choose another
face from the same sources, and record its source and licence in
`direction.md` the same way.

## Licences and sources

| Source | Terms as the research found them | What you do |
|---|---|---|
| Google Fonts | All families open source; commercial use allowed, including in products that are sold. Most are SIL Open Font License, some Apache or Ubuntu Font Licence. | Note "open licence, check the family page" in `direction.md`. The per-family licence is on the family's page. |
| SIL Open Font License 1.1 | Use, embed, modify and redistribute, including bundled with software that is sold. The font cannot be sold on its own. Modified versions cannot use a Reserved Font Name. | Safe to self-host. Keep the licence file with the font files. |
| Fontshare (Indian Type Foundry) | Free for personal and commercial use. Families are under the ITF Free Font License or SIL OFL. Self-hosting and redistribution terms could not be confirmed on a first-party page. | Tell the user to read the licence on Fontshare before shipping self-hosted files. Say so in `direction.md`. |
| Velvetyne | The foundry states all its fonts are libre and open source for personal and commercial work, with credit to the designer and foundry. The licence of each font was not confirmed. | Open the font's own page and confirm its licence before use. Credit the designer. |
| Collletttivo | SIL OFL; personal and commercial use in print and digital. | Safe to self-host. |
| The League of Moveable Type | Free and open source, SIL OFL, commercial use allowed. | Safe to self-host. |
| Fontsource | npm packages of open-source fonts for self-hosting. It states no licence of its own. | Check the licence of the font inside the package. |
| Paid foundries (Klim, Pangram Pangram, Commercial Type, Grilli Type, Dinamo, Colophon, Production Type) | Web licences are paid and usually metered. Terms were not confirmed. | Use only if the client already holds a web licence. Write that the user must confirm it. |

When Fontshare carries a family that is also on Google Fonts (Space Grotesk,
Epilogue, Familjen Grotesk), use the Google Fonts or OFL copy.

Newsreader is published by Production Type and released on Google Fonts. The
Google Fonts release is open; the foundry's paid origin does not change that.

## Pairings by tone

Every face below was confirmed to exist at its source. "Seen on" names live
sites whose stylesheets loaded the display face when the research scanned
them; "none confirmed" means no live site was found, so do not cite one.

Google Fonts rows carry an open licence (most are OFL); check the family
page. Fontshare rows marked ITF FFL carry the ITF Free Font License: tell the
user to confirm the self-hosting terms on Fontshare before shipping.

### Technical and precise

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| IBM Plex Sans / IBM Plex Mono | Google Fonts, open | Railway, Val Town | engineered, even strokes |
| Archivo / JetBrains Mono | Google Fonts, open | Railway, Bun | Archivo has a width axis: wide for display, normal for text |
| Space Mono / Hanken Grotesk | Google Fonts, open | Arc | mono as display, for a terminal or spec-sheet voice |
| Geist / Geist Mono | Google Fonts, open | Vercel | flagged default: use only for a developer tool with a written reason and a distinctive layer elsewhere |

### Warm and editorial

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Fraunces / Newsreader | Google Fonts, open | Kiel Foods | both have an optical size axis. Fraunces is on the "tasteful free" list: justify it |
| Instrument Serif / Instrument Sans | Google Fonts, open | Raycast, Warp | flagged default: justify before use. Instrument Serif has one weight |
| Newsreader / Source Sans 3 | Google Fonts, open | Print (printmag) | long reading |
| Zodiak / General Sans | Fontshare, ITF FFL | Rive | General Sans is already common on Fontshare |
| Gambetta / Switzer | Fontshare, ITF FFL | Switzer on Framer and Every; Gambetta none confirmed | |

### Luxurious

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Libre Caslon (Text or Display) / Public Sans | Google Fonts, open | Framer | classical, restrained |
| Cormorant Garamond / Hanken Grotesk | Google Fonts, open | none confirmed | delicate at large sizes only |
| Bodoni Moda / Albert Sans | Google Fonts, open | none confirmed | optical size axis; high contrast for labels and fashion |
| Playfair Display / Source Sans 3 | Google Fonts, open | none confirmed | the stock "luxury" serif: prefer Bodoni Moda or Libre Caslon unless you have a reason |

### Playful

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Bricolage Grotesque / Figtree | Google Fonts, open | Zen Browser, Supahub | axes for optical size, width and weight |
| Fredoka / Nunito | Google Fonts, open | none confirmed | rounded; children's and casual products |
| Caprasimo / Outfit | Google Fonts, open | none confirmed | heavy display, use few words |
| Shrikhand / DM Sans | Google Fonts, open | none confirmed | script-like display, headings only |

### Utilitarian

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Public Sans / IBM Plex Mono | Google Fonts, open | Nuxt | plain and civic |
| Barlow Condensed / Barlow | Google Fonts, open | Bram.us | one superfamily; width contrast does the work |
| Atkinson Hyperlegible / Source Serif 4 | Google Fonts, open | none confirmed for Atkinson | high legibility text needs |

### Craft or artisanal

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Young Serif / Hanken Grotesk | Google Fonts, open | none confirmed | rarely used, so it does not read as a default |
| Fanwood / League Spartan | League of Moveable Type, OFL | the foundry's own site | |
| Borges / Ronzino | Collletttivo, OFL | Ronzino on the foundry's site | |

### Institutional

| Display / text | Source, licence | Seen on | Notes |
|---|---|---|---|
| Source Serif 4 / Source Sans 3 | Google Fonts, open | Gwern.net (Source Serif) | |
| Lora / Lato | Google Fonts, open | The New Yorker | Lato is ubiquitous: pair it only with a reason |
| Cabinet Grotesk / Satoshi | Fontshare, ITF FFL | Cabinet Grotesk on Freshysites; Satoshi on Framer, Trigger.dev | Satoshi is Fontshare's most viewed family and is becoming a default |

### Experimental

Velvetyne's catalogue (Gulax, Ouroboros, Compagnon, Jgs Font, among others)
suits art, music and event pages. Confirm each font's licence on its own page
before use and credit the designer.

### On Fontshare

The most viewed Fontshare families (Satoshi, Clash Display, General Sans) are
already common on generated and template pages. When a Fontshare face fits,
look first at less used ones: Zodiak, Gambetta, Erode, Boska, Sentient,
Switzer.

### Serif display on a technical product

A serif display on a developer or business product is a real option, and
several well-made pages use one (Resend, Notion, Cursor, Oura). Their faces
are licensed or custom. Free faces that serve the same role: Source Serif 4,
Newsreader, Libre Caslon.

## Overused faces and what to use instead

A face is a tell when it is the unconsidered default. The research separates
three cases.

Always a tell:

- The system stack (`system-ui`, `-apple-system`, Segoe UI) or Arial,
  Helvetica or Roboto as the only face. It shows no typeface was chosen.
- A family named in CSS that is never loaded. The page renders in the
  fallback and the decision never reaches the visitor.

A tell unless justified: Georgia or Times New Roman as the chosen face.
They are installed fallbacks, and unguided agents in this skill's test
reached for Georgia when they wanted "a serif" without choosing one. Use one
only with a reason from the subject (a client whose printed material is set
in it, for example), and write it down.

A tell unless justified (Inter, Geist, Space Grotesk, Instrument Serif,
Fraunces). These are the faces commentary names as the defaults of generated
pages, and Space Grotesk, Geist and Instrument Serif recur as a set. They
are a tell when:

- one of them is both the display and the text face,
- it has no mono or distinct display companion,
- no reason is recorded, or
- two or more of them appear together, worse with a cream and terracotta
  palette.

They are acceptable when chosen for a reason, paired, and backed by other
decisions in scale, tracking, palette and layout. Linear, Raycast and Ghost
set headlines in Inter with a mono face or a display cut; Vercel uses its own
Geist as its brand face.

Ubiquitous, flag at lower weight (Poppins, Montserrat, Lato, Open Sans,
Playfair Display): very common on the web, so they read as unchosen. Use
them only with a reason.

| Instead of | Try | Keeps |
|---|---|---|
| Inter | Hanken Grotesk, Albert Sans; IBM Plex Sans; Public Sans | neutral UI sans; engineered; institutional |
| Roboto | Public Sans, Source Sans 3 | plain sans |
| Arial, Helvetica | Switzer (Fontshare), Hanken Grotesk | Swiss-style neutral |
| Open Sans | Source Sans 3, Figtree | humanist, friendly |
| Poppins | Outfit, Plus Jakarta Sans; General Sans (Fontshare) | geometric |
| Montserrat | Archivo, Libre Franklin | wide, sturdy |
| Lato | Nunito, Source Sans 3 | soft or plain |
| Space Grotesk | Bricolage Grotesque, Familjen Grotesk, Schibsted Grotesk | quirky grotesk |
| Geist, Geist Mono | IBM Plex Sans and Plex Mono; JetBrains Mono | technical |
| Instrument Serif | Newsreader, Gloock; Fraunces only with a reason | display serif with contrast |
| Playfair Display | Bodoni Moda, Libre Caslon Text, Cormorant Garamond | high-contrast serif |

DM Sans, Plus Jakarta Sans and Manrope are popular but have no evidence as
AI tells. Use them freely when they fit, and still write the reason.

The "try" column is not a new default list. If you reach for the first item
in every row on every project, you have rebuilt the problem. Choose from the
direction.

## Scale

- Pick one ratio between 1.2 and 1.333 and six or seven steps. Drive the large
  steps with `clamp()` between a phone and a desktop size.
- The hero headline should be at least 2.5 times the body size. On the
  well-made pages studied, headlines of 1 to 8 words were 64 to 96px on
  desktop; longer statements were 42px or smaller.
- Starting values below are a synthesis, not sourced measurements. Check them
  by eye with the real copy, at 360px and 1440px wide.

| Role | Size | Line height | Tracking |
|---|---|---|---|
| Hero display | `clamp(2.75rem, 1.5rem + 5vw, 6rem)` | 0.95 to 1.05 | -0.02em to -0.04em |
| H2 | `clamp(2rem, 1.4rem + 2.5vw, 3.5rem)` | 1.05 to 1.15 | -0.01em to -0.02em |
| H3, lead | 1.25 to 1.5rem | 1.25 to 1.35 | -0.005em |
| Body | 1rem minimum; 1.0625 to 1.125rem for editorial | 1.5 to 1.6 sans, 1.45 to 1.55 serif | 0 |
| Caption | 0.8125 to 0.875rem | 1.4 | +0.005em |
| All-caps label | 0.6875 to 0.8125rem | 1.2 | +0.06em to +0.12em |
| Mono | 0.875 to 0.95em of body | 1.5 | 0 |

Condensed faces tolerate larger hero sizes; wide faces need smaller ones.
Tight negative tracking suits large sans headlines; most serifs need less.

Write the hero size for the real headline. Test that it does not break into
an orphan last word at 1280 and 1440px. If it does, change the size or the
column width rather than the copy.

## Measure, leading and tracking

- Measure: 45 to 90 characters per line; aim for 62 to 72ch for body text.
  Set `max-width` in `ch` on text blocks.
- Body leading: 120 to 145 percent of the size is the print guideline. The
  starting values above use 1.45 to 1.6 for body text on screen; judge by eye
  with the real face. Headings 0.95 to 1.15.
- Capitals and small labels need positive tracking. Large headlines usually
  need slightly negative tracking.
- Set `text-wrap: balance` on headings. It is supported in current Chrome,
  Safari and Firefox; older browsers ignore it, which is harmless.
- Use faces with an optical size axis (`opsz`) where you can: Fraunces,
  Newsreader, Source Serif 4, Bricolage Grotesque, Bodoni Moda, Literata.
  `font-optical-sizing: auto` is the default and adjusts the design to the
  size.
- Do not split a headline into one span per letter for animation without an
  accessible label on the heading; screen readers and text extraction break.

## Font loading notes

`landing-skills:landing-build` does the loading. Record what it needs:

- Which files: family, weights, styles, and whether a variable file is worth
  it. A variable file replaces several static files but is usually larger
  than one. Use it when you load three or more weights or styles of a family.
- Format WOFF2 only. Subset to the characters the page uses. When the page is
  not in English, check that every accented letter renders in the subset.
- Preload only the one or two files used above the fold, with `crossorigin`.
  Preloading more competes with the hero image.
- `font-display: swap` for the text face, with a fallback metric-matched by
  `size-adjust`, `ascent-override`, `descent-override` and
  `line-gap-override` on a local `@font-face`, so the swap does not shift
  layout. `optional` for a decorative display face when layout stability
  matters more than the face appearing on a slow first visit.
- Self-hosting is not faster by itself; it helps with a CDN and HTTP/2, and it
  gives privacy and version pinning. Google Fonts' CSS endpoint is fine when
  there is no strict budget.

In `tokens.css`, a font token is a stack: the chosen face, then a local
fallback with similar width, then the generic family.

```css
:root {
  --font-display: "Bricolage Grotesque", "Arial Narrow", sans-serif;
  --font-text: "Figtree", "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

A system face as a fallback in the stack is fine. It is a tell only when it
is the face you chose.

## Recording the decision

In `direction.md`, the typography table has one row per face: role, face,
source, licence (with a "confirm at the source" note where the licence is
unconfirmed), weights, and why it fits the anchors. Then the scale as token
names and what each is for. Example row for a different client:

| Role | Face | Source | Licence | Weights | Why |
|---|---|---|---|---|---|
| Display | Zodiak | Fontshare | ITF Free Font License; confirm self-hosting terms on Fontshare before shipping | 700 | sharp wedge serifs echo the client's engraved brass plates |
