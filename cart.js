// Gestion avancée du panier
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.updateCartCount();
        this.bindEvents();
    }

    bindEvents() {
        // Événements pour les boutons "Ajouter au panier"
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const product = e.target.dataset.product;
                const price = parseInt(e.target.dataset.price);
                this.addItem(product, price);

                // Animation de feedback
                e.target.textContent = 'Ajouté !';
                e.target.style.backgroundColor = '#4CAF50';

                setTimeout(() => {
                    e.target.textContent = e.target.dataset.originalText || 'Acheter';
                    e.target.style.backgroundColor = '';
                }, 1500);
            }
        });

        // Ouvrir le panier
        const cartButton = document.getElementById('cartButton');
        if (cartButton) {
            cartButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.openCart();
            });
        }
    }

    addItem(product, price) {
        // Vérifier si le produit est déjà dans le panier
        const existingItemIndex = this.cart.findIndex(item => item.product === product);

        if (existingItemIndex !== -1) {
            // Produit déjà présent, augmenter la quantité
            this.cart[existingItemIndex].quantity += 1;
        } else {
            // Nouveau produit
            this.cart.push({
                product: product,
                price: price,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
    }

    removeItem(index) {
        if (this.cart[index]) {
            this.cart.splice(index, 1);
            this.saveCart();
            this.updateCartCount();
            return true;
        }
        return false;
    }

    updateQuantity(index, change) {
        if (this.cart[index]) {
            this.cart[index].quantity += change;

            // Supprimer si la quantité devient 0
            if (this.cart[index].quantity <= 0) {
                this.removeItem(index);
            } else {
                this.saveCart();
            }

            this.updateCartCount();
            return true;
        }
        return false;
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);

        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    openCart() {
        const modal = document.getElementById('cartModal');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        // Vider le contenu précédent
        cartItems.innerHTML = '';

        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide.</p>';
            cartTotal.textContent = '0';
        } else {
            let total = 0;

            // Ajouter chaque article
            this.cart.forEach((item, index) => {
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
            this.bindCartItemEvents();
        }

        // Afficher le modal
        modal.style.display = 'block';

        // Fermer le modal
        const closeButton = document.querySelector('.close');
        closeButton.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };

        // Bouton de paiement
        const checkoutButton = document.getElementById('checkoutButton');
        checkoutButton.onclick = () => {
            this.checkout();
        };
    }

    bindCartItemEvents() {
        // Boutons plus
        document.querySelectorAll('.quantity-btn.plus').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.updateQuantity(index, 1);
                this.openCart(); // Rafraîchir l'affichage
            });
        });

        // Boutons moins
        document.querySelectorAll('.quantity-btn.minus').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.updateQuantity(index, -1);
                this.openCart(); // Rafraîchir l'affichage
            });
        });

        // Boutons de suppression
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeItem(index);
                this.openCart(); // Rafraîchir l'affichage
            });
        });
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('Votre panier est vide.');
            return;
        }

        // Construire le message WhatsApp
        let message = "Bonjour, je souhaite commander les articles suivants :%0A%0A";

        let total = 0;
        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `- ${item.product} (x${item.quantity}) : ${itemTotal.toLocaleString()} FCFA%0A`;
        });

        message += `%0ATotal : ${total.toLocaleString()} FCFA%0A%0A`;
        message += "Merci de me contacter pour finaliser la commande.";

        // Numéro de téléphone
        const phoneNumber = "2290166364730";

        // Ouvrir WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

        // Vider le panier après la commande
        this.cart = [];
        this.saveCart();
        this.updateCartCount();

        // Fermer le modal
        document.getElementById('cartModal').style.display = 'none';

        alert('Vous allez être redirigé vers WhatsApp pour finaliser votre commande.');
    }
}

// Initialiser le panier lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    window.shoppingCart = new ShoppingCart();
});