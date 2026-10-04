# 05 - Motion and 3D research

Researched 2026-10-04. Versions come from `npm view` on that date, sizes from the Bundlephobia API, browser data from `@mdn/browser-compat-data` 8.1.4 (published 2026-10-01) unless stated. Anything not confirmed is tagged `unverified`. Snippets tagged `untested` were written here, not copied from documentation.

## Scope

Covers motion and WebGL for landing pages: the techniques used on award-level sites, the libraries that implement them, the platform features that can replace libraries, the 3D asset pipeline, cost and safety, and motion craft principles. The goal is to feed recipe writers for the `landing-motion` skill and the `landing-review` rubric. Not covered: Spline, Blender authoring, audio, WebXR.

Method limits. Codrops pages for two tutorials returned HTTP 403 to fetch, so those are cited from search-result titles and snippets only (marked `title-only`). Browser-automation tools were not used, so no live site was inspected; live-site claims rest on third-party write-ups.

## Findings

### 1. Techniques (what, how, where to see it)

For award sites, the dominant stack described by several 2026 write-ups is Three.js + GSAP ScrollTrigger + a smooth-scroll layer, with custom shaders and aggressive asset optimisation (https://www.utsubo.com/blog/best-threejs-websites-2026, https://www.hontran.dev/blog/webgl-website-examples). Awwwards Site of the Year 2025 is reported as the Lando Norris site by OFF+BRAND, with cinematic scroll sequences and a 3D helmet (https://www.hontran.dev/blog/best-award-winning-websites-2026; the exact live domain was not checked: `unverified`).

| # | Technique | How it is built | Example / tutorial |
|---|---|---|---|
| 1 | Orchestrated hero entrance | One timeline, not many independent tweens. Stagger children, overlap with position params, one dominant easing. Keep LCP element visible early (see Cost). | https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/ (title-only; page 403) |
| 2 | Split-text reveal | `SplitText.create(el,{type:"lines,words,chars"})`, animate `y`/`autoAlpha` with `stagger`. SplitText adds aria-label/aria-hidden handling and `autoSplit` re-split on font load/resize. | https://gsap.com/docs/v3/Plugins/SplitText/ ; https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/ |
| 3 | Masked line/word reveal | SplitText `mask: "lines"` wraps each line in an `overflow: clip` element; animate inner `yPercent: 100 -> 0`. | https://gsap.com/docs/v3/Plugins/SplitText/masks/ ; https://codepen.io/GreenSock/pen/abpewXd |
| 4 | Clip-path reveals | Animate `clip-path: inset()` from fully clipped to open on an image/container; compositor cost is lower than animating width/height but it still repaints (`unverified` for exact cost). | https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/ (scroll-triggered shader reveals; title/snippet only) |
| 5 | Counters | Tween a plain object `{v:0}` and write `Math.round(v)` into the node in `onUpdate`; use `tabular-nums` to avoid width jitter. Static final value in the HTML for no-JS and reduced motion. `untested` pattern. | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ (trigger on enter) |
| 6 | Pinned / sticky sequences | ScrollTrigger `pin: true, scrub: 1, end: "+=N"` on a timeline; or CSS `position: sticky` plus a taller parent for simple cases. | https://gsap.com/docs/v3/Plugins/ScrollTrigger/ |
| 7 | Horizontal scroll section | Pin a wrapper, tween the track `xPercent: -100*(n-1)` with `ease:"none"`, `scrub`, optional `snap`. | https://codepen.io/cameronknight/pen/qBNvrRQ ; https://www.webbae.net/posts/horizontal-scrolling-section-with-pin-and-fade-effects |
| 8 | Scrollytelling | A pinned stage plus step triggers that swap state or scrub one master timeline; text steps in normal flow so it stays readable. | https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/ ; https://www.utsubo.com/blog/immersive-storytelling-websites-guide |
| 9 | Smooth scrolling | Lenis wraps native scroll (keeps sticky, anchors, a11y). With GSAP: `lenis.on('scroll', ScrollTrigger.update)`, add `lenis.raf` to `gsap.ticker`, `gsap.ticker.lagSmoothing(0)`. | https://github.com/darkroomengineering/lenis |
| 10 | Layered / pointer parallax | Layers get different multipliers on pointer or scroll; pointer values smoothed with `gsap.quickTo` or a lerp; transforms only. | https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/ (quickTo; title-only) |
| 11 | Image / video parallax | Oversize the media inside an `overflow:hidden` frame and translate it slower than the scroll. Native: `animation-timeline: view()` with `translateY`. | https://developer.chrome.com/docs/css-ui/scroll-driven-animations |
| 12 | Magnetic elements | On `pointermove` near the element, move it toward the pointer by a fraction of the offset; spring back on leave. Use `quickTo`. Pointer-fine devices only. | https://blog.olivierlarose.com/tutorials/magnetic-button ; https://codepen.io/Course-Max-One/pen/QwyjPOg |
| 13 | Custom cursor | A fixed element chased by `quickTo`, `mix-blend-mode: difference` or state classes on hover targets; hide on touch; keep the native cursor for text inputs. | https://blog.olivierlarose.com/tutorials/magnetic-button ; https://gsap.com/community/forums/topic/37258-custom-cursor/ |
| 14 | Tilt | Map pointer position within a card to `rotateX/rotateY` (small, about 6-12 degrees, `untested` range) with `perspective`; reset on leave. | https://docode.fun/post/3d-magnet-effect-button-gsap (related 3D hover pattern) |
| 15 | Drag | GSAP Draggable (free) or Motion `drag` with inertia/constraints; use `@use-gesture/react` (10.3.1, MIT) for gesture state in React. | https://motion.dev/docs/react-scroll-animations (Motion docs hub) ; npm: https://www.npmjs.com/package/@use-gesture/react |
| 16 | Page transitions (JS) | Barba.js + GSAP: leave/enter hooks, persistent canvas between pages. | https://tympanus.net/codrops/2026/04/08/creating-custom-page-transitions-in-astro-with-barba-js-and-gsap/ ; https://tympanus.net/codrops/2026/03/18/building-seamless-3d-transitions-with-webflow-gsap-and-three-js/ |
| 17 | View transitions (native) | `document.startViewTransition()` same-document; `@view-transition { navigation: auto }` cross-document, with `pageswap`/`pagereveal`. | https://developer.chrome.com/docs/web-platform/view-transitions/cross-document ; https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API |
| 18 | Shader background | Full-screen quad with a fragment shader (noise, gradient flow), `uTime` and `uMouse` uniforms, DPR capped, paused off-screen. OGL is a small fit. | https://tympanus.net/codrops/tag/glsl/page/2/ |
| 19 | Particle fields | Points / instanced mesh; GPGPU (FBO) for simulated motion, plus mouse interaction and bloom. | https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/ |
| 20 | glTF product viewer | `GLTFLoader` + Draco/Meshopt + KTX2, environment lighting, orbit with damping; in R3F `useGLTF` from drei. | https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/ (old, patterns still valid) |
| 21 | Scroll-driven camera | A camera path (spline or Blender-exported) sampled by scroll progress; GSAP ScrollTrigger scrubs a progress value, Lenis smooths it. | https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/ ; https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/ (title-only; page 403) |
| 22 | WebGL image distortion / displacement | Plane with `ShaderMaterial`, uniforms `uTexture`, `uOffset`, `uAlpha`, displacement texture or noise, drive by hover or scroll velocity. | https://tympanus.net/codrops/2019/10/21/how-to-create-motion-hover-effects-with-image-distortions-using-three-js/ ; https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/ |
| 23 | Hover ripples / gooey reveal | Noise-based mask in the fragment shader, mouse-driven. | https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/ ; https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/ |
| 24 | Grid / GPGPU displacement | Pixel-grid displacement with RGB shift driven by a pointer-fed GPGPU texture. | https://tympanus.net/codrops/2024/08/27/grid-displacement-texture-with-rgb-shift-using-three-js-gpgpu-and-shaders/ |
| 25 | WebGPU / TSL effects | Three.js TSL node materials for dissolve/dust text; persistent WebGPU scene as page transition. | https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/ |
| 26 | Scroll-linked CSS (native) | `animation-timeline: scroll()` for progress bars, `view()` + `animation-range` for reveals. | https://developer.chrome.com/docs/css-ui/scroll-driven-animations |
| 27 | Enter animation without JS | `@starting-style` gives a from-state for display/DOM-insertion transitions. | https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style (support from BCD; page not fetched) |
| 28 | Springs via CSS | `linear()` easing approximates spring/bounce curves in plain CSS. | BCD support below; generator tools `unverified` |
| 29 | Height auto animation | `interpolate-size: allow-keywords` on `:root`. | https://developer.chrome.com/docs/css-ui/animate-to-height-auto |
| 30 | Interactive vector animation | Rive state machines or dotLottie for icon/illustration loops. | https://rive.app/docs/runtimes/web/web-js |

Snippet (from GSAP docs, ScrollTrigger page): pin + scrub.

```js
let tl = gsap.timeline({
  scrollTrigger: { trigger: ".container", pin: true, start: "top top", end: "+=500", scrub: 1 }
});
tl.to(".box", { rotation: 360 });
```

Snippet (from Chrome docs): native scroll-linked reveal.

```css
@keyframes reveal { from { opacity: 0 } to { opacity: 1 } }
img { animation: reveal linear; animation-timeline: view(); }
```

Snippet (`untested`): Lenis + ScrollTrigger wiring, per the Lenis README description.

```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

### 2. Libraries

Versions: `npm view` on 2026-10-04. Sizes: Bundlephobia API (whole package entry, not tree-shaken subsets unless noted).

| Library | Version | Licence | Size min+gzip | Best for | Source URL |
|---|---|---|---|---|---|
| GSAP (core) | 3.15.0 | Standard "no charge" licence (Webflow, effective 2025-04-30); ScrollTrigger, SplitText, MorphSVG etc. all free incl. commercial | 27.4 kB (core entry; plugins are separate imports) | Timelines, ScrollTrigger pin/scrub, SplitText, Draggable, complex orchestration | https://gsap.com/community/standard-license/ ; https://www.npmjs.com/package/gsap |
| Motion (ex Framer Motion) | 14.0.0 | MIT | 47.6 kB for the full `motion` entry (the docs advertise a much smaller hybrid `animate`; exact figure `unverified`) | React component animation, layout/shared-layout, gestures, springs, `whileInView`, native ScrollTimeline-accelerated scroll | https://www.npmjs.com/package/motion ; https://motion.dev/docs/react-scroll-animations |
| Lenis | 1.3.26 | MIT | 5.5 kB | Smooth scroll that keeps native scroll semantics | https://github.com/darkroomengineering/lenis |
| Three.js | 0.186.1 | MIT | 184.9 kB (whole module; tree-shakes down for real apps) | WebGL/WebGPU 3D, loaders, shaders | https://www.npmjs.com/package/three |
| @react-three/fiber | 9.8.1 (peer: react >=19 <19.4, three >=0.156) | MIT | 57.0 kB (excl. three) | Declarative Three.js in React | https://www.npmjs.com/package/@react-three/fiber |
| @react-three/drei | 10.7.9 | MIT | 521.5 kB main entry (import named helpers; tree-shaking applies) | R3F helpers: `useGLTF`, Environment, ScrollControls, Html | https://www.npmjs.com/package/@react-three/drei ; https://drei.docs.pmnd.rs/getting-started/introduction |
| OGL | 1.0.11 (last published 2025-01-27) | Unlicense | 34.2 kB | Small WebGL layer for shader planes, meshes, particles | https://www.npmjs.com/package/ogl |
| Rive (`@rive-app/canvas`) | 2.44.0 | MIT | 59.0 kB (`canvas-lite` 51.6 kB); the WASM file is extra and not counted: `unverified` | Interactive state-machine vector animation | https://www.npmjs.com/package/@rive-app/canvas ; https://rive.app/docs/runtimes/web/web-js |
| lottie-web | 5.13.0 (published 2025-05-21) | MIT | 76.8 kB | Playing existing After Effects Lottie JSON | https://www.npmjs.com/package/lottie-web |
| dotLottie (`@lottiefiles/dotlottie-web`) | 0.80.0 (pre-1.0) | MIT | 33.0 kB (WASM extra: `unverified`) | Lottie / .lottie player, smaller files | https://www.npmjs.com/package/@lottiefiles/dotlottie-web |
| Theatre.js (`@theatre/core`) | 0.7.2 (published 2024-05-19, no release since) | core Apache-2.0; `@theatre/studio` AGPL-3.0-only (studio 237.5 kB gz, dev-time) | core 31.4 kB | Authored, timeline-edited sequences (visual editor) | https://www.npmjs.com/package/@theatre/core ; https://www.theatrejs.com/docs/latest |
| gltfjsx | 6.5.3 (2024-11-04) | MIT | CLI, n/a | glTF to R3F component, `--transform` | https://github.com/pmndrs/gltfjsx |
| @gltf-transform/cli | 4.5.1 | MIT | CLI, n/a | glTF optimisation pipeline | https://gltf-transform.dev/cli |

When plain CSS is enough:

- Hover/focus/press, simple fade-up on load: CSS transitions plus `@starting-style`.
- Scroll progress bars, reveal-on-view, simple parallax: `animation-timeline: scroll()/view()` where support allows, with a static fallback (see support table).
- Sticky stacking and sections: `position: sticky`.
- Height-auto reveals: `interpolate-size` (Chromium-only today).
- Page-to-page fade or shared-element: View Transitions.
- Reach for GSAP when you need sequencing across many elements, scrubbed pinned timelines, SplitText, or Draggable. Reach for Motion for React layout/shared-element and gesture work. Reach for Three/OGL only when the effect needs pixels CSS cannot produce.

Notes:

- GSAP licence: the page states it is free for everyone with plugins like SplitText and MorphSVG free for commercial use, and bans use inside tools that compete with Webflow's visual animation builder; "AI-generated code is not a Prohibited Use" (https://gsap.com/community/standard-license/). It is a custom licence, not OSI open source.
- GSAP's `latest` dist-tag is 3.15.0; a `next` tag is 3.0.0-beta.11 and is not a v4 signal (https://www.npmjs.com/package/gsap).
- Lenis: README says it respects `prefers-reduced-motion` by default; Safari is capped at 60 fps and low-power mode at 30 fps; no native CSS scroll-snap (https://github.com/darkroomengineering/lenis). I did not verify the reduced-motion claim in source: `unverified`.
- drei uses `three-stdlib` instead of three's examples folder (https://drei.docs.pmnd.rs/getting-started/introduction).
- SplitText v3.13.0+ was rewritten with about 50% smaller size (https://gsap.com/docs/v3/Plugins/SplitText/).

### 3. Platform features and browser support

Version = first version with support (from MDN BCD 8.1.4 unless noted). "preview" means BCD lists only a preview/flag state.

| Feature | Chrome / Edge | Firefox | Safari (macOS / iOS) | Notes and source |
|---|---|---|---|---|
| `animation-timeline`, `scroll()`, `view()`, `animation-range` | 115 | preview only (flag/Nightly; not stable per BCD) | 26 / 26 | Progressive enhancement only; gate with `@supports (animation-timeline: scroll())`. Chrome docs: runs off main thread. https://developer.chrome.com/docs/css-ui/scroll-driven-animations ; BCD https://github.com/mdn/browser-compat-data |
| View Transitions, same-document (`startViewTransition`) | 111 | 144 | 18 / 18 | `caniuse` data lists Safari 27 as first full "y", BCD says 18; treat 18 as the floor, `unverified` for partial gaps. https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API |
| View Transitions, cross-document (`@view-transition`) | 126 | not supported in BCD; Chrome docs list Firefox 147+ (conflict) | 18.2 / 18.2 | Same-origin only. Conflict between BCD and Chrome doc: `unverified` for Firefox. https://developer.chrome.com/docs/web-platform/view-transitions/cross-document |
| View transition types (`ViewTransitionTypeSet`) | 125 | 147 | 18.2 / 18.2 | BCD |
| `@starting-style` | 117 | 129 | 17.5 / 17.5 | BCD |
| `linear()` easing | 113 | 112 | 17.2 / 17.2 | BCD (`css.types.easing-function.linear-function`) |
| `interpolate-size` / `calc-size()` | 129 | no | no | Experimental. https://developer.chrome.com/docs/css-ui/animate-to-height-auto |
| `prefers-reduced-motion` | 74 | 63 | 10.1 (caniuse lists 11) | https://web.dev/articles/prefers-reduced-motion ; caniuse data (Fyrd/caniuse). Global usage about 96% |
| WebGL 2 | 56 | 51 | 15 / 15 | caniuse data; global about 96% |
| WebGPU (`navigator.gpu`) | 113 desktop (Win/macOS/ChromeOS), Android 121, Linux Intel Gen12+ 144 | Windows 141, macOS Apple Silicon 145, other macOS 147, Linux/Android still Nightly | 26 / 26 (macOS, iOS, iPadOS, visionOS) | https://github.com/gpuweb/gpuweb/wiki/Implementation-Status . BCD lists Chrome 144 for the interface because of platform notes; use the wiki. Global about 86% (caniuse). |

Three.js WebGPU status:

- `WebGPURenderer` picks WebGPU when available and falls back to a WebGL 2 backend automatically; `forceWebGL: true` forces the fallback (https://threejs.org/docs/pages/WebGPURenderer.html).
- Imports: `three/webgpu` for the renderer and `three/tsl` for TSL (Migration Guide: https://github.com/mrdoob/three.js/wiki/Migration-Guide). The renderer needs `await renderer.init()` or `setAnimationLoop` before sync calls.
- Three.js is at r186 (0.186.1, 2026-09-24). Whether WebGPURenderer is the officially recommended default for production is not stated in the pages I read: `unverified`. Codrops and community shipped WebGPU/TSL tutorials in 2026 (https://tympanus.net/codrops/tag/webgpu/).
- r3f 9.x targets WebGLRenderer by default; WebGPU use in r3f was not checked: `unverified`.

### 4. 3D asset pipeline

- Format: GLB (binary glTF) as the delivery format. Convert, dedupe, prune and compress with glTF Transform (`optimize`, `draco`, `meshopt`, `resize`, `dedup`, `prune`, `simplify`); its docs warn that `optimize` defaults suit not every scene, so inspect first (https://gltf-transform.dev/cli).
- Geometry: Draco (smaller, needs WASM decoder, decode cost) or Meshopt (faster decode, good with animation/quantisation). Choice guidance: `unverified` beyond tool descriptions.
- Textures: KTX2 / Basis stay compressed on the GPU; WebP/PNG/JPEG decode to full RGBA in VRAM. `KTX2Loader` needs `setTranscoderPath` and `detectSupport(renderer)`. The KTX2 VRAM claim is general knowledge, not read on a fetched page: `unverified`.
- Loader setup (from three.js docs summary; transcoder CDN path in that summary was a stale `r128` URL, so self-host decoders from `three/examples/jsm/libs/`):

```js
const gltfLoader = new GLTFLoader();
const draco = new DRACOLoader(); draco.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(draco);
const ktx2 = new KTX2Loader(); ktx2.setTranscoderPath('/basis/'); ktx2.detectSupport(renderer);
gltfLoader.setKTX2Loader(ktx2);
gltfLoader.setMeshoptDecoder(MeshoptDecoder);
```
Source: https://threejs.org/docs/#GLTFLoader

- gltfjsx: `npx gltfjsx model.glb --transform` produces a Draco-compressed, 1024x1024-resized, WebP, deduped, instanced, pruned GLB and a React component; the README claims 70%-90% size reduction. `--types` for TypeScript, `--meshopt` as the alternative (https://github.com/pmndrs/gltfjsx). Note the `--transform` WebP output is not GPU-compressed.
- Lazy loading: do not import Three or the GLB in the critical path; load after first paint or on IntersectionObserver entry; show a poster image meanwhile (poster also protects LCP, since a `<canvas>` is not an LCP candidate per the LCP element list: https://web.dev/articles/lcp, which lists img/video poster/background-image/text blocks).
- Size budgets: no authoritative source found for numbers. Working targets, `unverified`: hero model under about 1-2 MB over the wire, textures 1024-2048 px, one scene under 100-150k triangles on mobile. Writers should present these as heuristics, not rules.

### 5. Cost and safety

Metric thresholds (75th percentile): LCP 2.5 s good, 4.0 s poor (https://web.dev/articles/lcp); INP 200 ms good, 500 ms poor (https://web.dev/articles/inp); CLS 0.1 good, 0.25 poor (https://web.dev/articles/optimize-cls).

| Technique | LCP | INP | CLS | Main thread / battery |
|---|---|---|---|---|
| Entrance animation starting at `opacity:0` | Elements with opacity 0 are not LCP candidates, so the hero image/headline counts only once visible; a long delay delays LCP (https://web.dev/articles/lcp) | low | none if transforms | low |
| SplitText on large copy | Text delayed by JS-run split | main-thread cost at split/resize | re-split on font load can shift; use `autoSplit` and reserve line boxes | DOM nodes multiply (chars) |
| ScrollTrigger pin/scrub | none | scroll handlers add to main thread | pin spacers insert layout; set stable heights | continuous per-frame work |
| CSS scroll-driven animation | none | runs off main thread (Chrome docs) | none for transform/opacity | lowest of the scroll options |
| Lenis | none | rAF loop continuous | none | extra rAF work; 30 fps in Safari low-power |
| Layout-property animation (`top`, `left`, `width`) | n/a | jank | can cause shifts even on own layer (https://web.dev/articles/optimize-cls) | high |
| WebGL canvas | big JS+asset download delays everything else | GPU/main contention, shader compile stalls (MDN suggests `KHR_parallel_shader_compile`) | reserve canvas size | highest battery use; cap DPR |

Compositor-only properties: `transform` and `opacity`; avoid layout/paint-triggering properties (https://web.dev/articles/animations-guide). `will-change`: last resort, not blanket; set before and remove after; creates stacking context, uses memory (https://developer.mozilla.org/en-US/docs/Web/CSS/will-change).

Pause work you cannot see:

- `visibilitychange` / `document.hidden`: pause timers and loops; browsers already stop rAF in background tabs (https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API).
- IntersectionObserver: start/stop render loops for canvases and videos when off-screen. Motion uses a pooled IntersectionObserver for `whileInView` (https://motion.dev/docs/react-scroll-animations). Snippet `untested`:

```js
new IntersectionObserver(([e]) => e.isIntersecting ? loop.start() : loop.stop()).observe(canvas);
```

Frame budget: 16.7 ms at 60 Hz. The figure is arithmetic, not a sourced claim. Render on demand where the scene is static.

WebGL availability and fallback (`untested`):

```js
function webglOk() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2', { failIfMajorPerformanceCaveat: true }));
  } catch { return false; }
}
```

Also handle `webglcontextlost` / `webglcontextrestored` (MDN best-practices: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices). `failIfMajorPerformanceCaveat` is from general knowledge, not read on that page: `unverified`. Fallback should be a real image or video poster, not a blank block.

`prefers-reduced-motion`:

- WCAG 2.3.3 Animation from Interactions is Level AAA; vestibular triggers named include parallax scrolling, unnecessary movement during scroll and non-essential transitions; effects can include nausea and migraine; techniques are the media query, JS, or a site preference control (https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html).
- web.dev advice: remove decorative effects (animated gradients, parallax, autoplay video, attention-catching reveals); keep feedback animations, loading indicators and essential motion (https://web.dev/articles/prefers-reduced-motion). So: reduce, do not strip all feedback. Typical reduction: replace travel with a short opacity fade, drop parallax, drop scrub, stop autoplay loops.
- Listen to change, not only initial read:

```js
const mq = matchMedia('(prefers-reduced-motion: reduce)');
mq.addEventListener('change', apply);
```
(from web.dev article above.)
- GSAP: `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` conditions is documented under ScrollTrigger's matchMedia feature (https://gsap.com/docs/v3/Plugins/ScrollTrigger/); exact conditions syntax `untested` here.
- WCAG 2.2.2 (pause, stop, hide for auto-playing motion over 5 s) and 2.3.1 (three flashes) are related criteria; not fetched here: `unverified` as wording.

### 6. Motion principles

- Purpose first; frequency matters; keyboard-initiated actions should not be animated; UI animation generally under 300 ms; 180 ms feels more responsive than 400 ms. Marketing content is the stated exception to speed limits (Emil Kowalski, https://emilkowal.ski/ui/you-dont-need-animations).
- Easing and duration are what makes motion feel right or wrong; springs for organic motion (https://animations.dev/).
- Material guidance: 200-300 ms on mobile, about 30% longer on tablet; asymmetric acceleration/deceleration; emphasised decelerate `cubic-bezier(0.2, 0, 0, 1)`, accelerate `cubic-bezier(0.3, 0, 0.8, 0.15)` (https://m1.material.io/motion/duration-easing.html summary from search; page not fetched, so values `unverified` against the page).
- Choreography: one lead element, others follow with small stagger and overlap; reserve large travel for one hero moment (synthesis of the sources above; opinion).
- What reads as generic or generated (synthesis, opinion, not a single source): everything fades up 20-30 px with the same `ease-in-out` and 0.6-1 s; identical stagger on every section; every card gets hover-lift; gradient blobs; scroll-jacking with no content reason; a tilted-card effect on everything; default `ease` or `linear` on non-scrub motion; reveals that replay on scroll back; animation that exists on text the user is already reading. Tell the agent to vary by role (entrance, feedback, scroll-linked), use ease-out for entering and ease-in for leaving, and pick one signature motion per page.

### Cross-document resolutions

- Motion tells (vs 02). 02 lists fade-in on every section, hover lift on cards, stagger on lists, bounce easing and count-up stats as generated tells. Techniques in section 1 (split-text, counters, clip-path and masked reveals, tilt, magnetic elements, stagger) overlap those names. Resolved: the tell is uniform, role-less application (the same fade-up, easing and stagger on every block, a count-up on an unsourced round number, hover lift on every card), which section 6 here also lists as generic. A technique is acceptable when it has a role (entrance, feedback, scroll-linked), varies by role, and has a reduced-motion variant. Counters: only for real, sourced figures, with the final number in the HTML. Bounce easing and Magic UI/AOS library defaults stay on the avoid list.
- Reduced motion (vs 02). 02 says "gate motion behind `prefers-reduced-motion`" and its script can only detect the media query's presence. Here the rule is reduce, not remove everything: keep feedback and short fades; remove parallax, scrubbed scroll, autoplay loops and large travel. Both statements stand together: gate = provide the reduced variant; reduce vs remove depends on motion type (web.dev, WCAG 2.3.3, cited in section 5). The safety.md bullet below states it in one rule.
- Browser support (vs 03). No feature appears in both support tables. This document uses MDN BCD 8.1.4, 03 uses caniuse; do not merge numbers across them. Where they could meet (`prefers-reduced-motion` Safari 10.1 BCD vs 11 caniuse is already noted in this document) cite the BCD floor and flag the gap.
- Library licences and Next.js (vs 06). 06 recommends vinext for Next on Workers and static output on Workers assets. Nothing here conflicts: heavy 3D assets (GLB, decoders) are static files subject to 06's 25 MiB per-file and 20,000-file Workers Free limits (06 section 7); this document gives no byte budget that exceeds them (hero model heuristic 1-2 MB, `unverified`).

## Implications for skills

### skills/landing-motion/references/foundations.md

- State the decision ladder: CSS first (transitions, `@starting-style`, sticky, `scroll()/view()` where supported), then Motion or GSAP, then WebGL only if the effect cannot be done otherwise.
- Principles: purpose, frequency, under 300 ms for UI feedback, longer only for marketing hero moments; ease-out on entrance; one signature motion per page; stagger small and consistent.
- Include the "generic tells" list from Findings 6 as things to avoid, labelled as opinion, and state that the same techniques are acceptable when they have a role, vary by role and have a reduced-motion variant (see Cross-document resolutions; matches 02).
- Tokens: define duration and easing as CSS custom properties; include a `linear()` spring token with a fallback to `cubic-bezier` (support 113 / 112 / 17.2).
- Compositor-only rule: animate `transform` and `opacity`.

### skills/landing-motion/references/entrances-text.md

- One timeline per hero; keep LCP content visible quickly (opacity-0 elements are not LCP candidates until shown). Do not hide the LCP image or headline behind a long entrance; keep the delay under a few hundred ms (target is a heuristic, `unverified`).
- SplitText recipes: lines with `mask: "lines"`, `autoSplit: true`, `aria` handled by the plugin, re-split on font load. Warn against splitting to chars on long paragraphs.
- Counters: only for real, sourced figures (a count-up on a round-number stat is a tell per 02); static final number in HTML, tween a number object, `font-variant-numeric: tabular-nums`.
- Clip-path and masked reveals; provide a reduced-motion variant (plain fade or no motion).

### skills/landing-motion/references/scroll.md

- Native first: `animation-timeline: scroll()/view()` with `animation-range` behind `@supports`, with a static or IntersectionObserver fallback because Firefox stable lacks it (BCD: preview only).
- GSAP ScrollTrigger recipes: pin + scrub, horizontal scroll (`xPercent`, `ease:"none"`, `snap`), scrollytelling with a pinned stage. Provide the Lenis wiring snippet. Note pin spacers and layout stability; call `ScrollTrigger.refresh()` after fonts/images load (general knowledge, `unverified`).
- Smooth scroll is optional; do not add Lenis unless a scroll-linked effect needs it. Disable under reduced motion.
- Cross-document view transitions as the page-transition option for multi-page sites (Chrome 126, Safari 18.2; Firefox conflict noted).

### skills/landing-motion/references/parallax.md

- Prefer CSS `view()` parallax with transform-only layers; JS fallback only if needed.
- Vestibular warning: parallax is a named trigger in WCAG 2.3.3 and web.dev, so remove it (not only slow it) under `prefers-reduced-motion: reduce`.
- Pointer parallax: smooth with `quickTo` or lerp, small amplitude, pointer-fine devices only.
- Image/video parallax: oversize inside overflow-hidden frame; fixed aspect ratio to avoid CLS.

### skills/landing-motion/references/interaction.md

- Magnetic buttons, custom cursor, tilt, drag: restrict to `(hover: hover) and (pointer: fine)`; keep native cursor on inputs and text; never hide focus rings; magnetic effect must not move the hit target away from the pointer in a way that causes mis-clicks.
- Use `gsap.quickTo` for pointer followers (single tween, reused).
- Drag: Draggable or Motion `drag`; keyboard alternative required.
- Skip interactive flourishes for high-frequency controls (Emil Kowalski principle).

### skills/landing-motion/references/webgl-3d.md

- Progressive enhancement: check WebGL support, show poster fallback, handle context loss, cap DPR, pause off-screen and when the tab is hidden.
- Pick the smallest tool: CSS/SVG, then OGL for a single shader plane or particles (34 kB gz), then Three, then R3F + drei if the app is React.
- Shader recipes: hover distortion, displacement, gooey reveal, shader background, GPGPU particles, with the Codrops links.
- Asset pipeline: GLB, glTF Transform (`optimize`), Draco or Meshopt, KTX2, self-hosted decoders, gltfjsx `--transform` for R3F, lazy import after first paint. Size budgets are heuristics (`unverified`).
- WebGPU: optional, use `three/webgpu` which falls back to WebGL 2; supported Chrome 113+, Safari 26+, Firefox 141+ (Windows). Do not make it a requirement.

### skills/landing-motion/references/libraries.md

- Embed the libraries table (versions as of 2026-10-04) and the "when CSS is enough" list.
- Licensing: GSAP is free including ScrollTrigger and SplitText under the Webflow standard licence (not MIT; competing-builder restriction). Theatre.js Studio is AGPL-3.0, so keep it out of production bundles. Rive, Lottie, dotLottie, Lenis, Motion, Three, R3F, drei are MIT; OGL is Unlicense.
- Maintenance flags: lottie-web last release 2025-05, OGL 2025-01, Theatre 2024-05, gltfjsx 2024-11. Recommend dotLottie for new Lottie work, Rive for interactive.
- Do not load two animation engines for the same job (GSAP and Motion together only when React layout animation is needed).

### skills/landing-motion/references/safety.md

- `prefers-reduced-motion`: provide a reduced variant (the detector in 02 checks only that the media query exists). Reduce rather than remove everything: remove parallax, autoplay loops, scrubbed scroll animation, large travel; keep short fades and feedback. Subscribe to `change`. Offer a site toggle (WCAG 2.3.3 technique 3).
- Pausing: IntersectionObserver for canvases/video, `visibilitychange` for loops.
- Performance: transform/opacity only, `will-change` sparingly and removed after, DPR cap, avoid animating layout, reserve space for canvases and SplitText lines to protect CLS.
- Core Web Vitals thresholds: LCP 2.5 s, INP 200 ms, CLS 0.1.
- WebGL fallback and context-loss handling.
- WCAG 2.2.2 and 2.3.1 as additional checks, wording to be verified before quoting.

### skills/landing-review/references/rubric.md

Suggested checks:

- Does every animation have a stated purpose, and are decorative ones removable?
- Is the LCP element visible without waiting on JS or a long entrance?
- Does the page respect `prefers-reduced-motion` with reduced (not blank) behaviour, including parallax and smooth scroll?
- Only `transform`/`opacity` animated; no layout properties; `will-change` not blanket.
- Off-screen canvases, videos and loops paused; hidden-tab handling present.
- Fallback for no-WebGL and for browsers lacking scroll-driven animations or view transitions.
- 3D assets: compressed GLB, lazy loaded, poster present.
- Motion variety: not every block uses the same fade-up, easing and stagger; one signature moment; durations within range.
- No scroll-jacking that blocks reading or native keyboard scrolling.
- Library count and licence sanity (no AGPL studio code shipped).

## Sources

1. https://gsap.com/community/standard-license/
2. https://gsap.com/docs/v3/Plugins/ScrollTrigger/
3. https://gsap.com/docs/v3/Plugins/SplitText/
4. https://gsap.com/docs/v3/Plugins/SplitText/masks/
5. https://codepen.io/GreenSock/pen/abpewXd
6. https://gsap.com/community/forums/topic/37258-custom-cursor/
7. https://github.com/darkroomengineering/lenis
8. https://motion.dev/docs/react-scroll-animations
9. https://drei.docs.pmnd.rs/getting-started/introduction
10. https://rive.app/docs/runtimes/web/web-js
11. https://www.theatrejs.com/docs/latest
12. https://github.com/pmndrs/gltfjsx
13. https://gltf-transform.dev/cli
14. https://threejs.org/docs/#GLTFLoader
15. https://threejs.org/docs/pages/WebGPURenderer.html
16. https://github.com/mrdoob/three.js/wiki/Migration-Guide
17. https://github.com/gpuweb/gpuweb/wiki/Implementation-Status
18. https://github.com/mdn/browser-compat-data (data from npm `@mdn/browser-compat-data` 8.1.4)
19. https://github.com/Fyrd/caniuse (data.json, fetched 2026-10-04)
20. https://developer.chrome.com/docs/css-ui/scroll-driven-animations
21. https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
22. https://developer.chrome.com/docs/css-ui/animate-to-height-auto
23. https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
24. https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
25. https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
26. https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
27. https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices
28. https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
29. https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
30. https://web.dev/articles/prefers-reduced-motion
31. https://web.dev/articles/animations-guide
32. https://web.dev/articles/lcp
33. https://web.dev/articles/inp
34. https://web.dev/articles/optimize-cls
35. https://emilkowal.ski/ui/you-dont-need-animations
36. https://animations.dev/
37. https://m1.material.io/motion/duration-easing.html
38. https://tympanus.net/codrops/2025/09/03/7-must-know-gsap-animation-tips-for-creative-developers/
39. https://tympanus.net/codrops/2025/05/14/from-splittext-to-morphsvg-5-creative-demos-using-free-gsap-plugins/
40. https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/
41. https://tympanus.net/codrops/2026/07/07/building-a-scroll-driven-3d-gallery-using-a-blender-camera-path-with-three-js-and-gsap/
42. https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/
43. https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/
44. https://tympanus.net/codrops/2026/04/08/creating-custom-page-transitions-in-astro-with-barba-js-and-gsap/
45. https://tympanus.net/codrops/2026/03/18/building-seamless-3d-transitions-with-webflow-gsap-and-three-js/
46. https://tympanus.net/codrops/2019/10/21/how-to-create-motion-hover-effects-with-image-distortions-using-three-js/
47. https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/
48. https://tympanus.net/codrops/2019/10/23/making-gooey-image-hover-effects-with-three-js/
49. https://tympanus.net/codrops/2020/04/14/interactive-webgl-hover-effects/
50. https://tympanus.net/codrops/2024/08/27/grid-displacement-texture-with-rgb-shift-using-three-js-gpgpu-and-shaders/
51. https://tympanus.net/codrops/2024/12/19/crafting-a-dreamy-particle-effect-with-three-js-and-gpgpu/
52. https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/
53. https://tympanus.net/codrops/2019/09/17/how-to-build-a-color-customizer-app-for-a-3d-model-with-three-js/
54. https://tympanus.net/codrops/tag/glsl/page/2/
55. https://tympanus.net/codrops/tag/webgpu/
56. https://blog.olivierlarose.com/tutorials/magnetic-button
57. https://codepen.io/Course-Max-One/pen/QwyjPOg
58. https://docode.fun/post/3d-magnet-effect-button-gsap
59. https://codepen.io/cameronknight/pen/qBNvrRQ
60. https://www.webbae.net/posts/horizontal-scrolling-section-with-pin-and-fade-effects
61. https://www.utsubo.com/blog/best-threejs-websites-2026
62. https://www.utsubo.com/blog/immersive-storytelling-websites-guide
63. https://www.hontran.dev/blog/best-award-winning-websites-2026
64. https://www.hontran.dev/blog/webgl-website-examples
65. https://www.npmjs.com/package/gsap
66. https://www.npmjs.com/package/motion
67. https://www.npmjs.com/package/three
68. https://www.npmjs.com/package/@react-three/fiber
69. https://www.npmjs.com/package/@react-three/drei
70. https://www.npmjs.com/package/ogl
71. https://www.npmjs.com/package/@rive-app/canvas
72. https://www.npmjs.com/package/lottie-web
73. https://www.npmjs.com/package/@lottiefiles/dotlottie-web
74. https://www.npmjs.com/package/@theatre/core
75. https://www.npmjs.com/package/@use-gesture/react
76. https://bundlephobia.com (API: /api/size, queried 2026-10-04)
