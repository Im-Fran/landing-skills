# 06 - Cloudflare launch research

Date read: 2026-10-04. All documentation is from developers.cloudflare.com, fetched on that date. Markers: **verified** = read on the cited page; **assembled, untested** = code or config written by the researcher from documented APIs, never run; **unverified** = not confirmed in current docs, the writer must leave it out.

## Scope

Research for the `landing-skills` plugin, covering what a Cloudflare launch skill may recommend for a landing page on the Workers Free plan:

1. Static hosting (Workers static assets vs Pages), config, deploy, dev, dry-run, framework builds (plain HTML, Astro, Next, Vite + React).
2. Custom domains, routes, redirects, headers, asset caching, custom 404.
3. Preview deployments and versioned deploys.
4. Cloudflare Web Analytics, and the Cloudflare-native way to count conversions.
5. A/B testing at the edge with a Worker in front of static assets.
6. Form handling: Worker endpoint, server validation, Turnstile Siteverify, storing or forwarding leads, secrets.
7. Free-plan pricing and limits.

Nothing was deployed, authenticated, or changed in any account. No `wrangler` command was run.

## Findings

### 1. Hosting a static site

**1.1 Recommended path: Workers static assets, not Pages.** (verified)
- "Workers Static Assets is the recommended way to deploy static sites, single-page applications, and full-stack apps on Cloudflare. If you are starting a new project, use Workers instead of Pages. Pages continues to work, but new features and optimizations are focused on Workers." https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
- The Pages getting-started page says: "Workers supports most Pages use cases and offers a broader feature set. It is Cloudflare's primary platform for building applications. Start new projects with Workers." https://developers.cloudflare.com/pages/get-started/
- Remaining Pages advantages per the compatibility matrix: Early Hints, file-based routing, Pages Plugins, custom domains outside Cloudflare zones. "Unlike Pages, Workers does not support any domain whose nameservers are not managed by Cloudflare." https://developers.cloudflare.com/workers/static-assets/compatibility-matrix/ and https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
- Pages Free limits for reference: 500 builds per month, 20,000 files. https://developers.cloudflare.com/pages/platform/limits/

**1.2 Minimal static-only config.** (verified, quoted from the Workers best-practices page; no `main`, no Worker script)

```jsonc
{
	// Static site — no Worker script needed
	"name": "my-static-site",
	// Set this to today's date
	"compatibility_date": "2026-09-24",
	"compatibility_flags": ["nodejs_compat"],

	"assets": {
		"directory": "./dist",
	},
}
```

TOML equivalent from the same page: `name`, `compatibility_date`, then `[assets]` with `directory = "./dist"`. File name: the docs use `wrangler.jsonc` (also `wrangler.json`, `wrangler.toml` are accepted per https://developers.cloudflare.com/workers/framework-guides/web-apps/react/). `nodejs_compat` is shown on that page but is not needed for a pure static site (my reading; the Astro static example omits it: https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/). Set `compatibility_date` to the date of writing.

Asset config keys (verified, https://developers.cloudflare.com/workers/static-assets/binding/): `directory`, `binding`, `run_worker_first` (boolean or array of up to 100 patterns), `not_found_handling`, `html_handling`. "Only one collection of static assets can be configured in each Worker." `.assetsignore` in the assets directory uses `.gitignore` format.

**1.3 Commands.**
| Purpose | Command | Status / source |
|---|---|---|
| Local dev | `npx wrangler dev` | verified, https://developers.cloudflare.com/workers/static-assets/get-started/ |
| Deploy | `npx wrangler deploy` | verified, same page |
| Deploy a folder with no config file | `wrangler deploy <dir>` (equivalent to `--assets`) | verified, but "currently only works only in interactive mode (so not in CI systems)", https://developers.cloudflare.com/workers/wrangler/commands/workers/ ; flags `--assets` is labelled beta |
| Dry run, no deploy | `npx wrangler deploy --dry-run` ("Compile a project without actually deploying to live servers."), optional `--outdir <dir>` to inspect output | verified, https://developers.cloudflare.com/workers/wrangler/commands/workers/ |
| Dry run of an upload | `npx wrangler versions upload --dry-run` ("Compile a project and run checks without actually uploading the Worker") | verified, same page |
| Dry run of project auto-config | `npx wrangler setup --dry-run` ("outputs a summary of the configuration that would be generated") | verified, https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/ |
| Auto-configure a framework project | `npx wrangler deploy` with no config file detects the framework and prompts; `--yes` skips prompts | verified, same page and commands page |

- Whether `--dry-run` validates the assets directory (file count, size) or needs authentication: **unverified**. The docs only say it compiles the project.
- `wrangler deploy --temporary` (Wrangler 4.102.0+) deploys to a temporary preview account when no credentials exist and prints a claim URL, valid "within 60 minutes". It errors if Wrangler already has credentials. Intended for AI agents; production and CI should use a permanent account. verified, https://developers.cloudflare.com/workers/platform/claim-deployments/ . Surprising; the skill should not default to it for a user's real site.
- A documented zero-config alternative (Wrangler 4.55+, experimental flag): `npx wrangler deploy --x-autoconfig` detects static sites and frameworks. https://developers.cloudflare.com/changelog/post/2025-12-16-wrangler-autoconfig/ (changelog dated 2025-12-16; the later automatic-configuration page shows plain `wrangler deploy` doing this, so the flag may be obsolete: treat `--x-autoconfig` as **unverified for current Wrangler**).

**1.4 Framework builds.** All build first, then `wrangler deploy` uploads the output directory.
- *Plain HTML*: put files in a folder (the C3 "Static site" template uses `public/`), set `assets.directory`. `npm create cloudflare@latest -- my-static-site`, choose "Hello World example" then "Static site". verified, https://developers.cloudflare.com/workers/static-assets/get-started/
- *Astro (static)*: config is only `"assets": {"directory": "./dist"}` (no `main`). Build and deploy: `npx astro build` then `npx wrangler@latest deploy`. SSR needs `npx astro add cloudflare` plus `main: "./dist/_worker.js/index.js"`, `nodejs_compat`. Scaffold: `npm create cloudflare@latest -- my-astro-app --framework=astro`. Node: Astro 6.x and 7.x require Node.js 22.12.0 or later. Bindings cannot be used on a purely static Astro site. verified, https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
- *Vite + React (SPA)*: scaffold `npm create cloudflare@latest -- my-react-app --framework=react`; `vite.config.ts` uses `plugins: [react(), cloudflare()]` from `@cloudflare/vite-plugin`; `wrangler.jsonc` needs `"assets": {"not_found_handling": "single-page-application"}`; scripts `npm run dev`, `npm run build`, `npm run preview`, `npm run deploy`. With the SPA setting, navigation requests that match no asset get `index.html` and do not invoke the Worker (free). verified, https://developers.cloudflare.com/workers/framework-guides/web-apps/react/ and https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/ (second page not opened; only referenced from the binding page)
- *Next.js*: "Cloudflare recommends vinext as the default way to run Next.js applications on Cloudflare Workers" (beta; run `npx vinext check` first). Static export: "Use `output: "export"` for static exports." Scaffold: `npm create cloudflare@latest -- my-next-app --framework=next`. OpenNext remains documented for existing apps. verified, https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ . The output folder name for a plain `output: "export"` build (`out`) is Next.js behaviour, **unverified** in Cloudflare docs; the writer should say "point `assets.directory` at the export folder".
- Framework list: https://developers.cloudflare.com/workers/framework-guides/

### 2. Domains, routes, redirects, headers, caching, 404

**2.1 Custom domains.** (verified, https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- Requires "An active Cloudflare zone" and a Worker. Cloudflare creates the DNS record and certificate. "You cannot create a Custom Domain on a hostname with an existing CNAME DNS record or on a zone you do not own."
- Wrangler:
```jsonc
{
	"routes": [
		{
			"pattern": "shop.example.com",
			"custom_domain": true
		}
	]
}
```
- Dashboard: Workers & Pages > the Worker > Settings > Domains & Routes > Add > Custom Domain.
- CLI flag `wrangler deploy --domain example.com` exists (verified, commands page). Routes (path subsets) are a separate mechanism: https://developers.cloudflare.com/workers/configuration/routing/routes/ (linked, not read).
- Disable the `workers.dev` URL with `"workers_dev": false` in config; if you only disable it in the dashboard, the next `wrangler deploy` re-enables it. verified, https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
- Domain not on Cloudflare nameservers cannot be used with Workers.

**2.2 `_redirects`.** (verified, https://developers.cloudflare.com/workers/static-assets/redirects/) Plain text file named `_redirects` in the assets directory. Line format `[source] [destination] [code?]`. Codes 301, 302, 303, 307, 308; default 302. Limits: 2,000 static + 100 dynamic = 2,100 total, 1,000 characters per line. Splat `*` referenced as `:splat`; placeholders `:name`. "Redirects defined in the `_redirects` file are not applied to requests served by your Worker code."

**2.3 `_headers`.** (verified, https://developers.cloudflare.com/workers/static-assets/headers/) File `_headers` in the assets directory, not itself served. Format: a URL pattern line, then indented `Name: value` lines. Up to 100 rules, 2,000 characters per line. Absolute URLs must start with `https`. Examples from the page:
```txt
/*
  Access-Control-Allow-Origin: *
```
```txt
/static/*
  Cache-Control: public, max-age=31556952, immutable
```
Whether `_headers` applies to responses fetched through `env.ASSETS.fetch()` from a Worker: **unverified**. Caution: the `.assetsignore` example on the binding page lists `_headers` and `_redirects` as files to exclude when migrating from Pages; do not add them to `.assetsignore` in a Workers project that wants them honoured (my reading of the two pages).

**2.4 Asset caching.** (verified, headers page) Default headers on static asset responses: `Content-Type`, `Cache-Control: public, max-age=0, must-revalidate` (when no `Authorization` or `Range` header), `ETag` (hash of the file), `CF-Cache-Status`. So HTML and fingerprinted files are revalidated on every use unless you override with `_headers`. Workers Caching rules for Worker-generated responses: `Set-Cookie`, or `Cache-Control: private` or `no-store`, bypass the cache; only GET/HEAD are cached. https://developers.cloudflare.com/workers/cache/configuration/ and https://developers.cloudflare.com/workers/cache/debugging/ . How this "Workers Caching" feature interacts with `env.ASSETS.fetch` responses is **unverified**.

**2.5 Custom 404.** (verified, https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/)
```jsonc
{
	"name": "my-worker",
	"assets": {
		"directory": "./dist/",
		"not_found_handling": "404-page",
		"html_handling": "auto-trailing-slash"
	}
}
```
With `404-page`, "Workers will serve the contents of the nearest `404.html` file with a `404 Not Found` status"; with no `404.html`, a null-body 404. Other value: `single-page-application` (serves `index.html`). `html_handling` values: `auto-trailing-slash` (default), `force-trailing-slash`, `drop-trailing-slash`, `none`. https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/ . The default value of `not_found_handling` and any `none` value for it: **unverified** (not read).

### 3. Previews and versioned deploys

**3.1 Previews (current recommended branch workflow).** (verified, https://developers.cloudflare.com/workers/previews/ , last updated 2026-09-24)
- "Previews are the recommended way to test changes before production." https://developers.cloudflare.com/workers/previews/compare-workflows/ . Requires Wrangler 4.135.0 or later (project-local install).
- Command: `npx wrangler preview` (production stays `npx wrangler deploy`). Flags: `--name` (defaults to the current git branch), `--tag`, `--message`, `--json`, `--ignore-base-config`, `--worker-name`. https://developers.cloudflare.com/workers/wrangler/commands/workers/ . Delete: `npx wrangler preview delete --name <preview-name>`.
- Config: add a `previews` block (may be empty). Top-level settings are production. Example from the get-started page: top-level `"vars": {"ENVIRONMENT": "production"}` and `"previews": {"vars": {"ENVIRONMENT": "preview"}}`. https://developers.cloudflare.com/workers/previews/get-started/
- URLs: Preview URL `<preview-name>-<worker-name>.<subdomain>.workers.dev` (always latest); Deployment URL `<deployment-id>-<worker-name>.<subdomain>.workers.dev` (fixed). Custom-domain forms: `<preview-name>.app.example.com`, `<deployment-id>-<preview-name>.app.example.com`. `workers.dev` previews send `X-Robots-Tag: noindex`.
- Preview URLs are public by default; use Cloudflare Access to require sign-in.
- Limits: 100 Previews per Worker on Free (500 paid), 100 deployments per Preview. Oldest is deleted at the limit.
- You do not need a production deploy before the first Preview. Workers Builds posts Preview URLs to pull requests (new Workers use Previews by default).
- Whether `wrangler preview` needs `workers_dev` or `preview_urls` enabled: **unverified**.

**3.2 Versions and Version URLs.** (verified, https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/ and https://developers.cloudflare.com/workers/wrangler/commands/workers/)
- `npx wrangler versions upload` uploads a version that is not deployed and returns a Version URL `<version-prefix>-<worker-name>.<subdomain>.workers.dev`. `--preview-alias <alias>` makes `<alias>-<worker-name>.<subdomain>.workers.dev`; aliases can only be created at upload. Other flags: `--tag`, `--message`, `--dry-run`, `--secrets-file`.
- `npx wrangler versions deploy <version-id>@<percentage> ... -y` deploys or splits traffic (example from docs: `wrangler versions deploy 095f00a7-23a7-43b7-a227-e4c97cab5f22@10% 1a88955c-2fbd-4a72-9d9b-3ba1e59842f2@90% -y`). `--version-tag`, `--dry-run`, `--message` also exist. `wrangler versions list`, `versions view`, `deployments list`, `deployments status`, `rollback` exist as commands (flags of `rollback` not read: **unverified**).
- Version URLs "use production resources" and "Do not use Version URLs for branch or pull request testing. Use Previews instead." (compare-workflows page). Migration table there: `wrangler versions upload --preview-alias staging` becomes `npx wrangler preview --name staging`.
- Version URLs are public when enabled; config key `preview_urls = true|false` (verified on https://developers.cloudflare.com/workers/configuration/previews/, which now redirects conceptually to Version URLs).
- Surprise: the older advice "versions upload for PR previews" is now explicitly discouraged.

### 4. Cloudflare Web Analytics

**4.1 Setup.** (verified, https://developers.cloudflare.com/web-analytics/get-started/)
- *Not proxied through Cloudflare* (e.g. a plain `*.workers.dev` URL, or a domain on DNS-only): dashboard > Web Analytics > Add a site > enter hostname > copy the JS snippet from Manage site > paste "before the ending body tag". Data may take a few minutes.
- *Proxied through Cloudflare (orange cloud)*: Add a site > pick hostname; automatic injection is on by default. Options in Manage site: enable excluding EU visitors, enable with manual snippet, disable. Automatic injection fails if the response has `Cache-Control: public, no-transform`, and needs valid HTML (`<html>`/`<body>`). https://developers.cloudflare.com/web-analytics/faq/
- Automatic setup does not work for DNS-only (CNAME) domains (FAQ). Whether automatic injection works on a Workers static assets site, including one with a custom domain, is **unverified**; the writer should default to the manual snippet. The FAQ also states RUM "operates exclusively on the initial client request and cannot collect metrics from Worker subrequests".
- Snippet (verified, FAQ; the dashboard supplies the real token):
```html
<script
  type="module"
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "$SITE_TOKEN"}'
></script>
```
  Tag-manager form: `src="https://static.cloudflareinsights.com/beacon.min.js?token=$SITE_TOKEN"`. (An older dashboard snippet used `defer` without `type="module"`: **unverified**, not shown in current docs.)
- Data goes to `cloudflareinsights.com/cdn-cgi/rum` with a manual snippet, or your own domain's `/cdn-cgi/rum` with automatic setup.
- CSP: add `https://static.cloudflareinsights.com/beacon.min.js` to `script-src`; add `cloudflareinsights.com` (manual) or `'self'` (automatic) to `connect-src`. SRI cannot be pinned for the manual snippet (no version pinning).
- The same snippet token works across subdomains of the same apex domain, not other domains.

**4.2 What it measures.** (verified) Visits and page views, page load time, Core Web Vitals (LCP, INP, CLS; CLS only in Chromium), and dimensions; data origin is the browser Performance API via the beacon. https://developers.cloudflare.com/web-analytics/data-metrics/ , https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/ , https://developers.cloudflare.com/web-analytics/about/ . For SPAs, extra metrics are sent on each route change (FAQ).

**4.3 Privacy.** (verified) "Cloudflare Web Analytics does not collect or use your visitors' personal data." (about page). Core Web Vitals page: "It does not use any client-side state, such as cookies or `localStorage`... also does not fingerprint individuals via their IP address, User Agent string, or any other data." Query strings are not logged ("do not log query strings", so no UTM reports). Whether this removes the need for a consent banner is a legal question the docs do not answer: **unverified**, do not claim it.

**4.4 Limits.** (verified) Unproxied sites: 10 per account (soft limit, FAQ; limits page says 10). Rules: 0 on Free (snippet is injected on all subdomains). Retention: previous 6 months. Data is unsampled for 7 days, then aggregated to about 10%. https://developers.cloudflare.com/web-analytics/limits/ and the FAQ.

**4.5 Custom events: not supported.** FAQ: "Does Web Analytics support custom events? Not yet, but we may add support for this in the future." https://developers.cloudflare.com/web-analytics/faq/ . (One fetch summary of the data-metrics index said custom events are supported; the page text does not say so and the FAQ says the opposite, so treat the FAQ as authoritative.)

**4.6 Counting a conversion the Cloudflare-native way: Workers Analytics Engine.** (verified) https://developers.cloudflare.com/analytics/analytics-engine/get-started/
- Binding config (quoted):
```jsonc
{
	"analytics_engine_datasets": [
		{
			"binding": "<BINDING_NAME>",
			"dataset": "<DATASET_NAME>"
		}
	]
}
```
  TOML: `[[analytics_engine_datasets]]`, `binding = ...`, `dataset = ...`. Datasets are created automatically on first write; no dashboard step.
- Write (quoted from the docs): 
```js
async fetch(request, env) {
  env.WEATHER.writeDataPoint({
    'blobs': ["Seattle", "USA", "pro_sensor_9000"], // City, State
    'doubles': [25, 0.5],
    'indexes': ["a3cd45"]
  });
  return new Response("OK!");
}
```
  "You do not need to await `writeDataPoint()`". Blobs = string dimensions, doubles = numbers, `indexes` = sampling key; "you currently must only provide a single index. If you attempt to provide multiple indexes, your data point will not be recorded."
- Limits (https://developers.cloudflare.com/analytics/analytics-engine/limits/): up to 20 blobs, 20 doubles, 1 index per call; blobs total 16 KB; index max 96 bytes; 250 data points per Worker invocation; retention three months.
- Query: `POST https://api.cloudflare.com/client/v4/accounts/{account_id}/analytics_engine/sql` with `Authorization: Bearer <API_TOKEN>`, token permission `Account | Account Analytics | Read`; body is the SQL. Use `SUM(_sample_interval)` to count under sampling. Example from the recipes page: `SELECT index1 AS customer_id, sum(_sample_interval) AS count FROM <dataset> GROUP BY customer_id`. https://developers.cloudflare.com/analytics/analytics-engine/sql-api/ and https://developers.cloudflare.com/analytics/analytics-engine/recipes/usage-based-billing-for-your-saas-product/
- Pricing page: Workers Free 100,000 data points written per day and 10,000 read queries per day; Paid 10M writes and 1M reads per month. "Currently, you will not be billed for your use of Workers Analytics Engine." https://developers.cloudflare.com/analytics/analytics-engine/pricing/
- Alternatives when you want rows you can list: D1 (below) or KV. KV Free writes are only 1,000 per day (https://developers.cloudflare.com/workers/platform/pricing/), so KV is a poor conversion counter.
- Plain Workers requests metrics (invocation counts) exist but are not conversions. https://developers.cloudflare.com/workers/observability/metrics-and-analytics/

### 5. A/B testing at the edge

**5.1 What the docs provide.**
- Official example: "A/B testing with same-URL direct access" https://developers.cloudflare.com/workers/examples/ab-testing/ (updated 2026-04-23). It routes by cookie to `/control` or `/test` path prefixes, 50/50 split, sets `Set-Cookie: myExampleWorkersABTest=<group>; path=/`, and lets `/control` and `/test` pass through for direct access. It calls `fetch(url)` against an origin; it does not use the assets binding. Quoted core:
```js
const NAME = "myExampleWorkersABTest";

export default {
	async fetch(req) {
		const url = new URL(req.url);

		// Enable Passthrough to allow direct access to control and test routes.
		if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
			return fetch(req);

		// Determine which group this requester is in.
		const cookie = req.headers.get("cookie");

		if (cookie && cookie.includes(`${NAME}=control`)) {
			url.pathname = "/control" + url.pathname;
		} else if (cookie && cookie.includes(`${NAME}=test`)) {
			url.pathname = "/test" + url.pathname;
		} else {
			// If there is no cookie, this is a new client. Choose a group and set the cookie.
			const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
			if (group === "control") {
				url.pathname = "/control" + url.pathname;
			} else {
				url.pathname = "/test" + url.pathname;
			}
			// Reconstruct response to avoid immutability
			let res = await fetch(url);
			res = new Response(res.body, res);
			// Set cookie to enable persistent A/B sessions.
			res.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
			return res;
		}
		return fetch(url);
	},
};
```
- The assets docs list A/B testing as a use of `run_worker_first`: "Common uses for `run_worker_first` include authentication checks, A/B testing, and injecting bootstrap data into your SPA shell." https://developers.cloudflare.com/workers/static-assets/binding/
- Worker-first config (quoted pattern): `"assets": {"directory": "./dist/", "binding": "ASSETS", "run_worker_first": true}` or an array with `*` globs and `!` negatives (negatives win; max 100 entries), e.g. `["/api/*", "!/api/docs/*"]`. https://developers.cloudflare.com/workers/static-assets/binding/
- `env.ASSETS.fetch(request | URL | string)` returns `Promise<Response>`; "Requests made through this method have `html_handling` and `not_found_handling` configuration applied to them." Only the pathname is matched; hostname (e.g. `assets.local`) is irrelevant. Same page.
- `HTMLRewriter`: `new HTMLRewriter().on(selector, handler).onDocument(handler).transform(response)`; element methods include `getAttribute`, `setAttribute`, `replace`, `before`, `after`, `append`, `prepend`, `remove`, `setInnerContent`; `{ html: true }` to insert raw HTML; handler exceptions abort the stream. https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
- Cookies: parse `Cookie` via `request.headers.get("Cookie")`; example using the `cookie` package's `parseCookie` is at https://developers.cloudflare.com/workers/examples/extract-cookie-value/ (page says "You can also use cookies for A/B testing"). The worker-script routing page shows setting `Set-Cookie` with `HttpOnly; Secure; SameSite=Lax; Path=/`. https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
- Recording: `env.<BINDING>.writeDataPoint(...)` (section 4.6); `ctx.waitUntil` is documented for background work (https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil, linked from the limits page, not read in full).
- Caching: `Set-Cookie` on a response, or `Cache-Control: private`/`no-store`, bypasses Cloudflare's cache (cache docs above). Static asset responses default to `max-age=0, must-revalidate`, so HTML is revalidated anyway. Whether a shared cache would wrongly serve one variant to everyone if the Worker responses are cacheable: the docs say the Workers cache key is path, entrypoint, `ctx.props`, and Worker version (https://developers.cloudflare.com/workers/cache/), so any variant-dependent response must carry `Cache-Control: private` (my inference, mark **unverified** as an official A/B recommendation). No Cloudflare doc on `Vary: Cookie` was found: **unverified**.

**5.2 Free-plan cost warning.** (verified, https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/) Static asset requests are free and unlimited, but a request matched by `run_worker_first` always invokes the Worker. "If you exceed your free tier request limits, these requests will receive a 429 (Too Many Requests) response instead of falling back to static asset serving." Negative patterns still serve assets. Workers Free is 100,000 requests/day and 10 ms CPU per request. So running the Worker on `/` for an A/B test makes every page view count against 100,000/day, and the page fails closed above that. Use narrow patterns (`["/"]` and `["/api/*"]`), never `true`, and keep CSS, JS, and images out of the Worker.

**5.3 Assembled design (assembled, untested).** Variants stored as two static folders; Worker picks one and rewrites the path; assignment is a cookie; exposure and conversion are Analytics Engine points.

`wrangler.jsonc` (assembled, untested):
```jsonc
{
	"name": "landing",
	"main": "src/index.ts",
	"compatibility_date": "2026-10-04",
	"assets": {
		"directory": "./dist",
		"binding": "ASSETS",
		"not_found_handling": "404-page",
		"run_worker_first": ["/", "/api/convert"]
	},
	"analytics_engine_datasets": [
		{ "binding": "EVENTS", "dataset": "landing_events" }
	]
}
```
`src/index.ts` (assembled, untested):
```ts
interface Env {
	ASSETS: Fetcher;
	EVENTS: AnalyticsEngineDataset;
}
const EXPERIMENT = "hero-v1";
const COOKIE = "ab_" + EXPERIMENT;

function readVariant(req: Request): "a" | "b" | null {
	const m = (req.headers.get("Cookie") ?? "").match(new RegExp(`(?:^|; )${COOKIE}=(a|b)`));
	return m ? (m[1] as "a" | "b") : null;
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);

		if (url.pathname === "/api/convert" && req.method === "POST") {
			const v = readVariant(req) ?? "none";
			env.EVENTS.writeDataPoint({ indexes: [EXPERIMENT], blobs: [v, "conversion"], doubles: [1] });
			return new Response(null, { status: 204 });
		}

		// path "/" only (run_worker_first); variants live at /variants/a/ and /variants/b/
		const existing = readVariant(req);
		const variant = existing ?? (Math.random() < 0.5 ? "a" : "b");
		const assetUrl = new URL(`/variants/${variant}/`, url);
		const res = await env.ASSETS.fetch(new Request(assetUrl, req));
		const out = new Response(res.body, res);
		out.headers.set("Cache-Control", "private, no-store");
		if (!existing) {
			out.headers.append("Set-Cookie", `${COOKIE}=${variant}; Path=/; Max-Age=2592000; Secure; SameSite=Lax`);
		}
		env.EVENTS.writeDataPoint({ indexes: [EXPERIMENT], blobs: [variant, "exposure"], doubles: [1] });
		return out;
	},
} satisfies ExportedHandler<Env>;
```
Open points for the tester: (a) whether `ASSETS.fetch` of `/variants/a/` returns `variants/a/index.html` with status 200 or a redirect under `auto-trailing-slash`; (b) whether `run_worker_first: ["/"]` matches `/index.html` and `/?utm=...`; (c) that exposure is counted once per page view, not per visitor (query with `blob2 = 'exposure'` and a distinct-visitor id is not possible without a second dimension, which needs a visitor id in blobs). Conversion query (assembled, untested): `SELECT blob1 AS variant, blob2 AS event, SUM(_sample_interval) AS n FROM landing_events WHERE index1 = 'hero-v1' GROUP BY variant, event`.

HTMLRewriter alternative on one page (assembled, untested): fetch `/` from `env.ASSETS`, then `new HTMLRewriter().on("h1", { element(el) { el.setInnerContent("Variant B headline"); } }).transform(res)` for copy-only tests. Documented handler API: html-rewriter page above.

### 6. Form handling

**6.1 Architecture.** A Worker route (for example `POST /api/lead`) handles the form; the page is static. Route it with `run_worker_first: ["/api/*"]` (verified key, section 5.1). Static pages stay free.

**6.2 Turnstile widget on the page.** (verified, https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<div class="cf-turnstile" data-sitekey="<YOUR-SITE-KEY>"></div>
```
Implicit rendering adds a hidden input named `cf-turnstile-response` inside the enclosing `<form>`. Explicit rendering: load `api.js?render=explicit` and call `turnstile.render("#container", { sitekey, callback })`. Widget types: Managed (recommended), non-interactive, invisible. Create widgets in the dashboard (Turnstile page) or via API; each widget has its own sitekey and secret key. https://developers.cloudflare.com/turnstile/get-started/ . Free plan: free, up to 20 widgets per account, 10 hostnames per widget, unlimited challenges, 7-day analytics lookback. https://developers.cloudflare.com/turnstile/plans/

**6.3 Siteverify.** (verified, https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- `POST https://challenges.cloudflare.com/turnstile/v0/siteverify`. Accepts `application/x-www-form-urlencoded` or `application/json`; always returns JSON.
- Request fields: `secret` (required), `response` (required, the token; max 2048 characters), `remoteip` (optional), `idempotency_key` (optional UUID for safe retries).
- Token valid 300 seconds and single use; reuse gives `timeout-or-duplicate`.
- Response fields: `success`, `challenge_ts`, `hostname`, `error-codes`, `action`, `cdata`, `metadata.ephemeral_id` (Enterprise only). Error codes: `missing-input-secret`, `invalid-input-secret`, `missing-input-response`, `invalid-input-response`, `bad-request`, `timeout-or-duplicate`, `internal-error`.
- Docs advise also checking `action` and `hostname` when set, setting timeouts, and never calling Siteverify from the browser.
- Quoted JSON example from the page:
```js
const response = await fetch(
	"https://challenges.cloudflare.com/turnstile/v0/siteverify",
	{
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ secret: SECRET_KEY, response: token, remoteip: remoteip }),
	},
);
const result = await response.json();
```
  (formatting condensed from the page's `validateTurnstile` function). The page's form-data example reads `body.get("cf-turnstile-response")` and `request.headers.get("CF-Connecting-IP")`.

**6.4 Test keys.** (verified, https://developers.cloudflare.com/turnstile/troubleshooting/testing/) They work on `localhost`, `127.0.0.1`, `0.0.0.0` and any dev domain. Production secrets reject dummy tokens (`XXXX.DUMMY.TOKEN.XXXX`).
| Sitekey | Behaviour |
|---|---|
| `1x00000000000000000000AA` | always passes, visible |
| `2x00000000000000000000AB` | always fails, visible |
| `1x00000000000000000000BB` | always passes, invisible |
| `2x00000000000000000000BB` | always fails, invisible |
| `3x00000000000000000000FF` | forces interactive challenge |

| Secret | Behaviour |
|---|---|
| `1x0000000000000000000000000000000AA` | always passes |
| `2x0000000000000000000000000000000AA` | always fails |
| `3x0000000000000000000000000000000AA` | "token already spent" error |

**6.5 Secrets.** (verified, https://developers.cloudflare.com/workers/configuration/secrets/ and the commands page)
- Local: put `TURNSTILE_SECRET="1x0000000000000000000000000000000AA"` in `.dev.vars` (dotenv syntax) or `.env`, "Choose to use either `.dev.vars` or `.env` but not both". Keep `.dev.vars*` in `.gitignore` (the framework guides add `.dev.vars*` to `.gitignore`).
- Production: `npx wrangler secret put TURNSTILE_SECRET` (prompts for the value, or accepts piped input). It "creates a new version of the Worker and deploys it immediately". `npx wrangler versions secret put <KEY>` only creates a version. `wrangler secret bulk` and `--secrets-file` (on `wrangler deploy` and `wrangler versions upload`, JSON or `.env`) set many at once; bulk accepts up to 100 per request.
- Whether `wrangler secret put` works before the Worker's first deploy: **unverified**. Safe order for the writer: first `wrangler deploy`, then `wrangler secret put`; or `wrangler deploy --secrets-file .env.production`, which is documented.
- The public sitekey is not a secret and can live in HTML or `vars`.

**6.6 Storing or forwarding the lead.**
- *D1* (best default): free 5 million rows read/day, 100,000 rows written/day, 5 GB. https://developers.cloudflare.com/d1/platform/pricing/ . Create: `npx wrangler d1 create <name>`; schema: `npx wrangler d1 execute <name> --local --file=./schema.sql` (local) and `--remote` (production); binding config `"d1_databases": [{"binding": "...", "database_name": "...", "database_id": "<unique-ID>"}]`; query `env.DB.prepare("... ?").bind(v).run()`. https://developers.cloudflare.com/d1/get-started/ and https://developers.cloudflare.com/d1/worker-api/prepared-statements/ . `wrangler d1 create` changes an account, so the skill must tell the user to run it.
- *KV*: Free 1,000 writes/day, 1 GB; fine for dedupe flags, weak for a lead list. https://developers.cloudflare.com/workers/platform/pricing/
- *Queues*: on Workers Free (since 2026-02-04): 10,000 operations per day, 24-hour retention; roughly 3 operations per delivered message. Config: `"queues": {"producers": [{"queue": "MY-QUEUE-NAME", "binding": "MY_QUEUE"}]}`, create with `npx wrangler queues create <name>`, send with `await env.MY_QUEUE.send(obj)`. A consumer Worker is needed or messages expire. https://developers.cloudflare.com/queues/get-started/ and https://developers.cloudflare.com/changelog/post/2026-02-04-queues-free-plan/
- *Email*: Email Service binding `"send_email": [{ "name": "EMAIL" }]`, then `await env.EMAIL.send({ to, from, subject, html, text })` returning `messageId`. https://developers.cloudflare.com/email-service/api/send-emails/workers-api/ and https://developers.cloudflare.com/email-service/get-started/send-emails/ . Pricing: outbound Email Sending "Not available" on Workers Free, but "Sending to verified destination addresses in your account is free on all plans". So a free-plan site can email the owner's verified address but not arbitrary visitors. https://developers.cloudflare.com/email-service/platform/pricing/ . The sender domain must be onboarded with SPF/DKIM DNS records (Email Service domain setup). Older `send_email` binding options `destination_address` and `allowed_destination_addresses` are in the config reference: https://developers.cloudflare.com/workers/wrangler/configuration/ . Local `wrangler dev` simulates sends (logs only) unless the binding has `"remote": true`.
- Third-party forwarders (Resend etc.) are outside this research.

**6.7 Assembled Worker (assembled, untested).** Validates input, verifies Turnstile, stores in D1.
```ts
interface Env {
	DB: D1Database;
	ASSETS: Fetcher;
	TURNSTILE_SECRET: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);
		if (url.pathname !== "/api/lead") return env.ASSETS.fetch(req);
		if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });

		const form = await req.formData();
		const email = String(form.get("email") ?? "").trim().slice(0, 254);
		const name = String(form.get("name") ?? "").trim().slice(0, 100);
		const token = String(form.get("cf-turnstile-response") ?? "");
		if (form.get("website")) return new Response(null, { status: 204 }); // honeypot
		if (!EMAIL_RE.test(email)) return Response.json({ error: "invalid_email" }, { status: 400 });
		if (!token) return Response.json({ error: "missing_token" }, { status: 400 });

		const body = new FormData();
		body.append("secret", env.TURNSTILE_SECRET);
		body.append("response", token);
		body.append("remoteip", req.headers.get("CF-Connecting-IP") ?? "");
		const v = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
		const result = (await v.json()) as { success: boolean; hostname?: string; "error-codes"?: string[] };
		if (!result.success) return Response.json({ error: "turnstile_failed" }, { status: 400 });

		await env.DB.prepare("INSERT INTO leads (email, name, created_at) VALUES (?, ?, ?)")
			.bind(email, name, new Date().toISOString())
			.run();
		return Response.json({ ok: true });
	},
} satisfies ExportedHandler<Env>;
```
Schema (assembled, untested): `CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, name TEXT, created_at TEXT NOT NULL);`. Wrangler: `"assets": {"directory": "./dist", "binding": "ASSETS", "run_worker_first": ["/api/*"]}` plus the `d1_databases` binding. Not covered by docs: rate limiting, duplicate email handling, Content-Type enforcement. CORS is not needed when the form posts to the same origin.

### 7. Pricing and limits on the free plan

| Item | Free value | Source |
|---|---|---|
| Worker requests | 100,000/day, resets 00:00 UTC; over limit returns Error 1027 | https://developers.cloudflare.com/workers/platform/limits/ |
| Static asset requests | "free and unlimited" | https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ |
| Storage of assets | no additional cost | same |
| CPU time | 10 ms per HTTP request | limits page |
| Subrequests | 50 per request | limits page |
| Static asset files per Worker version | 20,000 (100,000 paid; needs Wrangler 4.34.0+) | limits page; https://developers.cloudflare.com/changelog/post/2025-09-02-increased-static-asset-limits/ |
| Single asset file size | 25 MiB | limits page |
| Worker bundle | 64 MiB | limits page |
| Workers per account | 100 | limits page |
| Env variables | 64 per Worker, 5 KB each | limits page |
| Cron triggers | 5 per account | limits page |
| `run_worker_first` array | max 100 entries | binding page |
| `_redirects` | 2,000 static + 100 dynamic, 1,000 chars/line | redirects page |
| `_headers` | 100 rules, 2,000 chars/line | headers page |
| Previews | 100 per Worker, 100 deployments each | previews page |
| Workers Logs | 200,000 events/day, 3 days retention | https://developers.cloudflare.com/workers/platform/pricing/ |
| Analytics Engine | 100,000 writes/day, 10,000 queries/day; 3-month retention; billing not active | AE pricing and limits pages |
| Web Analytics | free; 10 unproxied sites; 6-month retention | web-analytics limits and FAQ |
| Turnstile | free; 20 widgets; 10 hostnames per widget | turnstile plans page |
| D1 | 5M rows read/day, 100k rows written/day, 5 GB | D1 pricing |
| KV | 100k reads/day, 1k writes/day, 1 GB | workers pricing |
| Queues | 10,000 ops/day, 24 h retention | workers pricing |
| Email sending | not available on Free except to verified destination addresses | email pricing |

All rows were read from the cited pages on 2026-10-04; the Workers limits table was read in raw Markdown.

### Surprises and conflicts
- `wrangler preview` and the Previews product replaced "aliased version URLs" as the recommended branch workflow (Wrangler 4.135.0+, doc updated 2026-09-24).
- `wrangler deploy --temporary` creates a throwaway account for agents (claim within 60 minutes).
- `run_worker_first` makes the free plan fail with 429 above 100,000 requests/day for matched paths; this is the central cost of edge A/B testing on Free.
- Web Analytics has no custom events ("Not yet"), so conversions need Analytics Engine, D1, or similar.
- Email Service sending is unavailable on Free except to verified destination addresses.
- Workers Free daily limits are per account, not per Worker.

### Cross-document resolutions

- Custom events and CTA measurement (vs 04, 05). 04 proposes CTA-label and headline tests and 05 proposes counters and scroll effects; none of them can be measured with Cloudflare Web Analytics, which has no custom events (4.5). Resolved: a conversion is counted only through a Worker endpoint writing to Analytics Engine or D1 (4.6, 6.6), and a CTA click needs a `fetch`/`sendBeacon` to that endpoint, which runs the Worker on that path. Skills must not tell the agent that Web Analytics tracks clicks or conversions.
- Cookies and privacy (vs 04, 4.3). Web Analytics sets no cookies (4.3), but the A/B design in 5.3 sets a first-party assignment cookie. The "no cookies" statement therefore holds for the Web Analytics beacon only, not for a page with the A/B Worker. Whether a consent banner is needed stays a legal question (`unverified`, do not claim).
- Forms and email (vs 04). The assembled Worker (6.7) collects `email` and optional `name`; for waitlists 04 says email-only, so drop `name` there. Email Service cannot send to arbitrary visitors on Free (6.6), so no confirmation email promise on Free. The honeypot field `website` in 6.7 must be hidden from assistive tech as well as visually (accessibility point from 04 forms-a11y; not sourced in Cloudflare docs).
- Sample size (vs 04). 04 cites conversion benchmarks of roughly 3.8% to 12.3% medians (`unverified` aggregator figures) while the free plan caps worker-first traffic at 100,000 requests/day (5.2). No source in either document gives the visitors needed for a valid A/B test; do not state significance thresholds.
- Static assets for motion (vs 05). 3D and media assets are static files under the 25 MiB per-file and 20,000-file limits (section 7).

## Implications for skills

### skills/landing-launch/references/hosting.md
- Recommend Workers static assets; say Pages is legacy for new projects (quote the best-practices sentence; cite 1.1).
- Give the minimal config (1.2), `npx wrangler dev`, `npx wrangler deploy`, and `npx wrangler deploy --dry-run` as the no-deploy check (also `wrangler versions upload --dry-run`). State that `--dry-run` compiles but that asset validation is unverified, so also run the framework build and check file count (<20,000) and size (<25 MiB) by hand.
- Per framework: plain HTML (`assets.directory`), Astro static (`npx astro build` then `npx wrangler@latest deploy`, no `main`), Vite + React (`@cloudflare/vite-plugin`, `not_found_handling: "single-page-application"`), Next (vinext, static export via `output: "export"`; do not name the output folder as Cloudflare-documented).
- Custom domain: `routes` with `custom_domain: true`, requires an active Cloudflare zone and no existing CNAME on the hostname; `workers_dev: false` to hide the workers.dev URL. Mention non-Cloudflare nameservers are unsupported.
- `_redirects` and `_headers` live in the assets directory, with the limits above; they do not apply to Worker-handled requests; cache default is `public, max-age=0, must-revalidate`, override fingerprinted folders with `_headers`.
- Custom 404: `not_found_handling: "404-page"` plus a `404.html`.
- Previews: use `npx wrangler preview` (needs Wrangler 4.135.0+, `previews` block); use `wrangler versions upload` and `versions deploy` only for staged production rollouts. Tell the agent that deploy, preview, `secret put`, and `d1 create` change an account and must be run by the user or after explicit approval. Do not tell the agent to use `--temporary` for a user's real site.
- Leave out: `--x-autoconfig`, `wrangler rollback` flags, Next output folder name, any claim that `preview_urls` is needed for Previews.

### skills/landing-launch/references/analytics.md
- Web Analytics: manual snippet (4.1) for any site, with the placeholder token from the dashboard; automatic injection only for proxied hostnames and unverified on Workers static assets. Include CSP additions.
- State measured items, privacy position (no cookies/localStorage, no fingerprinting, no query strings), and limits (10 unproxied sites, 6 months, ~10% sampling after 7 days). Do not claim legal compliance or "no banner needed". The "no cookies" statement applies to the Web Analytics beacon only; an A/B assignment cookie is a separate first-party cookie.
- Custom events: not supported (so CTA clicks are not measurable in Web Analytics). Use Workers Analytics Engine for conversions: binding config, `writeDataPoint` shape, single index, query via SQL API with `_sample_interval`, free limits (100,000 writes/day), 3-month retention, billing currently off. A conversion Worker requires `run_worker_first` on its endpoint only.
- Offer D1 as the alternative when individual rows are needed.
- Leave out: tag-manager snippet variants, GraphQL, Grafana, the old `defer` snippet.

### skills/landing-launch/references/ab-testing.md
- Pattern: `run_worker_first: ["/", "/api/convert"]`, assets binding, variant folders, cookie `Path=/; Max-Age=...; Secure; SameSite=Lax`, `Cache-Control: private, no-store` on variant responses, Analytics Engine exposure/conversion points. Reuse the assembled code in 5.3 but mark it untested and require a local check with `wrangler dev` (redirects from `html_handling`, path matching of `/`).
- Cite the official example (cookie plus `/control`, `/test`) and note it fetches an origin rather than the assets binding.
- State that the A/B cookie is a first-party cookie and that no sample-size or significance guidance exists in this research. Warn about the Free-plan 429 on worker-first paths; never `run_worker_first: true` on a landing page.
- Describe HTMLRewriter for copy-only variants (`setInnerContent`, `setAttribute`) and its limits (streaming, exceptions abort the response).
- Leave out: `Vary: Cookie` advice, visitor-level uniqueness counts, statistical significance (not in Cloudflare docs).

### skills/landing-launch/references/forms.md
- For waitlists collect email only (04), and do not promise a confirmation email on Free. Hide the honeypot from assistive tech. Route `/api/*` through the Worker; validate method, fields, length, honeypot server-side; verify with Siteverify (endpoint, `secret`, `response`, optional `remoteip` and `idempotency_key`; check `success`, `hostname`, `action`); 300 s single-use token; return generic errors.
- Widget: `api.js` with `async defer`, `div.cf-turnstile` with `data-sitekey`, hidden field `cf-turnstile-response`; test sitekey `1x00000000000000000000AA` and secret `1x0000000000000000000000000000000AA` for local use only, `2x...` keys for failure paths.
- Secrets: `.dev.vars` locally (git-ignored), `npx wrangler secret put TURNSTILE_SECRET` in production (deploys immediately); `--secrets-file` option. Warn that `secret put` before the first deploy is unverified.
- Storage: D1 default (commands, binding, parameterised `bind`), Queues for async, Email Service only to verified destination addresses on Free. KV not recommended for leads.
- Use the assembled Worker in 6.7 flagged as untested; leave out rate limiting claims, CORS, and any third-party forwarders.

### skills/landing-build/references/adapters.md
- Output-folder table for adapters: plain HTML `public/` or custom; Astro static `./dist` (no adapter; SSR needs `@astrojs/cloudflare` and `main: "./dist/_worker.js/index.js"`); Vite + React `./dist` with SPA fallback via the Cloudflare Vite plugin; Next via vinext, static export with `output: "export"`.
- Say bindings (D1, Analytics Engine) are unavailable on purely static Astro; use a separate Worker route in the same project (Worker with `main`) or keep `main` outside the framework build.
- Add `.assetsignore` guidance for generated worker files (`_worker.js`, `_routes.json` per the auto-configuration page) and warn not to ignore `_headers` and `_redirects`.
- Leave out: framework versions beyond Astro's Node requirement, OpenNext steps, Next output folder name.

## Sources

Date read 2026-10-04. URLs 14, 28 and 33 were only seen as links or via search snippets, not opened in full; claims that cite them alone are marked accordingly in Findings.

1. https://developers.cloudflare.com/workers/best-practices/workers-best-practices/
2. https://developers.cloudflare.com/pages/get-started/
3. https://developers.cloudflare.com/workers/static-assets/
4. https://developers.cloudflare.com/workers/static-assets/get-started/
5. https://developers.cloudflare.com/workers/static-assets/compatibility-matrix/
6. https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/
7. https://developers.cloudflare.com/workers/static-assets/binding/
8. https://developers.cloudflare.com/workers/static-assets/headers/
9. https://developers.cloudflare.com/workers/static-assets/redirects/
10. https://developers.cloudflare.com/workers/static-assets/routing/
11. https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/
12. https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/
13. https://developers.cloudflare.com/workers/static-assets/routing/worker-script/
14. https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/
15. https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/
16. https://developers.cloudflare.com/workers/wrangler/commands/workers/
17. https://developers.cloudflare.com/workers/wrangler/commands/general/
18. https://developers.cloudflare.com/workers/wrangler/configuration/
19. https://developers.cloudflare.com/workers/framework-guides/
20. https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/
21. https://developers.cloudflare.com/workers/framework-guides/web-apps/react/
22. https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
23. https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/
24. https://developers.cloudflare.com/changelog/post/2025-12-16-wrangler-autoconfig/
25. https://developers.cloudflare.com/changelog/post/2025-09-02-increased-static-asset-limits/
26. https://developers.cloudflare.com/workers/platform/claim-deployments/
27. https://developers.cloudflare.com/workers/configuration/routing/custom-domains/
28. https://developers.cloudflare.com/workers/configuration/routing/routes/
29. https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
30. https://developers.cloudflare.com/workers/previews/
31. https://developers.cloudflare.com/workers/previews/get-started/
32. https://developers.cloudflare.com/workers/previews/compare-workflows/
33. https://developers.cloudflare.com/workers/versions-and-deployments/
34. https://developers.cloudflare.com/workers/versions-and-deployments/version-urls/
35. https://developers.cloudflare.com/workers/configuration/previews/
36. https://developers.cloudflare.com/workers/cache/
37. https://developers.cloudflare.com/workers/cache/configuration/
38. https://developers.cloudflare.com/workers/cache/debugging/
39. https://developers.cloudflare.com/web-analytics/about/
40. https://developers.cloudflare.com/web-analytics/get-started/
41. https://developers.cloudflare.com/web-analytics/faq/
42. https://developers.cloudflare.com/web-analytics/limits/
43. https://developers.cloudflare.com/web-analytics/data-metrics/
44. https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/
45. https://developers.cloudflare.com/analytics/analytics-engine/get-started/
46. https://developers.cloudflare.com/analytics/analytics-engine/limits/
47. https://developers.cloudflare.com/analytics/analytics-engine/sql-api/
48. https://developers.cloudflare.com/analytics/analytics-engine/pricing/
49. https://developers.cloudflare.com/analytics/analytics-engine/recipes/usage-based-billing-for-your-saas-product/
50. https://developers.cloudflare.com/workers/observability/metrics-and-analytics/
51. https://developers.cloudflare.com/workers/examples/ab-testing/
52. https://developers.cloudflare.com/workers/examples/extract-cookie-value/
53. https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/
54. https://developers.cloudflare.com/turnstile/get-started/
55. https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/
56. https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
57. https://developers.cloudflare.com/turnstile/troubleshooting/testing/
58. https://developers.cloudflare.com/turnstile/plans/
59. https://developers.cloudflare.com/workers/configuration/secrets/
60. https://developers.cloudflare.com/d1/get-started/
61. https://developers.cloudflare.com/d1/worker-api/prepared-statements/
62. https://developers.cloudflare.com/d1/platform/pricing/
63. https://developers.cloudflare.com/queues/get-started/
64. https://developers.cloudflare.com/changelog/post/2026-02-04-queues-free-plan/
65. https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
66. https://developers.cloudflare.com/email-service/get-started/send-emails/
67. https://developers.cloudflare.com/email-service/platform/pricing/
68. https://developers.cloudflare.com/workers/platform/limits/
69. https://developers.cloudflare.com/workers/platform/pricing/
70. https://developers.cloudflare.com/pages/platform/limits/
