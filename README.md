# Turbo RS — Car Photography Portfolio

A single-page portfolio site for a one-off Porsche 991 "Turbo RS".
Photography by Håkon L. Sataøen.

---

## Deploy to Railway

1. Push this entire folder to a **GitHub repository**
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Railway auto-detects the `Dockerfile` — no config needed
4. Go to **Settings → Networking → Generate Domain** to get your public URL

The site will deploy in approximately 60 seconds.

---

## Folder Structure

```
├── Dockerfile           # nginx:alpine container (auto-detected by Railway)
├── docker-entrypoint.sh # Injects PORT + RAILWAY_PUBLIC_DOMAIN at container start
├── nginx.conf           # Gzip, caching, security headers
├── railway.toml         # Railway build config + health checks
├── .dockerignore        # Keeps container lean
├── index.html           # The complete site (single file, no build step)
├── manifest.json        # Web app manifest — Add to Home Screen metadata
├── sw.js                # Service worker — offline shell + fast repeat visits
├── icons/               # App icons (favicon, apple-touch-icon, manifest icons)
├── images/              # 17 JPEGs — all photos for the gallery
├── robots.txt           # SEO: allows all crawlers
└── sitemap.xml          # SEO: primary page sitemap
```

`index.html`, `robots.txt`, and `sitemap.xml` reference the site's own URL
via a `${RAILWAY_PUBLIC_DOMAIN}` placeholder, filled in automatically by
`docker-entrypoint.sh` at container start from Railway's built-in env var.
This variable syncs automatically if you configure a custom domain in Railway.

## Image Quality

Replace images in the `images/` directory with high-resolution files when available, preserving filenames, and redeploy.

## Mobile features

- **Installable.** `manifest.json` + `icons/` make the site Add-to-Home-Screen-able
  on Android and iOS, using the `apple-mobile-web-app-*` meta tags that were
  already in `index.html`. The icon is a plain ink/paper "RS" mark created to
  match the site's palette — swap the files in `icons/` for real brand art
  whenever that exists.
- **Offline shell.** `sw.js` caches `index.html` and serves photos
  stale-while-revalidate, so repeat visits (and spotty mobile signal) load
  instantly. Bump `CACHE_NAME` in `sw.js` after a meaningful content change —
  old caches are dropped automatically.
- **Pinch-to-zoom, double-tap-to-zoom, and drag-to-pan** in the photo viewer.
  Resets to 1x on every new photo. A first-time instructional toast is displayed
  and tracked via `localStorage`.
- **Light haptic tick** (`navigator.vibrate`) on share/save/close/swipe —
  Android only; a harmless no-op everywhere else, including iOS Safari.

## ⚠️ Do NOT change

- **The iOS save mechanism** (`saveImage` function in index.html) —
  This utilizes the native iOS Share Sheet and requires this specific implementation.
- **The SVG noise texture** on the body background — it gives the
  site its matte film look.
- **The caliper yellow (`#E9B215`)** — only used for interactive/active
  states, never for decoration.

## Credits

Photography — Håkon L. Sataøen
Site — Built for portfolio and social sharing. Nothing is for sale.
