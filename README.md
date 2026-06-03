# Sora Parfum

Live site: [https://sora-parfum.vercel.app](https://sora-parfum.vercel.app)

## Project Structure

```
Sora parfum/
├── index.html          ← Home (hero + product preview)
├── catalog.html        ← Full collection + search + filters
├── product.html        ← Product detail (reads ?id=X from URL)
├── login.html          ← Login page
├── checkout.html       ← Payment form
├── confirmation.html   ← Order success
├── css/
│   └── style.css
└── js/
    ├── products.js     ← Product data
    ├── shared.js       ← Theme, lang, cart, toast (loaded on every page)
    ├── navbar.js       ← Injects navbar + cart panel into every page
    ├── cart.js         ← addToCart() using localStorage
    └── main.js
```

## Features

- Home page with hero section
- Catalogue with 8 perfumes
- Real-time search
- Filters by type (Oriental, Floral, Woody, Fresh)
- Product detail page
- Sliding cart (add, remove, quantities)
- Checkout with simulated card payment form
- Order confirmation page
- Login / session management
- Mobile responsive
- Dark/Light theme toggle
- Multilingual support (EN/FR)

## Design

- Theme: Luxury / Dark gold
- Fonts: Cormorant Garamond + DM Sans
- Payment: Simulated (no real payment processing)

## Deployment

Hosted on [Vercel](https://vercel.com).

To redeploy after changes:
```bash
vercel --prod
```
