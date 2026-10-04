# 03 - Typography and colour research

Research date: 2026-10-04. Conventions: every claim carries a URL (full list in `## Sources`, numbered [S1]...). `unverified` means I could not confirm it on a primary page. "Scan" means a script I ran on 2026-10-04 that fetched a site's homepage plus up to 8 linked stylesheets and looked for the family name in `font-family` declarations or Google Fonts `family=` URLs. A scan hit proves the name is in the site's CSS, not that it is the visible heading face (it may be a fallback or an unused rule).

## Scope

Covered: (1) typeface sources with licences that allow commercial web use, (2) 26 pairings by tone, (3) faces that mark a page as templated or generated, (4) numeric typesetting and font-loading guidance, (5) OKLCH palette method, tinted neutrals, accent proportion, (6) dark mode designed on purpose, (7) contrast (WCAG 2.2, APCA status), (8) browser support for `oklch()`, `color-mix()`, relative colour syntax.

Method and limits:
- Face existence was checked against machine-readable catalogues, not specimen pages: Google Fonts metadata JSON [S2] (1,950 families, queried 2026-10-04) and the Fontshare API [S6] (it returned 100 families, `has_more: false`).
- The Fontshare, Google Fonts FAQ, Velvetyne-home and Collletttivo-home pages are JavaScript-rendered, so the fetch tool returned little. Licence lines come from the sources named per row; gaps are marked `unverified`.
- Contrast numbers marked "computed" are my own calculation (Oklab to linear sRGB to WCAG 2.x relative luminance). They are indicative and should be re-run by whatever tool the skill ships.
- I used plain HTTP requests (curl or Python) in addition to the web fetch tool, to read JSON catalogues and CSS. No browser automation was used.

## Findings

### 1. Typeface sources and licences

| Source | Licence terms (one line) | Licence page |
|---|---|---|
| Google Fonts (fonts.google.com) | All fonts open source and free; commercial use allowed including in a product that is sold; most common licence is SIL OFL, some Apache or Ubuntu Font Licence. Catalogue metadata flags `isOpenSource: true` for every family I queried [S2]. | https://developers.google.com/fonts/faq [S3] (content seen via search result; direct fetch returned only a redirect shell) |
| SIL Open Font License 1.1 (what most open sources use) | Use, study, copy, embed, modify, redistribute; may be bundled with software and sold with it, but the font cannot be sold by itself; modified versions cannot use a Reserved Font Name. | https://openfontlicense.org/open-font-license-official-text/ [S4] |
| Fontshare (Indian Type Foundry) | "100% free for personal and commercial use", "in any media, at any scale, and in any location worldwide"; fonts are under an ITF EULA, not open source [S5]. API reports `license_type`: 64 families `itf_ffl` (ITF Free Font License), 36 `sil_ofl` [S6]. Self-hosting is described by secondary sources only (`unverified` on a first-party page). Resale and redistribution on other font platforms are not allowed (secondary source, `unverified`). | Page exists at https://www.fontshare.com/terms but is client-rendered and returned no text; terms text `unverified` first-hand. Best first-party statement: https://www.indiantypefoundry.com/news/introducing-fontshare [S5] |
| Velvetyne | "All the fonts hosted on Velvetyne are libre and open-source... true for all personal and commercial works"; credit designer and foundry; modifications must stay under the same open licence [S10]. Specific licence per font (OFL assumed) is `unverified`. | https://velvetyne.fr/about/ [S10] |
| Collletttivo | OFL; "users can use our fonts for both personal and commercial projects on any printed and digital media" [S12]. Repo example (Ronzino) is OFL 1.1 [S13]. | https://www.collletttivo.it/licensing [S12] |
| The League of Moveable Type | "free & open source, available to use commercially and subject to the Open Font License" [S14]. | https://www.theleagueofmoveabletype.com/ [S14] |
| Fontsource (self-hosting packages) | Packages open-source fonts as npm dependencies for self-hosting; docs give no licence details, check each font's own licence [S15]. | https://fontsource.org/docs/getting-started/introduction [S15] |
| Paid foundries (examples, paid, not verified for terms): Klim (klim.co.nz), Pangram Pangram, Commercial Type, Grilli Type, Dinamo, Colophon, Production Type | Web licences are paid and typically metered; terms `unverified` (the licensing pages I tried returned 404). Typewolf says Klim exists as a foundry listing [S45 context]. | Not verified |

Notes:
- Redistribution of third-party files: Fontshare lists families that also exist on Google Fonts (e.g. Space Grotesk, Epilogue, Familjen Grotesk) [S6]. For those, prefer the Google Fonts or OFL copy.
- Newsreader is released by Production Type and is on Google Fonts [S2][S46 context]; a "paid foundry" origin does not imply a paid licence for the Google Fonts release.

### 2. Pairings by tone (26)

Columns: display / text, source, licence, live site using the display face. "scan" = verified by the scan above; "unverified" = I did not find a live site. Existence on source confirmed for every row in the Google Fonts metadata [S2] or Fontshare API [S6], except where noted. Default licence for the Google Fonts rows is OFL or other open licence per [S3] (per-family licence field not in the metadata; `unverified` per family).

Technical and precise
1. IBM Plex Sans / IBM Plex Mono. Google Fonts. OFL (per [S3]). railway.com (scan: IBM Plex, JetBrains Mono), val.town (scan: IBM Plex).
2. Archivo (width axis `wdth`) / JetBrains Mono. Google Fonts. railway.com and bun.sh (scan: Archivo on bun.sh).
3. Space Mono / Hanken Grotesk. Google Fonts. arc.net (scan: Space Mono, both CSS and Google Fonts URL).
4. Geist / Geist Mono. Google Fonts (both present, [S2]). vercel.com (scan: Geist). Caution: Geist is named as an AI-default (section 3). Use only when the brief is a developer tool and the page adds a distinctive layer elsewhere.

Warm and editorial
5. Fraunces (axes `opsz,wght,SOFT,WONK`) / Newsreader (`opsz,wght`). Google Fonts. kielfoods.com (scan: Fraunces). Specimen by designers: https://fraunces.undercase.xyz/ (scan: Fraunces).
6. Instrument Serif (single weight) / Instrument Sans (`wdth,wght`). Google Fonts. raycast.com and warp.dev (scan: Instrument Serif). Caution: Instrument Serif appears in the "same combos" lists (section 3).
7. Newsreader / Source Sans 3. Google Fonts. printmag.com (scan: Newsreader).
8. Zodiak / General Sans. Fontshare, ITF FFL (`license_type: itf_ffl` for both, [S6]). rive.app (scan: Zodiak).
9. Gambetta / Switzer. Fontshare, ITF FFL [S6]. Display face live site: unverified. Switzer: framer.com and every.to (scan).

Luxurious
10. Libre Caslon (Text or Display) / Public Sans. Google Fonts (Libre Caslon Text exists, [S2]). framer.com (scan: Libre Caslon).
11. Cormorant Garamond / Hanken Grotesk. Google Fonts. Live site unverified.
12. Bodoni Moda (axes `opsz,wght`) / Albert Sans. Google Fonts. Live site unverified.
13. Playfair Display / Source Sans 3. Google Fonts. Live site unverified named; one source claims 3.7M websites use it [S46] (claim `unverified`, also a tell, see section 3).

Playful
14. Bricolage Grotesque (`opsz,wdth,wght`) / Figtree. Google Fonts. zen-browser.app and supahub.com (scan: Bricolage). Landing examples list: https://www.lapa.ninja/typeface/bricolage-grotesque/ [S48].
15. Fredoka (`wdth,wght`) / Nunito. Google Fonts. Live site unverified.
16. Caprasimo / Outfit. Google Fonts (Caprasimo category Display). Live site unverified.
17. Shrikhand / DM Sans. Google Fonts. Live site unverified.

Utilitarian
18. Public Sans / IBM Plex Mono. Google Fonts. nuxt.com (scan: Public Sans).
19. Barlow Condensed / Barlow. Google Fonts. bram.us (scan: Barlow, both CSS and Google Fonts URL).
20. Atkinson Hyperlegible / Source Serif 4. Google Fonts. Live site unverified for Atkinson; gwern.net uses a Source Serif (scan).

Craft or artisanal
21. Young Serif / Hanken Grotesk. Google Fonts (Young Serif, popularity rank 572, i.e. rarely used, [S2]). Live site unverified.
22. Fanwood / League Spartan. The League of Moveable Type, OFL [S14]. theleagueofmoveabletype.com (scan: Fanwood, League Spartan).
23. Borges (serif) / Ronzino (sans). Collletttivo, OFL [S12][S13]. collletttivo.it (scan: Ronzino). Borges listed on the foundry home page [S11].

Institutional
24. Source Serif 4 / Source Sans 3. Google Fonts. gwern.net (scan: Source Serif).
25. Lora / Lato. Google Fonts (Lato is also in the overused list on popularity grounds). newyorker.com (scan: Lora and Lato).
26. Cabinet Grotesk / Satoshi. Fontshare, ITF FFL [S6]. freshysites.com (scan: Cabinet Grotesk); Satoshi on framer.com and trigger.dev (scan). Satoshi is Fontshare's most-viewed family (108,818 views in the API response [S6]), so it is becoming a tell of its own; treat as a "mid-risk" choice.

Experimental option (not scored): Velvetyne families named on its home page (Gulax, Ouroboros, Compagnon, Jgs Font) [S9]. Licence per font `unverified`; read the font's own page before use.

Count: 26 pairings (4 technical, 5 editorial, 4 luxurious, 4 playful, 3 utilitarian, 3 craft, 3 institutional).

### 3. Overused faces that mark a page as templated or generated

Two kinds of evidence exist, and they must not be mixed: (a) statistics on ubiquity, (b) designer commentary on AI-generated pages. No authoritative dataset ranks the fonts used by AI coding tools; one article says so explicitly [S37].

Statistics (ubiquity, HTTP Archive Web Almanac 2024, share of pages, desktop/mobile) [S1]: Roboto 15.2%/2.7%, Open Sans 5.6%/6.8%, Poppins 4.7%/5.8%, Montserrat 3.3%/3.9%, Lato 3.2%/3.8%. Inter was 1% and "expected to rise into the top 10". On Google Fonts' own popularity rank (1 = most popular) [S2]: Roboto 2, Open Sans 2, Poppins 2, Montserrat 2, Lato 2, Inter 5, Plus Jakarta Sans 6, Raleway 7, Outfit 8, Instrument Serif 9, DM Sans 12, Space Grotesk 15, Playfair Display 16, Manrope 30. My scan of ~120 homepages found Inter in the CSS of ghost.org, resend.com, cal.com, supabase.com, astro.build, deno.com, notion.com, mozilla.org, shopify.com, wise.com, hono.dev, clerk.com, remix.run, vite.dev and others (caveat: could be fallback entries).

Commentary on AI-default typography:
- Anthropic's own frontend-design skill text: "Avoid generic fonts like Arial and Inter" and "NEVER converge on common choices (Space Grotesk, for example)" [S39].
- "Almost always Inter is their primary type choice" [S38]; Inter "the safest possible answer" [S40]; Inter used "for everything, especially the centered hero headline", and the "same font combos over and over: Space Grotesk, Instrument Serif, and Geist" [S41].
- Inter and Geist named as the recurring faces of vibe-coded apps; Geist's prevalence is attributed to Next.js documentation examples [S37].
- Per-font one-liners: Roboto "Android-system default"; Arial/Helvetica "fallback of fallbacks"; Space Grotesk "the model's 'edgy default'"; Open Sans "Bootstrap-era default" [S42] (a marketplace blog; weaker evidence than [S39]).

Table (family names exactly as they appear in CSS and in Google Fonts URLs). "Tier A" = named in commentary, safe to flag. "Tier B" = ubiquity statistics only, flag at lower weight. "Tier C" = my inference from popularity rank, `unverified` as an AI tell, do not flag by default.

| Family (CSS) | Google Fonts URL form | Tier | Evidence | Alternatives that keep its strength |
|---|---|---|---|---|
| Inter | `family=Inter` | A | [S38][S39][S40][S41][S1] | Hanken Grotesk or Albert Sans (neutral UI sans); IBM Plex Sans (engineered); Public Sans (institutional) |
| Roboto | `family=Roboto` | A/B | [S42][S1] | Public Sans, Source Sans 3 |
| Arial / Helvetica | system | A | [S39][S42] | Switzer (Fontshare) or Hanken Grotesk as a Swiss-style neutral |
| Open Sans | `family=Open+Sans` | A/B | [S42][S1] | Source Sans 3, Figtree (humanist, friendly) |
| Poppins | `family=Poppins` | B | [S1] | Outfit or Plus Jakarta Sans (geometric); General Sans (Fontshare) |
| Montserrat | `family=Montserrat` | B | [S1] | Archivo (wider, sturdier) or Libre Franklin |
| Lato | `family=Lato` | B | [S1] | Nunito (rounded) or Source Sans 3 |
| Space Grotesk | `family=Space+Grotesk` | A | [S39][S41][S42] | Bricolage Grotesque, Familjen Grotesk, Schibsted Grotesk (quirky grotesk) |
| Geist, Geist Mono | `family=Geist`, `family=Geist+Mono` | A (tool/dev context less so) | [S37][S41] | IBM Plex Sans / Plex Mono; JetBrains Mono |
| Instrument Serif | `family=Instrument+Serif` | A (as part of the Space Grotesk / Instrument Serif / Geist set) | [S41] | Newsreader, Fraunces, Gloock (display serif with contrast) |
| Playfair Display | `family=Playfair+Display` | B (inferred: "luxury" default, 3.7M-site claim `unverified` [S46]; Typewolf lists it as a "Display Serif" pick [S44]) | [S44][S46] | Bodoni Moda, Libre Caslon Text, Cormorant Garamond |
| DM Sans | `family=DM+Sans` | C | Typewolf's #1 sans pick, rank 12 [S44][S2] | Figtree, Albert Sans |
| Plus Jakarta Sans | `family=Plus+Jakarta+Sans` | C | rank 6 [S2] | Outfit, Onest |
| Manrope | `family=Manrope` | C | seen on cal.com and supabase.com in scan; rank 30 [S2] | Hanken Grotesk, Schibsted Grotesk |

Count: 14 faces listed (7 Tier A, 4 Tier B incl. Poppins, Montserrat, Lato, Playfair, 3 Tier C).

Colour tells (from commentary, not measurements):
- Indigo-to-purple gradient called "the single loudest AI tell in 2026", traced to Tailwind's default [S40]; the specific origin `bg-indigo-500` (`#6366f1`) is asserted by a blog [S43] and not verified against Tailwind source.
- "VibeCode Purple", permanent dark mode with medium-grey body text, barely-passing dark body contrast, gradients and large coloured glows, coloured left borders on cards [S41].

### 4. Practical setting guidance (numbers)

Sourced anchors:
- Measure: 45-90 characters per line including spaces [S35]. Line spacing 120-145% of the point size [S36].
- Scale: fluid scales with a ratio (minor third 1.2, major third 1.25, perfect fourth 1.333) is the Utopia method; I could not fetch the Utopia docs (404), so the ratios are `unverified` here.
- Variable fonts: 33% desktop / 34% mobile of pages use them [S1]. A variable font replaces several files but is usually larger than one static file [S16].
- `font-display`: `swap` on 44% desktop / 45% mobile pages (up from 11% in 2020); `block` 23%; preload on 11% of pages [S1]. web.dev: `optional` avoids render delay beyond 100 ms and avoids layout shift; all four of auto, block, swap, fallback can cause layout shift; preload "carefully" because it competes with other resources [S16].
- WOFF2: 30% better compression than WOFF [S16]. Latin fonts hold roughly 100-1000 glyphs; subset with subfont or glyphanger [S16].
- Fallback metrics: `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` on a local fallback `@font-face` [S19]. `size-adjust` is Baseline widely available, since September 2023 [S17]. Tools: Fontaine, `@next/font` automation [S19].
- Optical sizing: `font-optical-sizing: auto` is the default and works with fonts that have an `opsz` axis; small text gets thicker strokes and larger serifs, large text more contrast; supported since March 2020 [S18]. Families with `opsz` (checked in [S2]): Inter, Fraunces, Newsreader, DM Sans, Bricolage Grotesque, Source Serif 4, Literata, Bodoni Moda, Hedvig Letters Serif.
- `text-wrap: balance`: full support Chrome 130, Safari 17.5, Firefox 121; 92.73% global [S26].

Recommended defaults (author's synthesis, `unverified` against a source, use as starting values and check by eye):

| Role | Size (rem / clamp) | Line-height | Tracking | Notes |
|---|---|---|---|---|
| Hero display | `clamp(2.75rem, 1.5rem + 5vw, 6rem)` | 0.95-1.05 | -0.02em to -0.04em | `text-wrap: balance`; use the font's optical-size axis at max |
| H2 | `clamp(2rem, 1.4rem + 2.5vw, 3.5rem)` | 1.05-1.15 | -0.01em to -0.02em | |
| H3 / lead | 1.25-1.5rem | 1.25-1.35 | -0.005em | |
| Body | 1rem (16px) minimum, 1.0625-1.125rem for editorial | 1.5-1.6 (sans), 1.45-1.55 (serif) | 0 | measure `max-width: 62ch` to 72ch |
| Caption / small | 0.8125-0.875rem | 1.4 | +0.005em | |
| All-caps label / eyebrow | 0.6875-0.8125rem | 1.2 | +0.06em to +0.12em | caps need positive tracking |
| Monospace | 0.875-0.95em of body | 1.5 | 0 | |

Rules:
- One display face + one text face, at most one mono. Three weights per family is plenty.
- Scale: pick one ratio (1.2-1.333) and 6-7 steps, drive them with `clamp()` between a min and max viewport; the heading jump from body should be at least 2.5x on a landing hero.
- Preload only the one or two WOFF2 files used above the fold (typically display regular + text regular), with `crossorigin`; everything else loads lazily. Keep `font-display: swap` for the text face with a metric-matched fallback; use `optional` for decorative display faces if layout stability matters more than the face appearing.
- Self-host (Fontsource or downloaded WOFF2) rather than the Google Fonts CSS endpoint when the page has a strict performance budget; web.dev warns self-hosting only helps with a CDN and HTTP/2 [S16], and Fontsource lists privacy and offline benefits [S15].

### 5. Colour: building a palette in OKLCH

Facts:
- `oklch(L C H / A)`: L 0-1 or 0-100%, C 0-0.4 (100% = 0.4), H 0-360 with 0 near magenta and about 41 near red (different from HSL) [S20].
- OKLCH lightness is perceptually consistent across hues, unlike HSL `L`; practical chroma on current displays stays below about 0.37 in both sRGB and P3; out-of-gamut values are mapped by the browser [S31].
- Tailwind v4's default palette is OKLCH: blue-50 `oklch(97% 0.014 254.604)`, blue-500 `oklch(62.3% 0.214 259.815)`, blue-950 `oklch(28.2% 0.091 267.935)`; slate-50 `oklch(98.4% 0.003 247.858)`, slate-500 `oklch(55.4% 0.046 257.417)`, slate-950 `oklch(12.9% 0.042 264.695)` [S32]. These give real anchors for the shape of a ramp: lightness spans about 0.97 to 0.13, chroma is low at the extremes and peaks mid-scale, hue drifts a few degrees across the ramp.
- Radix's 12-step roles: 1-2 backgrounds, 3-5 component backgrounds (normal/hover/pressed), 6-8 borders, 9-10 solid fills, 11 low-contrast text, 12 high-contrast text; steps 11 and 12 are guaranteed Lc 60 and Lc 90 (APCA) on a step 2 background of the same scale [S33].

Method (derive from the subject, not a preset):
1. Extract 1-3 anchors from the subject itself: a product photo dominant colour, a material (oak, brass, ink, clay), a logo, a place. Convert to OKLCH. Record L, C, H.
2. Pick the brand hue `H` from the dominant anchor. Do not start from Tailwind indigo/violet (hue about 260-290) unless the subject really is that colour; that region is the AI-default [S40][S43].
3. Neutral ramp: use the same `H` (or the warm/cool complement of the accent), chroma 0.004-0.02 at the light end, up to about 0.03-0.045 in the mid and dark end (compare slate: 0.003 at 50, 0.046 at 500, 0.042 at 950 [S32]). A tint of 0.005-0.015 is felt, not seen; above 0.03 reads as a coloured background.
4. Accent ramp: 9-12 steps, L from about 0.97 to 0.15 (Tailwind anchors above), peak chroma at L 0.55-0.70 limited to about 0.12-0.20 for a calm brand and up to 0.22-0.25 for a loud one (blue-500 is 0.214 [S32]); reduce chroma toward both ends rather than keeping it constant.
5. Semantic colours (success, warning, danger) get their own hues but the same L steps as the accent so they sit at equal visual weight.
6. Set the ramp as custom properties, derive states with relative colour: `oklch(from var(--accent) calc(l - 0.06) c h)` for hover, `color-mix(in oklch, var(--accent) 12%, var(--bg))` for tints [S21][S22].

Suggested L steps (author's synthesis, `unverified`): 0.98, 0.95, 0.91, 0.86, 0.79, 0.71, 0.62, 0.53, 0.44, 0.35, 0.26, 0.18.

Accent use and proportion: a 60-30-10 style split (neutral surfaces / secondary / accent) is conventional but I found no first-party source; mark `unverified`. Practical rule for landing pages: one accent, used for the primary action, links, a single highlight per section; neutrals carry everything else. Avoid gradients as the main colour device [S40][S41].

Dark mode designed on purpose:
- Material guidance: use dark grey (#121212) surface rather than pure black, desaturate accents, express elevation with lighter surface overlays, target high text contrast (15.8:1 cited) [S34]. The page was fetched through a summariser; details are `unverified` beyond those lines.
- Radix ships a separate dark scale for each hue rather than inverting the light one; the step meanings are the same in both [S33].
- Method for a purposeful dark theme: (a) keep the same hues; (b) background L about 0.15-0.20 with C 0.01-0.02 in the neutral hue; (c) raise surfaces by +0.02 to +0.04 L per elevation level; (d) body text L about 0.90-0.93 (not 1.0), secondary text L about 0.72-0.78; (e) pull accent chroma down 10-25% and raise L 0.05-0.12 so it keeps contrast without glowing; (f) re-check every pair, do not assume.
- Computed (own calculation, neutral C 0.01 hue 260): bg L 0.18 with text L 0.93 gives 15.3:1, L 0.80 gives 10.1:1, L 0.75 gives 8.5:1, L 0.70 gives 7.0:1.
- Anti-patterns named by commentary: permanent dark mode with medium-grey body text, barely passing dark body contrast, large coloured glows [S41].
- Use `prefers-color-scheme` and `color-scheme`; `light-dark()` support: `unverified` (the caniuse page did not return a support table) [S49].

Contrast:
- WCAG 2.2 SC 1.4.3: 4.5:1 normal text, 3:1 large text (at least 18 pt or 14 pt bold); exempt: inactive controls, decoration, logotypes, incidental text; do not round (4.499 fails) [S27].
- SC 1.4.11 Non-text contrast: 3:1 for UI components and graphical objects against adjacent colours; do not round (2.999 fails) [S28].
- APCA: the WCAG 3 draft (W3C Working Draft, 10 September 2026) says the contrast algorithm "is yet to be determined" and that it "assumes the algorithm will include a size/weight factor"; requirements will differ from the draft [S30]. Visual-contrast work was moved out of the draft in July 2023 and APCA is draft guidance, not a standard; Roselli's advice is to conform to WCAG 2 contrast or document the deviation [S29]. Therefore: WCAG 2.2 ratios are the pass/fail test; APCA Lc may be used as an extra design check (Radix uses Lc 60/90 targets [S33]).
- OKLCH L is not the WCAG ratio. Computed (own calculation, neutral grey on white / on black): L 0.40 gives 9.21 / 2.28; L 0.50 gives 6.00 / 3.50; L 0.55 gives 4.85 / 4.33; L 0.60 gives 3.95 / 5.32; L 0.65 gives 3.23 / 6.49; L 0.70 gives 2.67 / 7.86. Chromatic colours at C 0.15, L 0.55 on white: hue 30 gives 5.22, hue 145 gives 4.56, hue 260 gives 4.93; at L 0.60: 4.23, 3.71, 4.00. Consequence: on white, text of L at most about 0.55 passes AA for neutral and for these chromatic cases, but hue 145 at L 0.60 fails. Always compute the real ratio; do not rely on L difference alone.

Browser support (caniuse, global share and versions seen on 2026-10-04):
| Feature | Chrome / Edge | Safari | Firefox | Global | Source |
|---|---|---|---|---|---|
| `oklch()` | 111 | 15.4 | 113 | 94.25% | [S23]; MDN: Baseline widely available since May 2023 [S20] |
| `color-mix()` | 111 | 16.2 | 113 | 93.91% | [S24]; MDN: widely available since May 2023 [S21] |
| `color()` function | 111 | 15 | 113 | 94.49% | [S47] |
| Relative colour syntax | 131 | 18.0 | 133 | 92.29% | [S25]; MDN page lists syntax and `@supports (color: hsl(from white h s l))` test [S22] |
| `size-adjust` | Baseline widely available (since Sept 2023) | | | | [S17] |
| `text-wrap: balance` | 130 (partial 114+) | 17.5 | 121 | 92.73% | [S26] |
| `light-dark()` | unverified | | | | [S49] |

Fallback policy: provide a sRGB hex `color`/`background` first, then the `oklch()` declaration, or wrap relative-colour rules in `@supports (color: oklch(from red l c h))`. Relative colour at 92% global means about 8% of users need the fallback.

### Cross-document resolutions

- Typefaces (vs 01, 02). "Tier A" in section 3 means the face is named in commentary as an AI default, not that it is wrong on a crafted page. Resolved position (shared with 02): a face is a tell on its own only as a sole system/Arial/Roboto stack or an unloaded font; Inter, Geist, Space Grotesk, Instrument Serif and Fraunces are tells when left as the unconsidered default (sole display and text face, no mono or distinct display companion, no recorded reason, or several of the "tasteful free font" set together). 01 measured Inter paired with a mono or display cut on Linear, Raycast and Ghost, and Geist as a brand face on Vercel pages; that is the acceptable case. This document's own pairings 4 (Geist / Geist Mono) and 6 (Instrument Serif / Instrument Sans) and the Fraunces alternative for Instrument Serif are therefore "justify before use", not endorsements. Note the Instrument Serif alternatives list (Newsreader, Fraunces, Gloock) should not be read as safe from the same effect: Fraunces is named alongside Instrument Serif in the funboy322 repo (https://github.com/funboy322/avoid-ai-design).
- Palettes (vs 01, 02). Tinted neutrals and warm paper tones (section 5, method step 3) are good practice when derived from the subject and recorded as OKLCH. 02 flags cream only as the bundle cream + terracotta accent + fashionable display serif chosen from a list. Separator: derivation from the subject plus a non-default accent. Do not use warm paper as a preset.
- Browser support (vs 05). No feature appears in both documents' support tables, so there is no numeric conflict. The sources differ: this document uses caniuse global shares and first versions, 05 uses MDN browser-compat-data 8.1.4. Do not merge numbers across the two tables; where a feature is added to both, cite the BCD floor and the caniuse share separately and note any gap (05 already records such a gap for view transitions and `prefers-reduced-motion`). `text-wrap: balance` is the one near-overlap: the table above (caniuse) gives Chrome 130 / Safari 17.5 / Firefox 121; checked in this review, BCD `css.properties.text-wrap-style` (https://github.com/mdn/browser-compat-data/blob/main/css/properties/text-wrap-style.json) gives Chrome 130, Safari 17.5, Firefox 124. Chrome and Safari agree; Firefox differs (121 caniuse vs 124 BCD for `text-wrap-style`; the `balance` value entry itself was not read). Quote "Firefox 121-124" or avoid the Firefox number; balance is progressive enhancement either way.
- Motion/reduced motion: not covered here; follow 05.

## Implications for skills

### skills/landing-art-direction/references/typography.md

- Open with the process, not a list: pick a tone first (technical, warm/editorial, luxurious, playful, utilitarian, craft, institutional), then a pairing from section 2, then confirm it fits the subject. Provide the 26-pairing table with source, licence and live-site reference; mark rows without a verified site so agents do not cite them as proof.
- State the licence rule: only fonts from Google Fonts (OFL/open), Fontshare (ITF FFL, free commercial use), Velvetyne, Collletttivo, League of Moveable Type, Fontsource packages. Any paid-foundry face must be flagged as paid, and the agent must not use it without a licence. Do not claim self-hosting is allowed for ITF FFL without the user checking the Fontshare terms (`unverified`).
- Tier A list as defaults to justify, not absolute bans: Roboto, Arial/Helvetica and Open Sans as the sole face are rejected; Inter, Space Grotesk, Geist and Instrument Serif are accepted only with a recorded reason and a companion face (mono or distinct display), and the combination Space Grotesk + Instrument Serif + Geist is rejected [S39][S41]. Poppins, Montserrat, Lato: avoid as unchosen defaults [S1]. Show the alternatives column of section 3.
- Rule: a display face and a text face must differ in classification (serif + sans, or grotesque + humanist), and the page may use at most one display face, one text face, one mono.
- Numbers to include: measure 45-90 ch (target 62-72 ch) [S35], leading 120-145% for body [S36], headings 0.95-1.15, tracking table from section 4 (marked as starting values), scale ratio 1.2-1.333, `clamp()` for hero.
- Optical sizing: prefer families with `opsz` for display/text pairs (Fraunces, Newsreader, Source Serif 4, Bricolage Grotesque) and leave `font-optical-sizing: auto` [S18]. Use `text-wrap: balance` on headings, noting 92.73% support [S26].
- Fontshare note: the most popular Fontshare families (Satoshi, Clash Display, General Sans) are already common [S6]; choose less-viewed ones (Zodiak, Gambetta, Erode, Boska, Sentient, Switzer) when possible.

### skills/landing-art-direction/references/colour.md

- Require deriving the palette from the subject: extract 1-3 anchors, record OKLCH, choose hue from the subject, not from `indigo/violet 260-290` defaults [S40][S43].
- Provide the method of section 5: tinted neutrals (C 0.004-0.02 light end, up to about 0.045 mid/dark end, using slate as the reference [S32]), accent ramp shape (L 0.97 to 0.15, chroma peak at mid-L, 0.12-0.25 depending on brand loudness), 12-step role map (Radix: 1-2 bg, 3-5 components, 6-8 borders, 9-10 solid, 11-12 text) [S33].
- Warm paper or tinted backgrounds are fine when derived from the subject; reject the preset bundle of cream background + terracotta accent + Instrument Serif/Fraunces display (see 02).
- Accent: one accent, one primary action colour; no gradient as the main device; no coloured glows; no coloured left-border cards [S41].
- Dark mode: a written dark spec, not `filter: invert`: bg L 0.15-0.20, +0.02-0.04 L per elevation, body L 0.90-0.93, accent chroma reduced 10-25% [S34][S33]. Ban medium-grey body text in dark and barely-passing contrast [S41].
- Contrast table: WCAG 2.2 4.5:1 text, 3:1 large text and UI [S27][S28]; APCA is optional extra and not a pass/fail criterion [S29][S30].
- Output format: CSS custom properties in `oklch()` with sRGB hex fallbacks first; use `color-mix(in oklch, ...)` and relative colour only with `@supports` fallbacks, support numbers from the table [S23][S24][S25].

### skills/landing-build/references/performance.md

- Fonts: WOFF2 only [S16]; subset to Latin (Google Fonts serves subsets; for self-hosted use Fontsource packages [S15] or subfont/glyphanger [S16]); load at most 2 families and 3-4 files; use a variable file when 3 or more weights/styles of one family are used [S16].
- `font-display`: `swap` for body text (44% of desktop pages do this [S1]), `optional` where layout stability beats the face appearing; never `block` except icon fonts [S1][S16].
- Preload: only the one or two above-the-fold WOFF2 files, with `crossorigin`; only 11% of pages preload [S1], and over-preloading steals bandwidth [S16].
- CLS: define a local fallback `@font-face` with `size-adjust`, `ascent-override`, `descent-override`, `line-gap-override` matched to the web font; Fontaine and framework font loaders automate it [S19][S17].
- Self-host decision: self-hosting is not automatically faster; needs CDN and HTTP/2 [S16]; gains in privacy and version pinning [S15].
- Colour: `oklch()` and `color-mix()` need no runtime; no JS theming; one `prefers-color-scheme` block with custom properties.

### skills/landing-review/scripts/tells.mjs

Which faces are safe to flag as overused. Use the exact strings below for CSS `font-family` matching (case-insensitive, ignore quotes) and for Google Fonts URL matching (`family=` parameter; `+` encodes space; match up to `:` or `&`).

Flag as high-confidence tells (Tier A). Severity depends on context, per the cross-document resolution: a lone Inter or Geist used with a mono or distinct display face is informational; unpaired, sole display and text face, or combined with other Tier A faces is a flag:
- CSS `Inter` (also `Inter Variable`, `InterVariable`, `Inter Tight` suggested to treat as same family, `unverified` for those variants); Google Fonts `family=Inter`
- CSS `Roboto`; `family=Roboto`
- CSS `Arial`, `Helvetica`, `Helvetica Neue` as the first named family (not as a trailing fallback)
- CSS `Open Sans`; `family=Open+Sans`
- CSS `Space Grotesk`; `family=Space+Grotesk`
- CSS `Geist`, `Geist Mono`; `family=Geist`, `family=Geist+Mono`; flag at lower weight when the page is a developer tool
- CSS `Instrument Serif`; `family=Instrument+Serif`; flag at higher weight when also combined with Space Grotesk or Geist on the same page

Flag as medium-confidence (Tier B, ubiquity not provenance):
- CSS `Poppins`; `family=Poppins`
- CSS `Montserrat`; `family=Montserrat`
- CSS `Lato`; `family=Lato`
- CSS `Playfair Display`; `family=Playfair+Display`

Do not flag by default (Tier C, no evidence they are AI tells): `DM Sans` (`family=DM+Sans`), `Plus Jakarta Sans` (`family=Plus+Jakarta+Sans`), `Manrope` (`family=Manrope`). They can be reported as informational only.

Implementation notes for the script:
- A fallback list entry is not a use: apply tells to the first family in the `font-family` stack and to `@font-face` names and Google Fonts URLs, not to the tail. My scan could not distinguish them, which is why scan hits are marked as caveated.
- Frameworks may rename families (next/font generates its own family name; Fontsource variable packages use names ending in `Variable`); these renamings are `unverified`, so also match the Google Fonts URL or `src` file name (`inter`, `roboto`, `geist`).
- A page that uses only the Tier A face for both display and text is the strongest signal [S38][S40]; two Tier A faces together is stronger still [S41].
- Colour tells to add next to fonts: indigo/violet `#6366f1` family or an indigo-to-purple gradient as the hero fill [S40][S43]; coloured glows and coloured left borders on cards [S41].

## Sources

- [S1] HTTP Archive Web Almanac 2024, Fonts chapter: https://almanac.httparchive.org/en/2024/fonts
- [S2] Google Fonts metadata (families, axes, popularity, isOpenSource): https://fonts.google.com/metadata/fonts
- [S3] Google Fonts FAQ (licensing, commercial use): https://developers.google.com/fonts/faq
- [S4] SIL Open Font License 1.1 official text: https://openfontlicense.org/open-font-license-official-text/
- [S5] Indian Type Foundry, Introducing Fontshare: https://www.indiantypefoundry.com/news/introducing-fontshare
- [S6] Fontshare API (families, license_type, views): https://api.fontshare.com/v2/fonts
- [S7] The Brand Identity, free fonts and ITF/Monotype/CoType: https://the-brandidentity.com/insight/whats-the-deal-with-free-fonts-and-when-can-you-use-them-we-asked-itf-monotype-and-cotype
- [S8] Fontshare terms (client-rendered, no text retrieved): https://www.fontshare.com/terms
- [S9] Velvetyne home: https://velvetyne.fr/
- [S10] Velvetyne about / licensing statement: https://velvetyne.fr/about/
- [S11] Collletttivo home (font list): https://www.collletttivo.it/
- [S12] Collletttivo licensing: https://www.collletttivo.it/licensing
- [S13] Ronzino repository (OFL 1.1): https://github.com/collletttivo/ronzino
- [S14] The League of Moveable Type: https://www.theleagueofmoveabletype.com/
- [S15] Fontsource introduction: https://fontsource.org/docs/getting-started/introduction
- [S16] web.dev, Best practices for fonts: https://web.dev/articles/font-best-practices
- [S17] MDN, size-adjust: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/size-adjust
- [S18] MDN, font-optical-sizing: https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing
- [S19] Chrome for Developers, Improved font fallbacks: https://developer.chrome.com/blog/font-fallbacks
- [S20] MDN, oklch(): https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- [S21] MDN, color-mix(): https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- [S22] MDN, Relative colors: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors
- [S23] Can I use, oklch: https://caniuse.com/mdn-css_types_color_oklch
- [S24] Can I use, color-mix: https://caniuse.com/mdn-css_types_color_color-mix
- [S25] Can I use, relative colors: https://caniuse.com/css-relative-colors
- [S26] Can I use, text-wrap: balance: https://caniuse.com/css-text-wrap-balance
- [S27] WCAG 2.2 Understanding 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- [S28] WCAG 2.2 Understanding 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- [S29] Adrian Roselli, WCAG3 Contrast as of April 2026: https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html
- [S30] W3C WCAG 3.0 Working Draft: https://www.w3.org/TR/wcag-3.0/
- [S31] Evil Martians, OKLCH in CSS: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- [S32] Tailwind CSS colors (OKLCH values): https://tailwindcss.com/docs/colors
- [S33] Radix Colors, Understanding the scale: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- [S34] Material Design 2, Dark theme: https://m2.material.io/design/color/dark-theme.html
- [S35] Practical Typography, Line length: https://practicaltypography.com/line-length.html
- [S36] Practical Typography, Line spacing: https://practicaltypography.com/line-spacing.html
- [S37] Fontlark, Why vibe-coded apps keep using the same fonts: https://fontlark.com/fonts-vibe-coded-apps-use/
- [S38] Pimp my Type, AI design has no soul: https://pimpmytype.com/ai-design-has-no-soul-but-typography-makes-it-whole/
- [S39] Frontend Design skill text (Anthropic) as mirrored: https://webdeveloper.com/skills/anthropic/frontend-design/
- [S40] 925 Studios, AI slop design tells: https://www.925studios.co/blog/ai-slop-design-tells
- [S41] Developers Digest, AI design slop: https://www.developersdigest.tech/blog/ai-design-slop-and-how-to-spot-it
- [S42] aiskill.market, Banning Inter: https://aiskill.market/blog/banning-inter-the-font-tell
- [S43] prg.sh, Why your AI keeps building the same purple gradient website: https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- [S44] Typewolf, 40 best Google Fonts: https://www.typewolf.com/google-fonts
- [S45] Klim Type Foundry (context for paid foundries; terms not verified): https://klim.co.nz/in-use/typewolf/
- [S46] WPLook, serif fonts for WordPress (3.7M-site claim, unverified): https://wplook.com/serif-fonts/
- [S47] Can I use, CSS color() function: https://caniuse.com/css-color-function
- [S48] Lapa Ninja, Bricolage Grotesque landing pages: https://www.lapa.ninja/typeface/bricolage-grotesque/
- [S49] Can I use, light-dark(): https://caniuse.com/css-light-dark
- Fraunces specimen by designers (scan-verified): https://fraunces.undercase.xyz/
- Fonts In Use, Fraunces: https://fontsinuse.com/typefaces/121631/fraunces
- Live sites scanned (homepage CSS, 2026-10-04): https://kielfoods.com, https://raycast.com, https://warp.dev, https://rive.app, https://framer.com, https://every.to, https://trigger.dev, https://vercel.com, https://railway.com, https://val.town, https://bun.sh, https://arc.net, https://printmag.com, https://zen-browser.app, https://supahub.com, https://nuxt.com, https://bram.us, https://gwern.net, https://www.newyorker.com, https://www.freshysites.com, https://collletttivo.it, https://theleagueofmoveabletype.com
