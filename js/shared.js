// ===== THEME =====
function setThemeIcon(isLight) {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
  lucide.createIcons({ nodes: [btn] });
}
function toggleTheme() {
  const isLight = document.body.classList.toggle('light');
  setThemeIcon(isLight);
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
}

// ===== LANGUAGE =====
const translations = {
  fr: {
    cart: 'Panier', myCart: 'Mon Panier', rights: 'Tous droits réservés.',
    heroEyebrow: 'Collection Exclusive 2026',
    heroTitle: "L'art du", heroTitleEm: 'parfum', heroTitleRare: 'rare',
    heroSub: "Découvrez notre sélection de fragrances d'exception, conçues pour les âmes qui refusent l'ordinaire.",
    heroBtn1: 'Explorer la collection', heroBtn2: 'Voir les nouveautés',
    ourFragrances: 'Nos', allCollection: 'Toute la',
    searchPlaceholder: 'Rechercher un parfum...',
    mobileSearchPlaceholder: 'Rechercher un parfum...',
  },
  en: {
    cart: 'Cart', myCart: 'My Cart', rights: 'All rights reserved.',
    heroEyebrow: 'Exclusive Collection 2026',
    heroTitle: 'The art of', heroTitleEm: 'rare', heroTitleRare: 'perfume',
    heroSub: 'Discover our selection of exceptional fragrances, crafted for souls who refuse the ordinary.',
    heroBtn1: 'Explore the collection', heroBtn2: 'See new arrivals',
    ourFragrances: 'Our', allCollection: 'Full',
    searchPlaceholder: 'Search a perfume...',
    mobileSearchPlaceholder: 'Search a perfume...',
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });
  const s = document.getElementById('search-input');
  if (s) s.placeholder = t.searchPlaceholder;
  const sm = document.getElementById('search-input-mobile');
  if (sm) sm.placeholder = t.mobileSearchPlaceholder;
  const lt = document.getElementById('lang-toggle');
  if (lt) lt.textContent = lang === 'fr' ? 'EN' : 'FR';
  document.documentElement.lang = lang;
}

function toggleLang() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  localStorage.setItem('lang', currentLang);
  applyLang(currentLang);
}

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i data-lucide="circle-check"></i> ${msg}`;
  lucide.createIcons({ nodes: [toast] });
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===== CART BADGE =====
function refreshCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ===== CART PANEL =====
function openCart() {
  renderCartPanel();
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}
function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function getTagColor(tag) {
  const colors = { 'Bestseller': '#f59e0b', 'Nouveau': '#10b981', 'Premium': '#c084fc', 'Exclusif': '#f43f5e' };
  return colors[tag] || '#6b7280';
}

function renderCartPanel() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const container = document.getElementById('cart-items');
  const totalSection = document.getElementById('cart-total-section');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><i data-lucide="shopping-bag"></i><p data-i18n="emptyCart">Votre panier est vide</p></div>`;
    if (totalSection) totalSection.style.display = 'none';
    lucide.createIcons();
    return;
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-icon" style="background:${item.color}20">
        ${item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />` : item.emoji}
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.brand} · ${item.ml}</p>
        <span class="cart-item-price">€${item.price}</span>
      </div>
      <div class="cart-item-controls">
        <button onclick="cartChangeQty(${item.id}, -1)" class="qty-btn">−</button>
        <span class="qty-display">${item.qty}</span>
        <button onclick="cartChangeQty(${item.id}, 1)" class="qty-btn">+</button>
        <button onclick="cartRemove(${item.id})" class="remove-btn"><i data-lucide="trash-2"></i></button>
      </div>
    </div>
  `).join('');

  if (totalSection) {
    totalSection.style.display = 'block';
    document.getElementById('cart-total').textContent = `€${total.toFixed(2)}`;
  }
  lucide.createIcons();
}

function cartAddItem(product) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty += 1;
  else cart.push({ ...product, qty: 1 });
  localStorage.setItem('cart', JSON.stringify(cart));
  refreshCartBadge();
  showToast(`${product.name} ajouté au panier`);
}

function cartRemove(id) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  refreshCartBadge();
  renderCartPanel();
}

function cartChangeQty(id, delta) {
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  refreshCartBadge();
  renderCartPanel();
}

function goToCheckout() {
  closeCart();
  window.location.href = 'checkout.html';
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  applyLang(currentLang);
  if (localStorage.getItem('theme') === 'light') setThemeIcon(true);
  refreshCartBadge();

  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', closeCart);

  // Mobile search sync
  const mobileInput = document.getElementById('search-input-mobile');
  if (mobileInput && typeof handleSearch === 'function') {
    mobileInput.addEventListener('input', e => handleSearch(e.target));
  }
});
