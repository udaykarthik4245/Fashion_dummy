# Meesho Clone

A full-featured Meesho-inspired e-commerce platform built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Zustand**, and **Framer Motion**.

This project replicates Meesho's core experience — product catalog, real-time search, cart, checkout, wishlist, user profiles, and a seller dashboard — and layers in selective UX enhancements like dark mode, quick-view modals, infinite scroll, skeleton loaders, toast notifications, and personalized recommendations powered by browsing history.

---

## Features

### Shopping Experience
- **Product catalog** with grid view, advanced filters (category, price, rating, in-stock), and 5 sort modes
- **Real-time search** with debounced autocomplete suggestions hitting `/api/search`
- **Product detail pages** with multi-image gallery, color/size selection, specs, and reviews
- **Shopping cart** with quantity controls, persistent across sessions (localStorage)
- **Multi-step checkout** — address → payment method → order review → confirmation
- **Wishlist** with one-click toggle from any product card
- **Order success** page with animated confirmation

### User Management
- **Mock authentication** — login, signup, password reset (any credentials work for the demo)
- **User profile** — orders history, saved addresses, account settings
- Auto-detects sellers (use any email containing `seller`)

### Seller Dashboard
- **Overview** with revenue, order, and product KPIs
- **Product CRUD** — add, edit, delete via modal forms
- **Order management** with inline status updates
- **Analytics** — sales-by-status and top-categories with animated bars

### Creative UX Enhancements
- **Dark mode toggle** (persistent, respects user preference)
- **Quick-view modal** — preview a product without leaving the listing
- **Infinite scroll** on the products listing (IntersectionObserver-based)
- **Skeleton loaders** during data fetching for better perceived performance
- **Toast notifications** for cart/wishlist/auth feedback (animated with Framer Motion)
- **Personalized recommendations** on the homepage based on `browsingHistory`
- **Smooth micro-interactions** — hover scale, layout animations, page transitions
- **Mobile-first responsive design** — drawer-style filters and menu on small screens

---

## Tech Stack

| Layer            | Technology                                  |
|------------------|---------------------------------------------|
| Framework        | Next.js 14 (App Router)                     |
| Styling          | Tailwind CSS + custom utilities             |
| State management | Zustand (with `persist` for cart/wishlist)  |
| Animations       | Framer Motion                               |
| Icons            | lucide-react                                |
| Backend          | Next.js Route Handlers (`app/api/*`)        |
| Data layer       | In-memory mock data (`src/lib/mockData.js`) |

---

## Folder Structure

```
meesho-clone/
├── public/                          # Static assets
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── api/                     # Backend API routes
│   │   │   ├── auth/route.js        #   Mock auth (login/signup/reset)
│   │   │   ├── categories/route.js  #   Categories list
│   │   │   ├── orders/route.js      #   Place & list orders
│   │   │   ├── products/
│   │   │   │   ├── route.js         #   List products with filters/sort/pagination
│   │   │   │   └── [id]/route.js    #   Single product + related
│   │   │   ├── search/route.js      #   Autocomplete suggestions
│   │   │   └── seller/products/     #   Seller product CRUD
│   │   ├── auth/                    # Auth pages (login, signup, reset)
│   │   ├── cart/page.jsx            # Shopping cart
│   │   ├── checkout/page.jsx        # Multi-step checkout
│   │   ├── order-success/page.jsx   # Order confirmation
│   │   ├── product/[id]/page.jsx    # Product detail page
│   │   ├── products/page.jsx        # Listing with filters & infinite scroll
│   │   ├── profile/page.jsx         # User profile / orders / addresses
│   │   ├── seller/dashboard/        # Seller dashboard
│   │   ├── wishlist/page.jsx        # Wishlist
│   │   ├── globals.css              # Tailwind directives + utilities
│   │   ├── layout.jsx               # Root layout with header/footer/providers
│   │   ├── not-found.jsx            # 404 page
│   │   └── page.jsx                 # Homepage (banner, categories, recs, trending)
│   ├── components/                  # Reusable UI
│   │   ├── Footer.jsx
│   │   ├── Header.jsx               #   Sticky header with nav, search, cart, wishlist
│   │   ├── ProductCard.jsx          #   Product card with quick-view & wishlist
│   │   ├── Providers.jsx            #   Theme + toast provider
│   │   ├── QuickViewModal.jsx       #   Product preview modal
│   │   ├── SearchBar.jsx            #   Debounced autocomplete
│   │   ├── Skeletons.jsx            #   Loading placeholders
│   │   └── ToastContainer.jsx       #   Animated toast system
│   ├── lib/
│   │   ├── mockData.js              # Generated product/category data
│   │   └── utils.js                 # cn(), formatINR(), calcDiscount()
│   └── store/                       # Zustand stores
│       ├── authStore.js             #   user, addresses, orders
│       ├── cartStore.js             #   cart with persistence
│       ├── uiStore.js               #   theme, browsing history, toasts
│       └── wishlistStore.js         #   wishlist with persistence
├── .gitignore
├── jsconfig.json                    # Path aliases (@/*)
├── next.config.js                   # Image remote patterns
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js               # Brand colors, dark mode, animations
```

---

## Getting Started

### Prerequisites
- Node.js **18.17+** (Next.js 14 requirement)
- npm, yarn, or pnpm

### Install & Run

```bash
cd meesho-clone
npm install
npm run dev
```

The app starts at **http://localhost:3000**.

### Build for Production

```bash
npm run build
npm run start
```

---

## Demo Credentials

The mock auth API accepts **any** email/password combination. Two notes:

- Use any email like `me@example.com` with any password (4+ chars).
- Any email containing the word `seller` (e.g. `me@seller.com`) will be flagged as a seller account, redirecting to `/seller/dashboard` after login.

---

## Key Routes

| Route                       | Description                                  |
|-----------------------------|----------------------------------------------|
| `/`                         | Homepage with banners, categories, trending  |
| `/products`                 | Catalog with filters, sort, infinite scroll  |
| `/products?cat=men&q=shirt` | Filtered/searched results                    |
| `/product/[id]`             | Product detail page                          |
| `/cart`                     | Shopping cart                                |
| `/checkout`                 | Multi-step checkout                          |
| `/wishlist`                 | Saved products                               |
| `/auth/login`               | Login                                        |
| `/auth/signup`              | Signup                                       |
| `/auth/reset`               | Password reset                               |
| `/profile`                  | Orders, addresses, settings                  |
| `/seller/dashboard`         | Seller management UI                         |

### API Routes

| Method | Path                          | Purpose                          |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/products`               | Filtered, sorted, paginated list |
| GET    | `/api/products/[id]`          | Single product + related         |
| GET    | `/api/search?q=`              | Autocomplete suggestions         |
| GET    | `/api/categories`             | Category list                    |
| POST   | `/api/auth`                   | Login/signup/reset (mock)        |
| GET    | `/api/orders`                 | List placed orders               |
| POST   | `/api/orders`                 | Place new order                  |
| GET    | `/api/seller/products`        | Seller's catalog                 |
| POST   | `/api/seller/products`        | Add product                      |
| PUT    | `/api/seller/products`        | Edit product                     |
| DELETE | `/api/seller/products?id=`    | Delete product                   |

---

## Architecture Notes

### State Management
Three persistent Zustand stores (cart, wishlist, auth) save to `localStorage` so user state survives page reloads. The UI store (theme, browsing history) is also persisted, while toasts are kept in memory only.

### Personalized Recommendations
The `uiStore.trackView(id)` action is called whenever a user opens a product detail page. The homepage reads `browsingHistory`, derives the categories the user has shown interest in, and surfaces other products from those categories. With zero history the section is hidden — a clean cold-start UX.

### Backend
All business logic runs through Next.js Route Handlers under `src/app/api/`. The product database is generated from templates in `mockData.js` (≈100 products across 9 categories). Seller-facing routes maintain an in-memory mutable catalog. To swap in a real database, replace the imports in the route handlers with your DB calls — the frontend contract doesn't change.

### Theme
Tailwind's `darkMode: 'class'` toggles based on a `.dark` class on `<html>`, applied by `Providers.jsx` whenever the `uiStore.theme` value changes.

---

## Deployment

The project is ready for one-click deployment to **Vercel**:

```bash
npx vercel
```

Other options:
- **Netlify** — works out of the box with the Next.js runtime
- **Docker** — use the official Next.js Dockerfile
- **Self-hosted** — `npm run build && npm run start`

No environment variables are required for the demo. For a production build, you'd typically add:
- `DATABASE_URL` for a real DB (Postgres/Mongo)
- `NEXTAUTH_SECRET` for real authentication (NextAuth.js)
- Payment gateway keys (Razorpay, Stripe)

---

## What's NOT Included (intentional scope)

- Real authentication (use NextAuth.js for production)
- Real payment processing (integrate Razorpay/Stripe)
- A real database (current mock data is in-memory)
- Email notifications
- Image upload pipeline (use S3/Cloudinary)
- SEO meta-tags per product
- Tests (Jest/Playwright would be the natural addition)

These are common follow-ups to take this from a polished demo to production.

---

## License

Demo / educational project. Not affiliated with Meesho.
