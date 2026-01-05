let cart = JSON.parse(localStorage.getItem('zst-cart')) || [];

// Nettoyer TOUS les produits sans image (anciens produits)
console.log('🧹 Nettoyage du panier - avant:', cart.length, 'produits');
cart = cart.filter(item => {
    if (!item.image) {
        console.log('❌ Suppression produit sans image:', item.name);
        return false;
    }
    console.log('✅ Produit OK:', item.name, '→', item.image);
    return true;
});
console.log('🧹 Nettoyage du panier - après:', cart.length, 'produits');

// Sauvegarder le panier nettoyé
localStorage.setItem('zst-cart', JSON.stringify(cart));

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

function saveCart() {
    console.log('💾 Sauvegarde du panier:', cart);
    cart.forEach((item, i) => {
        console.log(`  ${i+1}. ${item.name} - image: ${item.image}`);
    });
    localStorage.setItem('zst-cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    console.log('➕ addToCart appelé avec:', product);
    console.log('🔍 Image reçue:', product.image);
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('✓ Quantité augmentée:', existingItem);
    } else {
        const newItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1
        };
        console.log('📦 Item créé avec image:', newItem.image);
        cart.push(newItem);
        console.log('✓ Nouveau produit ajouté au panier');
    }
    
    saveCart();
    renderCart();
    openCart();
    
    showNotification(`${product.name} ajouté au panier`);
    console.log('✅ Panier mis à jour. Total articles:', cart.length);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            renderCart();
        }
    }
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function renderCart() {
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');
    const orderButton = document.getElementById('orderButton');
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartTotal.textContent = '0 FCFA';
        orderButton.disabled = true;
        return;
    }
    
    let total = 0;
    let cartHTML = '';
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        console.log('🖼️ Image du produit:', item.name, '→', item.image);
        const itemImage = item.image || 'salon.jpg';
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="assets/images/${itemImage}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)} FCFA</div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartBody.innerHTML = cartHTML;
    cartTotal.textContent = `${formatPrice(total)} FCFA`;
    orderButton.disabled = false;
}

function openCart() {
    document.getElementById('cartSidebar').classList.add('active');
    document.getElementById('cartOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartSidebar').classList.remove('active');
    document.getElementById('cartOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 11000;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function generateWhatsAppMessage() {
    let message = `Bonjour Madame, Monsieur,\n\n`;
    message += `Je souhaite passer commande pour les produits suivants :\n\n`;
    message += `DÉTAILS DE LA COMMANDE\n`;
    message += `────────────────────────\n\n`;
    
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${index + 1}. ${item.name}\n`;
        message += `   Quantité : ${item.quantity}\n`;
        message += `   Prix unitaire : ${formatPrice(item.price)} FCFA\n`;
        message += `   Sous-total : ${formatPrice(itemTotal)} FCFA\n\n`;
    });
    
    message += `────────────────────────\n`;
    message += `TOTAL : ${formatPrice(total)} FCFA\n\n`;
    message += `────────────────────────\n\n`;
    message += `INFORMATIONS DE LIVRAISON\n\n`;
    message += `Je souhaiterais recevoir ces produits :\n`;
    message += `□ Livraison à domicile\n`;
    message += `□ Retrait au salon\n`;
    message += `□ Envoi par coursier\n\n`;
    message += `MODE DE PAIEMENT SOUHAITÉ\n`;
    message += `□ Moov Money\n`;
    message += `□ MTN Money\n`;
    message += `□ Paiement en ligne\n`;
    message += `□ Paiement sur place\n\n`;
    message += `────────────────────────\n\n`;
    message += `Merci de me confirmer la disponibilité des produits et le délai de livraison.\n\n`;
    message += `Cordialement`;
    
    return message;
}

function sendOrder() {
    const message = generateWhatsAppMessage();
    const whatsappNumber = '22967703535';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}

function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

function searchProducts(query) {
    const products = document.querySelectorAll('.product-card');
    const searchTerm = query.toLowerCase();
    
    products.forEach(product => {
        const name = product.querySelector('.product-name').textContent.toLowerCase();
        const description = product.querySelector('.product-description').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || description.includes(searchTerm)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Products.js chargé!');
    
    updateCartCount();
    renderCart();
    
    const cartButton = document.getElementById('cartButton');
    console.log('🛒 Cart button trouvé:', cartButton);
    if (cartButton) {
        cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
    
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
    
    const orderButton = document.getElementById('orderButton');
    if (orderButton) {
        orderButton.addEventListener('click', openOrderModal);
    }
    
    const addToCartButtons = document.querySelectorAll('.btn-add-cart');
    console.log('🔍 Boutons "Ajouter au panier" trouvés:', addToCartButtons.length);
    
    addToCartButtons.forEach((btn, index) => {
        console.log(`  ✓ Bouton ${index + 1}:`, btn.dataset.name);
        
        // Test de clic direct
        btn.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // S'assurer qu'on a le bouton et pas l'icône à l'intérieur
            const button = e.currentTarget;
            
            console.log('🎯 ONCLICK déclenché sur:', button.getAttribute('data-name'));
            console.log('🔍 Bouton complet:', button);
            
            const product = {
                id: button.getAttribute('data-id'),
                name: button.getAttribute('data-name'),
                price: parseInt(button.getAttribute('data-price')),
                category: button.getAttribute('data-category'),
                image: button.getAttribute('data-image')
            };
            
            console.log('📦 Produit à ajouter:', product);
            console.log('📸 Image récupérée:', product.image);
            
            button.classList.add('added');
            addToCart(product);
            
            setTimeout(() => {
                button.classList.remove('added');
            }, 1000);
        };
        
        console.log(`  ✅ Event handler attaché au bouton ${index + 1}`);
    });
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterProducts(category);
        });
    });
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value;
            if (query.trim() === '') {
                const activeFilter = document.querySelector('.filter-btn.active');
                const category = activeFilter ? activeFilter.dataset.category : 'all';
                filterProducts(category);
            } else {
                searchProducts(query);
            }
        });
    }
    
    const navDropdowns = document.querySelectorAll('.nav__dropdown');
    navDropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                this.classList.toggle('active');
            }
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
