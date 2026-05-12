// ===== CART SYSTEM =====
let cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showAddedToast(product.name);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
  renderCartItems();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else { updateCartUI(); renderCartItems(); }
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCartItems() {
  const container = document.getElementById('cart-items');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty"><span>🛍️</span><p>Votre panier est vide</p></div>`;
    document.getElementById('cart-total-section').style.display = 'none';
    return;
  }
  document.getElementById('cart-total-section').style.display = 'block';
  container.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-item-icon" style="background:${item.color}20; color:${item.color}">
        ${item.emoji}
      </div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.brand} · ${item.ml}</p>
        <span class="cart-item-price">€${item.price}</span>
      </div>
      <div class="cart-item-controls">
        <button onclick="changeQty(${item.id}, -1)" class="qty-btn">−</button>
        <span class="qty-display">${item.qty}</span>
        <button onclick="changeQty(${item.id}, 1)" class="qty-btn">+</button>
        <button onclick="removeFromCart(${item.id})" class="remove-btn">🗑️</button>
      </div>
    </div>
  `).join('');
  document.getElementById('cart-total').textContent = `€${getTotal().toFixed(2)}`;
}

function showAddedToast(name) {
  const toast = document.getElementById('toast');
  toast.textContent = `✅ ${name} ajouté au panier`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function openCart() {
  renderCartItems();
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('overlay').classList.add('show');
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}

function goToCheckout() {
  closeCart();
  showPage('checkout');
  renderCheckoutSummary();
}
