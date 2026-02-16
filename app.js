// ============================================
// MOCK DATA
// ============================================
const mockEvents = [
    {
        id: 1,
        title: "Soweto Derby: Kaizer Chiefs vs Orlando Pirates",
        category: "Sports",
        date: "2026-08-17",
        time: "15:00",
        venue: "FNB Stadium",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
        price: 150,
        available: 2340,
        description: "The biggest rivalry in South African football! Experience the electric atmosphere as Amakhosi take on the Buccaneers in this historic Soweto Derby.",
        ticketTypes: [
            { id: 1, name: "Level 1", price: 120, available: 15750 },
            { id: 2, name: "Level 2", price: 170, available: 23680 },
            { id: 3, name: "Level 5", price: 100, available: 11000 },
            { id: 4, name: "VIP Suite", price: 350, available: 300 }
        ]
    },
    {
        id: 2,
        title: "Mamelodi Sundowns vs Orlando Pirates",
        category: "Sports",
        date: "2026-09-28",
        time: "19:30",
        venue: "Loftus Versfeld Stadium",
        location: "Pretoria, Gauteng",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80",
        price: 180,
        available: 1567,
        description: "PSL Champions Sundowns host the Buccaneers in a top-of-the-table clash. Don't miss this crucial league encounter!",
        ticketTypes: [
            { id: 1, name: "Level 1", price: 120, available: 1567 },
            { id: 2, name: "Level 2", price: 150, available: 234 },
            { id: 3, name: "VIP Suite", price: 280, available: 8 }
        ]
    },
    {
        id: 3,
        title: "Kaizer Chiefs vs Mamelodi Sundowns",
        category: "Sports",
        date: "2026-11-24",
        time: "15:00",
        venue: "FNB Stadium",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80",
        price: 200,
        available: 3456,
        description: "Amakhosi vs The Brazilians! Two of SA's biggest clubs go head-to-head in this massive PSL showdown.",
        ticketTypes: [
            { id: 1, name: "Level 1", price: 120, available: 3456 },
            { id: 2, name: "Level 2", price: 150, available: 567 },
            { id: 3, name: "VIP Suite", price: 200, available: 23 }
        ]
    },
    {
        id: 4,
        title: "Major League DJz Amapiano Live",
        category: "Music",
        date: "2026-07-20",
        time: "20:00",
        venue: "SunBet Arena",
        location: "Pretoria, Gauteng",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
        price: 250,
        available: 892,
        description: "The pioneers of Amapiano bring you an unforgettable night of pure piano vibes! Featuring special guests from the Balcony Mix.",
        ticketTypes: [
            { id: 1, name: "General Access", price: 250, available: 892 },
            { id: 2, name: "Golden Circle", price: 500, available: 123 },
            { id: 3, name: "VIP Table (4 people)", price: 3500, available: 12 }
        ]
    },
    {
        id: 5,
        title: "Kabza De Small & DJ Maphorisa Live",
        category: "Music",
        date: "2026-08-10",
        time: "21:00",
        venue: "WeBuyCars Dome",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        price: 300,
        available: 1234,
        description: "Scorpion Kings take over the Dome! Experience the kings of Amapiano with special performances from the best in the game.",
        ticketTypes: [
            { id: 1, name: "Standard Entry", price: 300, available: 1234 },
            { id: 2, name: "VIP Section", price: 650, available: 178 },
            { id: 3, name: "Private Booth (6 people)", price: 4500, available: 6 }
        ]
    },
    {
        id: 6,
        title: "Trevor Noah: Off The Record Tour",
        category: "Comedy",
        date: "2026-09-15",
        time: "19:00",
        venue: "Montecasino Teatro",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80",
        price: 450,
        available: 567,
        description: "Trevor Noah returns home! The Daily Show host brings his international stand-up tour to South Africa for an exclusive run of shows.",
        ticketTypes: [
            { id: 1, name: "Standard Seating", price: 450, available: 567 },
            { id: 2, name: "Premium Seating", price: 750, available: 89 },
            { id: 3, name: "Meet & Greet Package", price: 2500, available: 0 }
        ]
    },
    {
        id: 7,
        title: "Mpho Popps: Bae Goals Comedy Special",
        category: "Comedy",
        date: "2026-08-03",
        time: "20:00",
        venue: "Lyric Theatre",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80",
        price: 280,
        available: 345,
        description: "Mpho Popps brings his hilarious take on relationships, culture, and everyday life in this brand new comedy special. Pure Mzansi comedy!",
        ticketTypes: [
            { id: 1, name: "General Seating", price: 280, available: 345 },
            { id: 2, name: "Premium Front Section", price: 450, available: 67 },
            { id: 3, name: "VIP Meet & Greet", price: 1200, available: 8 }
        ]
    },
    {
        id: 8,
        title: "Amapiano All Stars Festival",
        category: "Music",
        date: "2026-07-27",
        time: "14:00",
        venue: "FNB Stadium",
        location: "Johannesburg, Gauteng",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        price: 350,
        available: 4567,
        description: "The biggest Amapiano festival of the year! Featuring Kabza, Maphorisa, Major League DJz, DBN Gogo, Uncle Waffles, and many more!",
        ticketTypes: [
            { id: 1, name: "General Access", price: 350, available: 4567 },
            { id: 2, name: "Golden Circle", price: 650, available: 890 },
            { id: 3, name: "VIP Deck", price: 1500, available: 145 }
        ]
    }
];

// ============================================
// STATE MANAGEMENT
// ============================================
const state = {
    currentView: 'home',
    selectedEvent: null,
    cart: [],
    searchTerm: '',
    selectedCategory: 'All',
    checkoutStep: 1,
    sortBy: 'date',
    darkMode: false
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showLoading() {
    document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatCurrency(amount) {
    return `R${amount.toFixed(2)}`;
}

// ============================================
// CART FUNCTIONS
// ============================================
function addToCart(event, ticketType, quantity) {
    const existingItem = state.cart.find(item => 
        item.eventId === event.id && item.ticketTypeId === ticketType.id
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({
            eventId: event.id,
            eventTitle: event.title,
            eventDate: event.date,
            ticketTypeId: ticketType.id,
            ticketTypeName: ticketType.name,
            price: ticketType.price,
            quantity: quantity
        });
    }
    
    updateCartUI();
    showToast(`Added ${quantity} ticket(s) to cart`);
}

function removeFromCart(eventId, ticketTypeId) {
    state.cart = state.cart.filter(item => 
        !(item.eventId === eventId && item.ticketTypeId === ticketTypeId)
    );
    updateCartUI();
    showToast('Item removed from cart');
}

function getCartTotal() {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartUI() {
    const cartCount = getCartItemCount();
    const cartTotal = getCartTotal();
    
    // Update cart count badge
    const cartCountEl = document.getElementById('cart-count');
    if (cartCount > 0) {
        cartCountEl.textContent = cartCount;
        cartCountEl.classList.remove('hidden');
    } else {
        cartCountEl.classList.add('hidden');
    }
    
    // Update cart subtitle
    document.getElementById('cart-subtitle').textContent = 
        `${cartCount} item${cartCount !== 1 ? 's' : ''}`;
    
    // Update cart total
    document.getElementById('cart-total').textContent = formatCurrency(cartTotal);
    
    // Render cart items
    renderCartItems();
    
    // Show/hide cart footer
    const cartFooter = document.getElementById('cart-footer');
    if (cartCount > 0) {
        cartFooter.style.display = 'block';
    } else {
        cartFooter.style.display = 'none';
    }
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = state.cart.map((item, idx) => `
        <div class="cart-item" style="animation-delay: ${idx * 0.1}s">
            <div class="cart-item-header">
                <div>
                    <div class="cart-item-title">${item.eventTitle}</div>
                    <div class="cart-item-type">${item.ticketTypeName}</div>
                    <div class="cart-item-date">${formatDate(item.eventDate)}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.eventId}, ${item.ticketTypeId})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
            <div class="cart-item-footer">
                <span class="cart-item-quantity">${item.quantity} × ${formatCurrency(item.price)}</span>
                <span class="cart-item-price">${formatCurrency(item.price * item.quantity)}</span>
            </div>
        </div>
    `).join('');
}

function toggleCart() {
    const cartOverlay = document.getElementById('cart-overlay');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    cartOverlay.classList.toggle('active');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// ============================================
// EVENT RENDERING
// ============================================
function getFilteredEvents() {
    let filtered = mockEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                            event.location.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                            event.venue.toLowerCase().includes(state.searchTerm.toLowerCase());
        const matchesCategory = state.selectedCategory === 'All' || event.category === state.selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    // Sort events
    filtered.sort((a, b) => {
        switch(state.sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'popular':
                return b.available - a.available;
            case 'date':
            default:
                return new Date(a.date) - new Date(b.date);
        }
    });
    
    return filtered;
}

function renderEvents() {
    const eventsGrid = document.getElementById('events-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    const filteredEvents = getFilteredEvents();
    
    resultsCount.textContent = `Showing ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`;
    
    if (filteredEvents.length === 0) {
        eventsGrid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    
    eventsGrid.innerHTML = filteredEvents.map((event, idx) => `
        <div class="event-card" onclick="showEventDetail(${event.id})" style="animation-delay: ${idx * 0.1}s">
            <div class="event-card-image">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-card-badge">${event.category}</div>
            </div>
            <div class="event-card-content">
                <h3 class="event-card-title">${event.title}</h3>
                <div class="event-card-meta">
                    <div class="event-card-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        <span>${formatDate(event.date)} • ${event.time}</span>
                    </div>
                    <div class="event-card-meta-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>${event.venue}</span>
                    </div>
                </div>
                <div class="event-card-footer">
                    <div>
                        <div class="event-card-price-label">From</div>
                        <div class="event-card-price">${formatCurrency(event.price)}</div>
                    </div>
                    <div class="event-card-availability">
                        ${event.available} left
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
let searchTimeout;

function handleSearch(term) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        state.searchTerm = term;
        renderEvents();
        
        if (term.length > 0) {
            showSearchResults(term);
        } else {
            hideSearchResults();
        }
    }, 300);
}

function showSearchResults(term) {
    const searchResults = document.getElementById('search-results');
    const filtered = mockEvents.filter(event => 
        event.title.toLowerCase().includes(term.toLowerCase()) ||
        event.location.toLowerCase().includes(term.toLowerCase())
    ).slice(0, 5);
    
    if (filtered.length === 0) {
        searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; font-weight: 700; color: var(--text-secondary);">No results found</div>';
    } else {
        searchResults.innerHTML = filtered.map(event => `
            <div class="search-result-item" onclick="showEventDetail(${event.id}); hideSearchResults();">
                <div class="search-result-title">${event.title}</div>
                <div class="search-result-meta">${event.category} • ${formatDate(event.date)}</div>
            </div>
        `).join('');
    }
    
    searchResults.classList.remove('hidden');
}

function hideSearchResults() {
    document.getElementById('search-results').classList.add('hidden');
}

// ============================================
// NAVIGATION
// ============================================
function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(`${viewName}-view`).classList.add('active');
    
    // Update state
    state.currentView = viewName;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showEventDetail(eventId) {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return;
    
    state.selectedEvent = event;
    
    // Render event hero
    const detailHero = document.getElementById('detail-hero');
    detailHero.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <div class="detail-hero-overlay"></div>
        <div class="detail-hero-content">
            <div class="detail-hero-badge">${event.category}</div>
            <h1 class="detail-hero-title">${event.title}</h1>
        </div>
    `;
    
    // Render event info
    const detailInfo = document.getElementById('detail-info');
    detailInfo.innerHTML = `
        <h2 class="detail-info-title">Event Details</h2>
        <div class="detail-meta-grid">
            <div class="detail-meta-item">
                <div class="detail-meta-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
                <div>
                    <div class="detail-meta-label">Date & Time</div>
                    <div class="detail-meta-value">${new Date(event.date).toLocaleDateString('en-US', { 
                        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' 
                    })}</div>
                    <div class="detail-meta-subvalue">${event.time}</div>
                </div>
            </div>
            <div class="detail-meta-item">
                <div class="detail-meta-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>
                <div>
                    <div class="detail-meta-label">Venue</div>
                    <div class="detail-meta-value">${event.venue}</div>
                    <div class="detail-meta-subvalue">${event.location}</div>
                </div>
            </div>
        </div>
        <div class="detail-description">
            <h3>About</h3>
            <p>${event.description}</p>
        </div>
    `;
    
    // Render ticket selector
    renderTicketSelector(event);
    
    // Switch to detail view
    switchView('detail');
}

function renderTicketSelector(event) {
    const ticketSelector = document.getElementById('ticket-selector');
    const selectedTickets = {};
    
    const updateAddButton = () => {
        const totalQuantity = Object.values(selectedTickets).reduce((sum, q) => sum + q, 0);
        const addButton = document.getElementById('add-to-cart-btn');
        if (addButton) {
            if (totalQuantity > 0) {
                addButton.textContent = `Add ${totalQuantity} Ticket${totalQuantity > 1 ? 's' : ''} to Cart`;
                addButton.style.display = 'block';
            } else {
                addButton.style.display = 'none';
            }
        }
    };
    
    ticketSelector.innerHTML = `
        <h3 class="ticket-selector-title">Select Tickets</h3>
        ${event.ticketTypes.map(ticket => `
            <div class="ticket-option">
                <div class="ticket-option-header">
                    <div>
                        <div class="ticket-option-name">${ticket.name}</div>
                        <div class="ticket-option-price">${formatCurrency(ticket.price)}</div>
                    </div>
                    <div class="ticket-option-available">
                        ${ticket.available > 0 ? `${ticket.available} left` : 'Sold out'}
                    </div>
                </div>
                ${ticket.available > 0 ? `
                    <div class="ticket-option-controls">
                        <button class="ticket-option-btn" onclick="updateTicketQuantity(${ticket.id}, -1)" id="minus-${ticket.id}" disabled>
                            <span>−</span>
                        </button>
                        <div class="ticket-option-quantity" id="quantity-${ticket.id}">0</div>
                        <button class="ticket-option-btn add-btn" onclick="updateTicketQuantity(${ticket.id}, 1)" id="plus-${ticket.id}">
                            <span>+</span>
                        </button>
                    </div>
                ` : `
                    <div class="ticket-option-sold-out">Not available</div>
                `}
            </div>
        `).join('')}
        <button class="add-to-cart-btn" id="add-to-cart-btn" style="display: none;">Add to Cart</button>
    `;
    
    // Store selectedTickets in window for access
    window.selectedTickets = selectedTickets;
    window.updateAddButton = updateAddButton;
}

function updateTicketQuantity(ticketId, delta) {
    const quantityEl = document.getElementById(`quantity-${ticketId}`);
    const minusBtn = document.getElementById(`minus-${ticketId}`);
    
    if (!window.selectedTickets[ticketId]) {
        window.selectedTickets[ticketId] = 0;
    }
    
    const newQuantity = Math.max(0, Math.min(10, window.selectedTickets[ticketId] + delta));
    window.selectedTickets[ticketId] = newQuantity;
    
    quantityEl.textContent = newQuantity;
    minusBtn.disabled = newQuantity === 0;
    
    window.updateAddButton();
}

// Add event listener for add to cart button
document.addEventListener('click', (e) => {
    if (e.target.id === 'add-to-cart-btn') {
        Object.entries(window.selectedTickets).forEach(([ticketId, quantity]) => {
            if (quantity > 0) {
                const ticketType = state.selectedEvent.ticketTypes.find(t => t.id === parseInt(ticketId));
                addToCart(state.selectedEvent, ticketType, quantity);
            }
        });
        
        // Reset quantities
        window.selectedTickets = {};
        renderTicketSelector(state.selectedEvent);
        
        // Open cart
        toggleCart();
    }
});

// ============================================
// CHECKOUT
// ============================================
function goToCheckout() {
    if (state.cart.length === 0) {
        showToast('Your cart is empty');
        return;
    }
    
    toggleCart();
    state.checkoutStep = 1;
    updateCheckoutStep();
    renderOrderSummary();
    switchView('checkout');
}

function updateCheckoutStep() {
    // Update progress steps
    document.querySelectorAll('.progress-step').forEach((step, idx) => {
        if (idx < state.checkoutStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Show/hide checkout steps
    document.querySelectorAll('.checkout-step').forEach((step, idx) => {
        if (idx + 1 === state.checkoutStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
    
    // Update button text
    const continueBtn = document.getElementById('checkout-continue-btn');
    if (state.checkoutStep < 3) {
        continueBtn.textContent = 'Continue';
    } else {
        continueBtn.textContent = 'Complete Order';
    }
    
    // Render order review on step 3
    if (state.checkoutStep === 3) {
        renderOrderReview();
    }
}

function renderOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const subtotal = getCartTotal();
    const fee = subtotal * 0.1;
    const total = subtotal + fee;
    
    orderSummary.innerHTML = `
        <h3 class="order-summary-title">Summary</h3>
        <div class="order-summary-row">
            <span>Subtotal</span>
            <span>${formatCurrency(subtotal)}</span>
        </div>
        <div class="order-summary-row">
            <span>Service Fee</span>
            <span>${formatCurrency(fee)}</span>
        </div>
        <div class="order-summary-total">
            <span class="order-summary-total-label">Total</span>
            <span class="order-summary-total-amount">${formatCurrency(total)}</span>
        </div>
    `;
}

function renderOrderReview() {
    const orderReview = document.getElementById('order-review');
    orderReview.innerHTML = state.cart.map(item => `
        <div class="order-review-item">
            <div class="order-review-item-info">
                <div class="order-review-item-title">${item.eventTitle}</div>
                <div class="order-review-item-meta">${item.ticketTypeName} × ${item.quantity}</div>
            </div>
            <div class="order-review-item-price">${formatCurrency(item.price * item.quantity)}</div>
        </div>
    `).join('');
}

function validateCurrentStep() {
    const step = state.checkoutStep;
    
    if (step === 1) {
        // Validate email and names
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        
        let isValid = true;
        
        if (!email || !email.includes('@')) {
            showFieldError('email', 'Please enter a valid email');
            isValid = false;
        } else {
            hideFieldError('email');
        }
        
        if (!firstName) {
            showFieldError('first-name', 'Required');
            isValid = false;
        } else {
            hideFieldError('first-name');
        }
        
        if (!lastName) {
            showFieldError('last-name', 'Required');
            isValid = false;
        } else {
            hideFieldError('last-name');
        }
        
        return isValid;
    }
    
    if (step === 2) {
        // Validate payment info
        const cardNumber = document.getElementById('card-number').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        let isValid = true;
        
        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 15) {
            showFieldError('card-number', 'Please enter a valid card number');
            isValid = false;
        } else {
            hideFieldError('card-number');
        }
        
        if (!expiry || !expiry.match(/^\d{2}\/\d{2}$/)) {
            showFieldError('expiry', 'Invalid');
            isValid = false;
        } else {
            hideFieldError('expiry');
        }
        
        if (!cvv || cvv.length < 3) {
            showFieldError('cvv', 'Invalid');
            isValid = false;
        } else {
            hideFieldError('cvv');
        }
        
        return isValid;
    }
    
    return true;
}

function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = input.nextElementSibling;
    
    input.classList.add('error');
    if (error && error.classList.contains('form-error')) {
        error.textContent = message;
        error.classList.remove('hidden');
    }
}

function hideFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = input.nextElementSibling;
    
    input.classList.remove('error');
    if (error && error.classList.contains('form-error')) {
        error.classList.add('hidden');
    }
}

function handleCheckoutContinue() {
    if (state.checkoutStep < 3) {
        if (validateCurrentStep()) {
            state.checkoutStep++;
            updateCheckoutStep();
        }
    } else {
        // Complete order
        if (validateCurrentStep()) {
            completeOrder();
        }
    }
}

function completeOrder() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // Show success modal
        const modal = document.getElementById('order-complete-modal');
        modal.classList.remove('hidden');
        
        // Clear cart and reset
        setTimeout(() => {
            state.cart = [];
            state.checkoutStep = 1;
            updateCartUI();
            modal.classList.add('hidden');
            switchView('home');
            showToast('Order completed successfully!');
        }, 4000);
    }, 2000);
}

// ============================================
// DARK MODE
// ============================================
function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkMode', state.darkMode);
}

// ============================================
// INPUT FORMATTING
// ============================================
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    input.value = value;
}

// ============================================
// SCROLL BEHAVIOR
// ============================================
let lastScroll = 0;

function handleScroll() {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
}

// ============================================
// EVENT LISTENERS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        state.darkMode = true;
        document.body.classList.add('dark-theme');
    }
    
    // Initial render
    renderEvents();
    updateCartUI();
    
    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    searchInput.addEventListener('blur', () => {
        setTimeout(hideSearchResults, 200);
    });
    
    // Category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.selectedCategory = btn.dataset.category;
            renderEvents();
        });
    });
    
    // Sort select
    document.getElementById('sort-select').addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderEvents();
    });
    
    // Cart buttons
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.getElementById('close-cart-btn').addEventListener('click', toggleCart);
    document.getElementById('cart-overlay').addEventListener('click', toggleCart);
    document.getElementById('proceed-checkout-btn').addEventListener('click', goToCheckout);
    
    // Back buttons
    document.getElementById('back-btn').addEventListener('click', () => switchView('home'));
    document.getElementById('checkout-back-btn').addEventListener('click', () => switchView('home'));
    
    // Dark mode toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleDarkMode);
    
    // Checkout continue button
    document.getElementById('checkout-continue-btn').addEventListener('click', handleCheckoutContinue);
    
    // Form input formatting
    document.getElementById('card-number')?.addEventListener('input', (e) => formatCardNumber(e.target));
    document.getElementById('expiry')?.addEventListener('input', (e) => formatExpiry(e.target));
    document.getElementById('cvv')?.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Scroll behavior
    window.addEventListener('scroll', handleScroll);
    
    // Close search results on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideSearchResults();
            if (document.getElementById('cart-sidebar').classList.contains('active')) {
                toggleCart();
            }
        }
    });
});

// Make functions available globally
window.showEventDetail = showEventDetail;
window.removeFromCart = removeFromCart;
window.updateTicketQuantity = updateTicketQuantity;
