# Reference landings: what well-made pages do, and what they leave out

## Scope

Date: 2026-10-04.

Covered: 31 live pages opened in a real browser (chrome-devtools tools): 30 numbered entries in Findings plus Arc (arc.net), which was studied by script only and is listed in Sources but not numbered. The 30 numbered entries are SaaS/dev tools (16, including the early-product pages Lightfield, Billow and Agentcard), physical product (6), studio/agency (4), waitlist (2: Wabi, Dawn), event (2). All counts in Findings are over the 30 numbered entries. Two pages were opened and excluded (frame.work, riseplasma.com). Sources of candidates: product companies known for craft (Linear, Stripe, Vercel, Apple, Teenage Engineering, Aesop, Pentagram, Locomotive, Lusion, basement.studio) plus a waitlist gallery (a1.gallery) and a roundup of waitlist pages (LaunchList). Land-book, Godly, Awwwards, Siteinspire, Minimal Gallery and Lapa Ninja were NOT opened as galleries; I did not verify gallery membership of any page. "Well made" here is my judgement plus reputation, not gallery acceptance.

Method per page: loaded the URL, then ran a script in the page that read (a) `document.fonts` entries with status `loaded` and the computed `font-family`/`font-size` of the `h1` (these are the reliable typeface evidence), (b) computed `background-color` and `color` of `body` (reliable for base palette only), (c) the `h2` texts in DOM order (a proxy for section order), (d) large images/video/canvas/svg in the first 900px (what the hero shows), (e) the first ~200 characters of body text.

Limits, stated plainly:
- I did NOT take or view screenshots. Hero descriptions come from DOM media elements and text, not from looking at pixels. Anything about visual feel (layout, colour accents) is therefore `unverified` unless a computed value is quoted.
- Accent colours were not read for most pages. "Palette" lists base background and text only. Where body background is transparent (rgba 0,0,0,0) the real background is on a wrapper and is not recorded.
- Section order is the `h2` order, so pages that use images/marquees/logo strips as sections without headings are under-described (`unverified` for those parts).
- Font names are the CSS `font-family` / `@font-face` names. Foundry attributions in brackets are from my general knowledge and are marked `unverified`.
- Pages are served per locale/geo: Stripe (es-us), Cursor (Spanish), Nothing (Spanish/UK), Oura (es) were redirected. Content is the same product but copy was in Spanish.
- frame.work returned a bot-check page ("Un momento...") and was not studied. Rise Plasma (riseplasma.com) shows a "temporarily paused" notice and is excluded from the count and from the analysis.
- Each page was a single point-in-time load; marketing pages rotate (Stripe, Apple, Vercel, Notion change frequently).

## Findings

### Per-page entries

Format: URL | type | section order (h2 sequence) | typefaces (loaded) | palette (body bg / text) | hero shows | brand-specific.

**SaaS / developer tools**

1. https://linear.app/ | SaaS | hero "The product development system for teams and agents"; intro "A new species of product tool..."; Intake and integrations; Planning and monitoring; AI and automations; Build, review, and ship; Changelog; "Built for the future. Available today." | Inter Variable (headings and body), Berkeley Mono | #08090A bg (rgb 8,9,10), #F7F8F8 text | h1 at 64px; 39 images, 228 inline SVGs, no video, no canvas, so the product UI is drawn as image/SVG | a "Changelog" section on the home page, and feature sections named after the work stage rather than feature names. Dark neutral near-black with almost no chroma.
2. https://stripe.com/es-us | SaaS | Soluciones flexibles para cada modelo de negocio; La columna vertebral del comercio internacional; Impulsamos a empresas de todos los tamanos; Infraestructura confiable y extensible para cada pila de software; (closing "¿Que sucede?") | sohne-var (single family) | transparent body bg (wrapper not read), black text | CANVAS (the animated gradient) plus a wave image; h1 44px; CTAs "Primeros pasos" and "Crear cuenta con Google" | Signature animated gradient canvas as the only decoration, single typeface family, a sign-up shortcut (Google) as the secondary CTA. Foundry Klim `unverified`.
3. https://www.notion.com/ | SaaS | h1 "Where teams and agents Think together."; AI where your team works; Bring everything into one system of record; Get answers, instantly-with citations; Keep work moving 24/7 with agents; Trusted by teams that ship; Get started today | NotionInter, Lyon Text (serif) | #FFFFFF bg / rgba(0,0,0,.95) text | VIDEO plus a still image; h1 96px; CTAs "Get Notion free", "Request a demo", a "Pause" control for the video | Serif/sans pairing (Lyon Text with a custom Inter), the word "Think" set apart inside the h1, an accessible Pause control on the hero video.
4. https://vercel.com/ | SaaS | h1 "Agentic Infrastructure"; Build agents on infrastructure that thinks like them; Ship apps that scale from zero to millions instantly; (further h2s empty, so section order beyond these is `unverified`) | GeistSans, Geist Mono | #000 bg / #EDEDED text | CANVAS plus image; h1 64px; CTAs "Get your ticket" (event promo), "Deploy now", "Talk to sales" | Own typeface (Geist) used as the identity, a live event promo as the top CTA, two-word h1.
5. https://www.raycast.com/ | SaaS | "Your shortcut to everything."; Take shortcuts, not detours.; It's not about saving time.; There's an extension for that.; Meet your new virtual assistant; Built for professionals like you.; Don't repeat yourself.; Stay in the loop.; Take the short way. | Inter, JetBrains Mono, GeistMono | #07080A bg / #FFF text | CANVAS only (no static image in the first 900px); h1 64px | Section headings are written as a continuous voice that loops back to the opening ("shortcut" ... "Take the short way"), keyboard/shortcut metaphor throughout.
6. https://resend.com/ | SaaS (dev) | h1 "Email for developers"; Integrate this weekend; First-class developer experience; Test mode; Modular webhooks; Write using a delightful editor; Go beyond editing; Contact management; Broadcast analytics; Develop emails using React; Welcome to ACME, user!; Reach humans, not spam folders; Everything in your control; Beyond expectations; "Email reimagined. Available today." | domaine (serif display), inter, aBCFavorit, commitMono | #000 bg / #F0F0F0 text | Background images "Floor background", "Light ray background" and a CANVAS; h1 96px | Serif display (domaine) on a developer product is unusual for the category; long feature-by-feature scroll with one short heading each; a mono face for code.
7. https://supabase.com/ | SaaS (dev) | h1 "Build in a weekend / Scale to millions"; Postgres Database; Authentication; Edge Functions; Storage; Realtime; Vector; Data APIs; Open source from day one; "Build in a weekend, scale to millions" | Manrope, Inter, Source Code Pro | oklch(0.19 0.0025 157.5) bg / oklch(0.95 ...) text (dark, slight green hue) | product screenshots ("Supabase Postgres database", "Supabase Authentication user db rows") | Tinted-neutral dark (hue 157.5) set in oklch, headline repeated as the closing line, the product list is the structure.
8. https://posthog.com/ | SaaS | "Your product's context layer"; Ship with PostHog; Social proof; All your data, working together; Usage-based pricing; Why PostHog?; Bedtime reading; Shameless CTA | RoundHog (custom), Source Code Pro | #EEEFE9 bg (warm grey) / #000 text | hedge illustration images (light and dark variants), SVG | Cartoon-hedgehog illustration system, a section literally named "Shameless CTA", "Bedtime reading" for the blog. Voice is the differentiator.
9. https://cal.com/ | SaaS | "The better way to schedule your meetings"; With us, appointment scheduling is easy; Cal.com; Your all-purpose scheduling app; ...and so much more!; Don't just take our word for it; All your key tools in sync with your meetings; See why our users love Cal.com; Frequently asked questions; Smarter, simpler scheduling | Cal Sans, Matter (Regular/Medium/SemiBold), Roboto Mono, Inter | #F4F4F4 bg / #000 text | SVG (product mock); h1 64px; release banner "Cal.com launches v6.9" above the nav | Own display face (Cal Sans), an in-page release banner, a founder-voice testimonial section.
10. https://www.framer.com/ | SaaS | "Framer is the design agent for every step from idea to launch"; Agents that work alongside you, not instead of you; Not just vibes, a full platform; Shipped with Framer; Trusted by teams shipping big sites; Built on a community that isn't going anywhere; Your next idea starts here | GT Walsheim Medium, Inter, Input Mono, JetBrains Mono | #000 bg | VIDEO (mp4 from framerusercontent); h1 54px | "Copy logo SVG" and "Brand guidelines" right in the nav/footer; "Not just vibes" is a deliberate jab at AI-generated sites.
11. https://ghost.org/ | SaaS / publishing | "Turn your audience into a business."; EASY SITE DESIGN; ADVANCED CREATOR TOOLS; GROW YOUR AUDIENCES; RUN YOUR BUSINESS; INTEGRATIONS; Publishers; Creators; Businesses; BUILT TO LAST; LAUNCH YOUR BIG IDEA | InterVariable, InterDisplay | transparent / #000 | VIDEO of the dashboard ("dashboard.mp4"); h1 96px | Release banner "Just launched: Ghost 6.0", audience split (Publishers, Creators, Businesses), a "BUILT TO LAST" section tied to non-profit status (claim `unverified` on page).
12. https://cursor.com/ | SaaS | "Cursor es tu agente de programacion para crear software ambicioso."; trust strip; Mission Control Interface; feature rows (Trigger, View Behavior); La nueva forma de crear software.; Mantente a la vanguardia (changelog); Aspectos destacados recientes; Prueba Cursor ahora. | CursorGothic (custom), berkeleyMono, EB Garamond, Lato | #14120B bg (warm near-black) / #EDECEC text | image (product still); h1 26px (small, not display-sized) | Warm brown-black rather than blue-black, an editorial serif (EB Garamond) mixed in, a changelog block on the home page.
13. https://mercury.com/ | SaaS / fintech | "Radically different banking"; Loved by 300K+ of the most ambitious entrepreneurs; You're creating something to stand the test of time; (news items: valuation, revenue, Series C); Banking - redesigned from the ground up.; Mercury for business; Mercury for personal | arcadia / arcadiaDisplay | transparent / #000 | scroll-scrubbed VIDEO ("hero-scrub-lg.mp4") with start and end frame JPGs; h1 ~43px | Hero is a scrubbed video with explicit start/end frames, press-style milestone headlines on the page, a top banner for a new product.
14. https://lightfield.app/ | SaaS (waitlist/demo) | "CRM engineered for the future"; What customers do with Lightfield; deal-review and files panels shown as live UI (Description, Steps, Files, "Instructions - SKILL.md"); Historical ARR Growth; New business ARR; Expansion ARR; Total ARR | untitledSans, DM Mono, Inter | lab(96.5 0 0) light grey bg / lab(0 0 0 / .6) text | SVG UI mock; h1 28px | The page body is built from product-realistic UI fragments (a SKILL.md file panel, ARR chart) instead of stock imagery.
15. https://www.billow.so/ | SaaS (small studio) | "From Lead To Paid. All In One Place."; Open Invoices; Send your first invoice in under 5 minutes; One Platform for Accounting Work; Your CRM, Included.; Smart Insights.; Better Insights. Fewer Tools.; Your service business, on one screen.; Totally fair to ask. (FAQ); Protect Your Margins. Cut The Chaos. | Lastik Variable, Open Runde, Gveret Levin, Inter | #FCFDFF bg / #000 text | static image; h1 72px; top link "Try our free invoice generator" | A free tool (invoice generator) is the lead CTA; FAQ titled "Totally fair to ask."
16. https://www.agentcard.sh/ | SaaS (waitlist/Y Combinator-backed) | "Let agents buy anything online"; Powering payments for agentic startups; Explore our products; Integrates natively with the tools you use; Working with Agentcard; Frequently asked questions | Neue Haas Grotesk Display Pro (h1), Inter | #F2F1EC warm paper bg / #171818 text | CANVAS; h1 72px; "Backed by Y Combinator" strip directly under the nav | Light warm-paper palette in a category that usually goes dark; a "Skip to the product" link; investor badge placed above the fold.

**Physical product / commerce**

17. https://www.apple.com/airpods-pro/ | product | h1 "AirPods Pro 3" (small, 28px); "Buy" and "Watch the film" CTAs; subsequent h2s empty so section order `unverified` | SF Pro Display, SF Pro Text, SF Pro Icons | #FFF bg / #1D1D1F text | VIDEO plus hero start/end images of the product ("left and right wireless headphones, white color") | The product name is the h1; imagery is the product itself; there is a sticky "Buy" action.
18. https://teenage.engineering/ | product / store | no h1 and no h2 in the DOM; nav lists now, instagram, newsletter, latest, store, deals, support, designs, audio, instruments; the page leads with a product link ("APC-2") | te-20, te-40 (custom, loaded), Unicode | #FFF bg / #000 text | a single large product image | Entirely lowercase, text-index navigation, custom bitmap-style type, no hero claim at all. Cannot be mistaken for a template.
19. https://nothing.tech/ | product | "Precision de estudio en nuestros auriculares mas avanzados."; Compra por categoria; En el rodaje con V...; ?Te pasas al rosa?; Metimos a Charli xcx en una habitacion...; Por que comprar en nothing.tech; Unete a la comunidad | NType82, Ndot (dot-matrix), LatteraMono, Geist Variable | #F4F4F4 bg / #000 text | thumbnail image; h1 48px; a geo-redirect banner first | Dot-matrix display type is the brand mark itself; campaign/editorial blocks in the shop home.
20. https://www.aesop.com/ | product / commerce | "Plant-based and laboratory-made ingredients"; Complimentary samples; Curated Sets; Scents for the nose, stories for the mind; A scent-and-story-for all; Browse by category (Hand & Body, Fragrance, Home, Hair, Travel, Gifts); On sight, a sigh of relief | SuisseIntl, Zapf-Humanist | #FFFEF2 cream bg / #333 text | VIDEO and cropped photographs | Cream paper background, a humanist serif beside a Swiss sans, headings written as literature ("a sigh of relief"), samples offer above products.
21. https://fellowproducts.com/ | product / commerce | promo bar "Free US shipping on orders $75+"; Shop by category; Best Sellers; (no h1 text) | Fellow Solar (custom), Sohne, Open Sans | #FFF bg / #1E1E1F text | product photography ("Espresso Series 1", "Espresso Grinder"); an accessibility-menu link above everything | Custom display face, skip links and an accessibility menu offered first, product-first grid.
22. https://ouraring.com/es | product | "Potencia. Sutil."; Conoce tu cuerpo. Toma las riendas de tu salud.; El 86 % de los miembros de Oura notan una mejora...; Historias con impacto de nuestros miembros; Como mide Oura el sueno y valida la precision; Opciones de pago; newsletter | Editorial New (serif display), AkkuratLL | transparent / #000 | looping VIDEO; h1 96px | Two-word serif h1; a percentage claim and a "how we validate accuracy" section instead of vague trust copy.

**Studio / agency**

23. https://www.pentagram.com/ | studio | Site navigation; "See latest projects"; 8 latest Brand Identity projects; 7 latest Motion Graphics & Film; 8 latest Data Driven Experiences; 8 latest Industrial/Product Design; 8 latest Signage & Environmental Graphics; featured essay; SMCC; Eddie Opara at Common Matters | Plain (one family) | transparent / #1A1A1A | project images and carousels ("Iso Cs 01", "Sm Mosaic Rooms Carousel") | The home page is work, grouped by discipline, with no sales copy. h1 is just the name at 19px.
24. https://locomotive.ca/en | studio | h1 "Locomotive(R) Digital-first Design Agency" with emoji; "Seven Years Running"; Featured work; Extras (13); Articles; Culture; Store | LocomotiveNew (custom), HelveticaNowDisplay | transparent / #000 | VIDEO | Emoji in the h1, an agency "Store", a "Culture" section and a counter in "Extras (13)". Self-referential and plainly human.
25. https://lusion.co/ | studio | single statement "We create 3D visual storytelling and interactive web experiences that help brands stand out"; "We combine design, motion, 3D, and development..."; menu: Home, About us, Projects, Contact, Labs; newsletter | Aeonik, IBMPlexMono, LusionMono | #FFF bg | full-bleed WebGL CANVAS | The hero IS the proof of craft (WebGL), minimal text, a Labs area.
26. https://basement.studio/ | studio | nav "Home, Services, Showcase (26), People, Blog (29), Lab, Online, Press [/] to chat"; h1 "A digital studio & branding powerhouse making cool shit that performs"; Trusted by Visionaries; Featured Projects; Capabilities; Contact | Geist, Geist Mono, flauta | #000 bg / #FFF text | two CANVAS elements; h1 87px | Counts in the nav "(26)", keyboard hint "Press [/] to chat", casual profanity in the h1.

**Waitlist / pre-launch**

27. https://wabi.ai/ | waitlist | "A new kind of messenger that gets things done" (letters wrapped in separate spans, so animated per character; text extraction breaks); "Manifesto"; "Get Wabi"; repeated "Group trip" chips; "Let Wabi handle your next grand..." | LaunchKalice (serif), LaunchSelecta | #FFF bg / #191919 text | no static media in first 900px; kinetic typography | Manifesto link beside the CTA, repeated example chips ("Group trip") rather than feature bullets. Accessibility note: per-letter spans break plain-text reading (`unverified` whether aria-label is set).
28. https://www.joindawn.com/ | waitlist / health | "Your mind is always on." / "Your support should be, too."; 24/7 support for your mind; The future of mental health is proactive; Intuitive chat. Total privacy.; Personalized support. Intelligently adaptive.; Connect your day. Sync your body.; Grounded in science. Made for real life.; From the past / To the future; Real stories. Real impact. | Source Serif 4, Figtree | #321C04 (dark brown) bg and text token | SVG circle, WebM card animation, a photograph of a person in warm light | Dark-brown/warm palette in mental-health (category default is cold blue/green), serif headline, "Total privacy" as a section.
**Event**

29. https://nextjs.org/conf | event | h1 "Next.js Conf 2025" (96px); nav SPEAKERS, SESSIONS, WORKSHOPS, LOGIN; "Streamed 10/22 from San Francisco"; "Next.js 16 is available"; keynote video | GeistSans, Geist Mono | #000 bg / #EDEDED text | still of "Opening Keynote" video | Event name is the h1, date and place in one line, recording as the hero after the event.
30. https://config.figma.com/ | event | "FIGMA'S CONFERENCE FOR PEOPLE WHO BUILD PRODUCTS"; "We're heading to Bengaluru for our first-ever Config India. Applications to attend in person are now closed, b..."; footer | figmaSans | #000 bg / #E2E2E2 text | no media in first 900px (empty viewport media list) | Page states plainly that in-person applications are closed instead of a dead CTA; one-line identity. Hero media `unverified` (no image/video found by the script).

(Counting note: entries 1 to 30 are 30 distinct pages. Arc (arc.net) is the 31st page opened; it has no numbered entry, only the line in Sources. Exclusions: frame.work, riseplasma.com. An earlier draft had three placeholder entries numbered 29 to 31 that repeated pages 14 to 16; they were removed and the event pages renumbered 29 and 30.)

### Typeface evidence in numbers

Of the 30 numbered pages, loaded `@font-face` families show:
- Custom or licensed display/brand faces rather than a default system or Google face: Stripe sohne-var, Cal Sans, Cursor CursorGothic, PostHog RoundHog, Teenage Engineering te-20/te-40, Nothing NType82/Ndot, Fellow Solar, Locomotive LocomotiveNew, Lusion Aeonik, Mercury arcadia, Oura Editorial New, Framer GT Walsheim, Resend domaine, Billow Lastik, Lightfield untitledSans, Aesop SuisseIntl, Figma figmaSans, Agentcard Neue Haas Grotesk Display Pro, Notion Lyon Text.
- Inter as the headline face (not just body): Linear (Inter Variable), Raycast, Ghost (InterDisplay). All three also pair it with a mono face (Berkeley Mono, JetBrains Mono/GeistMono) or use a display cut.
- Geist (Vercel's face) used by Vercel, Next.js Conf, basement.studio, Nothing (body), Raycast (mono). Geist is free; that adopting it signals adjacency to the Vercel orbit is my opinion (`unverified`).
- A monospace secondary face appears on 14 of 30 numbered pages (Linear, Vercel, Raycast, Resend, Supabase, PostHog, Cal.com, Framer, Cursor, Lightfield, Lusion, basement, Nothing, Next.js Conf).
- Serif or serif-like display faces appear on 7 pages: Notion (Lyon Text), Resend (domaine), Cursor (EB Garamond), Oura (Editorial New), Dawn (Source Serif 4), Aesop (Zapf-Humanist, a humanist), Wabi (LaunchKalice). Cursor and Resend mix the serif with sans faces.
- Number of families per page: most use 2 (display + mono, or display + text); only Stripe and Pentagram load a single family. Framer and Cal.com load 3-4.

### Palette evidence in numbers

Of the 30 numbered pages (body background as computed):
- Near-black (#000 to #14120B): Linear, Vercel, Raycast, Resend, Supabase, Cursor, Framer, basement, Next.js Conf, Config = 10.
- Warm off-white or tinted paper rather than #FFF: PostHog #EEEFE9, Agentcard #F2F1EC, Aesop #FFFEF2, Cal.com #F4F4F4 and Nothing #F4F4F4 (neutral grey), Lightfield lab(96.5), Billow #FCFDFF (cool near-white) = 7.
- Pure white #FFF: Notion, Apple, Teenage Engineering, Fellow, Lusion, Wabi = 6.
- Brown (not blue or black): Dawn #321C04 and Cursor #14120B (warm black).
- Dark backgrounds are rarely pure black with a neon accent: Linear is 8,9,10 with text 247,248,248; Cursor is a warm black; Supabase is tinted green at oklch chroma 0.0025. Chroma on neutrals is tiny and constant hue.

### Patterns that recur across the well-made pages

1. A distinct typeface decision. Nearly every page carries either a licensed/custom face or a deliberately unusual pairing (serif display on a developer tool: Resend, Notion, Cursor; dot-matrix: Nothing; bitmap: Teenage Engineering). The exceptions (Linear, Raycast, Ghost with Inter) compensate with a mono companion and tight tracking (tracking not measured: `unverified`).
2. Large, short h1. h1 sizes: 96px (Notion, Resend, Ghost, Oura, Next.js Conf), 87px (basement), 72px (Billow, Agentcard), 64px (Linear, Vercel, Raycast, Cal.com). h1 lengths are 2 to 12 words; the longest are the agency statements.
3. Section headings are sentences with a point of view, not feature labels. Examples: "Not just vibes, a full platform" (Framer), "Shameless CTA" (PostHog), "Totally fair to ask." (Billow), "It's not about saving time." (Raycast), "On sight, a sigh of relief" (Aesop).
4. The hero shows the real thing: product UI (Linear, Lightfield, Supabase), a scrubbed product video (Mercury), a WebGL scene (Lusion, basement), the product photographed (Apple, Fellow, Teenage Engineering), or nothing but type (Config, Wabi). Stock photography of people at laptops was not found as a hero on any of the 30 numbered pages. Dawn is the only page with a person photograph and it is lit and cropped to match the palette.
5. Specific proof rather than logo walls alone: "300K+" and milestone headlines (Mercury), "86 %" and a method section (Oura), "Backed by Y Combinator" (Agentcard), changelog on the home page (Linear, Cursor).
6. A live or dated artifact on the page: release banner (Cal.com "v6.9", Ghost 6.0, Mercury Books), event CTA (Vercel "Get your ticket"), changelog (Linear, Cursor).
7. Closing section repeats or flips the opening claim: Supabase, Resend ("Email reimagined. Available today."), Linear ("Built for the future. Available today."), Raycast, Cal.com. Resend and Linear use almost the same closing sentence, which shows how quickly a good device is copied.
8. A neutral palette with a single hue family and low chroma; a warm variant is used where the category expects cold (Dawn, Cursor, Agentcard, Aesop).
9. Navigation is short (6 to 9 items) and carries the sign-in/CTA pair at the end: Linear (Customers, Pricing, Now, Contact, Docs, Open app, Log in, Sign up).
10. Brand-owned details in navigation or footer: "Copy logo SVG" and "Brand guidelines" (Framer), "Press [/] to chat" (basement), counts in parentheses (basement, Locomotive), accessibility menu first (Fellow), skip links (Agentcard, Apple, Cursor).
11. Motion is limited to the hero and one or two signature moves: canvas gradient (Stripe), scrubbed video (Mercury), kinetic letters (Wabi). The video on Notion has a visible Pause control.

### Template patterns that are absent (or rare) in these pages

Checked on the 30 numbered pages through headings and text; "absent" means not found in what the script returned, which covers h2s and the first 200 characters only, so treat as `unverified` for lower page sections.
- A three-card "icon + title + sentence" feature grid as the main section: not found in any h2 list. Sections are named after a job (Intake and integrations; Open Invoices; Test mode), not as three equal cards.
- Generic headings "Features", "Why choose us", "How it works", "Testimonials", "Our values": "Why PostHog?" and "How it works" (Dawn nav link) are the only near-matches, both rewritten to the brand.
- Purple-to-blue gradient hero with centred text and a pill badge: none. The only gradient hero is Stripe's, which is its own signature canvas.
- Stock photos of smiling teams: none seen.
- Emoji as bullets or icons in headings: only Locomotive, and there it is a deliberate brand joke.
- "Trusted by" logo rows as the only proof: logos appear (Framer, Cursor, Basement) but are accompanied by numbers, headlines or named milestones.
- Lorem-style filler or "Revolutionize / Unlock / Seamless / Elevate" language: not in the headings collected. Verbs observed: Build, Ship, Turn, Take, Let, Send, Protect.
- Pricing tables with three tiers on the landing page itself: not seen on the home pages (Pricing is a nav link on Linear, Raycast, Cal.com, Vercel). PostHog has a "Usage-based pricing" section instead of a tier table.
- Identical `border-radius` rounded cards everywhere: not measured. `unverified`.

### Cross-document resolutions

- Typefaces (vs 02, 03). This document shows Inter, Geist and a serif display on well-made pages; 02 and 03 list the same faces as overused. Resolved: a face is a tell only when it is the unconsidered default (see the resolved position in 02). On the evidence here, Inter is the headline face on 3 of 30 pages (Linear, Raycast, Ghost), each paired with a mono or a display cut, and Geist appears on 5 (Vercel, Next.js Conf, basement, Nothing body, Raycast mono) where it is brand-owned (Vercel) or paired. No numbered page uses Space Grotesk, Instrument Serif or Fraunces as a loaded face. The serif display faces seen are licensed or custom (domaine, Lyon Text, Editorial New, EB Garamond), not the free "tasteful" set.
- Palettes (vs 02, 03). Warm paper tones here (PostHog #EEEFE9, Agentcard #F2F1EC, Aesop #FFFEF2, Arc #FFFCEC) are computed values on pages whose category or brand justifies them. 02 flags cream only as part of the fashionable bundle (cream + terracotta + display serif chosen from a list). Resolved: the separator is derivation and combination, see 02. None of the pages above pairs cream with a terracotta accent; accents were not collected, so that claim is limited to what was read (`unverified` for accents).
- Proof and pricing (vs 04, 02). 04 gives a convention (logo strip, three feature blocks, three plans with a recommended badge). Observed here: no home page showed a three-tier table (pricing is a nav link or a usage-based section), no h2 list showed a three-card feature grid, and logos always came with numbers or milestones. Convention in 04 is therefore not supported by this sample; see 04 for the corrected rule. Limit: this sample read h2 text and the first 200 characters only, so absence on lower sections is `unverified`.
- Page content drift. 04 reports Notion logos right after the hero and testimonials on Linear; this document's h2 lists show "Trusted by teams that ship" later on Notion and no testimonial h2 on Linear. Both are single loads of rotating pages and logo strips often have no h2; neither is treated as a contradiction.
- Motion and reduced motion (vs 02, 05). This document did not inspect CSS for `prefers-reduced-motion` on any page; the only observed accessibility behaviours are the Notion pause control and skip links. Reduced-motion guidance comes from 05 (reduce, remove parallax/scrub/autoplay).

## Implications for skills

### skills/landing-copy/references/structure.md

- Name each section after the job it does for the reader ("Intake and integrations", "Test mode", "Open Invoices") or give it a statement with an opinion ("Not just vibes, a full platform"). Ban the headings "Features", "Why choose us", "Testimonials", "Our values". Evidence: Linear https://linear.app/, Resend https://resend.com/, Framer https://www.framer.com/.
- Hero h1: 2 to 12 words, one claim, no adjective stack. Examples: "Email for developers" (Resend), "Your shortcut to everything." (Raycast), "Let agents buy anything online" (Agentcard https://www.agentcard.sh/).
- Close by returning to the opening claim in one sentence (Supabase https://supabase.com/, Raycast https://www.raycast.com/). Do not copy the "Available today." closer verbatim: Linear and Resend already share it.
- Proof must be a number, a named milestone, a dated changelog entry or a method statement ("how we validate accuracy", Oura https://ouraring.com/es). A logo strip alone does not count. Pricing: do not default to a three-tier table on the landing page; none of the 30 pages showed one on the home page (usage-based section: PostHog https://posthog.com/). Use the plan structure the offer actually has (see 04).
- Include one dated, real element if the product has one: release banner, changelog, event date. Ask the user for it; never invent it.
- Allow one section with the brand's own voice (PostHog "Shameless CTA" https://posthog.com/, Billow "Totally fair to ask." https://www.billow.so/). Voice must come from user-provided brand material.
- Per type: SaaS = claim, product view, job-named sections, changelog or proof, closer. Waitlist = claim, manifesto link beside CTA (Wabi https://wabi.ai/), concrete examples (chips), privacy/credibility line (Dawn https://joindawn.com/), single CTA. Event = name as h1, date and city in one line, speakers/sessions nav (Next.js Conf https://nextjs.org/conf), and an honest state when closed (Config https://config.figma.com/). Studio = work first, grouped by discipline (Pentagram https://www.pentagram.com/), minimal selling. Product = the product's name and image first, categories, then story-led editorial blocks (Aesop https://www.aesop.com/, Apple https://www.apple.com/airpods-pro/).

### skills/landing-art-direction/references/typography.md

- Require a recorded typeface decision with a reason: display + text + (optional) mono. Two families is the modal case; one family is acceptable (Stripe, Pentagram https://www.pentagram.com/).
- An Inter-only page with no recorded reason reads as template; Inter is not banned. Linear, Raycast and Ghost use Inter plus a mono or display cut. If Inter or Geist is used, record why (brand adjacency, product category), pair it with a mono or a distinct display face, and set h1 at 64px or larger. The same applies to the free "tasteful" set (Space Grotesk, Instrument Serif, Fraunces, Geist): none was found on the 30 pages as a loaded face, and the serif displays that were found are licensed or custom.
- Offer a serif display option even for technical products (Resend `domaine`, Notion `Lyon Text`, Cursor `EB Garamond`, Oura `Editorial New`). Offer free options the agent can actually ship, choosing from the brief rather than from this list: JetBrains Mono, Source Serif 4 (Dawn), Manrope (Supabase), Figtree; Geist and Geist Mono are free but are a flagged default (see 02), so require a stated reason.
- H1 size band: 64 to 96px on desktop for 1 to 8 words; 42px or smaller only for longer statements (Dawn 42px, Cursor 26px with a long sentence). Tracking and line-height values were not measured: do not cite them from this document.
- Mono face is used for labels, code, counts and metadata (14 of 30 numbered pages; what each mono face labels was not inspected, so the label/code/count roles are `unverified`).
- Do not split headlines into per-letter spans without an accessible label (Wabi https://wabi.ai/ breaks text extraction).

### skills/landing-art-direction/references/colour.md

- Start from tinted neutrals, not #000/#FFF and not a gradient. Warm paper tones are acceptable only when derived from the brand or category (Aesop, Agentcard, PostHog); do not combine cream with a terracotta accent and a fashionable display serif by default (see 02). Observed: #08090A / #F7F8F8 (Linear https://linear.app/), #14120B (Cursor https://cursor.com/), #EEEFE9 (PostHog https://posthog.com/), #F2F1EC (Agentcard https://www.agentcard.sh/), #FFFEF2 (Aesop https://www.aesop.com/), oklch hue 157.5 chroma 0.0025 (Supabase https://supabase.com/).
- Choose a temperature that departs from the category default when the brand allows: warm brown for mental health (Dawn https://joindawn.com/ #321C04), paper tone for fintech/agents (Agentcard), warm black for coding tools (Cursor).
- Write palettes as tokens in oklch; keep neutrals at chroma below ~0.01 and give the accent one job (primary action). Accent hex values were not collected in this research: `unverified`, so skills must not cite accent examples from it.
- Ban the purple-to-blue gradient hero; if a gradient is used it must be the brand's signature, as Stripe's canvas is (https://stripe.com/es-us).
- Support both themes only if the brand does; Notion (light https://www.notion.com/) and Linear (dark) each commit to one.

### skills/landing-art-direction/references/layout.md

- Hero patterns observed: (a) product UI as drawn image/SVG (Linear, Lightfield https://lightfield.app/); (b) scrubbed or looping video with first/last frame stills (Mercury https://mercury.com/); (c) WebGL canvas (Lusion https://lusion.co/, basement https://basement.studio/); (d) product photo (Apple, Fellow https://fellowproducts.com/); (e) type only (Config, Wabi). Pick one and justify it; none uses a person-at-laptop stock image.
- Section structure should be varied, not three equal columns: Raycast, Resend, Supabase each use one feature per section with its own visual.
- Navigation: 6 to 9 items, sign-in and CTA at the end, with a small brand-owned detail (counts, keyboard hint, copy-logo, skip links).
- Studio and shop pages can be index-like: lowercase text index (Teenage Engineering https://teenage.engineering/) or grouped work grid (Pentagram https://www.pentagram.com/).
- Provide a visible pause control for hero video (Notion).
- Layout measurements (grid, gutters, max-width) were not collected here; the writer must not cite numbers from this document.

### skills/landing-art-direction/references/assets.md

- Hero asset must show the real thing: UI recreated from the product, product photography, a WebGL scene, or a short video. Do not use stock people, abstract 3D blobs, or generic dashboards.
- Where there is no product to show, build UI fragments that carry real content (Lightfield's SKILL.md panel and ARR figures https://lightfield.app/) or a bespoke illustration system (PostHog's hedgehog https://posthog.com/).
- Scrubbed video needs start and end frame stills for load and reduced-motion (Mercury: `hero_start_frame`, `hero_end_frame`).
- Provide light and dark variants of illustrations when the page supports both (PostHog `hedge_light` / `hedge_dark`).
- Person photography only when lit and cropped to the palette (Dawn).
- Offer brand assets: logo copy as SVG and a brand guidelines link (Framer https://www.framer.com/).

### skills/landing-build/references/css.md

- Declare custom fonts with `@font-face` (or a variable font) and define a fallback metric-matched stack; observed fallbacks such as `"GeistSans Fallback"`, `"Inter Fallback"`, `"Manrope Fallback"` show the pattern used by Vercel https://vercel.com/, Raycast https://www.raycast.com/ and Supabase https://supabase.com/.
- Use CSS custom properties for colour tokens and oklch/lab values (Supabase uses oklch; Lightfield uses lab) so dark/light variants are one block.
- Provide `skip to content` links and honour `prefers-reduced-motion` for canvas/video heroes (Notion pause control https://www.notion.com/, Agentcard "Skip to the product" https://www.agentcard.sh/). Reduced-motion handling was not inspected in the CSS of any page: `unverified`. Follow 05: provide a reduced variant (reduce, and remove parallax, scrub and autoplay loops).
- Large-heading sizes at 64 to 96px need fluid scaling (`clamp()`); how each site scales on mobile was not tested. `unverified`.
- Per-letter text animation must keep an accessible name (`aria-label` on the heading) and not rely on split spans for content.

## Sources

Pages opened (31 studied: 30 numbered entries plus Arc):
- https://linear.app/
- https://stripe.com/es-us
- https://www.notion.com/
- https://vercel.com/
- https://www.raycast.com/
- https://resend.com/
- https://supabase.com/
- https://posthog.com/
- https://cal.com/
- https://www.framer.com/
- https://ghost.org/
- https://cursor.com/
- https://mercury.com/
- https://lightfield.app/
- https://www.billow.so/
- https://www.agentcard.sh/
- https://www.apple.com/airpods-pro/
- https://teenage.engineering/
- https://nothing.tech/
- https://www.aesop.com/
- https://fellowproducts.com/
- https://ouraring.com/es
- https://www.pentagram.com/
- https://locomotive.ca/en
- https://lusion.co/
- https://basement.studio/
- https://wabi.ai/
- https://joindawn.com/
- https://nextjs.org/conf
- https://config.figma.com/
- https://arc.net/ (opened; h1 "Arc is the Chrome replacement I've been waiting for."; fonts Marlin Soft SQ, Inter, ABC Favorit Mono, ABC Oracle, Exposure VAR; bg #FFFCEC cream; shows "Meet Dia" banner, video "ArcDiaPLG_Video.webm". Not in the numbered entries; it is the 31st page opened, studied by script only. Its cream background #FFFCEC is a second computed cream-paper value next to Aesop, and it is not included in the palette counts)

Opened but excluded:
- https://frame.work (bot check page, nothing studied)
- https://www.riseplasma.com/ (paused notice)

Discovery sources:
- https://www.a1.gallery/type/waitlist
- https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert
- https://moosend.com/blog/waitlist-landing-page/
- https://magicui.design/blog/waitlist-landing-page
- https://www.flowjam.com/blog/waitlist-landing-page-examples-10-high-converting-pre-launch-designs-how-to-build-yours
