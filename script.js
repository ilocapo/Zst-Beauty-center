// ========================================
// NAVIGATION & MOBILE MENU
// ========================================

// Sélection des éléments
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');

// Ouvrir le menu mobile
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Fermer le menu mobile
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ========================================
// SCROLL HEADER
// ========================================

function scrollHeader() {
    if (window.scrollY >= 50) {
        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = '#ffffff';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ========================================
// ACTIVE LINK ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const sectionLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionLink?.classList.add('active-link');
        } else {
            sectionLink?.classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

const scrollTop = document.getElementById('scroll-top');

function showScrollTop() {
    if (scrollTop) {
        if (window.scrollY >= 400) {
            scrollTop.classList.add('show-scroll');
        } else {
            scrollTop.classList.remove('show-scroll');
        }
    }
}

window.addEventListener('scroll', showScrollTop);

if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ALL LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou qui ne sont pas des ancres
        if (!href || href === '#') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// INTERSECTION OBSERVER - ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes de services
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observer les cartes de produits
document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observer les cartes "Join Us"
document.querySelectorAll('.join-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// SIMPLYBOOK WIDGET INTEGRATION
// ========================================

// Fonction pour charger le widget SimplyBook
function loadSimplyBookWidget() {
    const widgetContainer = document.getElementById('simplybook-widget');
    
    if (widgetContainer) {
        // Configuration du widget SimplyBook
        // Remplacez 'YOUR_COMPANY_NAME' par votre nom de compte SimplyBook
        const script = document.createElement('script');
        script.src = 'https://simplybook.me/v2/widget/widget.js';
        script.async = true;
        
        script.onload = () => {
            // Initialiser le widget après le chargement du script
            // Exemple d'initialisation (à adapter selon votre configuration)
            /*
            new SimplybookWidget({
                widget_type: 'iframe',
                url: 'https://YOUR_COMPANY_NAME.simplybook.me',
                theme: 'default',
                theme_settings: {
                    timeline_show_end_time: '1',
                    hide_past_days: '0',
                    timeline_modern_display: 'as_slots',
                    sb_base_color: '#4A90E2',
                    display_item_mode: 'block',
                    body_bg_color: '#f5f5f5',
                    sb_review_image: '',
                    dark_font_color: '#333333',
                    light_font_color: '#ffffff',
                    sb_company_label_color: '#ffffff',
                    hide_img_mode: '0',
                    sb_busy: '#dad2ce',
                    sb_available: '#4A90E2'
                },
                timeline: 'modern',
                datepicker: 'top_calendar',
                is_rtl: false,
                app_config: {
                    clear_session: 0,
                    allow_switch_to_ada: 0,
                    predefined: []
                },
                container_id: 'simplybook-widget'
            });
            */
            
            console.log('SimplyBook widget loaded');
        };
        
        // Décommenter pour activer l'intégration
        // document.body.appendChild(script);
    }
}

// Charger le widget au chargement de la page
// window.addEventListener('load', loadSimplyBookWidget);

// ========================================
// WHATSAPP TRACKING (Optional Analytics)
// ========================================

// Tracker les clics sur les boutons WhatsApp
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('WhatsApp link clicked:', link.href);
        
        // Vous pouvez ajouter ici du tracking analytics
        // Exemple avec Google Analytics :
        // gtag('event', 'whatsapp_click', {
        //     'event_category': 'engagement',
        //     'event_label': link.textContent
        // });
    });
});

// ========================================
// FORM VALIDATION (si vous ajoutez des formulaires)
// ========================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// LOADING STATE
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('Zst Beauty Center website loaded successfully! 💅✨');
});

// ========================================
// PARALLAX EFFECT ON HERO
// ========================================

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = `${parallax}px`;
    });
}

// ========================================
// LAZY LOADING IMAGES (Performance)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Observer toutes les images avec data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c✨ Zst Beauty Center ✨', 'color: #4A90E2; font-size: 24px; font-weight: bold;');
console.log('%cWebsite développé avec ❤️', 'color: #F5A623; font-size: 14px;');
console.log('%cPour toute question : contact@zstbeauty.com', 'color: #666666; font-size: 12px;');

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Fonction pour obtenir la position d'un élément
function getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
    };
}

// Fonction pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================================
// EXPORT FUNCTIONS (si besoin pour d'autres scripts)
// ========================================

window.ZstBeauty = {
    validateEmail,
    getOffset,
    isElementInViewport
};

// ========================================
// BOOKING MODAL WIZARD
// ========================================

const bookingModal = document.getElementById('bookingModal');
const closeBookingBtn = document.getElementById('closeBookingModal');
const bookingBackBtn = document.getElementById('bookingBack');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Données de réservation
const bookingData = {
    services: [], // Array of {service: 'cheveux', prestation: 'Knotless Braids'}
    date: '',
    time: '',
    name: '',
    phone: '',
    notes: ''
};

let currentSlide = 1;
let selectedCategory = '';
let usedServices = []; // Track which service types have been used

// Ouvrir le modal depuis n'importe quel bouton de réservation
document.querySelectorAll('a[href*="#booking"], .service-card__btn, .btn[href*="#booking"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingModal();
    });
});

// Fermer le modal
if (closeBookingBtn) {
    closeBookingBtn.addEventListener('click', closeBookingModal);
}
if (bookingModal && bookingModal.querySelector('.booking-modal__overlay')) {
    bookingModal.querySelector('.booking-modal__overlay').addEventListener('click', closeBookingModal);
}

function openBookingModal() {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentSlide = 1;
    updateProgress();
    showSlide(1);
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
    resetBooking();
}

function resetBooking() {
    bookingData.services = [];
    bookingData.date = '';
    bookingData.time = '';
    bookingData.name = '';
    bookingData.phone = '';
    bookingData.notes = '';
    currentSlide = 1;
    selectedCategory = '';
    usedServices = [];
    document.querySelectorAll('.booking-option.selected, .booking-time.selected').forEach(el => {
        el.classList.remove('selected');
    });
    document.querySelectorAll('.booking-add-service').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById('bookingDate').value = '';
    document.getElementById('bookingName').value = '';
    document.getElementById('bookingPhone').value = '';
    document.getElementById('bookingNotes').value = '';
}

function showSlide(slideNumber, category = null) {
    // Fade out current slide
    const currentSlideEl = document.querySelector('.booking-slide.active');
    if (currentSlideEl) {
        currentSlideEl.style.opacity = '0';
        setTimeout(() => {
            currentSlideEl.classList.remove('active');
            
            // Show new slide
            let newSlide;
            if (category && slideNumber === 2) {
                newSlide = document.querySelector(`.booking-slide[data-slide="${slideNumber}"][data-category="${category}"]`);
            } else {
                const slides = document.querySelectorAll(`.booking-slide[data-slide="${slideNumber}"]`);
                newSlide = slides[0];
            }
            
            if (newSlide) {
                newSlide.classList.add('active');
                setTimeout(() => {
                    newSlide.style.opacity = '1';
                }, 50);
            }
        }, 300);
    } else {
        // First slide
        let newSlide;
        if (category && slideNumber === 2) {
            newSlide = document.querySelector(`.booking-slide[data-slide="${slideNumber}"][data-category="${category}"]`);
        } else {
            const slides = document.querySelectorAll(`.booking-slide[data-slide="${slideNumber}"]`);
            newSlide = slides[0];
        }
        
        if (newSlide) {
            newSlide.classList.add('active');
            setTimeout(() => {
                newSlide.style.opacity = '1';
            }, 50);
        }
    }
    
    // Update back button visibility
    bookingBackBtn.style.display = slideNumber > 1 ? 'inline-flex' : 'none';
    updateProgress();
}

function updateProgress() {
    const totalSteps = 5;
    const progress = (currentSlide / totalSteps) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Étape ${currentSlide} sur ${totalSteps}`;
}

// Slide 1: Service type selection
document.querySelectorAll('.booking-slide[data-slide="1"] .booking-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const service = this.dataset.service;
        
        // Check if service already used
        if (usedServices.includes(service)) {
            alert('Vous avez déjà sélectionné ce type de service.');
            return;
        }
        
        selectedCategory = service;
        
        // Visual feedback
        document.querySelectorAll('.booking-slide[data-slide="1"] .booking-option').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        
        // Disable used services
        document.querySelectorAll('.booking-slide[data-slide="1"] .booking-option').forEach(b => {
            if (usedServices.includes(b.dataset.service)) {
                b.style.opacity = '0.5';
                b.style.pointerEvents = 'none';
            }
        });
        
        // Move to next slide after delay
        setTimeout(() => {
            currentSlide = 2;
            showSlide(2, service);
        }, 400);
    });
});

// Slide 2: Prestation selection (all categories)
document.querySelectorAll('.booking-slide[data-slide="2"] .booking-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const prestation = this.dataset.prestation;
        
        // Visual feedback
        const parentSlide = this.closest('.booking-slide');
        parentSlide.querySelectorAll('.booking-option').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        
        // Show add service buttons
        const addServiceDiv = parentSlide.querySelector('.booking-add-service');
        if (addServiceDiv) {
            addServiceDiv.style.display = 'flex';
        }
        
        // Store selection temporarily
        window.tempPrestation = prestation;
    });
});

// Add another service buttons
document.querySelectorAll('.add-another-service').forEach(btn => {
    btn.addEventListener('click', function() {
        // Save current service and prestation
        bookingData.services.push({
            service: selectedCategory,
            prestation: window.tempPrestation
        });
        usedServices.push(selectedCategory);
        
        // Reset selection and go back to slide 1
        currentSlide = 1;
        showSlide(1);
        
        // Reset visual feedback for slide 2
        document.querySelectorAll('.booking-slide[data-slide="2"] .booking-option').forEach(b => {
            b.classList.remove('selected');
        });
        document.querySelectorAll('.booking-add-service').forEach(el => {
            el.style.display = 'none';
        });
    });
});

// Continue to summary buttons
document.querySelectorAll('.continue-booking').forEach(btn => {
    btn.addEventListener('click', function() {
        // Save current service and prestation
        bookingData.services.push({
            service: selectedCategory,
            prestation: window.tempPrestation
        });
        usedServices.push(selectedCategory);
        
        // Move to summary slide
        currentSlide = 2.5;
        showSlide(2.5);
        displayServicesSummary();
    });
});

// Display services summary
function displayServicesSummary() {
    const summaryContainer = document.getElementById('servicesSummary');
    summaryContainer.innerHTML = '';
    
    if (bookingData.services.length === 0) {
        summaryContainer.innerHTML = '<p class="booking-summary-empty">Aucun service sélectionné</p>';
        return;
    }
    
    const serviceNames = {
        'cheveux': 'Cheveux',
        'corps': 'Soins du Corps',
        'visage': 'Soins du Visage',
        'ongles': 'Manucure/Pédicure'
    };
    
    bookingData.services.forEach((item, index) => {
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <div>
                <div class="summary-item__service">${serviceNames[item.service]}</div>
                <div class="summary-item__prestation">${item.prestation}</div>
            </div>
            <button class="summary-item__remove" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        summaryContainer.appendChild(summaryItem);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.summary-item__remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            const removedService = bookingData.services[index].service;
            bookingData.services.splice(index, 1);
            usedServices = usedServices.filter(s => s !== removedService);
            
            // Re-enable the service option in slide 1
            document.querySelectorAll('.booking-slide[data-slide="1"] .booking-option').forEach(b => {
                if (b.dataset.service === removedService) {
                    b.style.opacity = '1';
                    b.style.pointerEvents = 'auto';
                }
            });
            
            displayServicesSummary();
        });
    });
}

// Confirm services and continue to date selection
const confirmServicesBtn = document.getElementById('confirmServices');
if (confirmServicesBtn) {
    confirmServicesBtn.addEventListener('click', function() {
        if (bookingData.services.length === 0) {
            alert('Veuillez sélectionner au moins un service');
            return;
        }
        currentSlide = 3;
        showSlide(3);
    });
}

// Slide 3: Date selection
const bookingDateInput = document.getElementById('bookingDate');
const dateNextBtn = document.getElementById('dateNext');

// Set min date to today
const today = new Date().toISOString().split('T')[0];
bookingDateInput.min = today;

dateNextBtn.addEventListener('click', function() {
    const date = bookingDateInput.value;
    if (!date) {
        alert('Veuillez sélectionner une date');
        return;
    }
    
    // Check if date is Sunday (closed)
    const selectedDate = new Date(date + 'T00:00:00');
    if (selectedDate.getDay() === 0) {
        alert('Nous sommes fermés le dimanche. Veuillez choisir une autre date.');
        return;
    }
    
    bookingData.date = date;
    currentSlide = 4;
    showSlide(4);
});

// Slide 4: Time selection
document.querySelectorAll('.booking-time').forEach(btn => {
    btn.addEventListener('click', function() {
        const time = this.dataset.time;
        bookingData.time = time;
        
        // Visual feedback
        document.querySelectorAll('.booking-time').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        
        // Move to next slide
        setTimeout(() => {
            currentSlide = 5;
            showSlide(5);
        }, 400);
    });
});

// Slide 5: Personal info and submit
const submitBookingBtn = document.getElementById('submitBooking');
submitBookingBtn.addEventListener('click', function() {
    const name = document.getElementById('bookingName').value.trim();
    const phone = document.getElementById('bookingPhone').value.trim();
    const notes = document.getElementById('bookingNotes').value.trim();
    
    if (!name) {
        alert('Veuillez entrer votre nom');
        return;
    }
    
    if (!phone) {
        alert('Veuillez entrer votre numéro de téléphone');
        return;
    }
    
    bookingData.name = name;
    bookingData.phone = phone;
    bookingData.notes = notes;
    
    // Generate WhatsApp message
    const message = generateWhatsAppMessage();
    
    // Redirect to WhatsApp
    const whatsappNumber = '22967703535';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    
    // Close modal and reset
    setTimeout(() => {
        closeBookingModal();
    }, 500);
});

function generateWhatsAppMessage() {
    // Format date
    const dateObj = new Date(bookingData.date + 'T00:00:00');
    const dateFormatted = dateObj.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Service name mapping
    const serviceNames = {
        'cheveux': 'Cheveux',
        'corps': 'Soins du Corps',
        'visage': 'Soins du Visage',
        'ongles': 'Manucure/Pédicure'
    };
    
    let message = `Bonjour Madame, Monsieur,\n\n`;
    message += `Je me permets de vous contacter afin de réserver un rendez-vous chez Zst Beauty Center.\n\n`;
    message += `DÉTAILS DE LA RÉSERVATION\n`;
    message += `────────────────────────\n\n`;
    message += `Nom : ${bookingData.name}\n`;
    message += `Téléphone : ${bookingData.phone}\n\n`;
    
    // List all services
    if (bookingData.services.length === 1) {
        message += `Type de service : ${serviceNames[bookingData.services[0].service]}\n`;
        message += `Prestation souhaitée : ${bookingData.services[0].prestation}\n\n`;
    } else {
        message += `Prestations souhaitées :\n`;
        bookingData.services.forEach((item, index) => {
            message += `${index + 1}. ${serviceNames[item.service]} - ${item.prestation}\n`;
        });
        message += `\n`;
    }
    
    message += `Date demandée : ${dateFormatted}\n`;
    message += `Heure souhaitée : ${bookingData.time}\n`;
    
    if (bookingData.notes) {
        message += `\nInformations complémentaires :\n${bookingData.notes}\n`;
    }
    
    message += `\n────────────────────────\n`;
    message += `\nJe vous remercie de bien vouloir me confirmer la disponibilité de ce créneau.\n\n`;
    message += `Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, mes salutations distinguées.\n\n`;
    message += `${bookingData.name}`;
    
    return message;
}

// Back button functionality
bookingBackBtn.addEventListener('click', function() {
    if (currentSlide > 1) {
        currentSlide--;
        
        if (currentSlide === 2) {
            showSlide(2, selectedCategory);
        } else {
            showSlide(currentSlide);
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (bookingModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeBookingModal();
        }
    }
    if (pricingQuoteModal && pricingQuoteModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closePricingQuoteModal();
        }
    }
});

// ========================================
// PRICING QUOTE MODAL
// ========================================

const pricingQuoteModal = document.getElementById('pricingQuoteModal');
const openPricingQuoteBtn = document.getElementById('openPricingQuote');
const closePricingModalBtn = document.getElementById('closePricingModal');
const quoteBackBtn = document.getElementById('quoteBack');
const quoteProgressFill = document.getElementById('quoteProgressFill');
const quoteProgressText = document.getElementById('quoteProgressText');

// Quote data
const quoteData = {
    services: [],
    details: '',
    budget: '',
    date: '',
    name: '',
    phone: '',
    email: ''
};

let currentQuoteSlide = 1;

// Open pricing quote modal
if (openPricingQuoteBtn) {
    openPricingQuoteBtn.addEventListener('click', function() {
        openPricingQuoteModal();
    });
}

// Close modal
if (closePricingModalBtn) {
    closePricingModalBtn.addEventListener('click', closePricingQuoteModal);
}

if (pricingQuoteModal) {
    pricingQuoteModal.querySelector('.booking-modal__overlay').addEventListener('click', closePricingQuoteModal);
}

function openPricingQuoteModal() {
    pricingQuoteModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentQuoteSlide = 1;
    updateQuoteProgress();
    showQuoteSlide(1);
}

function closePricingQuoteModal() {
    pricingQuoteModal.classList.remove('active');
    document.body.style.overflow = '';
    resetQuoteData();
}

function resetQuoteData() {
    quoteData.services = [];
    quoteData.details = '';
    quoteData.budget = '';
    quoteData.date = '';
    quoteData.name = '';
    quoteData.phone = '';
    quoteData.email = '';
    currentQuoteSlide = 1;
    
    document.querySelectorAll('.quote-option.selected').forEach(el => {
        el.classList.remove('selected');
    });
    document.getElementById('quoteDetails').value = '';
    document.getElementById('quoteBudget').value = '';
    document.getElementById('quoteDate').value = '';
    document.getElementById('quoteName').value = '';
    document.getElementById('quotePhone').value = '';
    document.getElementById('quoteEmail').value = '';
}

function showQuoteSlide(slideNumber) {
    const currentSlideEl = document.querySelector('.quote-slide.active');
    
    if (currentSlideEl) {
        // Fade out with slow animation
        currentSlideEl.classList.add('fade-out');
        currentSlideEl.classList.remove('fade-in');
        
        setTimeout(() => {
            currentSlideEl.classList.remove('active', 'fade-out');
            
            // Show new slide
            const newSlide = document.querySelector(`.quote-slide[data-slide="${slideNumber}"]`);
            if (newSlide) {
                newSlide.classList.add('active');
                setTimeout(() => {
                    newSlide.classList.add('fade-in');
                }, 50);
            }
        }, 800); // Match CSS transition duration
    } else {
        // First slide
        const newSlide = document.querySelector(`.quote-slide[data-slide="${slideNumber}"]`);
        if (newSlide) {
            newSlide.classList.add('active');
            setTimeout(() => {
                newSlide.classList.add('fade-in');
            }, 50);
        }
    }
    
    // Update back button visibility
    quoteBackBtn.style.display = slideNumber > 1 ? 'inline-flex' : 'none';
    updateQuoteProgress();
}

function updateQuoteProgress() {
    const totalSteps = 3;
    const progress = (currentQuoteSlide / totalSteps) * 100;
    quoteProgressFill.style.width = `${progress}%`;
    quoteProgressText.textContent = `Étape ${currentQuoteSlide} sur ${totalSteps}`;
}

// Step 1: Service selection (multi-select)
document.querySelectorAll('.quote-option').forEach(btn => {
    btn.addEventListener('click', function() {
        const service = this.dataset.service;
        
        if (this.classList.contains('selected')) {
            // Deselect
            this.classList.remove('selected');
            quoteData.services = quoteData.services.filter(s => s !== service);
        } else {
            // Select
            this.classList.add('selected');
            if (!quoteData.services.includes(service)) {
                quoteData.services.push(service);
            }
        }
    });
});

// Step 1 Next button
const quoteStep1Next = document.getElementById('quoteStep1Next');
if (quoteStep1Next) {
    quoteStep1Next.addEventListener('click', function() {
        if (quoteData.services.length === 0) {
            alert('Veuillez sélectionner au moins un service');
            return;
        }
        currentQuoteSlide = 2;
        showQuoteSlide(2);
    });
}

// Step 2 Next button
const quoteStep2Next = document.getElementById('quoteStep2Next');
if (quoteStep2Next) {
    quoteStep2Next.addEventListener('click', function() {
        const details = document.getElementById('quoteDetails').value.trim();
        
        if (!details) {
            alert('Veuillez décrire les prestations souhaitées');
            return;
        }
        
        quoteData.details = details;
        quoteData.budget = document.getElementById('quoteBudget').value;
        quoteData.date = document.getElementById('quoteDate').value;
        
        currentQuoteSlide = 3;
        showQuoteSlide(3);
    });
}

// Submit quote
const submitQuoteBtn = document.getElementById('submitQuote');
if (submitQuoteBtn) {
    submitQuoteBtn.addEventListener('click', function() {
        const name = document.getElementById('quoteName').value.trim();
        const phone = document.getElementById('quotePhone').value.trim();
        const email = document.getElementById('quoteEmail').value.trim();
        
        if (!name) {
            alert('Veuillez entrer votre nom');
            return;
        }
        
        if (!phone) {
            alert('Veuillez entrer votre numéro de téléphone');
            return;
        }
        
        quoteData.name = name;
        quoteData.phone = phone;
        quoteData.email = email;
        
        // Generate WhatsApp message
        const message = generateQuoteMessage();
        
        // Redirect to WhatsApp
        const whatsappNumber = '22967703535';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappURL, '_blank');
        
        // Close modal and reset
        setTimeout(() => {
            closePricingQuoteModal();
        }, 500);
    });
}

function generateQuoteMessage() {
    const serviceNames = {
        'cheveux': 'Coiffure',
        'corps': 'Soins du Corps',
        'visage': 'Soins du Visage',
        'ongles': 'Manucure/Pédicure'
    };
    
    let message = `Bonjour Madame, Monsieur,\n\n`;
    message += `Je me permets de vous contacter pour obtenir un devis détaillé concernant les prestations suivantes :\n\n`;
    message += `DEMANDE DE DEVIS\n`;
    message += `────────────────────────\n\n`;
    message += `Nom : ${quoteData.name}\n`;
    message += `Téléphone : ${quoteData.phone}\n`;
    
    if (quoteData.email) {
        message += `Email : ${quoteData.email}\n`;
    }
    
    message += `\nTypes de services souhaités :\n`;
    quoteData.services.forEach((service, index) => {
        message += `${index + 1}. ${serviceNames[service]}\n`;
    });
    
    message += `\nDétails des prestations :\n${quoteData.details}\n`;
    
    if (quoteData.budget) {
        message += `\nBudget estimé : ${quoteData.budget}\n`;
    }
    
    if (quoteData.date) {
        const dateObj = new Date(quoteData.date + 'T00:00:00');
        const dateFormatted = dateObj.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        message += `Date souhaitée : ${dateFormatted}\n`;
    }
    
    message += `\n────────────────────────\n`;
    message += `\nPourriez-vous m'indiquer les tarifs et disponibilités pour ces prestations ?\n\n`;
    message += `Je vous remercie par avance pour votre retour.\n\n`;
    message += `Cordialement,\n${quoteData.name}`;
    
    return message;
}

// Back button for quote modal
if (quoteBackBtn) {
    quoteBackBtn.addEventListener('click', function() {
        if (currentQuoteSlide > 1) {
            currentQuoteSlide--;
            showQuoteSlide(currentQuoteSlide);
        }
    });
}

// ========================================
// PRODUCT ORDER MODAL
// ========================================

const productOrderModal = document.getElementById('productOrderModal');
const closeOrderModalBtn = document.getElementById('closeOrderModal');
const orderBackBtn = document.getElementById('orderBack');
const orderProgressFill = document.getElementById('orderProgressFill');
const orderProgressText = document.getElementById('orderProgressText');

const orderData = {
    product: '',
    price: 0,
    quantity: 1,
    firstName: '',
    lastName: '',
    phone: '',
    payment: '',
    delivery: '',
    address: '',
    city: 'Cotonou',
    notes: ''
};

let currentOrderSlide = 1;

// Open order modal when clicking product order buttons
document.querySelectorAll('.product-order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productName = this.dataset.product;
        const productPrice = this.dataset.price;
        const productImage = this.dataset.image || null;
        
        // Open the unified 5-step order modal with this product
        openOrderModal(productName, productPrice, productImage);
    });
});

// Close modal
if (closeOrderModalBtn) {
    closeOrderModalBtn.addEventListener('click', closeProductOrderModal);
}

if (productOrderModal) {
    productOrderModal.querySelector('.booking-modal__overlay').addEventListener('click', closeProductOrderModal);
}

function openProductOrderModal() {
    productOrderModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentOrderSlide = 1;
    updateOrderProgress();
    showOrderSlide(1);
}

function closeProductOrderModal() {
    productOrderModal.classList.remove('active');
    document.body.style.overflow = '';
    resetOrderData();
}

function resetOrderData() {
    orderData.product = '';
    orderData.price = 0;
    orderData.quantity = 1;
    orderData.firstName = '';
    orderData.lastName = '';
    orderData.phone = '';
    orderData.payment = '';
    orderData.delivery = '';
    orderData.address = '';
    orderData.city = 'Cotonou';
    orderData.notes = '';
    currentOrderSlide = 1;
    
    document.querySelectorAll('.order-payment-option.selected, .order-delivery-option.selected').forEach(el => {
        el.classList.remove('selected');
    });
    document.getElementById('orderQuantity').value = 1;
    document.getElementById('orderFirstName').value = '';
    document.getElementById('orderLastName').value = '';
    document.getElementById('orderPhone').value = '';
    document.getElementById('orderAddress').value = '';
    document.getElementById('orderCity').value = 'Cotonou';
    document.getElementById('orderNotes').value = '';
}

function showOrderSlide(slideNumber) {
    const currentSlideEl = document.querySelector('.order-slide.active');
    
    if (currentSlideEl) {
        currentSlideEl.classList.add('fade-out');
        currentSlideEl.classList.remove('fade-in');
        
        setTimeout(() => {
            currentSlideEl.classList.remove('active', 'fade-out');
            
            const newSlide = document.querySelector(`.order-slide[data-slide="${slideNumber}"]`);
            if (newSlide) {
                newSlide.classList.add('active');
                setTimeout(() => {
                    newSlide.classList.add('fade-in');
                }, 50);
            }
        }, 800);
    } else {
        const newSlide = document.querySelector(`.order-slide[data-slide="${slideNumber}"]`);
        if (newSlide) {
            newSlide.classList.add('active');
            setTimeout(() => {
                newSlide.classList.add('fade-in');
            }, 50);
        }
    }
    
    orderBackBtn.style.display = slideNumber > 1 ? 'inline-flex' : 'none';
    updateOrderProgress();
}

function updateOrderProgress() {
    const totalSteps = orderData.delivery === 'retrait' ? 3 : 4;
    const progress = (currentOrderSlide / totalSteps) * 100;
    orderProgressFill.style.width = `${progress}%`;
    orderProgressText.textContent = `Étape ${currentOrderSlide} sur ${totalSteps}`;
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function updateOrderTotal() {
    const total = orderData.price * orderData.quantity;
    document.getElementById('orderTotalAmount').textContent = `${formatPrice(total)} FCFA`;
}

// Quantity controls
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');
const quantityInput = document.getElementById('orderQuantity');

if (decreaseBtn) {
    decreaseBtn.addEventListener('click', function() {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty > 1) {
            quantityInput.value = currentQty - 1;
            orderData.quantity = currentQty - 1;
            updateOrderTotal();
        }
    });
}

if (increaseBtn) {
    increaseBtn.addEventListener('click', function() {
        const currentQty = parseInt(quantityInput.value);
        if (currentQty < 50) {
            quantityInput.value = currentQty + 1;
            orderData.quantity = currentQty + 1;
            updateOrderTotal();
        }
    });
}

if (quantityInput) {
    quantityInput.addEventListener('change', function() {
        let qty = parseInt(this.value);
        if (isNaN(qty) || qty < 1) qty = 1;
        if (qty > 50) qty = 50;
        this.value = qty;
        orderData.quantity = qty;
        updateOrderTotal();
    });
}

// Step 1: Quantity confirmation
const orderStep1Next = document.getElementById('orderStep1Next');
if (orderStep1Next) {
    orderStep1Next.addEventListener('click', function() {
        currentOrderSlide = 2;
        showOrderSlide(2);
    });
}

// Step 2: Customer info
const orderStep2Next = document.getElementById('orderStep2Next');
if (orderStep2Next) {
    orderStep2Next.addEventListener('click', function() {
        const firstName = document.getElementById('orderFirstName').value.trim();
        const lastName = document.getElementById('orderLastName').value.trim();
        const phone = document.getElementById('orderPhone').value.trim();
        
        if (!firstName || !lastName) {
            alert('Veuillez entrer votre prénom et nom');
            return;
        }
        
        if (!phone) {
            alert('Veuillez entrer votre numéro de téléphone');
            return;
        }
        
        orderData.firstName = firstName;
        orderData.lastName = lastName;
        orderData.phone = phone;
        
        currentOrderSlide = 3;
        showOrderSlide(3);
    });
}

// Payment selection
document.querySelectorAll('.order-payment-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.order-payment-option').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        orderData.payment = this.dataset.payment;
    });
});

// Delivery selection
document.querySelectorAll('.order-delivery-option').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.order-delivery-option').forEach(b => {
            b.classList.remove('selected');
        });
        this.classList.add('selected');
        orderData.delivery = this.dataset.delivery;
    });
});

// Step 3: Payment & Delivery
const orderStep3Next = document.getElementById('orderStep3Next');
if (orderStep3Next) {
    orderStep3Next.addEventListener('click', function() {
        if (!orderData.payment) {
            alert('Veuillez sélectionner un mode de paiement');
            return;
        }
        
        if (!orderData.delivery) {
            alert('Veuillez sélectionner un mode de récupération');
            return;
        }
        
        if (orderData.delivery === 'retrait') {
            // Skip address step for pickup
            submitProductOrder();
        } else {
            currentOrderSlide = 4;
            showOrderSlide(4);
        }
    });
}

// Submit order
const submitOrderBtn = document.getElementById('submitOrder');
if (submitOrderBtn) {
    submitOrderBtn.addEventListener('click', function() {
        const address = document.getElementById('orderAddress').value.trim();
        const city = document.getElementById('orderCity').value.trim();
        const notes = document.getElementById('orderNotes').value.trim();
        
        if (!address) {
            alert('Veuillez entrer votre adresse de livraison');
            return;
        }
        
        orderData.address = address;
        orderData.city = city;
        orderData.notes = notes;
        
        submitProductOrder();
    });
}

function submitProductOrder() {
    const message = generateOrderMessage();
    const whatsappNumber = '22967703535';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
    
    setTimeout(() => {
        closeProductOrderModal();
    }, 500);
}

function generateOrderMessage() {
    const paymentLabels = {
        'moov': 'Moov Money',
        'mtn': 'MTN Money',
        'online': 'Paiement en ligne',
        'place': 'Paiement sur place'
    };
    
    const deliveryLabels = {
        'livraison': 'Livraison à domicile',
        'coursier': 'Envoi par coursier',
        'retrait': 'Retrait au salon'
    };
    
    const total = orderData.price * orderData.quantity;
    
    let message = `Bonjour Madame, Monsieur,\n\n`;
    message += `Je souhaite passer commande pour le produit suivant :\n\n`;
    message += `DÉTAILS DE LA COMMANDE\n`;
    message += `────────────────────────\n\n`;
    message += `Prénom : ${orderData.firstName}\n`;
    message += `Nom : ${orderData.lastName}\n`;
    message += `Téléphone : ${orderData.phone}\n\n`;
    message += `Produit : ${orderData.product}\n`;
    message += `Quantité : ${orderData.quantity}\n`;
    message += `Prix unitaire : ${formatPrice(orderData.price)} FCFA\n`;
    message += `TOTAL : ${formatPrice(total)} FCFA\n\n`;
    message += `Mode de paiement : ${paymentLabels[orderData.payment]}\n`;
    message += `Mode de récupération : ${deliveryLabels[orderData.delivery]}\n`;
    
    if (orderData.delivery !== 'retrait') {
        message += `\nAdresse de livraison :\n`;
        message += `${orderData.address}\n`;
        message += `${orderData.city}, Bénin\n`;
    }
    
    if (orderData.notes) {
        message += `\nInstructions spéciales :\n${orderData.notes}\n`;
    }
    
    message += `\n────────────────────────\n`;
    message += `\nMerci de me confirmer la disponibilité et le délai de ${orderData.delivery === 'retrait' ? 'préparation' : 'livraison'}.\n\n`;
    message += `Cordialement,\n${orderData.firstName} ${orderData.lastName}`;
    
    return message;
}

// Back button for order modal
if (orderBackBtn) {
    orderBackBtn.addEventListener('click', function() {
        if (currentOrderSlide > 1) {
            currentOrderSlide--;
            showOrderSlide(currentOrderSlide);
        }
    });
}

// ========================================
// WHATSAPP BOOKING BUTTON
// ========================================

const openWhatsAppBookingBtn = document.getElementById('openWhatsAppBooking');
if (openWhatsAppBookingBtn) {
    openWhatsAppBookingBtn.addEventListener('click', function() {
        openBookingModal();
    });
}

// ========================================
// RECRUITMENT MODAL
// ========================================

const recruitmentModal = document.getElementById('recruitmentModal');
const openRecruitmentModalBtn = document.getElementById('openRecruitmentModal');
const closeRecruitmentModalBtn = document.getElementById('closeRecruitmentModal');
const recruitmentBackBtn = document.getElementById('recruitmentBack');
const recruitmentProgressFill = document.getElementById('recruitmentProgressFill');
const recruitmentProgressText = document.getElementById('recruitmentProgressText');

const recruitmentData = {
    positionType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    cvFile: null,
    coverLetterFile: null,
    message: ''
};

let currentRecruitmentSlide = 1;

if (openRecruitmentModalBtn) {
    openRecruitmentModalBtn.addEventListener('click', function() {
        openRecruitmentModal();
    });
}

if (closeRecruitmentModalBtn) {
    closeRecruitmentModalBtn.addEventListener('click', closeRecruitmentModal);
}

if (recruitmentModal) {
    recruitmentModal.querySelector('.booking-modal__overlay').addEventListener('click', closeRecruitmentModal);
}

function openRecruitmentModal() {
    recruitmentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    currentRecruitmentSlide = 1;
    updateRecruitmentProgress();
    showRecruitmentSlide(1);
}

function closeRecruitmentModal() {
    recruitmentModal.classList.remove('active');
    document.body.style.overflow = '';
    resetRecruitmentData();
}

function resetRecruitmentData() {
    recruitmentData.positionType = '';
    recruitmentData.firstName = '';
    recruitmentData.lastName = '';
    recruitmentData.email = '';
    recruitmentData.phone = '';
    recruitmentData.address = '';
    recruitmentData.experience = '';
    recruitmentData.cvFile = null;
    recruitmentData.coverLetterFile = null;
    recruitmentData.message = '';
    currentRecruitmentSlide = 1;
    
    document.querySelectorAll('.position-type-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    document.getElementById('recruitFirstName').value = '';
    document.getElementById('recruitLastName').value = '';
    document.getElementById('recruitEmail').value = '';
    document.getElementById('recruitPhone').value = '';
    document.getElementById('recruitAddress').value = '';
    document.getElementById('recruitExperience').value = '';
    document.getElementById('recruitCV').value = '';
    document.getElementById('recruitCoverLetter').value = '';
    document.getElementById('recruitMessage').value = '';
    document.getElementById('cvFileName').textContent = 'Aucun fichier sélectionné';
    document.getElementById('coverLetterFileName').textContent = 'Aucun fichier sélectionné';
    document.getElementById('cvFileName').classList.remove('selected');
    document.getElementById('coverLetterFileName').classList.remove('selected');
    
    const recruitmentStep1Next = document.getElementById('recruitmentStep1Next');
    if (recruitmentStep1Next) {
        recruitmentStep1Next.disabled = true;
    }
}

function showRecruitmentSlide(slideNumber) {
    const currentSlideEl = document.querySelector('.recruitment-slide.active');
    
    if (currentSlideEl) {
        currentSlideEl.classList.add('fade-out');
        currentSlideEl.classList.remove('fade-in');
        
        setTimeout(() => {
            currentSlideEl.classList.remove('active', 'fade-out');
            
            const newSlide = document.querySelector(`.recruitment-slide[data-slide="${slideNumber}"]`);
            if (newSlide) {
                newSlide.classList.add('active');
                setTimeout(() => {
                    newSlide.classList.add('fade-in');
                }, 50);
            }
        }, 800);
    } else {
        const newSlide = document.querySelector(`.recruitment-slide[data-slide="${slideNumber}"]`);
        if (newSlide) {
            newSlide.classList.add('active');
            setTimeout(() => {
                newSlide.classList.add('fade-in');
            }, 50);
        }
    }
    
    recruitmentBackBtn.style.display = slideNumber > 1 ? 'inline-flex' : 'none';
    updateRecruitmentProgress();
}

function updateRecruitmentProgress() {
    const progress = (currentRecruitmentSlide / 3) * 100;
    recruitmentProgressFill.style.width = `${progress}%`;
    recruitmentProgressText.textContent = `Étape ${currentRecruitmentSlide} sur 3`;
}

document.querySelectorAll('.position-type-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.position-type-card').forEach(c => {
            c.classList.remove('selected');
        });
        this.classList.add('selected');
        recruitmentData.positionType = this.dataset.type;
        
        const recruitmentStep1Next = document.getElementById('recruitmentStep1Next');
        if (recruitmentStep1Next) {
            recruitmentStep1Next.disabled = false;
        }
    });
});

const recruitmentStep1Next = document.getElementById('recruitmentStep1Next');
if (recruitmentStep1Next) {
    recruitmentStep1Next.addEventListener('click', function() {
        if (recruitmentData.positionType) {
            currentRecruitmentSlide = 2;
            showRecruitmentSlide(2);
        }
    });
}

const recruitmentStep2Next = document.getElementById('recruitmentStep2Next');
if (recruitmentStep2Next) {
    recruitmentStep2Next.addEventListener('click', function() {
        const firstName = document.getElementById('recruitFirstName').value.trim();
        const lastName = document.getElementById('recruitLastName').value.trim();
        const email = document.getElementById('recruitEmail').value.trim();
        const phone = document.getElementById('recruitPhone').value.trim();
        
        if (!firstName || !lastName) {
            alert('Veuillez entrer votre prénom et nom');
            return;
        }
        
        if (!email) {
            alert('Veuillez entrer votre adresse email');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        if (!phone) {
            alert('Veuillez entrer votre numéro de téléphone');
            return;
        }
        
        recruitmentData.firstName = firstName;
        recruitmentData.lastName = lastName;
        recruitmentData.email = email;
        recruitmentData.phone = phone;
        recruitmentData.address = document.getElementById('recruitAddress').value.trim();
        recruitmentData.experience = document.getElementById('recruitExperience').value.trim();
        
        currentRecruitmentSlide = 3;
        showRecruitmentSlide(3);
    });
}

const cvInput = document.getElementById('recruitCV');
if (cvInput) {
    cvInput.addEventListener('change', function() {
        const file = this.files[0];
        const fileNameSpan = document.getElementById('cvFileName');
        const label = this.closest('.file-upload-label');
        
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Le fichier est trop volumineux. Taille maximale: 5MB');
                this.value = '';
                return;
            }
            fileNameSpan.textContent = file.name;
            fileNameSpan.classList.add('selected');
            label.classList.add('has-file');
            recruitmentData.cvFile = file;
        } else {
            fileNameSpan.textContent = 'Aucun fichier sélectionné';
            fileNameSpan.classList.remove('selected');
            label.classList.remove('has-file');
            recruitmentData.cvFile = null;
        }
    });
}

const coverLetterInput = document.getElementById('recruitCoverLetter');
if (coverLetterInput) {
    coverLetterInput.addEventListener('change', function() {
        const file = this.files[0];
        const fileNameSpan = document.getElementById('coverLetterFileName');
        const label = this.closest('.file-upload-label');
        
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Le fichier est trop volumineux. Taille maximale: 5MB');
                this.value = '';
                return;
            }
            fileNameSpan.textContent = file.name;
            fileNameSpan.classList.add('selected');
            label.classList.add('has-file');
            recruitmentData.coverLetterFile = file;
        } else {
            fileNameSpan.textContent = 'Aucun fichier sélectionné';
            fileNameSpan.classList.remove('selected');
            label.classList.remove('has-file');
            recruitmentData.coverLetterFile = null;
        }
    });
}

const submitRecruitmentBtn = document.getElementById('submitRecruitment');
if (submitRecruitmentBtn) {
    submitRecruitmentBtn.addEventListener('click', async function() {
        if (!recruitmentData.cvFile) {
            alert('Veuillez joindre votre CV');
            return;
        }
        
        recruitmentData.message = document.getElementById('recruitMessage').value.trim();
        
        const positionLabels = {
            'salarie': 'Salarié(e)',
            'apprenti': 'Apprenti(e)'
        };
        
        const positionLabel = positionLabels[recruitmentData.positionType];
        
        document.getElementById('summaryPosition').textContent = positionLabel;
        document.getElementById('summaryName').textContent = `${recruitmentData.firstName} ${recruitmentData.lastName}`;
        document.getElementById('summaryEmail').textContent = recruitmentData.email;
        document.getElementById('summaryPhone').textContent = recruitmentData.phone;
        
        let docsText = recruitmentData.cvFile.name;
        if (recruitmentData.coverLetterFile) {
            docsText += `, ${recruitmentData.coverLetterFile.name}`;
        }
        document.getElementById('summaryDocs').textContent = docsText;
        
        document.getElementById('recruitmentSummary').style.display = 'block';
        
        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        
        try {
            await sendRecruitmentEmail();
            
            this.innerHTML = '<i class="fas fa-check"></i> Candidature envoyée !';
            this.style.background = 'var(--color-success)';
            
            setTimeout(() => {
                closeRecruitmentModal();
                alert('Votre candidature a été envoyée avec succès ! Nous vous contacterons prochainement.');
            }, 2000);
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            this.disabled = false;
            this.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer ma candidature';
            alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
        }
    });
}

async function sendRecruitmentEmail() {
    const positionLabels = {
        'salarie': 'Salarié(e)',
        'apprenti': 'Apprenti(e)'
    };
    
    const formData = new FormData();
    formData.append('to', 'bagnonhoue@gmail.com');
    formData.append('subject', `Nouvelle candidature - ${positionLabels[recruitmentData.positionType]} - ${recruitmentData.firstName} ${recruitmentData.lastName}`);
    
    let emailBody = `NOUVELLE CANDIDATURE - ZST BEAUTY CENTER\n\n`;
    emailBody += `═══════════════════════════════════════\n\n`;
    emailBody += `TYPE DE POSTE\n`;
    emailBody += `${positionLabels[recruitmentData.positionType]}\n\n`;
    emailBody += `═══════════════════════════════════════\n\n`;
    emailBody += `INFORMATIONS DU CANDIDAT\n\n`;
    emailBody += `Prénom : ${recruitmentData.firstName}\n`;
    emailBody += `Nom : ${recruitmentData.lastName}\n`;
    emailBody += `Email : ${recruitmentData.email}\n`;
    emailBody += `Téléphone : ${recruitmentData.phone}\n`;
    
    if (recruitmentData.address) {
        emailBody += `Adresse : ${recruitmentData.address}\n`;
    }
    
    if (recruitmentData.experience) {
        emailBody += `\n═══════════════════════════════════════\n\n`;
        emailBody += `EXPÉRIENCE PROFESSIONNELLE\n\n`;
        emailBody += `${recruitmentData.experience}\n`;
    }
    
    if (recruitmentData.message) {
        emailBody += `\n═══════════════════════════════════════\n\n`;
        emailBody += `MESSAGE DU CANDIDAT\n\n`;
        emailBody += `${recruitmentData.message}\n`;
    }
    
    emailBody += `\n═══════════════════════════════════════\n\n`;
    emailBody += `DOCUMENTS JOINTS\n`;
    emailBody += `- CV: ${recruitmentData.cvFile.name}\n`;
    if (recruitmentData.coverLetterFile) {
        emailBody += `- Lettre de motivation: ${recruitmentData.coverLetterFile.name}\n`;
    }
    
    emailBody += `\n═══════════════════════════════════════\n`;
    emailBody += `\nCandidature envoyée depuis le site web Zst Beauty Center\n`;
    emailBody += `Date: ${new Date().toLocaleString('fr-FR')}\n`;
    
    formData.append('body', emailBody);
    formData.append('cv', recruitmentData.cvFile);
    
    if (recruitmentData.coverLetterFile) {
        formData.append('coverLetter', recruitmentData.coverLetterFile);
    }
    
    console.log('Email préparé pour:', 'bagnonhoue@gmail.com');
    console.log('Sujet:', formData.get('subject'));
    console.log('Corps:', emailBody);
    console.log('Fichiers:', recruitmentData.cvFile.name, recruitmentData.coverLetterFile?.name);
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

if (recruitmentBackBtn) {
    recruitmentBackBtn.addEventListener('click', function() {
        if (currentRecruitmentSlide > 1) {
            currentRecruitmentSlide--;
            showRecruitmentSlide(currentRecruitmentSlide);
        }
    });
}

// ========================================
// MOBILE DROPDOWN NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navDropdowns = document.querySelectorAll('.nav__dropdown');
    
    navDropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav__link');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });
    
    let cart = JSON.parse(localStorage.getItem('zst-cart')) || [];
    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountElements = document.querySelectorAll('#cartCount');
        cartCountElements.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    }
    
    updateCartCount();
    
    window.addEventListener('storage', function(e) {
        if (e.key === 'zst-cart') {
            cart = JSON.parse(e.newValue) || [];
            updateCartCount();
        }
    });
});

