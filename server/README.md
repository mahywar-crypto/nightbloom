# Nightbloom Companion backend

A small Cloudflare Worker that proxies chat messages from the Companion
screen to Google's Gemini API, so the app doesn't need to ship your API key or
require users to bring their own.

It also:
- Short-circuits crisis language (self-harm, suicide, etc.) with a fixed,
  reviewed safety response instead of calling the LLM.
- Rate-limits each IP to `DAILY_MESSAGE_LIMIT` real chat messages per day
  (default 40, set in `wrangler.toml`) as a basic cost control, since the app
  has no user accounts.

## One-time setup

```bash
cd server
npm install
npx wrangler login          # opens a browser to authorize your Cloudflare account
npx wrangler kv namespace create RATE_LIMIT_KV
```

Copy the `id` that command prints into `wrangler.toml` under
`[[kv_namespaces]]`, replacing `REPLACE_WITH_KV_NAMESPACE_ID`.

Then set your Gemini API key as a secret (never committed to git):

```bash
npx wrangler secret put GEMINI_API_KEY
# paste your free key from https://aistudio.google.com/apikey when prompted
```

## Deploy

```bash
npx wrangler deploy
```

This prints a URL like `https://nightbloom-companion.<you>.workers.dev`. Put that
in a `.env` file at the root of the main app (sibling to `app.json`):

```
EXPO_PUBLIC_COMPANION_API_URL=https://nightbloom-companion.<you>.workers.dev
```

Rebuild the app (`eas build`, or just restart `expo start`) and the
Companion screen will start talking to your deployed Worker.

## Local development

```bash
cp .dev.vars.example .dev.vars   # then paste a real key in .dev.vars
npm run dev                       # runs at http://localhost:8788
```

Point the app at it locally with:
```
EXPO_PUBLIC_COMPANION_API_URL=http://localhost:8788
```

## Cost notes

- Uses `gemini-2.0-flash`, which has a genuinely free tier (no credit card
  required) with generous rate limits, chosen to keep this feature free to
  run rather than pay-as-you-go.
- The daily per-IP cap is a basic safeguard, not bulletproof (shared IPs,
  VPNs). If you ship this to real customers, consider tightening it or
  adding a lightweight per-device token (e.g. a random ID generated on first
  app launch and sent as a header) so limits track devices, not IPs.
- Google's free tier also has its own rate limits (requests per minute/day)
  independent of our own cap — if Companion starts erroring under heavy use,
  check the Gemini API quota in Google AI Studio before assuming it's our
  Worker's limit.
