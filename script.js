// Données produits (liste complète)
const products = [
  {
    id: 'ps5-slim',
    name: 'PS5 Slim Scellée',
    price: 480000,
    priceNoGames: 375000,
    offer: '+10 jeux au choix',
    description: 'Version la plus récente, design compact, performances optimisées',
    state: 'Neuf scellé avec garantie',
    images: ['images/ps5-slim.jpg'],
    accessories: [],
    category: 'console'
  },
  {
    id: 'ps4-fat',
    name: 'PS4 Fat',
    price: 165000,
    offer: '+10 à 15 jeux + 500Go',
    description: 'Version originale, robuste, performances fiables',
    state: 'Reconditionné avec garantie',
    images: ['images/ps4-fat.jpg'],
    accessories: ['manette', 'câbles', 'support'],
    category: 'console'
  },
  {
    id: 'ps3-slim',
    name: 'PS3 Slim',
    price: 85000,
    offer: '256Go + 25 jeux',
    description: 'Design élégant et compact, large bibliothèque de jeux classiques',
    state: 'Reconditionné avec garantie',
    images: ['images/ps3-slim.jpg'],
    accessories: ['manette', 'câbles'],
    category: 'console'
  },
  {
    id: 'ps4-slim',
    name: 'PS4 Slim',
    price: 200000,
    offer: '500Go + 10 à 15 jeux',
    description: 'Design 30% plus mince, consommation réduite, silencieuse',
    state: 'Reconditionné avec garantie',
    images: ['images/ps4-slim.jpg'],
    accessories: ['manette', 'câbles', 'support'],
    category: 'console'
  },
  {
    id: 'ps4-pro',
    name: 'PS4 Pro',
    price: 275000,
    offer: '1To + 20 jeux',
    description: 'Performances 4K, graphismes améliorés, version haute performance',
    state: 'Reconditionné avec garantie',
    images: ['images/ps4-pro.jpg'],
    accessories: ['manette', 'câbles', 'support'],
    category: 'console'
  },
  {
    id: 'ps2-fat',
    name: 'PS2 Fat',
    price: 35000,
    offer: '34 jeux + clé 32Go',
    description: 'Console légendaire, immense bibliothèque de jeux classiques',
    state: 'Reconditionné avec garantie',
    images: ['images/ps2-fat.jpg'],
    accessories: ['manette', 'câbles'],
    category: 'console'
  }
];

// Gestion menu hamburger
const menuHamburger = document.getElementById('menu-hamburger');
const navMenu = document.getElementById('nav-menu');
if(menuHamburger){
  menuHamburger.addEventListener('click', () => {
    const expanded = menuHamburger.getAttribute('aria-expanded') === 'true';
    menuHamburger.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('nav-open');
    navMenu.classList.toggle('nav-closed');
  });

  menuHamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      menuHamburger.click();
    }
  });
}

// Fonction affichage produits phares (accueil)
function displayFeatured() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;
  const featured = products.slice(0, 4); // 4 produits max
  featuredContainer.innerHTML = '';
  featured.forEach(p => {
    const card = document.createElement('article');
    card.className = 'produit-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${p.images[0]}" alt="Console ${p.name}" loading="lazy" />
      <div class="produit-info">
        <h3>${p.name}</h3>
        <p class="prix">${p.price.toLocaleString('fr-FR')} FCFA</p>
      </div>`;
    card.addEventListener('click', () => {
      window.location.href = `produit-details.html?id=${p.id}`;
    });
    featuredContainer.appendChild(card);
  });
}

// Fonction affichage catalogue complet
function displayAllProducts() {
  const allContainer = document.getElementById('all-products');
  if (!allContainer) return;
  allContainer.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'produit-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${p.images[0]}" alt="Console ${p.name}" loading="lazy" />
      <div class="produit-info">
        <h3>${p.name}</h3>
        <p class="prix">${p.price.toLocaleString('fr-FR')} FCFA</p>
      </div>`;
    card.addEventListener('click', () => {
      window.location.href = `produit-details.html?id=${p.id}`;
    });
    allContainer.appendChild(card);
  });
}

// Fonction affichage détails produit
function displayProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) return;

  const produit = products.find(p => p.id === id);
  if (!produit) return;

  // Gallery images
  const mainImage = document.getElementById('main-image');
  const thumbnails = document.getElementById('thumbnails');
  mainImage.src = produit.images[0];
  mainImage.alt = `Image principale de ${produit.name}`;

  thumbnails.innerHTML = '';
  produit.images.forEach((img, i) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.alt = `Miniature ${i + 1} de ${produit.name}`;
    thumb.loading = 'lazy';
    thumb.tabIndex = 0;
    thumb.addEventListener('click', () => {
      mainImage.src = img;
    });
    thumbnails.appendChild(thumb);
  });

  // Infos produit
  const info = document.getElementById('product-info');
  info.innerHTML = `
    <h1>${produit.name}</h1>
    <p class="prix">${produit.price.toLocaleString('fr-FR')} FCFA</p>
    <p><strong>État :</strong> ${produit.state}</p>
    <p><strong>Offre :</strong> ${produit.offer ?? ''}</p>
    <p><strong>Description :</strong> ${produit.description}</p>
    <p><strong>Caractéristiques :</strong> ${produit.accessories.length > 0 ? produit.accessories.join(', ') : 'Aucun accessoire'}</p>
    <button id="addToCartBtn" class="btn-primary" aria-label="Ajouter au panier">Ajouter au panier</button>
    <button id="orderWhatsappBtn" class="btn-secondary" aria-label="Commander via WhatsApp">Commander via WhatsApp</button>
  `;

  // Gestion boutons panier et WhatsApp
  document.getElementById('addToCartBtn').onclick = () => {
    addToCart(produit);
    alert('Produit ajouté au panier');
  };
  document.getElementById('orderWhatsappBtn').onclick = () => {
    const msg = generateWhatsappOrderMessage([{ product: produit, quantity: 1 }]);
    const phone = "+2290166364730";
    const url = `https://wa.me/${phone.replace(/D/g, '')}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // Afficher produits similaires (mêmes catégorie)
  const similar = products.filter(p => p.category === produit.category && p.id !== produit.id).slice(0, 4);
  const simContainer = document.getElementById('similar-products');
  if (!simContainer) return;
  simContainer.innerHTML = '';
  similar.forEach(p => {
    const card = document.createElement('article');
    card.className = 'produit-card';
    card.tabIndex = 0;
    card.innerHTML = `
      <img src="${p.images[0]}" alt="Console ${p.name}" loading="lazy" />
      <div class="produit-info">
        <h3>${p.name}</h3>
        <p class="prix">${p.price.toLocaleString('fr-FR')} FCFA</p>
      </div>`;
    card.addEventListener('click', () => {
      window.location.href = `produit-details.html?id=${p.id}`;
    });
    simContainer.appendChild(card);
  });
}

// Ajouter produit au panier (localStorage)
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(i => i.product.id === product.id);
  if (index !== -1) {
    cart[index].quantity++;
  } else {
    cart.push({ product: product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Générer message WhatsApp commande
function generateWhatsappOrderMessage(cartItems) {
  let msg = "Commande CARDY-STORE :%0A";
  let total = 0;
  cartItems.forEach(({ product, quantity }) => {
    const line = `${product.name} x${quantity} = ${(product.price * quantity).toLocaleString('fr-FR')} FCFA`;
    msg += line + "%0A";
    total += product.price * quantity;
  });
  msg += `Total : ${total.toLocaleString('fr-FR')} FCFA%0A`;
  msg += "Merci de votre commande !";
  return msg;
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('featured-products')) displayFeatured();
  if(document.getElementById('all-products')) displayAllProducts();
  if(document.getElementById('product-info')) displayProductDetails();
});