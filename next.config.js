/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // ─── GitHub Pages subdirectory deployment ────────────────────────────────
  // Uncomment both lines and replace the value with your repository name.
  // Example: if your repo is github.com/you/fashion-portfolio use '/fashion-portfolio'
  // basePath: '/fashion-portfolio',
  // assetPrefix: '/fashion-portfolio/',
  // ─────────────────────────────────────────────────────────────────────────

  images: {
    // Required for static export — Next.js Image Optimization needs a server.
    // Replace individual <img> tags with <Image> once you deploy to Vercel/Node.
    unoptimized: true,
  },

  // Ensures every route gets an index.html, which GitHub Pages requires.
  trailingSlash: true,
}

module.exports = nextConfig
