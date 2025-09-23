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

    // Gestion des détails produits
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const productModal = document.getElementById('productModal');
    const productDetails = document.getElementById('productDetails');

    // Données des produits (à remplacer par vos vraies données)
    const productsData = {
        1: {
            name: "PS5 SLIM SCELLÉE",
            price: "480.000 FCFA",
            description: "Console PS5 Slim neuve et scellée avec garantie",
            details: "+10 JEUX AU CHOIX\n375.000 FCFA sans les jeux",
            images: ["images/ps5-slim.jpg", "images/ps5-slim-2.jpg"],
            features: [
                "Console PS5 Slim neuve scellée",
                "Manette DualSense incluse",
                "Garantie 1 an",
                "10 jeux au choix inclus"
            ]
        },
        2: {
            name: "PS4 FAT",
            price: "165.000 FCFA",
            description: "Console PS4 Fat avec disque dur 500Go",
            details: "+10 à 15 jeux inclus\nTous les accessoires inclus",
            images: ["images/ps4-fat.jpg", "images/ps4-fat-2.jpg"],
            features: [
                "Console PS4 Fat 500Go",
                "Manette DualShock 4 incluse",
                "10-15 jeux préinstallés",
                "Câbles HDMI et alimentation"
            ]
        },
        3: {
            name: "PS3 SLIM & ULTRA SLIM",
            price: "85.000 FCFA",
            description: "Console PS3 Slim ou Ultra Slim reconditionnée",
            details: "256Go + 25 jeux\nTous les accessoires inclus",
            images: ["images/ps3-slim.jpg", "images/ps3-slim-2.jpg"],
            features: [
                "Console PS3 Slim/Ultra Slim",
                "Disque dur 256Go",
                "25 jeux préinstallés",
                "Manette Sixaxis incluse"
            ]
        }
    };

    // Ouvrir les détails du produit
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.closest('.product-card').dataset.productId;
            const product = productsData[productId];
            
            if (product) {
                showProductDetails(product);
            }
        });
    });

    function showProductDetails(product) {
        productDetails.innerHTML = `
            <div class="product-detail">
                <div class="product-images">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price}</p>
                    <div class="product-features">
                        <h4>Caractéristiques :</h4>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <button class="add-to-cart" 
                            data-product="${product.name}" 
                            data-price="${parseInt(product.price.replace(/\D/g, ''))}">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;

        productModal.style.display = 'block';

        // Ajouter l'écouteur pour le bouton d'ajout au panier
        const addToCartButton = productDetails.querySelector('.add-to-cart');
        if (addToCartButton && window.shoppingCart) {
            addToCartButton.addEventListener('click', function() {
                const product = this.dataset.product;
                const price = parseInt(this.dataset.price);
                window.shoppingCart.addItem(product, price);
                
                // Feedback visuel
                this.textContent = 'Ajouté !';
                this.style.backgroundColor = '#4CAF50';
                
                setTimeout(() => {
                    this.textContent = 'Ajouter au panier';
                    this.style.backgroundColor = '';
                }, 1500);
            });
        }
    }

    // Fermer le modal
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Fermer le modal en cliquant à l'extérieur
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialiser les animations
    const animatedElements = document.querySelectorAll('.product-card');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});