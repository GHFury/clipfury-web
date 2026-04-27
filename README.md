# clipfury-web

The marketing and download site for ClipFury — automatic moment detection for gaming content creators.

Live at [clipfury.net](https://clipfury.net)

Built with Next.js 15, deployed on Vercel.

---

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

Deployed automatically via Vercel on every push to `main`. No manual steps required.

To update the download URL (when a new release is published):

1. Open `app/page.tsx`
2. Update line 5 — the `GITHUB_URL` constant
3. Push to main — Vercel deploys in ~30 seconds

---

## Structure

```
app/
  layout.tsx   Root layout, fonts, metadata
  page.tsx     Single page — all sections
```

All content is in `page.tsx`. Sections in order: Hero, How It Works, Discord Banner, Game Profiles, Pricing, Our Story, Final CTA, Contact, Footer.

---

## Updating the Download Link

The download button and all CTAs reference a single constant at the top of `page.tsx`:

```js
const GITHUB_URL = "https://github.com/GHFury/clipfury/releases/download/vX.X.X/ClipFury-Setup-X.X.X.exe";
```

Update this one line and every button on the page updates automatically.

**Note:** Use the specific release URL format (`/download/vX.X.X/filename.exe`), not the `latest` format — GitHub's `latest` redirect does not work for pre-releases.

---

© 2025 ClipFury · [clipfury.net](https://clipfury.net)
