// Gestion complète du panier (ajout, suppression, quantités, total)

function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
  let cart = loadCart();
  const idx = cart.findIndex(item => item.product.id === product.id);
  if (idx !== -1) {
    cart[idx].quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  let cart = loadCart();
  cart = cart.filter(item => item.product.id !== productId);
  saveCart(cart);
}

function updateQuantity(productId, quantity) {
  let cart = loadCart();
  const idx = cart.findIndex(item => item.product.id === productId);
  if (idx !== -1) {
    cart[idx].quantity = quantity > 0 ? quantity : 1;
    saveCart(cart);
  }
}

function getTotal() {
  const cart = loadCart();
  return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

function generateWhatsappOrderMessageFromCart() {
  const cart = loadCart();
  if(cart.length === 0) return "Votre panier est vide.";
  let msg = "Commande CARDY-STORE :%0A";
  let total = 0;
  cart.forEach(({ product, quantity }) => {
    msg += `${product.name} x${quantity} = ${(product.price * quantity).toLocaleString('fr-FR')} FCFA%0A`;
    total += product.price * quantity;
  });
  msg += `Total : ${total.toLocaleString('fr-FR')} FCFA%0AMerci de votre commande !`;
  return msg;
}

// Exemple d'usage pour bouton "Commander via WhatsApp" dans page panier (à intégrer selon UI)
// document.getElementById('whatsappOrderButton').onclick = () => {
//   const url = `https://wa.me/+2290166364730?text=${encodeURIComponent(generateWhatsappOrderMessageFromCart())}`;
//   window.open(url, '_blank');
// };