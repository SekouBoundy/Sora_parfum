// ===== APP STATE =====
let currentFilter = 'Tous';
let currentProduct = null;

// ===== PAGE NAVIGATION =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  window.scrollTo(0, 0);
}

// ===== RENDER PRODUCTS =====
function renderProducts(filter = 'Tous') {
  const grid = document.getElementById('products-grid');
  const filtered = filter === 'Tous' ? products : products.filter(p => p.scent === filter);

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openProduct(${p.id})">
      ${p.tag ? `<div class="product-tag" style="background:${getTagColor(p.tag)}">${p.tag}</div>` : ''}
      <div class="product-visual" style="background: radial-gradient(circle at 40% 40%, ${p.color}30, ${p.color}05)">
        <div class="product-emoji">${p.emoji}</div>
        <div class="product-glow" style="background:${p.color}"></div>
      </div>
      <div class="product-info">
        <span class="product-brand">${p.brand}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-meta">
          <span class="scent-badge">${p.scent}</span>
          <span class="product-ml">${p.ml}</span>
        </div>
        <p class="product-notes">${p.notes}</p>
        <div class="product-footer">
          <span class="product-price">€${p.price}</span>
          <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
            <span>+</span> Ajouter
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function getTagColor(tag) {
  const colors = { 'Bestseller': '#f59e0b', 'Nouveau': '#10b981', 'Premium': '#c084fc', 'Exclusif': '#f43f5e' };
  return colors[tag] || '#6b7280';
}

// ===== FILTERS =====
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderProducts(filter);
}

// ===== PRODUCT DETAIL =====
function openProduct(id) {
  currentProduct = products.find(p => p.id === id);
  const p = currentProduct;
  document.getElementById('detail-emoji').textContent = p.emoji;
  document.getElementById('detail-emoji').style.color = p.color;
  document.getElementById('detail-visual').style.background = `radial-gradient(circle at 40% 40%, ${p.color}40, ${p.color}08)`;
  document.getElementById('detail-tag').textContent = p.tag || '';
  document.getElementById('detail-tag').style.display = p.tag ? 'inline-block' : 'none';
  document.getElementById('detail-tag').style.background = getTagColor(p.tag);
  document.getElementById('detail-brand').textContent = p.brand;
  document.getElementById('detail-name').textContent = p.name;
  document.getElementById('detail-scent').textContent = p.scent;
  document.getElementById('detail-ml').textContent = p.ml;
  document.getElementById('detail-notes').textContent = p.notes;
  document.getElementById('detail-description').textContent = p.description;
  document.getElementById('detail-price').textContent = `€${p.price}`;
  showPage('detail');
}

// ===== CHECKOUT =====
function renderCheckoutSummary() {
  const container = document.getElementById('checkout-items');
  if (cart.length === 0) { showPage('catalog'); return; }
  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.emoji} ${item.name} × ${item.qty}</span>
      <span>€${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');
  document.getElementById('checkout-total').textContent = `€${getTotal().toFixed(2)}`;
}

function formatCardNumber(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) val = val.substring(0, 2) + '/' + val.substring(2);
  input.value = val;
}

function formatCVV(input) {
  input.value = input.value.replace(/\D/g, '').substring(0, 3);
}

function processPayment() {
  // Validate form
  const name = document.getElementById('card-name').value.trim();
  const number = document.getElementById('card-number').value.replace(/\s/g, '');
  const expiry = document.getElementById('card-expiry').value;
  const cvv = document.getElementById('card-cvv').value;
  const email = document.getElementById('client-email').value.trim();
  const clientName = document.getElementById('client-name').value.trim();

  if (!clientName || !email || !name || number.length < 16 || expiry.length < 5 || cvv.length < 3) {
    showError('Veuillez remplir tous les champs correctement.');
    return;
  }

  // Simulate payment
  document.getElementById('pay-btn').disabled = true;
  document.getElementById('pay-btn').innerHTML = `<span class="spinner"></span> Traitement en cours...`;

  setTimeout(() => {
    showPage('confirmation');
    cart = [];
    updateCartUI();
  }, 2500);
}

function showError(msg) {
  const err = document.getElementById('payment-error');
  err.textContent = msg;
  err.style.display = 'block';
  setTimeout(() => err.style.display = 'none', 3000);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // Overlay click
  document.getElementById('overlay').addEventListener('click', closeCart);

  // Search
  document.getElementById('search-input').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = q
      ? products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q))
      : (currentFilter === 'Tous' ? products : products.filter(p => p.scent === currentFilter));
    const grid = document.getElementById('products-grid');
    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results">Aucun parfum trouvé pour "<strong>${q}</strong>"</div>`;
    } else {
      renderProducts(currentFilter);
      if (q) {
        const allFiltered = products.filter(p =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.notes.toLowerCase().includes(q)
        );
        grid.innerHTML = allFiltered.map(p => `
          <div class="product-card" onclick="openProduct(${p.id})">
            ${p.tag ? `<div class="product-tag" style="background:${getTagColor(p.tag)}">${p.tag}</div>` : ''}
            <div class="product-visual" style="background: radial-gradient(circle at 40% 40%, ${p.color}30, ${p.color}05)">
              <div class="product-emoji">${p.emoji}</div>
            </div>
            <div class="product-info">
              <span class="product-brand">${p.brand}</span>
              <h3 class="product-name">${p.name}</h3>
              <div class="product-meta">
                <span class="scent-badge">${p.scent}</span>
                <span class="product-ml">${p.ml}</span>
              </div>
              <p class="product-notes">${p.notes}</p>
              <div class="product-footer">
                <span class="product-price">€${p.price}</span>
                <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
                  <span>+</span> Ajouter
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  });
});
