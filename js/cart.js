// cart.js — thin wrapper; state lives in localStorage via shared.js

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) cartAddItem(product);
}
