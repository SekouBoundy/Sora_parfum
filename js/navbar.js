// Injects the shared navbar + cart panel + mobile search + overlay into the page
(function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.body.insertAdjacentHTML('afterbegin', `
    <nav>
      <div class="nav-logo" onclick="window.location.href='index.html'" style="cursor:pointer">
        Sora<span> Parfum</span>
      </div>
      <div class="nav-actions">
        <div class="nav-search">
          <i data-lucide="search" class="search-icon"></i>
          <input type="text" id="search-input" placeholder="Rechercher un parfum..." />
        </div>
        <button class="toggle-btn" id="lang-toggle" onclick="toggleLang()" title="Switch language">FR</button>
        <button class="toggle-btn" id="theme-toggle" onclick="toggleTheme()" title="Toggle theme">
          <i data-lucide="sun"></i>
        </button>
        <button class="cart-btn" onclick="openCart()">
          <i data-lucide="shopping-bag"></i> <span data-i18n="cart">Panier</span>
          <span class="cart-badge">0</span>
        </button>
      </div>
    </nav>

    <div class="mobile-search-bar">
      <i data-lucide="search"></i>
      <input type="text" id="search-input-mobile" placeholder="Rechercher un parfum..." />
    </div>

    <div id="toast"></div>
    <div class="overlay" id="overlay"></div>

    <div class="cart-panel" id="cart-panel">
      <div class="cart-header">
        <h2 data-i18n="myCart">Mon Panier</h2>
        <button class="close-btn" onclick="closeCart()"><i data-lucide="x"></i></button>
      </div>
      <div id="cart-items"></div>
      <div id="cart-total-section" style="display:none">
        <div class="total-row">
          <span class="total-label">Total</span>
          <span id="cart-total">€0.00</span>
        </div>
        <button class="btn-primary" style="width:100%" onclick="goToCheckout()">
          Passer la commande →
        </button>
      </div>
    </div>
  `);

  // Wire up desktop search navigation
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        const q = e.target.value.trim();
        if (q.length > 0) {
          window.location.href = `catalog.html?q=${encodeURIComponent(q)}`;
        }
      });
      // If we're already on catalog, don't redirect
      if (currentPage === 'catalog.html') {
        searchInput.addEventListener('input', e => {
          if (typeof handleSearch === 'function') handleSearch(e.target);
        });
      }
    }
  });
})();
