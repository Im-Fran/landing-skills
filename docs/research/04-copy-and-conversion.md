# Research 04: Copy and conversion

Tags: `data` = measured result or verifiable fact on the cited page; `opinion` = practitioner judgement or convention; `unverified` = could not reach or confirm the original. Pages fetched 2026-10-04. Live sites change; hero text below is "as fetched that day".

## Scope

Covers: section sequences by landing type (SaaS, physical product, service/studio, waitlist, event); value proposition, headline, subhead; objection handling and FAQ; CTA hierarchy and forms; social proof and its legal position (US FTC, EU); pricing presentation; landing copy in Spanish.

Limits: no first-party A/B data was available to me. Section sequences are convention, not tested orderings; no source I could reach tests "section order X vs Y" across landing types. Most "benchmark" numbers online are repeated by aggregators; where I could only reach an aggregator, that is flagged. Two sources (CXL blog pages, ecfr.gov) returned 403/redirect, so claims from them rest on search snippets and are flagged.

## Findings

### 1. Section sequences by landing type

No reachable study tests section order. Sequences below combine what top sites visibly do (observed on the fetched pages) with convention. All sequences are `opinion` unless noted.

**SaaS** (`opinion`; observed pages below are `data` that these sites do this)
- Usual order: nav -> hero (headline, subhead, primary CTA, product visual) -> logo strip -> 3 benefit/feature blocks (problem or job each) -> proof (testimonial or numbers) -> pricing (or link) -> FAQ -> final CTA -> footer.
- Observed: Notion puts logos immediately after the hero, then testimonials, three pillars, use cases, more testimonials, stats (https://www.notion.com). Linear goes hero -> four product sections -> changelog -> testimonials -> closing CTA "Built for the future. Available today." (https://linear.app). Basecamp: hero + video, product showcase, testimonials, demo invite, numbers, FAQ-like block (https://basecamp.com). Stripe ends with "Ready to get started?" (https://stripe.com).
- Job of each: hero = say what it is, for whom, what to do next; logos = cheap credibility before the reader scrolls; feature blocks = answer "how does it work"; proof = reduce risk; pricing = remove the "how much" objection; FAQ = clear remaining objections; final CTA = catch readers who scanned to the bottom.
- Drop: logo strip with no recognisable logos; pricing section if the product is sales-led (but see pricing below, hiding price has a cost); FAQ if there are no real recurring questions.

**Physical product** (`opinion`)
- Order: hero (product image in use, one-line benefit, price or "from", buy button) -> key benefits (3 to 5, each tied to a use) -> detail/specs and what is in the box -> reviews/ratings -> comparison or "why this one" -> shipping, returns, warranty -> FAQ -> final buy CTA.
- Shipping/returns/guarantee belongs near the buy button, not only the footer (`opinion`). Baymard's checkout work shows perceived trust is a large factor: 19% of surveyed users abandoned a checkout because they did not trust the site with card details (n=1,026, 2025 study) (https://baymard.com/blog/perceived-security-of-payment-form) `data`.
- Allbirds' homepage is a store front (collections, best sellers, material story), not a single-product page; use it only as a catalogue-brand example (https://www.allbirds.com) `data`.
- Drop: comparison table if only one SKU; spec table if the product is simple.

**Service or studio** (`opinion`)
- Order: hero (who you help + outcome + "book a call"/"request quote") -> proof early (named clients, results) -> services (2 to 4, each outcome-first) -> process (3 to 5 steps, shows what happens after contact) -> selected work/case studies -> about/people -> FAQ (price range, timeline, what you need from the client) -> contact form.
- NN/G found B2B buyers pay attention to testimonial author job title and company, and want case studies; they distrust hidden prices (https://www.nngroup.com/articles/b2b-trust-from-b2c/) `data` (usability studies and eyetracking; sample sizes not stated in the page).
- Drop: process section if the service is a single deliverable; about section only if the person is the brand (then keep it).

**Waitlist** (`opinion`; no test data reached)
- Order: hero (one promise + one field + button) -> how it works / what you get (3 bullets) -> why now or what makes it different -> early-access incentive (position, discount, founder access) -> single proof (founder credibility, press, count of signups if real) -> FAQ (when, how much, privacy) -> repeat form.
- Drop everything below the second form if the product does not exist yet. Never show a signup counter that is not real (see legal section).
- Form: email only. Aggregators report 1-field forms at 13.4% vs 3-field 10.1% vs 5-field 7.8% (https://www.shno.co/marketing-statistics/landing-page-conversion-statistics); I could not confirm these figures in Unbounce's own report, so `unverified`.

**Event** (`opinion`)
- Order: hero (name, date, place/online, price or "free", register) -> who it is for -> agenda/speakers -> venue/logistics -> tickets -> sponsors/past editions proof -> FAQ -> final register CTA. Date and place must be in the hero; a reader who cannot find them leaves.
- Unbounce reports events and entertainment as the highest-converting category at a 12.3% median, and SaaS the lowest at 3.8% (https://unbounce.com/conversion-benchmark-report/ ; figures as relayed by an aggregator at https://www.shno.co/marketing-statistics/landing-page-conversion-statistics) `unverified` for the exact numbers; the report itself states an all-industry median of 6.6% across 41,000 pages (https://unbounce.com/average-conversion-rates-landing-pages/) `data`.
- Drop: speakers section if not announced (say "speakers announced on <date>" or remove); sponsors if none.

### 2. Value proposition, headline, subhead

- Plain beats clever: NN/G's web-writing study (5 versions of the same site, task measures) found usability gains versus promotional writing of +58% concise, +47% scannable, +27% objective, +124% combined (https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/) `data`. The page's reading: users doubt promotional claims, which distracts from meaning. Source is a 1990s study; direction is replicated in practice but the numbers are old.
- Users read little: at most about 28% of words on an average visit; only 32% viewed the 4th paragraph versus 81% the first (https://www.nngroup.com/articles/website-reading/) `data` (figures from NN/G's earlier studies; dates 1997-2006).
- Unbounce's benchmark report: pages written at a 5th-7th grade level convert at 11.1%, "56% higher" than 8th-9th grade; correlation of conversion with reading time -19.4% and word count -18.6%; difficult vocabulary -24.3% (https://unbounce.com/conversion-benchmark-report/) `data` (correlation across ~41,000 pages, not causal; English only).
- Clarity beats cleverness in tests: CXL's case study reports a headline sequence lifting conversion 79.3% across six rounds, and the plain "Get a truck driving job with better pay" beating the runner-up by 16.2% (https://cxl.com/blog/case-study-how-we-improved-landing-page-conversion/) `unverified` (page returned 403; figures from search summary only).
- NN/G heuristic "Match between system and real world": use users' words, not internal jargon (https://www.nngroup.com/articles/ten-usability-heuristics/) `data` (heuristic, not a measurement) `opinion` for applying it to headlines.
- Benefit versus feature, specificity (named things, numbers) `opinion`: I found no test isolating them. The practical rule is a headline a stranger can restate; a subhead that says how, for whom, or with what proof.
- Real headlines as fetched (all `data` that they exist; quality is `opinion`):
  - "Financial infrastructure to grow your revenue." + subhead "Accept payments, handle business banking, and implement custom revenue models—from your first transaction to your billionth." CTAs "Get started" and "Sign up with Google" (https://stripe.com). Category noun plus outcome plus a concrete scope range.
  - "The product development system for teams and agents" + "Purpose-built for planning and building products. Designed for the AI era." (https://linear.app). Names the category. Note the hero's only CTA text came back as a news pill ("NewLoops"), so I cannot confirm its primary button label.
  - "Basecamp is project management without all the nonsense. Rock solid and famously easy to use." CTA "Try Basecamp Free" (https://basecamp.com). Opinionated position against competitors.
  - "Where teams and agents Think together." + "Capture context, find answers, and automate tasks with AI built for your team." CTAs "Get Notion free" and "Request a demo" (https://www.notion.com). Headline is abstract; the subhead does the work. Useful as a counter-example of vague headline carried by subhead (`opinion`).
  - Spanish: "Invertir es así de simple, tus inversiones reguladas" + "+200 mil personas invierten fácil y sin mínimos en fondos, APV, acciones y ETFs"; CTA "Crear cuenta" (https://fintual.cl). Uses tú; subhead carries a number.

### 3. Objection handling and FAQ

- Pre-empt objections where they arise (price, risk, effort, "will it work for me") in the sections beside the CTA; FAQ is a backstop `opinion`.
- Most reliable objection-removers with data: visible prices (NN/G: hiding prices makes a company look "dubious", adds research friction) (https://www.nngroup.com/articles/b2b-trust-from-b2c/) `data`; free trial without card, case studies, demos (same page) `data`.
- FAQ format: accordions suit FAQ because users rarely need several items at once, but hide content, raise interaction cost and need keyboard and screen-reader support; give clear headings and expand/collapse all (https://www.nngroup.com/articles/accordions-on-desktop/) `data` (NN/G guidance from usability research; no numbers).
- Write real questions in the reader's words ("¿Puedo cancelar cuando quiera?"), put answer first, 1 to 3 sentences, link out for depth. Order by how often asked / how blocking `opinion`.
- Fintual ends with FAQ after how-it-works, press and testimonials (https://fintual.cl) `data`; Basecamp has an FAQ/classes block before the footer (https://basecamp.com) `data`.
- Drop FAQ if you would have to invent the questions `opinion`.

### 4. Call-to-action hierarchy

- One primary action per page, repeated; a secondary action that is lower-commitment. Unbounce suggests designating one main CTA and letting others "catch stragglers", and shows Indochino with three CTAs at top, middle, bottom (https://unbounce.com/conversion-rate-optimization/cta-buttons-that-convert/) `opinion`.
- Observed pairs: Stripe "Get started" + "Sign up with Google"; Notion "Get Notion free" (primary) + "Request a demo" (secondary) (sources above) `data`.
- Label wording: name the outcome or action, not "Submit"/"Learn more" `opinion`. Unbounce cites "Start my free 30-day trial" vs "Start your 30-day free trial" giving +90% CTR (same page) `data` (single test, ContentVerve). Search summaries report the same author saw a 24.95% loss on a payment page and no effect in Danish tests (https://wisernotify.com/blog/call-to-action-stats/ ; secondary) `unverified`. Treat first-person labels as a hypothesis to test, not a rule. Spanish equivalent is untested in anything I found.
- Sticky CTA: Unbounce mentions sticky bars (same page) `opinion`; I found no test data. NN/G's mobile sticky-header page returned 404, so no claim.
- Button size: Unbounce quotes 44x44 px (Apple) and 34x26 (Microsoft) (same page) `opinion`; WCAG 2.2 target size is a separate formal requirement for forms-a11y (not fetched, so no claim).
- Form length. Baymard (2024): average checkout 11.3 fields, about 8 would do; 89% of sites split the name into two fields; 17% abandoned due to checkout complexity (https://baymard.com/blog/checkout-flow-average-form-fields) `data` (checkout, not lead-gen). Lead-gen specifics, 1-field 13.4% to 9-field 3.6% and multi-step +21% (https://www.shno.co/marketing-statistics/landing-page-conversion-statistics) `unverified` (aggregator, original not found). Baymard's claim that a labelled 3-step 15-field beats a 10-field single page by 11-14% appeared only in a search summary `unverified`.
- Labels: placeholders do not replace labels; every control needs a programmatic label (https://www.w3.org/WAI/tutorials/forms/labels/) `data` (W3C WAI guidance).

### 5. Social proof

Kinds and credibility (mostly `opinion`; NN/G points `data`):
- **Logos**: valuable when recognisable and real customers; NN/G lists customer logos as a key B2B trust signal via a trust summary (see https://www.nngroup.com/articles/b2b-trust-from-b2c/ for testimonials and case studies). Notion shows named brands right after the hero (https://www.notion.com) `data`. Do not show logos you have no permission to show.
- **Testimonials**: attribute with name, job title, company; NN/G found participants attend to the author's title and affiliation and respond to testimonials showing initial skepticism turning to confidence (same NN/G page) `data`. Short, specific, with an outcome. Basecamp attributes quotes to named people and organisations (https://basecamp.com) `data`.
- **Case studies**: NN/G recommends them for B2B proof (same page) `data`.
- **Numbers**: Basecamp "84 million accounts, 99.99% uptime"; Fintual "+200 mil personas" (sources above) `data`. Only publish counts you can reproduce.
- **Reviews/ratings**: use real, unfiltered, with count and source `opinion`; suppressing negatives is itself prohibited in the US (below).
- **Trust seals** (shop): Baymard found a fabricated seal still raised perceived security, with Norton SSL strongest; recommends 1-2 badges in the sensitive section (https://baymard.com/blog/perceived-security-of-payment-form) `data`. Note that this shows a seal can mislead, which is a reason not to invent one.
- **No proof yet**: say so honestly and substitute verifiable things: founder credentials, process transparency, a guarantee or free trial (NN/G recommends free trials without card, same page `data`), an actual demo, a small number of named beta users with permission, or build the proof (pilot clients) before launch `opinion`. Do not invent logos, quotes, counters or "as seen in".

Legal position:
- **US**: FTC Final Rule, 16 CFR Part 465, Trade Regulation Rule on the Use of Consumer Reviews and Testimonials, announced 2024-08-14. Bans fake reviews (including AI-generated), disseminating testimonials the business knew or should have known were fake, incentivised sentiment-conditioned reviews, undisclosed insider reviews, fake review sites, review suppression by unfounded legal threats, and buying fake followers or engagement; allows civil penalties (https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials) `data`. FTC Q&A: a business cannot knowingly disseminate testimonials where the person misrepresented having used the product; no blanket ban on AI avatars but they can violate the rule if they misrepresent a real testimonial; courts may impose civil penalties for knowing violations; no dollar figure on that page (https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers) `data`. The eCFR text (ecfr.gov) redirected and was not read, so section numbers are `unverified`.
- **EU**: Directive (EU) 2019/2161 (Omnibus) added to Annex I of the Unfair Commercial Practices Directive 2005/29/EC two always-unfair practices: item 23b (claiming reviews come from actual users without reasonable and proportionate steps to check) and item 23c (submitting or commissioning false reviews or endorsements, or misrepresenting reviews or social endorsements); applied from 2022-05-28 (https://www.makeinfluence.com/en/academy/fake-and-manipulated-reviews-what-the-eu-omnibus-directive-bans , secondary) `unverified` for exact wording: I could not retrieve the EUR-Lex text. Primary locations: https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32019L2161 and consolidated https://eur-lex.europa.eu/eli/dir/2005/29/2026-09-27/eng (listed by search, not read). The Commission's UCPD page confirms guidance covers consumer reviews and endorsements (https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law/unfair-commercial-practices-directive_en) `data`. Spain and other Member States transpose these; I did not verify national text.

### 6. Pricing presentation

- Show prices when you can. NN/G: hiding prices reads as "too scary" or "dubious" and adds friction; showing early "anchors" expectations; if exact price is impossible give typical examples (https://www.nngroup.com/articles/b2b-trust-from-b2c/) `data`.
- Differences between plans must be explicit: highlight only the attributes that differ, use progressive disclosure for minor ones; unclear differences cause wrong choices (https://www.nngroup.com/articles/explicit-differences/) `data`.
- Anchoring/decoy: Ariely's Economist experiment (MIT students): with the print-only decoy at $125, 16% chose web-only $59 and 84% print+web; without it, 68% vs 32% (summarised at https://theconversation.com/the-decoy-effect-how-you-are-influenced-to-choose-without-really-knowing-it-111259 ; secondary) `data` (lab, students, original in Predictably Irrational not read, and the "30% sales improvement" claim in some summaries is `unverified`).
- Plan count (3 is typical), recommended-plan badge, annual toggle with saving stated: I found no reachable test data. `opinion`: 3 plans, one marked recommended, annual shown as per-month price plus saving in absolute terms, same layout per plan so rows compare. Decide the default toggle state to match the plan the business wants.
- Show price versus hide: show unless truly bespoke; then show "from" or a range `opinion` supported by the NN/G point above.

### 7. Landing copy in Spanish

- Pronoun is a market decision, not a default. Spain: tú is common, including banks and SaaS; vosotros for informal plural. Mexico/most of Latin America: ustedes for plural, no vosotros. Colombia: usted is norm in commercial and B2B; tú can seem presumptuous in finance/SaaS. Argentina: voseo ("vos tenés") is standard at every level (https://www.ulatus.com/translation-blog/latin-america-vs-spain-a-decision-framework-for-spanish-website-localization/) `opinion` (vendor guidance, no study).
- Choose usted for business letters, B2B, or formal positioning; tú for friendly, younger, consumer brands; tú is increasingly accepted (https://www.spanishwriterpro.com/study-spanish-help/content-webite-in-spanish-usted-or-tu/) `opinion`.
- Observed: Fintual (Chile) uses tú ("tus inversiones") (https://fintual.cl) `data`.
- Vocabulary differs by region: ordenador / computadora, móvil / celular, coche / carro (Ulatus page) `opinion`. Pick one region per page; avoid forced "neutral" mixes without testing.
- Length: Spanish runs about 15-30% longer than English; headlines 25-30% (https://www.bubblestranslation.com/planning-for-spanish-text-expansion-what-you-need-to-know/ , vendor figure) `unverified` as a precise number; design for the larger value, write Spanish fresh rather than translating word for word, and trim. Bind buttons so a longer label does not break layout `opinion`.
- English-measured results (reading grade, first-person CTA, NN/G scannability) were not replicated in Spanish by anything I found; Aagaard's first-person effect reportedly did not reproduce in Danish (secondary, `unverified`). Use as hypotheses.
- Legal note: EU and national consumer law apply to Spanish-language pages targeting EU users (see section 5).

### Cross-document resolutions

- Pricing and plan count (vs 02, 01). Section 6 and the sequences give "3 plans, one marked recommended" as convention with no test data (stated there). 02 lists a ringed "popular" middle of three tiers as a generated tell, and 01 found no three-tier table on any of 30 well-made home pages (Pricing is a nav link on Linear, Raycast, Cal.com, Vercel; PostHog uses a usage-based section). Resolved: show prices (the NN/G evidence stands), but the plan structure follows the real offer: one plan if there is one, tiers only for real tiers, a "recommended" marker only if the business recommends a plan, and no reflexive ring/badge. "3 plans typical" is descriptive, not a template.
- Logo strip and three benefit blocks (vs 01, 02). The SaaS sequence (logo strip, then 3 benefit blocks) is convention. 01 observed section names after jobs rather than three equal cards, and logos always accompanied by numbers or milestones; 02 flags the equal three-card grid and the logo wall used as the only proof. Resolved: the sequence stays as an ordering of jobs, not a layout: the number of feature blocks follows the product, blocks vary in shape, and a logo strip needs real, permitted logos plus a number or milestone nearby.
- Observed-page drift (vs 01). Here Notion shows logos right after the hero and Linear has testimonials; 01's h2 lists place "Trusted by teams that ship" later on Notion and show no testimonial h2 on Linear. These are single loads of rotating pages and logo strips often have no h2; treat both as `data` only for the day and method of each document. Notion's headline is cited here as a pattern to avoid and in 01 as a typographic example; they judge different things.
- Measuring CTA and copy tests (vs 06). Several recommendations (first-person CTA labels, headline tests) are hypotheses to test. 06 states Cloudflare Web Analytics has no custom events, so a CTA click or form submit cannot be counted there; conversions need a Worker endpoint plus Analytics Engine or D1, and an edge A/B test on Workers Free makes every worker-first request count against 100,000 requests/day. 06 also leaves out statistical significance because Cloudflare documents none. Any skill that proposes an A/B test must therefore say how the conversion is counted and that sample size is the user's responsibility; no sample-size guidance is sourced in this research (`unverified`).
- Forms and email (vs 06). Waitlist advice here is email-only; 06's assembled Worker also collects an optional name, which is acceptable but should be dropped for waitlists. 06 finds Email Service cannot send to arbitrary visitors on Workers Free (only verified destination addresses), so a waitlist skill must not promise a confirmation email to the visitor on Free. A honeypot field must be hidden from assistive tech as well as from sight, and Turnstile managed/invisible widgets keep the extra friction low (06 section 6.2); neither point is sourced here beyond W3C label guidance.
- Cookies (vs 06). A/B assignment cookies are first-party cookies set by the Worker; the legal block here covers reviews only, so no consent claim is made in either document.

## Implications for skills

### skills/landing-copy/references/structure.md
- Give one default sequence per type (SaaS, product, service/studio, waitlist, event), each with the section's one-line job and an explicit "drop when" rule (section 1). State they are conventions, not tested, and that they order jobs, not layouts: no default "3 equal benefit cards" and no logo strip without real logos plus a number or milestone (01, 02).
- Rule: every section must earn its place; list sections that are dropped when the content is not real (logo strip without recognisable logos, speakers not announced, FAQ with invented questions).
- Waitlist and event: put the date/place or the single field in the hero; stop after the second form if the product does not exist.
- Put shipping, returns and guarantee next to the buy button for physical products; put the final CTA after the FAQ in all types.
- Keep copy short and plain: target about 5th-7th grade English reading level (Unbounce correlation), concise plus scannable plus objective (NN/G +124%).

### skills/landing-copy/references/headlines.md
- Headline = what it is, for whom or what outcome, in words a stranger can restate. Subhead = how, or the proof with a number. Quote the Stripe, Basecamp and Fintual patterns with their URLs as examples; mark Notion's abstract headline as the pattern to avoid unless the subhead rescues it.
- Specific over abstract: named categories, real numbers, but only numbers that can be reproduced.
- CTA labels: verb plus outcome, no "Submit". First-person labels are a hypothesis (+90% in one test, -24.95% in another per secondary source); do not hard-code them.
- Spanish: pick tú/usted/vos per target country before writing; write natively; allow 15-30% extra length.

### skills/landing-copy/references/proof-and-pricing.md
- Proof kinds with presentation rules: named person, job title, company, concrete outcome; logos only with permission; counts only if real; ratings with source and count.
- No-proof protocol: do not fabricate. Use founder credentials, process, guarantee, free trial, demo, honest "new" framing.
- Legal block: US 16 CFR Part 465 (FTC press release and Q&A URLs) bans fake or knowingly false testimonials, fake reviews incl. AI-generated, review suppression and bought followers, with civil penalties; EU UCPD Annex I points 23b and 23c (Omnibus) ban unverified-review claims and fake reviews. State that skills must never generate placeholder testimonials that look real; placeholders must be visibly marked and removed before ship.
- Pricing: show price; plan structure follows the real offer (one plan if one; tiers only for real tiers; a recommended marker only if the business recommends one, no reflexive ring); explicit plan differences, annual toggle with saving, consistent rows. Mark plan-count and toggle advice as convention. Note decoy effect is lab evidence. Do not copy a three-tier table onto a landing page by default (01: none seen on 30 home pages; 02: ringed middle tier is a tell).

### skills/landing-copy/references/tells.md
- Patterns to flag as generic (all `opinion` from this research): headline that names no category ("Where teams think together"), subhead repeating the headline, invented-looking logos, round-number stats without source, three-card feature grid with vague nouns, "Submit"/"Learn more" labels, unattributed or first-name-only testimonials with stock photos, "Trusted by 10,000+ teams" with no basis, promotional adjectives (NN/G: promotional writing performed worst).
- Spanish tells: literal translation of English idioms, mixing tú and usted, mixing Spain and Latin American vocabulary, English-length headlines that wrap badly.
- Legal tells: fabricated testimonials, fake counters, fake "as seen in" are not just stylistic; they violate FTC and EU rules.

### skills/landing-build/references/forms-a11y.md
- Waitlist forms on Cloudflare Free cannot send a confirmation email to the visitor (06); do not promise one. Honeypot fields must be hidden from assistive tech.
- Fewest fields: ask only what is needed to act; one "Full name" field instead of first/last (Baymard: users treat name as one entity; 89% of sites split it); email-only for waitlists.
- Every input has a visible `<label>`; placeholder is not a label (W3C WAI). Programmatic label required even if visually hidden.
- Accordion FAQ must be keyboard- and screen-reader-operable, with clear headings and expand/collapse all (NN/G).
- Button targets: at least 44x44 px as a baseline (Apple figure cited by Unbounce); check WCAG 2.2 target size separately.
- Trust seals near payment: 1-2, real ones only.
- Lead-gen field-count vs conversion table is `unverified`; do not cite numbers in the skill as fact. Multi-step forms are a plausible tactic (`unverified` size of effect).

## Sources

1. https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials
2. https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers
3. https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law/unfair-commercial-practices-directive_en
4. https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A32019L2161 (not read; located via search)
5. https://eur-lex.europa.eu/eli/dir/2005/29/2026-09-27/eng (not read; located via search)
6. https://www.makeinfluence.com/en/academy/fake-and-manipulated-reviews-what-the-eu-omnibus-directive-bans (secondary)
7. https://www.nngroup.com/articles/b2b-trust-from-b2c/
8. https://www.nngroup.com/articles/explicit-differences/
9. https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/
10. https://www.nngroup.com/articles/website-reading/
11. https://www.nngroup.com/articles/accordions-on-desktop/
12. https://www.nngroup.com/articles/ten-usability-heuristics/
13. https://unbounce.com/conversion-benchmark-report/
14. https://unbounce.com/average-conversion-rates-landing-pages/
15. https://unbounce.com/conversion-rate-optimization/cta-buttons-that-convert/
16. https://www.shno.co/marketing-statistics/landing-page-conversion-statistics (aggregator)
17. https://wisernotify.com/blog/call-to-action-stats/ (aggregator)
18. https://baymard.com/blog/checkout-flow-average-form-fields
19. https://baymard.com/blog/perceived-security-of-payment-form
20. https://cxl.com/blog/case-study-how-we-improved-landing-page-conversion/ (403; search summary only)
21. https://www.w3.org/WAI/tutorials/forms/labels/
22. https://stripe.com
23. https://linear.app
24. https://basecamp.com
25. https://www.notion.com
26. https://www.allbirds.com
27. https://fintual.cl
28. https://www.ulatus.com/translation-blog/latin-america-vs-spain-a-decision-framework-for-spanish-website-localization/
29. https://www.spanishwriterpro.com/study-spanish-help/content-webite-in-spanish-usted-or-tu/
30. https://www.bubblestranslation.com/planning-for-spanish-text-expansion-what-you-need-to-know/ (vendor; from search summary)
31. https://theconversation.com/the-decoy-effect-how-you-are-influenced-to-choose-without-really-knowing-it-111259 (secondary; from search summary)
