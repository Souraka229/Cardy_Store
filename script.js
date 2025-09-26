// Données des produits
const products = {
    ps5: {
        name: "PS5 Slim",
        price: 390000,
        images: ["ps5_slim.jpg", "ps5_slim_2.jpg", "ps5_slim_3.jpg"],
        description: "PS5 Slim scellée : 480.000 FCFA, 375.000 sans jeux, +10 jeux au choix, neuf scellé avec garantie",
        features: [
            "Console PlayStation 5 Slim neuve et scellée",
            "Garantie offerte",
            "+10 jeux au choix inclus",
            "Manette DualSense incluse",
            "Compatibilité avec tous les jeux PS5"
        ]
    },
    ps4: {
        name: "PS4 Fat",
        price: 165000,
        images: ["ps4_fat.jpg", "ps4_fat_2.jpg", "ps4_fat_3.jpg"],
        description: "PS4 Fat : 165.000 FCFA, +10-15 jeux +500Go, accessoires inclus, reconditionné",
        features: [
            "Console PlayStation 4 Fat reconditionnée",
            "Disque dur 500Go",
            "+10 à 15 jeux inclus",
            "Manette DualShock 4 incluse",
            "Tous les accessoires fournis"
        ]
    },
    ps3: {
        name: "PS3 Slim & Ultra Slim",
        price: 85000,
        images: ["ps3_slim_ultraslim.jpg", "ps3_slim_ultraslim_2.jpg", "ps3_slim_ultraslim_3.jpg"],
        description: "PS3 Slim & Ultra Slim : 85.000 FCFA, 256Go +25 jeux, accessoires inclus, reconditionné",
        features: [
            "Console PlayStation 3 Slim ou Ultra Slim reconditionnée",
            "Disque dur 256Go",
            "+25 jeux inclus",
            "Manette Sixaxis ou DualShock 3 incluse",
            "État comme neuf"
        ]
    },
    ps2: {
        name: "PS2 Fat",
        price: 35000,
        images: ["ps2_fat.jpg", "ps2_fat_2.jpg", "ps2_fat_3.jpg"],
        description: "PS2 Fat : 35.000 FCFA, 34 jeux + clé 32Go, accessoires inclus, reconditionné",
        features: [
            "Console PlayStation 2 Fat reconditionnée",
            "34 jeux préinstallés",
            "Clé USB 32Go incluse",
            "Manettes originales incluses",
            "Câbles AV fournis"
        ]
    },
    ps4slim: {
        name: "PS4 Slim",
        price: 200000,
        images: ["ps4_slim.jpg", "ps4_slim_2.jpg", "ps4_slim_3.jpg"],
        description: "PS4 Slim : 200.000 FCFA, 500Go +10-15 jeux, accessoires inclus, reconditionné",
        features: [
            "Console PlayStation 4 Slim reconditionnée",
            "Disque dur 500Go",
            "+10 à 15 jeux inclus",
            "Design élégant et compact",
            "Manette DualShock 4 incluse"
        ]
    },
    ps4pro: {
        name: "PS4 Pro",
        price: 275000,
        images: ["ps4_pro.jpg", "ps4_pro_2.jpg", "ps4_pro_3.jpg"],
        description: "PS4 Pro : 275.000 FCFA, 1To +20 jeux, accessoires inclus, reconditionné",
        features: [
            "Console PlayStation 4 Pro reconditionnée",
            "Disque dur 1To",
            "+20 jeux inclus",
            "Support 4K et HDR",
            "Manette DualShock 4 incluse"
        ]
    },
    pack3: {
        name: "Pack 3 Jeux",
        price: 38000,
        images: ["pack_jeux.jpg", "pack_jeux_2.jpg", "pack_jeux_3.jpg"],
        description: "Pack 3 Jeux : 38.000 FCFA, compatible PS4 v11.50-12 et PS5 toutes versions",
        features: [
            "3 jeux au choix",
            "Compatible PS4 v11.50-12",
            "Compatible PS5 toutes versions",
            "Installation incluse",
            "Garantie de fonctionnement"
        ]
    },
    pack6: {
        name: "Pack 6 Jeux",
        price: 65000,
        images: ["pack_jeux.jpg", "pack_jeux_2.jpg", "pack_jeux_3.jpg"],
        description: "Pack 6 Jeux : 65.000 FCFA, compatible PS4 v11.50-12 et PS5 toutes versions",
        features: [
            "6 jeux au choix",
            "Compatible PS4 v11.50-12",
            "Compatible PS5 toutes versions",
            "Installation incluse",
            "Garantie de fonctionnement"
        ]
    },
    pack10: {
        name: "Pack 10 Jeux",
        price: 85000,
        images: ["pack_jeux.jpg", "pack_jeux_2.jpg", "pack_jeux_3.jpg"],
        description: "Pack 10 Jeux : 85.000 FCFA, compatible PS4 v11.50-12 et PS5 toutes versions",
        features: [
            "10 jeux au choix",
            "Compatible PS4 v11.50-12",
            "Compatible PS5 toutes versions",
            "Installation incluse",
            "Garantie de fonctionnement"
        ]
    }
};

// Panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Éléments DOM
const menuIcon = document.querySelector('.menu-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.cart-modal');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutButton = document.getElementById('checkout-button');
const cartCount = document.querySelector('.cart-count');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Menu déroulant
    menuIcon.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
    });

    // Fermer le menu déroulant en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Slider
    initSlider();

    // Panier
    updateCart();

    // Ouvrir/fermer le panier
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartModal);
    cartOverlay.addEventListener('click', closeCartModal);

    // Paiement via WhatsApp
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }

    // Navigation vers les pages produits depuis l'accueil
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            if (productId) {
                window.location.href = productId + '.html';
            }
        });
    });

    // Recherche de produits
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }

    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', submitContactForm);
    }

    // Demander un service
    const serviceButtons = document.querySelectorAll('.demander-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            requestService(service);
        });
    });

    // Afficher tous les produits sur la page produits
    if (document.getElementById('all-products')) {
        displayAllProducts();
    }

    // Gérer les pages produits détaillées
    if (document.getElementById('product-detail-content')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        if (productId && products[productId]) {
            showProductDetail(productId);
        }
    }
});

// Slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Navigation par points
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Défilement automatique
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Panier
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemCount += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.images[0]}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} FCFA x ${item.quantity}</div>
            </div>
            <div class="cart-item-remove" data-index="${index}"><i class="fas fa-trash"></i></div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotalAmount.textContent = total.toLocaleString();
    cartCount.textContent = itemCount;
    localStorage.setItem('cart', JSON.stringify(cart));

    // Supprimer un article du panier
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        });
    });
}

function addToCart(productId) {
    const product = products[productId];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            images: product.images,
            quantity: 1
        });
    }

    updateCart();
    alert('Produit ajouté au panier!');
}

function openCart() {
    cartModal.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCartModal() {
    cartModal.classList.remove('active');
    cartOverlay.classList.remove('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Votre panier est vide!');
        return;
    }

    let message = "Bonjour, je souhaite commander les produits suivants chez CARDY STORE:\n\n";
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) : ${(item.price * item.quantity).toLocaleString()} FCFA\n`;
    });
    message += `\nTotal: ${cartTotalAmount.textContent} FCFA\n\n`;
    message += "Merci de me contacter pour finaliser la commande.";
    
    const phoneNumber = "+2290166364730";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Afficher tous les produits
function displayAllProducts() {
    const allProductsGrid = document.getElementById('all-products');
    allProductsGrid.innerHTML = '';
    
    Object.keys(products).forEach(productId => {
        const product = products[productId];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product', productId);
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} FCFA</p>
                <a href="${productId}.html" class="btn">Voir détails</a>
            </div>
        `;
        allProductsGrid.appendChild(productCard);
    });
}

// Filtrer les produits
function filterProducts() {
    const searchTerm = this.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Demander un service
function requestService(service) {
    const message = `Bonjour, je suis intéressé(e) par le service: ${service}. Pouvez-vous me donner plus d'informations?`;
    const phoneNumber = "+2290166364730";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Formulaire de contact
function submitContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const fullMessage = `Nouveau message de contact CARDY STORE:\n\nNom: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const phoneNumber = "+2290166364730";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;
    
    window.open(url, '_blank');
    e.target.reset();
    alert('Votre message a été envoyé!');
}