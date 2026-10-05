## Scope

Catalogue of visual, structural, motion, copy (English and Spanish) and code-level defaults that make a landing page read as AI-generated (v0, Lovable, Bolt, Claude/ChatGPT output).

Method: web search plus web fetch of 30+ critiques, detector guides, scanner repos, Wikipedia's AI-writing guide, Anthropic's frontend-aesthetics cookbook, Adam Wathan's tweet, Magic UI docs and NN/g. Each row cites the page that states the tell.

Limits, stated honestly:
- Playwright browser tools were not used. No rendered pages were opened and no screenshots taken. All evidence is from fetched article text and search snippets, not first-hand visual inspection.
- A v0 share page (v0.dev/t/...) returned only a summary, not source code, so Tailwind class strings are taken from critiques and scanner docs, or marked `unverified`.
- Medium (kai.ni) returned 403; it is cited only through a search snippet.
- Spanish evidence is mostly lists of ChatGPT-overused words (general text), not landing-specific corpora. Spanish landing examples in the table are quoted from those lists; where I combine them into a landing headline it is flagged `unverified` as a landing-page example.
- Several sources are SEO blog posts by agencies and tool vendors; they agree with one another and with primary sources (Wathan tweet, Anthropic cookbook, Wikipedia, NN/g), but treat counts and percentages in them as anecdotal.

## Findings

| Tell | Where it shows | Why it reads as generated | Alternative | Detectable in source (yes/no) | Source URL |
|---|---|---|---|---|---|
| Indigo/violet default accent (`indigo-500`, `#6366F1`) | Buttons, links, hero, badges | Tailwind UI shipped every button as `bg-indigo-500`; models learned it as the median accent (Wathan apologised for it) | Derive accent from brand; one chosen hue, not a Tailwind default | yes | https://x.com/adamwathan/status/1953510802159219096 |
| Blue-to-purple (or violet-pink-cyan) gradient hero on near-black | Hero background | "AI tool default" look; statistical centre of training data | Flat colour plus a real product artifact, or a gradient with an off-brand stop | yes | https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120 |
| Specific indigo-violet hex set `#615fff`/`#8e51ff`, bg `#0f172b`, gradient `#4f39f6` to `#7f22fe` | Theme tokens | Exact Tailwind v4 indigo/violet/slate values recur across generated sites | Custom palette tokens in OKLCH/hex that are not Tailwind stops | yes | https://sikora.software/blog/ai-website-design |
| Gradient text on headline (`bg-clip-text text-transparent`) | H1 / key phrase | "2023 AI trend"; reduces legibility; used on every site | Solid colour, one underline or highlight | yes | https://agent-design.com/blog/stop-ai-ui-looking-templated |
| Animated gradient/shiny text component | Hero badge or headline | Library effect (Magic UI) dropped in unchanged | Static type with considered weight contrast | yes | https://v3.magicui.design/docs/components/animated-gradient-text |
| Inter used everywhere, no pairing | Whole page | Most-used UI face in training data; zero typographic decision | Deliberate display plus text pairing chosen from the brief (Geist, Manrope and serif displays are also flagged defaults when left unconsidered, see Cross-document resolutions) | yes | https://www.925studios.co/blog/ai-slop-design-tells |
| Roboto/Arial/system-font stack as the only font (Open Sans and Lato are ubiquity-based, not named by the cookbook) | `font-family` | Anthropic's own cookbook names Inter, Roboto, Arial and system fonts, and Space Grotesk, as defaults to avoid (read 2026-10-04); Open Sans and Lato are `unverified` as AI tells and rest on ubiquity (see 03) | Load a distinctive face; avoid even Space Grotesk, now a Claude default | yes | https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics |
| Font declared but never loaded | CSS head | Scanner category: font in CSS with no `@font-face`/link | Self-host or link the exact family used | yes | https://github.com/funboy322/avoid-ai-design |
| "Tasteful" counter-defaults (cream plus terracotta, mono chrome, Instrument Serif/Fraunces) | Anti-slop redesigns | The escape hatch itself becomes the new default | Pick from the brief, not from a list of fashionable fonts | yes | https://github.com/funboy322/avoid-ai-design |
| Oversized italic serif as hero headline | H1 | Newer 2026 tell from models told to "avoid Inter" | One or two typefaces max, chosen for the brand | no | https://tenex.studio/en/blog/ai-slop-ui-8-signes/ |
| Three equal rounded feature cards with thin icon, h3, two lines | Features section | Tailwind-tutorial pattern; uniform shape and length | Asymmetric 2+1 grid, numbered prose, conversation or screenshot-led flow | yes | https://publishd.app/blog/make-ai-built-site-not-look-ai |
| Six identical cards (same size, white fill, same icon) | Features / benefits | Content shaped to fit a grid, not grid to content | Vary scale; drop cards for typographic lists | no | https://tenex.studio/en/blog/ai-slop-ui-8-signes/ |
| Same `rounded-2xl shadow-lg` on everything | Cards, buttons, images | Same shadow and radius on every element means no hierarchy | Fixed radius scale (4/8/16); shadow only on elevated items | yes | https://github.com/funboy322/avoid-ai-design |
| Low-opacity soft drop shadow plus 0.5rem radius everywhere | Cards | Generic Tailwind `shadow-sm`/`rounded-lg` look | Border-led or flat surfaces with deliberate depth | yes | https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p |
| Pill-shaped buttons everywhere | CTAs, nav, tags | Over-friendly default | One primary pill, rest rectangular (or consistent square system) | yes | https://agent-design.com/blog/stop-ai-ui-looking-templated |
| Glassmorphism / `backdrop-blur` navbar and cards | Sticky nav, cards over blobs | Applied indiscriminately, no content behind to justify it | Opaque surfaces; blur only where content scrolls under | yes | https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120 |
| Blurred gradient orbs/blobs in corners, floating geometric shapes | Hero and section backgrounds | Cheap "depth" with no meaning | Real imagery, texture, or plain background | yes | https://promptsrush.com/blog/prompts-improve-ugly-ai-generated-website |
| Pill badge above centred hero (eyebrow, "New", dot) | Hero top | Boilerplate hero scaffold, nearly always present | Drop eyebrow or fold into headline | yes | https://tenex.studio/en/blog/ai-slop-ui-8-signes/ |
| Centred headline, centred paragraph, centred buttons, dual CTA | Hero | Safest composition; everything centred | Left-aligned copy at ~60ch with asymmetric visual | no | https://publishd.app/blog/make-ai-built-site-not-look-ai |
| Hero followed by identical-padding sections in one max-width container | Page rhythm | Uniform vertical padding (`py-24`) removes rhythm | Vary density; one full-bleed, one short, one off-grid section | yes | https://sikora.software/blog/ai-website-design |
| Default section order: hero, logo bar, 3 features, bento, testimonials, pricing, FAQ, CTA, 4-col footer | Page structure | Template skeleton, not derived from buyer questions | Order by the decision the visitor must make; cut unneeded sections | no | https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated |
| Three-tier pricing cards with a ringed "popular" middle | Pricing | Scanner lists three-tier ring as a tell | Pricing shaped by the actual offer; single plan if single plan | yes | https://github.com/funboy322/avoid-ai-design |
| Fake "Trusted by" logo wall, or "Trusted by 10,000+ teams" with no logos | Under hero | Unverifiable social proof | Real customers with permission, or delete | yes | https://promptsrush.com/blog/prompts-improve-ugly-ai-generated-website |
| Round-number stat row (99.9%, 10x, 24/7, 10k+) | Stats band | Four numbers with no source because a page "has a stats bar" | Only measured, sourced figures with baseline | yes | https://promptsrush.com/blog/prompts-improve-ugly-ai-generated-website |
| Invented testimonials: Sarah Johnson, John Smith, vague title, stock/generated avatar | Testimonials | Plausible-generic names and roles; truncated names | Real named customers, links, verified embeds | yes | https://sikora.software/blog/ai-website-design |
| Hyperreal AI-generated people or no real images (colored squares) | Imagery | Flawless faces; text written where an image belongs | Real team/product photography and screenshots | no | https://sikora.software/blog/ai-website-design |
| Undraw/Storyset-style flat illustrations as filler | Hero, features | Reads as filler now | Product screenshot or typographic hero | no | https://publishd.app/blog/make-ai-built-site-not-look-ai |
| Emoji used as icons (rocket, bulb, sparkles) | Feature cards, bullets | Emoji stand in for an icon system | Consistent custom or single-family icon set | yes | https://sikora.software/blog/ai-website-design |
| Sparkles icon for "AI/premium" | Buttons, badges | Ambiguous; users did not read it as AI | Text label naming the feature | yes | https://www.nngroup.com/articles/ai-sparkles-icon-problem/ |
| Thin interchangeable line icons (Lucide) at top of each card | Cards | Same icon family as every shadcn site | Fewer icons; icons with specific meaning | yes | https://www.925studios.co/blog/ai-slop-design-tells |
| Left-border accent gradient card | Callouts, cards | Design shortcut to fake emphasis | Plain rule or whitespace | yes | https://sikora.software/blog/ai-website-design |
| Decorative `01 / 02 / 03` numbering on already ordered content | Steps, features | Redundant ornament | Let verbs and order carry sequence | yes | https://tenex.studio/en/blog/ai-slop-ui-8-signes/ |
| Untouched shadcn/ui, Radix, lucide, Tailwind defaults | Source | No customisation of tokens means no decisions | Rework tokens and component variants | yes | https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated |
| Magic UI effects (Border Beam, Animated Beam, shiny text) | Hero, cards, integrations | Drop-in effects with stock defaults (`#ffaa40` to `#9c40ff`) | Motion that explains product behaviour | yes | https://magicui.design/docs/components/border-beam |
| Fade-in on scroll for every section, same fade-up | Sections | Identical reveal on all content tells the user nothing | Reveal only where it teaches; most content static | yes | https://publishd.app/blog/make-ai-built-site-not-look-ai |
| Hover lift / scale on cards, stagger on lists | Cards, lists | CSS-tutorial first effects | Hover states that change meaning (state, preview) | yes | https://publishd.app/blog/make-ai-built-site-not-look-ai |
| Bounce easing and count-up stats | Counters | Scanner motion tells | Eased, purposeful, short | yes | https://github.com/funboy322/avoid-ai-design |
| Animations ignore `prefers-reduced-motion` | CSS/JS | No accessibility pass | Gate motion behind the media query | yes | https://github.com/funboy322/avoid-ai-design |
| Builder fingerprints: "Edit with Lovable", "Made with Bolt", lovable.app, bolt.host | Badges, meta, domains | Free-tier stamps | Remove; custom domain | yes | https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120 |
| Placeholder leftovers: lorem ipsum, "Your Company Name", "[Insert testimonial here]", "as an AI" | Copy | Unproofread demo content | Proofread; grep before ship | yes | https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated |
| Stale defaults: stock favicon, "My App" title, missing OG image, 2024 copyright | Head, footer | Template metadata left | Real title, favicon, OG, dynamic year | yes | https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275 |
| Structural HTML comments `<!-- Hero -->`, `<!-- Testimonials -->`; empty `<div id="root">` | Source | Section-labelled generation; CSR shell | Server-rendered semantic HTML | yes | https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120 |
| Clickable `div`/`span` with `onClick`, dead `href="#"` buttons | Source | Visual correctness only | Real `button`/`a` elements | yes | https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120 |
| Missing alt, skipped heading levels, no focus states, low-contrast muted text | A11y | Visual checks only | Audit with keyboard and contrast tools | yes | https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275 |
| EN inflated verbs: elevate, unlock, empower, supercharge, streamline, leverage, harness, revolutionize | Headlines, subheads | Verbs with no object; Wikipedia lists promotional puffery | Concrete verb plus noun the product acts on | yes | https://www.oliviacal.com/post/ai-writing-tells |
| EN empty adjectives: seamless, robust, powerful, cutting-edge, game-changing, effortless | Feature copy | Replaceable by any competitor's name | Quantified or demonstrated claim | yes | https://growthguys.tech/blog/genuine-website-vs-ai-slop.html |
| EN triads: "Fast. Simple. Secure.", "Build faster. Ship smarter." | Hero, sections | Rule of three used in every section | One specific claim | yes | https://www.925studios.co/blog/ai-slop-design-tells |
| EN negation pivot: "It's not X, it's Y", "No X. No Y. Just Z." | Subheads | Manufactured depth; named by Wikipedia | State what it is, directly | yes | https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing |
| EN em-dash habit, also in headlines, buttons, testimonials | All copy | Additive em dashes ("Build faster — without sacrificing quality") | Periods, commas, colons | yes | https://tenex.studio/en/blog/ai-slop-ui-8-signes/ |
| EN openers/hooks: "In today's fast-paced digital world", "Let's dive in", "Here's the kicker", "Picture this" | Intros, about | Global opener cliches | Start with the concrete situation | yes | https://www.oliviacal.com/post/ai-writing-tells |
| EN spatial metaphors: landscape, realm, tapestry, journey, beacon | About/story copy | AI favours spatial abstraction | Plain nouns | yes | https://www.oliviacal.com/post/ai-writing-tells |
| Generic CTAs: "Get Started", "Learn more" with welded arrow; same CTA six times | Buttons | Scanner flags; no specific outcome | Verb plus outcome ("Book a 20-min demo") | yes | https://github.com/funboy322/avoid-ai-design |
| Vague claims and unsourced percentages ("95% uplift", "hundreds of clients") | Proof copy | No baseline or number | "Cut invoice processing from 4 days to 6 hours"; "340 clients" | no | https://growthguys.tech/blog/genuine-website-vs-ai-slop.html |
| Vague attribution: "industry reports", "experts argue" | Proof copy | Wikipedia: undefined sources | Named source and link | yes | https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing |
| ES generic openers: "En la era digital actual", "En un mundo donde…", "Cuando se trata de…" | Hero, about | Direct translations of English global openers | Open with the customer's situation | yes | https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio |
| ES inflated verbs: "Desbloquea", "Eleva", "Potencia", "Domina", "Desata", "Sumérgete en", "Embárcate" | Headlines | Calques of unlock/elevate/dive in | Concrete verb tied to the product | yes | https://elandroidefeliz.com/chatgpt-frases-y-palabras-mas-frecuentes/ |
| ES empty adjectives: "innovador", "robusto", "sin costuras", "transformador", "vibrante", "en constante evolución", "de vanguardia" | Feature copy | Same list as English, calqued | Evidence instead of adjective | yes | https://www.applesfera.com/curiosidades/te-han-pillado-palabras-frases-que-hacen-evidente-que-utilizaste-chatgpt-lugar-pensar-a-apple |
| ES antithesis: "No se trata de X, se trata de Y" | Subheads | Spanish form of "not X, it's Y" | Say Y only | yes | https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio |
| ES triads: "rápido, confiable y escalable" | Hero, features | Rule of three | One verifiable benefit | yes | https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio |
| ES hook questions: "¿La trampa?", "¿El detalle clave?", "¿La verdad brutal?" | Body copy | Staccato rhetorical Q then A | Plain statements | yes | https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio |
| ES hedges and closers: "Es importante señalar que…", "Vale la pena señalar que", "En resumen", "En conclusión", "Un testimonio de" | Body, FAQ | Hedge and summary scaffolding | Cut; say the fact | yes | https://www.applesfera.com/curiosidades/te-han-pillado-palabras-frases-que-hacen-evidente-que-utilizaste-chatgpt-lugar-pensar-a-apple |
| ES generic copy that fits "una peluquería, una escuela de yoga o una tienda de galletas" | Whole page | Swap-the-business test fails | Name product, place, price, client | no | https://maidertomasena.com/chat-gpt-para-copywriting/ |
| ES self-help enthusiasm: "¡Este es tu momento!" | CTAs | Artificial enthusiasm | Calm, specific invitation | yes | https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio |
| Title Case section headings and bold-header list items | Headings, bullets | Wikipedia-listed formatting tell | Sentence case, varied structure | no | https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing |
| Curly "smart quotes" throughout copy | Text | Cited as sign of generated, not typed, copy (weak signal) | Keep only if consistent with brand typography | yes | https://sikora.software/blog/ai-website-design |
| Dark mode as straight inversion | Theme | Palette not designed twice | Tune tokens per theme | no | https://promptsrush.com/blog/prompts-improve-ugly-ai-generated-website |
| Next.js plus Vercel plus Supabase plus Clerk stack signals | Network requests | "Prompt-and-deploy" stack | Not a visual tell; ignore for design review | yes | https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated |

### Source-level patterns for rows marked `yes`

Strings below come from the cited sources where quoted; those marked `unverified` are standard Tailwind/HTML spellings I infer, not quoted in a source.

- Indigo default accent: `bg-indigo-500`, `text-indigo-600`, `from-indigo-500 to-purple-600`, `#6366F1`, `#8B5CF6` (slopdar). Also `indigo-`, `violet-`, `purple-` utilities (unverified as a class-prefix rule).
- Hero gradient: `bg-gradient-to-r`, `from-purple-600`, `to-blue-600` (class names unverified as exact strings; named generically in the sources), plus hex pairs `#6366F1`/`#8B5CF6`.
- Tailwind v4 hex set: `#615fff`, `#8e51ff`, `#0f172b`, `#4f39f6`, `#7f22fe`.
- Gradient text: `bg-clip-text`, `text-transparent`, `-webkit-background-clip: text`.
- Animated gradient/shiny text: `AnimatedGradientText`, `AnimatedShinyText`, `animate-gradient`, `animated-shiny-text` (component names verified; keyframe names unverified).
- Fonts: `font-family: Inter`, `'Inter'`, `Roboto`, `Arial`, `Open Sans`, `Lato`, `system-ui`, `Space Grotesk`; `next/font/google` `Inter`. Font-never-loaded: a `font-family` name with no `@font-face`, `<link ...fonts.googleapis>` or `next/font` import.
- Counter-defaults: `Instrument Serif`, `Fraunces`, `Geist`, `Space Grotesk` as sole font (funboy322 lists them as the "tasteful free font" set).
- Three-card grid: `grid-cols-3`, `md:grid-cols-3`, `lg:grid-cols-3` with identical children (count of equal sibling cards >= 3).
- Radius/shadow: `rounded-2xl shadow-lg`, `rounded-xl`, `rounded-lg`, `shadow-sm`, `border-radius: 0.5rem`, same pair repeated more than N times.
- Pills: `rounded-full` on buttons.
- Glass: `backdrop-blur`, `backdrop-blur-md`, `backdrop-filter: blur(`, `bg-white/10`, `bg-white/5` (opacity variants unverified).
- Orbs/blobs: `blur-3xl`, `blur-[100px]`, `rounded-full` + `absolute` + `bg-purple-`/`bg-blue-` + `opacity-20` (unverified spellings; concept verified).
- Pill badge: a short `rounded-full` element with `border`, `text-xs`/`text-sm`, and `uppercase`/`tracking-wide` before an `h1`; copy like "New", "Now in beta", "Introducing" (unverified wording).
- Section rhythm: repeated `py-24` on every `section`, `max-w-7xl mx-auto` or `container mx-auto`.
- Pricing ring: `ring-2 ring-primary` or `ring-indigo-500` on the middle of three cards; "Most Popular".
- Logo wall and trust: "Trusted by", "as seen in", "Trusted by 10,000+", "Loved by teams".
- Stats: `10k+`, `10,000+`, `99.9%`, `10x`, `24/7`, `50+`, `4.9/5` (round-number set from promptsrush; others unverified).
- Testimonials: names `Sarah Johnson`, `John Smith`, `John Doe`, `Jane Smith`; titles `Head of Operations`; avatar services `pravatar`, `randomuser.me`, `ui-avatars`, `dicebear` (avatar hosts unverified).
- Emoji icons: `🚀`, `💡`, `✨`, `⚡`, `🔒`, `🎯` inside headings, buttons, cards (first three verified).
- Sparkles: `Sparkles` import from `lucide-react`, `✨`.
- Lucide: `from "lucide-react"`; shadcn: `from "@/components/ui/`, `cn(`, `class-variance-authority`, `@radix-ui/`; tokens `bg-background`, `text-foreground`, `text-muted-foreground`.
- Left-border card: `border-l-4`, `border-l-` with a colour (unverified spelling).
- Numbering: text nodes exactly `01`, `02`, `03` as card labels.
- Magic UI: `BorderBeam`, `AnimatedBeam`, `@/components/magicui/`, `@/components/ui/border-beam`, `colorFrom`, `#ffaa40`, `#9c40ff`, `Marquee`, `Ripple`, `Particles`, `Meteors` (last four unverified).
- Reveal and hover motion: `data-aos`, `AOS.init`, `fade-up`, `whileInView`, `framer-motion`, `motion/react`, `animate-fade-in`, `hover:scale-105`, `hover:-translate-y-1`, `hover:shadow-xl`, `transition-all duration-300` (AOS, fade-up, hover lift named in sources; exact class strings unverified).
- Bounce/count-up: `animate-bounce`, `ease-bounce`, `CountUp`, `react-countup`, `useCountUp`, `NumberTicker` (animate-bounce unverified; count-up concept verified).
- Reduced motion: presence of animation/transition rules with no `prefers-reduced-motion` anywhere in CSS/JS.
- Builder marks: `lovable`, `lovable.app`, `Edit with Lovable`, `Made with Bolt`, `bolt.host`, `Built with v0`, `v0`, `base44`, `replit.app`, `repl.co`.
- Placeholders: `lorem ipsum`, `Your Company Name`, `[Your`, `[Insert testimonial here]`, `as an AI`.
- Stale metadata: `<title>My App</title>`, `Vite + React`, `Create Next App`, favicon `vite.svg`/`favicon.ico` default, `©2024` or a hard-coded year, missing `og:image` (title strings other than "My App" unverified).
- HTML comments: `<!-- Hero -->`, `<!-- Features -->`, `<!-- Testimonials -->`, `<!-- CTA -->`; `<div id="root"></div>` as sole body content.
- Bad semantics: `<div onClick`, `<span onClick`, `href="#"`, `<img` without `alt`, heading jumps (`h1` to `h4`), multiple `<h1>`, `outline-none` without `focus-visible`/`focus:ring`.
- English copy (case-insensitive): `elevate`, `unlock`, `empower`, `supercharge`, `streamline`, `leverage`, `harness`, `revolutioni[sz]e`, `seamless(ly)?`, `robust`, `powerful`, `cutting-edge`, `game-chang`, `effortless`, `delve`, `tapestry`, `landscape`, `realm`, `journey`, `beacon`, `synergy`, `holistic`, `end-to-end`, `next-gen`, `state-of-the-art`, `in today's (fast-paced|digital|rapidly)`, `let's dive in`, `here's the kicker`, `picture this`.
- English structure regexes: `\bFast\. Simple\. Secure\.`, `\b(\w+)\. (\w+)\. (\w+)\.$` triads; `[Ii]t's not (just )?[^.]+, it's`; `[Nn]ot (just|only) [^.]+(, but| but also)`; `No \w+\. No \w+\. Just`; `—` (em dash) count per 1000 words; em dash inside `h1-h3`, `button`, `blockquote`.
- CTAs: `Get Started`, `Get started`, `Learn more`, `Let's Go!`, arrows `→` or `ArrowRight` inside buttons; the same CTA label repeated >= 4 times.
- Vague attribution: `industry reports`, `experts argue`, `observers have cited`, `studies show`.
- Spanish openers: `en la era digital`, `en el mundo (de hoy|actual)`, `en un mundo donde`, `cuando se trata de`, `en la sociedad acelerada`.
- Spanish verbs: `desbloque(a|ar)`, `eleva`, `potencia`, `domina`, `desata`, `sumérgete`, `embárcate`, `ahond(a|ar) en`, `revoluciona`, `navega`.
- Spanish adjectives/nouns: `innovador(a)?`, `robust[oa]`, `sin costuras`, `transformador`, `vibrante`, `en constante evolución`, `de vanguardia`, `cambio de juego`, `sinergia`, `tapiz`, `paisaje`, `reino`.
- Spanish structures: `no se trata de [^,.]+, se trata de`; `no es [^,.]+, es`; `¿La trampa\?`, `¿El detalle clave\?`, `¿La verdad brutal\?`; `es importante (señalar|tener en cuenta)`, `vale la pena señalar`, `en resumen`, `en conclusión`, `un testimonio de`; `¡Este es tu momento!`.
- Title Case heading check is not reliably regex-able and is marked no above; Spanish "lleva tu negocio al siguiente nivel" style phrases were searched but no source verified them, so they are `unverified` as landing examples.

### Cross-document resolutions

- Typefaces (vs 01, 03). Resolved position: no face is a tell by itself except a system/Arial/Roboto stack used as the only face, or a font that is declared but never loaded. Inter, Geist, Space Grotesk, Instrument Serif and Fraunces are tells only when left as the unconsidered default: one of them as both display and text face, no mono or distinct display companion, no recorded reason, or two or more of the "tasteful free font" set together (Space Grotesk, Geist, Instrument Serif, Fraunces) possibly with a cream and terracotta palette (https://github.com/funboy322/avoid-ai-design, read 2026-10-04: "the 'tasteful free font' set (Space Grotesk, Geist, Instrument Serif, Fraunces)"). The same face is acceptable on a crafted page when it is chosen for a reason (Geist on Vercel-orbit pages, Inter on Linear), paired with a mono or display cut, and the rest of the page (type scale, tracking, palette, layout) shows other decisions. 01 observed Inter as headline face on 3 of 30 well-made pages (always paired) and Geist on 5; that is consistent, not contradictory. Fixed here: the Inter row recommended Geist and Manrope as alternatives, which contradicted the counter-default row; the Open Sans and Lato claim was attributed to the cookbook, which names only Inter, Roboto, Arial, system fonts and Space Grotesk.
- Palettes (vs 01, 03). Cream/warm paper is not itself a tell. The tell is the bundle chosen from a fashionable list: cream background + terracotta accent + (Instrument Serif or Fraunces) display, the funboy322 "second-order default" (quote: "cream with a terracotta accent (Claude's own interface color)"). Good practice in 01 and 03 is a neutral tinted from the brand or category (Aesop, Agentcard, PostHog, Dawn brown) with the temperature, hue and chroma recorded as a decision. Test: could the palette be derived from the subject, and is the accent something other than terracotta/indigo?
- Motion (vs 05). The tells in this document are undifferentiated application: the same fade-up on every section, hover lift on every card, stagger on every list, count-up on any stat, bounce easing. 05 techniques (split-text, counters, reveals, tilt) are not tells when each has a role (entrance, feedback, scroll-linked), varies by role, and carries a reduced-motion variant. Counters are fine when the figure is real and the final value is in the HTML (05, technique 5); a count-up on an unsourced round-number stat is the tell.
- Reduced motion (vs 05). "Gate motion behind the media query" means provide a reduced variant, not delete all motion: reduce (short fades, feedback stays) and remove parallax, scrubbed scroll, autoplay loops. The detector can only check that the media query exists; it cannot judge the variant.
- Proof and pricing (vs 04, 01). The three-tier ringed pricing and logo-bar rows are tells when reflexive. 04 gives three plans with a recommended badge as convention with no test data, and 01 saw no three-tier table on any home page. Position: show pricing shaped by the actual offer; a recommended marker only when the business really recommends a plan.

## Implications for skills

### skills/landing-copy/references/tells.md
- Ship two banned-word lists (EN, ES) taken from the regex list above, grouped by type: inflated verbs, empty adjectives, spatial metaphors, openers, hedges, closers. Give a replacement rule rather than synonyms: a verb must have a concrete object.
- Teach structural patterns, not only words: triads, "not X, it's Y" / "No se trata de X, se trata de Y", hook questions, em-dash density. Cap em dashes (suggest zero in headlines and buttons) and tell the agent to rewrite with periods or colons.
- Add the swap test: replace the company name with a competitor's; if the copy still works, rewrite (growthguys, maidertomasena).
- Proof rules: no number without source and baseline; no logo wall or "Trusted by" without real customers; no invented testimonial names. If there is no real proof, omit the section.
- CTA rule: verb plus outcome; do not repeat one label across sections.
- Spanish: do not translate English copy; write natively and avoid the calques listed (Desbloquea, Eleva, Sumérgete, "En la era digital").

### skills/landing-art-direction/references/visual-tells.md
- List the palette tells (Tailwind indigo/violet stops, the v4 hex set, near-black plus violet gradient) and require a brief-derived palette defined as tokens, with accent used sparingly.
- Typography: ban Roboto, Arial and system-ui as the sole face. Treat Inter, Geist, Space Grotesk, Instrument Serif and Fraunces as defaults to justify, not bans: flag when used unpaired, as sole display and text face, or in combination; accept when a recorded brand reason and a mono or distinct display companion exist. Open Sans and Lato: informational only (ubiquity, not a documented AI tell). Require a stated pairing rationale.
- Layout: no default three equal cards, no centred-everything hero, no uniform `py-24` rhythm; require at least one asymmetric section and varied density. Section list must come from the offer, not the template skeleton.
- Surfaces: fixed radius scale, shadow only on elevated items, no reflexive `rounded-2xl shadow-lg`, no glass or blurred orbs without a reason.
- Icons and imagery: no emoji as icons, no sparkles unlabeled, no flat stock illustrations; require real screenshots or photography.
- Mention that Claude's own defaults (Space Grotesk, purple on white) are named in Anthropic's cookbook.

### skills/landing-motion/references/foundations.md
- Default stance: no reveal-on-scroll for every section, no identical fade-up, no hover scale/lift on cards, no staggered lists, no bounce, no count-up for its own sake.
- Allowed motion must teach or confirm state (cursor-aware, state changes, product demos). Cap decorative effects per page.
- Library defaults to avoid shipping unmodified: AOS `data-aos`, Magic UI Border Beam / Animated Beam / shiny text.
- Always provide a `prefers-reduced-motion` variant: reduce (short fades, keep feedback) and remove parallax, scrub and autoplay loops, per 05. Counters are allowed for real, sourced figures with the final value in HTML. Reveals, stagger, tilt and hover effects are allowed when each has a role and they vary by role; the tell is uniform application.

### skills/landing-review/scripts/tells.mjs
- Implement checks from the pattern list, with severity: P0 (builder marks, placeholders, lorem, `as an AI`, indigo hex set, em-dash in h1), P1 (gradient text, Inter only, 3-col identical cards, glass, orbs, emoji icons, fake stat/logo/testimonial strings, banned words/structures EN and ES), P2 (hover scale, AOS, shadow/radius repetition, numbering, missing reduced-motion).
- Count-based rules (repeated `rounded-2xl shadow-lg`, repeated `py-24`, same CTA label >= 4, em dashes per 1000 words) are more reliable than single-hit rules; avoid flagging a single use of `rounded-xl` or Inter alone as a failure.
- Treat Title Case headings, dark-mode inversion, imagery realism, stack signals and the swap test as non-regex items for the rubric, not the script.
- Run copy checks on visible text nodes only (strip scripts, class strings) and run Spanish checks when `lang="es"`.
- Known false-positive risks: shadcn tokens are legitimate when customised; Inter, Geist or indigo is fine if chosen deliberately, so report as "default unless justified in tokens". Cream/warm backgrounds are never flagged alone; flag cream + terracotta/orange accent + Instrument Serif/Fraunces together. Reduced-motion check is presence-only.

### skills/landing-review/references/rubric.md
- Score four axes: visual defaults, structure, motion, copy. For each, one question a reviewer answers by looking (Does the palette come from the brand? Could any competitor use this headline? Is every number sourced? Does each animation tell the user something?).
- Include the "fix one tell and the page improves" principle (925studios) but require fixing clusters, since tells co-occur.
- Add the human-surface check: real About, real team, specific pricing, real images.
- Record that sources are mostly practitioner blogs and that detector rules should be tuned on real pages before being treated as definitive.

## Sources

1. https://x.com/adamwathan/status/1953510802159219096
2. https://dev.to/alanwest/why-every-ai-built-website-looks-the-same-blame-tailwinds-indigo-500-3h2p
3. https://github.com/funboy322/avoid-ai-design
4. https://dev.to/rams901/hallmark-stop-ai-generated-ui-slop-in-one-command-in-2026-3p9n
5. https://www.braingrid.ai/blog/design-system-optimized-for-ai-coding
6. https://www.925studios.co/blog/ai-slop-design-tells
7. https://www.925studios.co/blog/ai-slop-web-design-guide
8. https://agent-design.com/blog/stop-ai-ui-looking-templated
9. https://www.hustletoai.com/blog/programming-7/how-to-tell-if-a-website-is-vibe-coded-120
10. https://slopdar.com/guide/how-to-tell-if-a-website-is-ai-generated
11. https://publishd.app/blog/make-ai-built-site-not-look-ai
12. https://growthguys.tech/blog/genuine-website-vs-ai-slop.html
13. https://axe-web.com/insights/ai-website-design-sameness/
14. https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
15. https://dev.to/kaplich/i-analyzed-100-vibe-coded-websites-and-found-these-common-mistakes-5275
16. https://www.oliviacal.com/post/ai-writing-tells
17. https://matthewvollmer.substack.com/p/i-asked-the-machine-to-tell-on-itself
18. https://aisdr.com/blog/words-to-avoid-so-you-dont-sound-like-ai/
19. https://elandroidefeliz.com/chatgpt-frases-y-palabras-mas-frecuentes/
20. https://www.applesfera.com/curiosidades/te-han-pillado-palabras-frases-que-hacen-evidente-que-utilizaste-chatgpt-lugar-pensar-a-apple
21. https://luisorlandolencarpio.substack.com/p/11-senales-de-que-chatgpt-escribio
22. https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
23. https://www.theadpharm.com/insights/claude-design-without-the-ai-slop-look
24. https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing
25. https://sikora.software/blog/ai-website-design
26. https://tenex.studio/en/blog/ai-slop-ui-8-signes/
27. https://www.nngroup.com/articles/ai-sparkles-icon-problem/
28. https://shitfa.st/
29. https://promptsrush.com/blog/prompts-improve-ugly-ai-generated-website
30. https://maidertomasena.com/chat-gpt-para-copywriting/
31. https://uxdivi.com/claude-copy-sitio-web/
32. https://magicui.design/docs/components/border-beam
33. https://v3.magicui.design/docs/components/animated-gradient-text
34. https://v0.dev/t/MCJg2898RDI
35. https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c
36. https://www.freecodecamp.org/news/how-to-build-landing-page-nextjs-shadcn/
