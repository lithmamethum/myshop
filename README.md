# 🛒 MyShop — Modern E-Commerce Template

> A clean, fully-responsive e-commerce template built with React, Vite, and Tailwind CSS.
> Perfect for launching your online store fast — with cart, auth, checkout, and dark mode ready to go.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-000000?style=for-the-badge)](https://your-demo.vercel.app)
[![Buy Now](https://img.shields.io/badge/💰_Buy_Now-ff6b6b?style=for-the-badge)](https://gumroad.com/your-link)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)

![Hero Screenshot](./docs/screenshot-hero.png)

---

## ✨ Features

- 🛍️ **Product catalog** — grid, search, category filters, sorting
- 🔍 **Product detail page** — with reviews, related products, image gallery
- 🛒 **Shopping cart** — add/remove, quantity controls, persistent (localStorage)
- 💳 **Checkout flow** — shipping + payment form with validation
- ❤️ **Wishlist** — save products for later
- 🔐 **Authentication** — mock login with protected routes
- 🌙 **Dark mode** — toggle + system preference detection
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🎨 **Tailwind CSS** — no bloated UI libraries
- ⚡ **Vite** — lightning-fast dev server & build
- ♿ **Accessible** — keyboard navigation, ARIA labels
- 🧪 **Tested** — Vitest + React Testing Library (optional)

---

## 🖼️ Screenshots

### Home Page
![Home](./docs/screenshot-home.png)

### Products
![Products](./docs/screenshot-products.png)

### Product Detail
![Detail](./docs/screenshot-detail.png)

### Cart
![Cart](./docs/screenshot-cart.png)

### Dark Mode
![Dark](./docs/screenshot-dark.png)

---

## 🚀 Quick Start

### Prerequisites
- Node.js **18+**
- npm / pnpm / yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/yourname/myshop.git
cd myshop

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env

# 4. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 |
| Routing | React Router 7 |
| State | React Context + useReducer |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Animation | Framer Motion |
| Testing | Vitest + Testing Library |
| Linting | ESLint + Prettier |

---

## 📁 Project Structure

```
src/
├── assets/              # Images, fonts
├── components/
│   ├── common/          # ProductCard, Button, Input, Modal
│   └── layout/          # Navbar, Footer, Layout
├── context/             # CartContext, AuthContext, ToastContext
├── data/                # Mock product data
├── hooks/               # Custom hooks
├── pages/               # Route components
├── routes/              # Router config
├── services/            # API calls
├── utils/               # Helpers
└── styles/              # Global styles
```

---

## ⚙️ Customization

### Change brand colors
Edit `src/index.css` and update the CSS variables:
```css
:root {
  --color-brand: #0f172a;  /* your color */
}
```

### Add products
Edit `src/data/products.json` or connect a real API in `src/services/api.js`.

### Change the logo
Replace the emoji in `src/components/layout/Navbar.jsx`.

### Connect a real backend
1. Set `VITE_API_URL` in `.env`
2. Update `src/services/api.js` to fetch from your endpoint
3. Replace mock data imports with API calls

---

## 🌐 Deployment

### Vercel (recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — click Deploy
4. Done ✅

### Netlify
1. Run `npm run build`
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Other
Works with any static host (Cloudflare Pages, GitHub Pages, Render).

---

## 📄 Environment Variables

Create `.env` from `.env.example`:

```env
VITE_API_URL=https://api.example.com
VITE_USE_MOCK=true
VITE_STRIPE_KEY=pk_test_xxx
```

---

## 🧪 Testing

```bash
npm run test          # run once
npm run test:watch    # watch mode
npm run test:coverage # coverage report
```

---

## 📦 What's Included

- ✅ Full source code (React + Vite + Tailwind)
- ✅ 12 pre-built pages/components
- ✅ Mock product data (swap for real API)
- ✅ Figma design file (optional)
- ✅ Documentation
- ✅ Free updates for 12 months
- ✅ Email support

---

## 📜 License

This template is licensed under a **commercial license**.
- ✅ Use in unlimited personal projects
- ✅ Use in **one** commercial project per purchase
- ❌ Resell or redistribute as a template
- ❌ Share the source code publicly

[Read full license →](./LICENSE)

---

## 💬 Support

- 📧 Email: support@yoursite.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourname/myshop/issues)
- 📚 Docs: [yourdocs.com](https://yourdocs.com)

---

## 📝 Changelog

### v1.0.0 — 2026-09-17
- Initial release
- Product catalog, cart, checkout
- Authentication, dark mode
- Responsive design

[Full changelog →](./CHANGELOG.md)

---

## ⭐ Credits

- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)
- Images by [Unsplash](https://unsplash.com)
- Inspired by modern e-commerce stores

---

## 🙏 Thanks

If you bought this template — thank you! If you didn't and just found it helpful, consider [buying it](https://gumroad.com/your-link) to support future updates.

**Made by Lithma Methum**
