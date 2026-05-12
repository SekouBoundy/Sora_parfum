"# Sora_parfum" 

## 📁 Structure du projet

```
Sora parfum/
├── index.html          ← Home (hero + product preview)
├── catalog.html        ← Full collection + search + filters
├── product.html        ← Product detail (reads ?id=X from URL)
├── checkout.html       ← Payment form
├── confirmation.html   ← Order success
├── css/
│   └── style.css
└── js/
    ├── products.js     ← Product data (unchanged)
    ├── shared.js       ← Theme, lang, cart, toast (loaded on every page)
    ├── navbar.js       ← Injects navbar + cart panel into every page
    ├── cart.js         ← addToCart() wrapper using localStorage
    └── main.js         ← Empty (no longer needed)

```

---

## ✅ Fonctionnalités incluses

- 🏠 Page d'accueil avec hero section
- 🛍️ Catalogue avec 8 parfums
- 🔍 Recherche en temps réel
- 🏷️ Filtres par type (Oriental, Floral, Boisé, Frais)
- 📄 Page détail produit
- 🛒 Panier coulissant (ajout, suppression, quantités)
- 💳 Checkout avec formulaire de carte bancaire simulé
- ✅ Page de confirmation de commande
- 📱 Responsive mobile

---

## 🎨 Design

- Thème : Luxe / Dark gold
- Fonts : Cormorant Garamond + DM Sans
- Paiement : Simulé (pas de vrai paiement)

---

## 📦 Déploiement gratuit

1. Créer un compte sur https://vercel.com
2. Uploader le dossier
3. Le site est en ligne en 1 minute !

---

