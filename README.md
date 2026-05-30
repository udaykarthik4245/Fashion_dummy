# Élite Style — Fashion Portfolio

A production-ready fashion lifestyle portfolio website built with **Next.js 14**, deployable to **GitHub Pages** in a single push.

---

## Why Next.js?

| Concern | How Next.js solves it |
|---|---|
| **Speed** | All pages statically generated at build time — instant loads for image-heavy content |
| **Scalability** | File-based routing means adding a new page is just adding a file |
| **Component reuse** | `ImageCard`, `CategoryFilter`, and `Button` can be reused across any future section or brand |
| **Future-ready** | API Routes slot in later (CMS, contact API, auth) without touching the frontend architecture |
| **Images** | Built-in lazy loading; swap `<img>` for `<Image>` once deployed to a Node host |
| **Fonts** | `next/font/google` self-hosts Google Fonts — zero layout shift, no extra CDN dependency |

---

## Project Structure

```
fashion-portfolio/
├── next.config.js          ← static export + GitHub Pages config
├── package.json
├── jsconfig.json           ← @/ path alias
├── public/
│   └── images/
│       ├── hero/           ← drop hero background photos here
│       ├── portfolio/      ← drop portfolio item photos here
│       └── brand/          ← drop brand photography here
└── src/
    ├── app/                ← Next.js App Router pages
    │   ├── globals.css     ← CSS custom properties + resets
    │   ├── layout.js       ← root layout (fonts, Header, Footer)
    │   ├── page.js         ← Home
    │   ├── portfolio/      ← Gallery with category filter
    │   ├── about/          ← Bio + expertise
    │   └── contact/        ← Contact info + form
    ├── components/
    │   ├── layout/         ← Header (fixed, responsive), Footer
    │   ├── sections/       ← HeroSection, FeaturedCollection, PortfolioGrid, CategoryFilter
    │   └── ui/             ← Button (polymorphic), ImageCard
    ├── data/
    │   └── portfolio.json  ← static content — swap for API call when ready
    └── lib/
        └── utils.js        ← helpers + API stub functions
```

---

## Getting Started

### Prerequisites
- **Node.js** 18.17 or later
- **npm** 9+ (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/fashion-portfolio.git
cd fashion-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the site hot-reloads as you edit.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build → generates `out/` folder |
| `npm run lint` | ESLint check |

---

## Adding Your Photos

1. Drop your images into `public/images/portfolio/` (or `hero/`, `brand/`).
2. Update `src/data/portfolio.json` — change the `"image"` field from the picsum.photos placeholder to `/images/portfolio/your-file.jpg`.
3. Run `npm run dev` to preview instantly.

**Recommended image sizes:**
- Hero backgrounds: 1600 × 900 px (16:9)
- Portfolio items: 600 × 750 px or 600 × 800 px (portrait)

---

## GitHub Pages Deployment — Step by Step

### One-Time Setup

**Step 1 — Set your repository name in `next.config.js`**

Open `next.config.js` and uncomment + update the two lines:

```js
basePath:    '/fashion-portfolio',   // ← your GitHub repo name
assetPrefix: '/fashion-portfolio/',  // ← same value with trailing slash
```

> If you publish at a root domain (`username.github.io` with no sub-path), leave both lines commented out.

**Step 2 — Create the GitHub repository**

Go to github.com → New repository → name it `fashion-portfolio` (must match `basePath`).

---

### Deploy Commands (copy-paste ready)

```bash
# 1. Build the static site
npm run build

# 2. Add .nojekyll so GitHub Pages doesn't ignore the _next/ folder
#    macOS / Linux:
touch out/.nojekyll
#    Windows PowerShell:
New-Item -ItemType File out/.nojekyll

# 3. Initialise git (skip if already done)
git init
git add .
git commit -m "feat: initial fashion portfolio"

# 4. Add your GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/fashion-portfolio.git

# 5. Push the source code
git push -u origin main

# 6. Deploy the out/ folder to the gh-pages branch
git subtree push --prefix out origin gh-pages
```

**Step 7 — Enable GitHub Pages in the repo settings**

1. GitHub repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `gh-pages` / `/ (root)`
4. Save

Your site will be live at:
`https://YOUR_USERNAME.github.io/fashion-portfolio/`

---

### Easier deploys with `gh-pages` package (optional)

```bash
# Install once
npm install --save-dev gh-pages

# Add to package.json > scripts:
"deploy": "next build && node -e \"require('fs').writeFileSync('out/.nojekyll','')\" && gh-pages -d out --dotfiles"

# Then every deploy is just:
npm run deploy
```

### Subsequent deploys (after first push)

```bash
npm run build
New-Item -ItemType File out/.nojekyll -Force   # Windows
git subtree push --prefix out origin gh-pages
```

---

## Customisation

### Colours
Edit the `:root` block in `src/app/globals.css`.

```css
--color-secondary: #c4a35a;   /* gold accent — change to your brand colour */
--color-background: #faf9f7;  /* warm off-white page background */
```

### Content
| What | Where |
|---|---|
| Portfolio items | `src/data/portfolio.json` |
| Hero slides | `heroSlides` array in `src/components/sections/HeroSection.js` |
| About bio | `src/app/about/page.js` |
| Contact details | `src/app/contact/page.js` → `CONTACT_INFO` array |
| Social links | `src/components/layout/Footer.js` → `SOCIAL` array |

### Future integrations
Every `// TODO:` comment in the codebase marks an API / CMS integration point:
- **CMS** (Contentful, Sanity) → replace `import portfolioData from '@/data/portfolio.json'`
- **Contact form** (Resend, EmailJS, Formspree) → `src/app/contact/ContactForm.js`
- **Analytics** → add script to `src/app/layout.js`
- **Lightbox** → wrap `ImageCard` in `src/components/ui/`

---

## License

MIT — free to use and adapt.
