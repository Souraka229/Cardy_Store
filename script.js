// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Recherche toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    const searchClose = document.querySelector('.search-close');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            searchBox.classList.toggle('active');
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', function() {
            searchBox.classList.remove('active');
        });
    }
    
    // Filtre de produits
    const productFilter = document.getElementById('productFilter');
    if (productFilter) {
        productFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.promo-card, .service-card, .product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialiser les éléments animés
    const animatedElements = document.querySelectorAll('.promo-card, .service-card, .product-card');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une fois au chargement
    animateOnScroll();
    
    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validation basique
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Ici, normalement, vous enverriez les données à un serveur
            // Pour cette démo, nous simulons juste un envoi réussi
            alert('Votre message a été envoyé avec succès ! Nous vous répondrons bientôt.');
            contactForm.reset();
        });
    }
    
    // Gestion du panier
    const cartButtons = document.querySelectorAll('.add-to-cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.dataset.product;
            const price = parseInt(this.dataset.price);
            
            // Ajouter au panier
            addToCart(product, price);
            
            // Animation de feedback
            this.textContent = 'Ajouté !';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = 'Acheter';
                this.style.backgroundColor = '#FF0000';
            }, 1500);
        });
    });
    
    // Ouvrir le panier
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            openCart();
        });
    }
    
    // Initialiser le compteur du panier
    updateCartCount();
});

// Fonctions du panier
function addToCart(product, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vérifier si le produit est déjà dans le panier
    const existingItemIndex = cart.findIndex(item => item.product === product);
    
    if (existingItemIndex !== -1) {
        // Produit déjà présent, augmenter la quantité
        cart[existingItemIndex].quantity += 1;
    } else {
        // Nouveau produit
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

function openCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    // Récupérer le panier
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vider le contenu précédent
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Votre panier est vide.</p>';
        cartTotal.textContent = '0';
    } else {
        let total = 0;
        
        // Ajouter chaque article
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.product}</h4>
                    <p>${item.price.toLocaleString()} FCFA x ${item.quantity}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                    <button class="remove-btn" data-index="${index}">×</button>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        cartTotal.textContent = total.toLocaleString();
        
        // Ajouter les écouteurs d'événements pour les boutons
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                updateQuantity(index, 1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                updateQuantity(index, -1);
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                removeFromCart(index);
            });
        });
    }
    
    // Afficher le modal
    modal.style.display = 'block';
    
    // Fermer le modal
    const closeButton = document.querySelector('.close');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Bouton de paiement
    const checkoutButton = document.getElementById('checkoutButton');
    checkoutButton.onclick = function() {
        checkout();
    };
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        // Supprimer si la quantité devient 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        openCart(); // Rafraîchir l'affichage
    }
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        openCart(); // Rafraîchir l'affichage
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Votre panier est vide.');
        return;
    }
    
    // Construire le message WhatsApp
    let message = "Bonjour, je souhaite commander les articles suivants :%0A%0A";
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `- ${item.product} (x${item.quantity}) : ${itemTotal.toLocaleString()} FCFA%0A`;
    });
    
    message += `%0ATotal : ${total.toLocaleString()} FCFA%0A%0A`;
    message += "Merci de me contacter pour finaliser la commande.";
    
    // Numéro de téléphone (à remplacer par le vôtre)
    const phoneNumber = "2290166364730";
    
    // Ouvrir WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    
    // Vider le panier après la commande
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Fermer le modal
    document.getElementById('cartModal').style.display = 'none';
    
    alert('Vous allez être redirigé vers WhatsApp pour finaliser votre commande.');
}