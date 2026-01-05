// ========================================
// ORDER MODAL - 5-STEP CHECKOUT (Like Booking System)
// ========================================

let orderCurrentSlide = 1;
let tempCart = null;

// DOM Elements
const orderModal = document.getElementById('orderModal');

// Open Modal
function openOrderModal(productName = null, productPrice = null, productImage = null) {
    if (!orderModal) {
        console.error('❌ Order Modal not found');
        return;
    }
    
    // Create temp cart if single product from homepage
    if (productName && productPrice) {
        tempCart = [{
            name: productName,
            price: parseInt(productPrice),
            quantity: 1,
            image: productImage || 'salon.jpg'
        }];
        console.log('✅ Single product:', productName);
    } else {
        tempCart = null;
        console.log('✅ Cart from shop');
    }
    
    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Show first slide
    showOrderSlide(1);
    populateOrderCart();
}

// Close Modal
function closeOrderModal() {
    if (orderModal) {
        orderModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetOrderForm();
    }
}

// Show Slide
function showOrderSlide(slideNumber) {
    // Hide all slides
    document.querySelectorAll('.order-step').forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show target slide
    const targetSlide = document.querySelector(`.order-step[data-step="${slideNumber}"]`);
    if (targetSlide) {
        targetSlide.classList.add('active');
    }
    
    // Update progress
    updateOrderProgress(slideNumber);
    orderCurrentSlide = slideNumber;
}

// Update Progress Bar
function updateOrderProgress(slideNumber) {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        const progress = ((slideNumber - 1) / 4) * 100;
        progressFill.style.width = progress + '%';
    }
    
    // Update step indicators
    document.querySelectorAll('.progress-step').forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (i + 1 < slideNumber) {
            step.classList.add('completed');
        } else if (i + 1 === slideNumber) {
            step.classList.add('active');
        }
    });
    
    // Update buttons
    const prevBtn = document.getElementById('orderPrevBtn');
    const nextBtn = document.getElementById('orderNextBtn');
    const whatsappBtn = document.getElementById('orderWhatsAppBtn');
    
    if (prevBtn) {
        prevBtn.disabled = slideNumber === 1;
        prevBtn.style.opacity = slideNumber === 1 ? '0.5' : '1';
    }
    
    if (slideNumber === 5) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (whatsappBtn) whatsappBtn.style.display = 'flex';
        displayOrderSummary();
    } else {
        if (nextBtn) nextBtn.style.display = 'flex';
        if (whatsappBtn) whatsappBtn.style.display = 'none';
    }
}

// Validate Slide
function validateOrderSlide(slideNumber) {
    const cartToCheck = tempCart || (typeof cart !== 'undefined' ? cart : []);
    
    switch(slideNumber) {
        case 1:
            return cartToCheck && cartToCheck.length > 0;
        case 2:
            const firstName = document.getElementById('orderFirstName')?.value?.trim();
            const lastName = document.getElementById('orderLastName')?.value?.trim();
            const phone = document.getElementById('orderPhone')?.value?.trim();
            return firstName && lastName && phone;
        case 3:
            return document.querySelector('input[name="delivery"]:checked') !== null;
        case 4:
            return document.querySelector('input[name="payment"]:checked') !== null;
        default:
            return true;
    }
}

// Populate Cart
function populateOrderCart() {
    const cartContainer = document.getElementById('orderCartItems');
    const totalEl = document.getElementById('orderTotal');
    
    if (!cartContainer) return;
    
    const cartToDisplay = tempCart || (typeof cart !== 'undefined' ? cart : []);
    
    if (!cartToDisplay || cartToDisplay.length === 0) {
        cartContainer.innerHTML = '<p style="text-align:center; color:#999;">Votre panier est vide</p>';
        if (totalEl) totalEl.textContent = '0 FCFA';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cartToDisplay.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        const img = item.image || 'salon.jpg';
        
        html += `
            <div class="order-cart-item">
                <div class="order-cart-item-image">
                    <img src="assets/images/${img}" alt="${item.name}">
                </div>
                <div class="order-cart-item-info">
                    <div class="order-cart-item-name">${item.name}</div>
                    <div class="order-cart-item-qty">Qty: ${item.quantity}</div>
                    <div class="order-cart-item-price">${formatPrice(item.price)} FCFA × ${item.quantity} = ${formatPrice(subtotal)} FCFA</div>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    if (totalEl) {
        totalEl.textContent = formatPrice(total) + ' FCFA';
    }
}

// Display Summary
function displayOrderSummary() {
    const firstName = document.getElementById('orderFirstName')?.value || '';
    const lastName = document.getElementById('orderLastName')?.value || '';
    const phone = document.getElementById('orderPhone')?.value || '';
    const email = document.getElementById('orderEmail')?.value || '';
    const delivery = document.querySelector('input[name="delivery"]:checked');
    const payment = document.querySelector('input[name="payment"]:checked');
    
    const deliveryLabels = {
        domicile: '🏠 Livraison à domicile',
        coursier: '🏍️ Coursier (24h)',
        salon: '🏪 Retrait au salon'
    };
    
    const paymentLabels = {
        moov: '📱 Moov Money',
        mtn: '📱 MTN Money',
        online: '💳 Paiement en ligne',
        onsite: '💵 À la livraison'
    };
    
    // Client
    const clientEl = document.getElementById('summaryClient');
    if (clientEl) {
        clientEl.innerHTML = `<strong>${firstName} ${lastName}</strong><br>📱 ${phone}<br>${email ? `📧 ${email}` : ''}`;
    }
    
    // Products
    const productsEl = document.getElementById('summaryProducts');
    if (productsEl) {
        let productsHtml = '';
        let total = 0;
        const cartToUse = tempCart || (typeof cart !== 'undefined' ? cart : []);
        
        cartToUse.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            productsHtml += `<div style="margin-bottom:0.5rem; padding-bottom:0.5rem; border-bottom:1px solid #E8E8E8;"><strong>${item.name}</strong><br>Qty: ${item.quantity} × ${formatPrice(item.price)} FCFA = ${formatPrice(subtotal)} FCFA</div>`;
        });
        
        productsEl.innerHTML = productsHtml;
    }
    
    // Delivery
    const deliveryEl = document.getElementById('summaryDelivery');
    if (deliveryEl && delivery) {
        deliveryEl.innerHTML = deliveryLabels[delivery.value] || delivery.value;
    }
    
    // Payment
    const paymentEl = document.getElementById('summaryPayment');
    if (paymentEl && payment) {
        paymentEl.innerHTML = paymentLabels[payment.value] || payment.value;
    }
    
    // Total
    const totalEl = document.getElementById('summaryTotal');
    if (totalEl) {
        let total = 0;
        const cartToUse = tempCart || (typeof cart !== 'undefined' ? cart : []);
        cartToUse.forEach(item => {
            total += item.price * item.quantity;
        });
        totalEl.textContent = formatPrice(total) + ' FCFA';
    }
}

// Generate WhatsApp Message
function generateWhatsAppMessage() {
    const firstName = document.getElementById('orderFirstName')?.value || '';
    const lastName = document.getElementById('orderLastName')?.value || '';
    const phone = document.getElementById('orderPhone')?.value || '';
    const email = document.getElementById('orderEmail')?.value || 'N/A';
    const delivery = document.querySelector('input[name="delivery"]:checked');
    const payment = document.querySelector('input[name="payment"]:checked');
    
    const deliveryLabels = {
        domicile: 'Livraison à domicile',
        coursier: 'Coursier (24h)',
        salon: 'Retrait au salon'
    };
    
    const paymentLabels = {
        moov: 'Moov Money',
        mtn: 'MTN Money',
        online: 'Paiement en ligne',
        onsite: 'Paiement à la livraison'
    };
    
    let msg = `*🛍️ NOUVELLE COMMANDE - ZST BEAUTY CENTER*\n\n`;
    msg += `👤 *CLIENT:*\n`;
    msg += `Nom: ${firstName} ${lastName}\n`;
    msg += `Tél: ${phone}\n`;
    msg += `Email: ${email}\n\n`;
    
    msg += `📦 *PRODUITS:*\n`;
    
    let total = 0;
    const cartToUse = tempCart || (typeof cart !== 'undefined' ? cart : []);
    cartToUse.forEach((item, i) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        msg += `${i + 1}. ${item.name}\n   Qty: ${item.quantity}\n   ${formatPrice(item.price)} FCFA × ${item.quantity} = ${formatPrice(subtotal)} FCFA\n`;
    });
    
    msg += `\n🚚 *LIVRAISON:* ${deliveryLabels[delivery.value]}\n`;
    msg += `💳 *PAIEMENT:* ${paymentLabels[payment.value]}\n`;
    msg += `\n💰 *TOTAL: ${formatPrice(total)} FCFA*\n`;
    msg += `\n---\nMerci!\nZst Beauty Center\n📍 Fidjrosse, Cotonou\n☎️ +229 67 70 35 35`;
    
    return msg;
}

// Send WhatsApp
function sendOrderWhatsApp() {
    const msg = generateWhatsAppMessage();
    const number = '22967703535';
    const encoded = encodeURIComponent(msg);
    const url = `https://wa.me/${number}?text=${encoded}`;
    
    console.log('📱 Sending order to WhatsApp...');
    window.open(url, '_blank');
    
    setTimeout(() => {
        closeOrderModal();
    }, 500);
}

// Reset Form
function resetOrderForm() {
    document.getElementById('orderFirstName').value = '';
    document.getElementById('orderLastName').value = '';
    document.getElementById('orderPhone').value = '';
    document.getElementById('orderEmail').value = '';
    
    document.querySelectorAll('input[name="delivery"], input[name="payment"]').forEach(r => {
        r.checked = false;
    });
    
    orderCurrentSlide = 1;
    tempCart = null;
}

// Format Price
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ========== EVENT LISTENERS ==========

// Close button
document.getElementById('orderModalOverlay')?.addEventListener('click', closeOrderModal);
document.getElementById('orderModalClose')?.addEventListener('click', closeOrderModal);

// Prev button
document.getElementById('orderPrevBtn')?.addEventListener('click', () => {
    if (orderCurrentSlide > 1) {
        showOrderSlide(orderCurrentSlide - 1);
    }
});

// Next button
document.getElementById('orderNextBtn')?.addEventListener('click', () => {
    if (validateOrderSlide(orderCurrentSlide)) {
        showOrderSlide(orderCurrentSlide + 1);
    } else {
        alert('⚠️ Veuillez remplir tous les champs requis');
    }
});

// WhatsApp button
document.getElementById('orderWhatsAppBtn')?.addEventListener('click', sendOrderWhatsApp);

console.log('✅ Order Modal System Loaded');
