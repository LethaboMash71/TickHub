// ============================================
// TICKHUB — AUTH MODULE
// auth.js
//
// Security features implemented:
//  • SHA-256 password hashing via Web Crypto API
//  • Random salt per user (defeats rainbow tables)
//  • Cryptographically random session tokens
//  • Session expiry (24 hours)
//  • Login rate-limiting + account lockout (5 attempts → 15 min lock)
//  • Input sanitisation (XSS prevention)
//  • Timing-safe comparison for session validation
//  • Passwords never stored in plaintext — ever
// ============================================

'use strict';

// ============================================
// CONSTANTS
// ============================================
const AUTH_CONSTANTS = {
    SALT_LENGTH: 32,           // bytes
    TOKEN_LENGTH: 32,          // bytes
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION_MS: 15 * 60 * 1000,   // 15 minutes
    SESSION_DURATION_MS: 24 * 60 * 60 * 1000, // 24 hours
    STORAGE_KEYS: {
        USERS: 'tickhub_users',
        SESSION: 'tickhub_session',
        LOGIN_ATTEMPTS: 'tickhub_login_attempts',
    },
    PASSWORD_RULES: {
        MIN_LENGTH: 8,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: true,
        REQUIRE_SPECIAL: true,
    },
};

// ============================================
// CRYPTO UTILITIES
// ============================================

/**
 * Generate a cryptographically secure random hex string.
 * Uses window.crypto.getRandomValues — not Math.random.
 */
function generateRandomHex(byteLength) {
    const bytes = new Uint8Array(byteLength);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash a password with a salt using SHA-256 via the Web Crypto API.
 * Returns a hex string: "<salt>:<hash>"
 */
async function hashPassword(plaintext, saltHex = null) {
    const salt = saltHex || generateRandomHex(AUTH_CONSTANTS.SALT_LENGTH);
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + plaintext);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return { salt, hash: hashHex, stored: `${salt}:${hashHex}` };
}

/**
 * Verify a plaintext password against a stored "salt:hash" string.
 */
async function verifyPassword(plaintext, storedHash) {
    try {
        const [salt] = storedHash.split(':');
        const { stored } = await hashPassword(plaintext, salt);
        // Compare character by character to avoid short-circuit timing leaks
        if (stored.length !== storedHash.length) return false;
        let diff = 0;
        for (let i = 0; i < stored.length; i++) {
            diff |= stored.charCodeAt(i) ^ storedHash.charCodeAt(i);
        }
        return diff === 0;
    } catch {
        return false;
    }
}

/**
 * Generate a secure session token.
 */
function generateSessionToken() {
    return generateRandomHex(AUTH_CONSTANTS.TOKEN_LENGTH);
}

// ============================================
// INPUT SANITISATION
// ============================================

/** Strip HTML / script injection from a string. */
function sanitise(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .trim();
}

/** Basic email format check. */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Password strength checker.
 * Returns { valid: bool, errors: string[] }
 */
function validatePasswordStrength(password) {
    const errors = [];
    const r = AUTH_CONSTANTS.PASSWORD_RULES;
    if (password.length < r.MIN_LENGTH)
        errors.push(`At least ${r.MIN_LENGTH} characters`);
    if (r.REQUIRE_UPPERCASE && !/[A-Z]/.test(password))
        errors.push('At least one uppercase letter');
    if (r.REQUIRE_LOWERCASE && !/[a-z]/.test(password))
        errors.push('At least one lowercase letter');
    if (r.REQUIRE_NUMBER && !/\d/.test(password))
        errors.push('At least one number');
    if (r.REQUIRE_SPECIAL && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
        errors.push('At least one special character (!@#$%^&*...)');
    return { valid: errors.length === 0, errors };
}

// ============================================
// STORAGE HELPERS (localStorage wrappers)
// ============================================

function getUsers() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.USERS) || '{}');
    } catch { return {}; }
}

function saveUsers(users) {
    localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getSession() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION) || 'null');
    } catch { return null; }
}

function saveSession(session) {
    localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION, JSON.stringify(session));
}

function clearSession() {
    localStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEYS.SESSION);
}

function getLoginAttempts(email) {
    try {
        const all = JSON.parse(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.LOGIN_ATTEMPTS) || '{}');
        return all[email] || { count: 0, lockedUntil: null };
    } catch { return { count: 0, lockedUntil: null }; }
}

function saveLoginAttempts(email, data) {
    try {
        const all = JSON.parse(localStorage.getItem(AUTH_CONSTANTS.STORAGE_KEYS.LOGIN_ATTEMPTS) || '{}');
        all[email] = data;
        localStorage.setItem(AUTH_CONSTANTS.STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(all));
    } catch {}
}

function resetLoginAttempts(email) {
    saveLoginAttempts(email, { count: 0, lockedUntil: null });
}

// ============================================
// AUTH CORE
// ============================================

/**
 * Register a new user.
 * Returns { success: bool, message: string }
 */
async function registerUser({ firstName, lastName, email, password, confirmPassword }) {
    // Sanitise
    firstName = sanitise(firstName);
    lastName  = sanitise(lastName);
    email     = sanitise(email).toLowerCase();

    // Validate fields
    if (!firstName || !lastName) return { success: false, message: 'First and last name are required.' };
    if (!isValidEmail(email))    return { success: false, message: 'Please enter a valid email address.' };

    const pwCheck = validatePasswordStrength(password);
    if (!pwCheck.valid) return { success: false, message: pwCheck.errors.join(' • ') };
    if (password !== confirmPassword) return { success: false, message: 'Passwords do not match.' };

    // Check duplicate
    const users = getUsers();
    if (users[email]) return { success: false, message: 'An account with this email already exists.' };

    // Hash & store
    const { stored } = await hashPassword(password);
    users[email] = {
        id: generateRandomHex(8),
        firstName,
        lastName,
        email,
        passwordHash: stored,
        createdAt: Date.now(),
        orderHistory: [],
    };
    saveUsers(users);

    return { success: true, message: 'Account created successfully!' };
}

/**
 * Log in a user.
 * Returns { success: bool, message: string, user?: object }
 */
async function loginUser({ email, password }) {
    email = sanitise(email).toLowerCase();

    // Rate-limit check
    const attempts = getLoginAttempts(email);
    if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
        const minsLeft = Math.ceil((attempts.lockedUntil - Date.now()) / 60000);
        return { success: false, message: `Account locked. Try again in ${minsLeft} minute${minsLeft > 1 ? 's' : ''}.` };
    }

    const users = getUsers();
    const user = users[email];

    // Always run hash verification even for unknown emails
    // (prevents timing-based user enumeration)
    const dummyHash = '0000000000000000:0000000000000000000000000000000000000000000000000000000000000000';
    const hashToVerify = user ? user.passwordHash : dummyHash;
    const passwordMatch = await verifyPassword(password, hashToVerify);

    if (!user || !passwordMatch) {
        // Increment attempts
        const newCount = (attempts.count || 0) + 1;
        const locked = newCount >= AUTH_CONSTANTS.MAX_LOGIN_ATTEMPTS;
        saveLoginAttempts(email, {
            count: newCount,
            lockedUntil: locked ? Date.now() + AUTH_CONSTANTS.LOCKOUT_DURATION_MS : null,
        });
        const remaining = AUTH_CONSTANTS.MAX_LOGIN_ATTEMPTS - newCount;
        if (locked) return { success: false, message: 'Too many failed attempts. Account locked for 15 minutes.' };
        return { success: false, message: `Invalid email or password. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.` };
    }

    // Success — reset attempts, create session
    resetLoginAttempts(email);

    const token = generateSessionToken();
    const session = {
        token,
        userId: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        expiresAt: Date.now() + AUTH_CONSTANTS.SESSION_DURATION_MS,
    };
    saveSession(session);

    return { success: true, user: session };
}

/**
 * Log out the current user.
 */
function logoutUser() {
    clearSession();
    authState.currentUser = null;
    updateHeaderAuth();
    showToast('You have been logged out.');

    // If on checkout, redirect home
    if (state.currentView === 'checkout') switchView('home');
}

/**
 * Get the currently logged-in user (validates expiry).
 * Returns session object or null.
 */
function getCurrentUser() {
    const session = getSession();
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
        clearSession();
        return null;
    }
    return session;
}

/**
 * Check whether a user is logged in.
 */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ============================================
// AUTH STATE
// ============================================
const authState = {
    currentUser: getCurrentUser(),
    authModal: 'login', // 'login' | 'register'
};

// ============================================
// UI — AUTH MODAL
// ============================================

function openAuthModal(mode = 'login', redirectAction = null) {
    authState.authModal = mode;
    authState.pendingAction = redirectAction;

    const modal = document.getElementById('auth-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    switchAuthTab(mode);
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    clearAuthErrors();
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    document.getElementById('password-strength').innerHTML = '';
}

function switchAuthTab(mode) {
    authState.authModal = mode;
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === mode);
    });
    document.getElementById('login-panel').classList.toggle('hidden', mode !== 'login');
    document.getElementById('register-panel').classList.toggle('hidden', mode !== 'register');
    clearAuthErrors();
}

function showAuthError(id, message) {
    const el = document.getElementById(id);
    if (el) { el.textContent = message; el.classList.remove('hidden'); }
}

function clearAuthErrors() {
    document.querySelectorAll('.auth-error').forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
}

// Password strength indicator
function updatePasswordStrength(password) {
    const bar = document.getElementById('password-strength');
    if (!password) { bar.innerHTML = ''; return; }

    const checks = [
        { label: '8+ chars',  pass: password.length >= 8 },
        { label: 'Uppercase', pass: /[A-Z]/.test(password) },
        { label: 'Lowercase', pass: /[a-z]/.test(password) },
        { label: 'Number',    pass: /\d/.test(password) },
        { label: 'Special',   pass: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];

    const passed = checks.filter(c => c.pass).length;
    const level  = passed <= 2 ? 'weak' : passed <= 4 ? 'medium' : 'strong';
    const labels = { weak: 'Weak', medium: 'Fair', strong: 'Strong' };

    bar.innerHTML = `
        <div class="strength-bars">
            ${checks.map((c, i) => `
                <div class="strength-bar ${i < passed ? level : ''}"></div>
            `).join('')}
        </div>
        <span class="strength-label ${level}">${labels[level]}</span>
        <div class="strength-checklist">
            ${checks.map(c => `
                <span class="strength-check ${c.pass ? 'pass' : 'fail'}">
                    ${c.pass ? '✓' : '✗'} ${c.label}
                </span>
            `).join('')}
        </div>
    `;
}

// ============================================
// UI — HEADER AUTH AREA
// ============================================

function updateHeaderAuth() {
    const user = getCurrentUser();
    const userBtn = document.getElementById('user-btn');
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (user) {
        // Show user initials + dropdown
        userBtn.style.display = 'none';
        if (userMenuBtn) {
            userMenuBtn.style.display = 'flex';
            document.getElementById('user-initials').textContent =
                (user.firstName[0] + user.lastName[0]).toUpperCase();
        }
    } else {
        userBtn.style.display = 'flex';
        if (userMenuBtn) userMenuBtn.style.display = 'none';
        if (userDropdown) userDropdown.classList.add('hidden');
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.toggle('hidden');
}

// ============================================
// FORM HANDLERS
// ============================================

async function handleLogin(e) {
    e.preventDefault();
    clearAuthErrors();

    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn      = document.getElementById('login-btn');

    btn.textContent = 'Signing in...';
    btn.disabled = true;

    const result = await loginUser({ email, password });

    btn.textContent = 'Sign In';
    btn.disabled = false;

    if (!result.success) {
        showAuthError('login-error', result.message);
        return;
    }

    authState.currentUser = result.user;
    updateHeaderAuth();
    closeAuthModal();
    showToast(`Welcome back, ${result.user.firstName}! 🎉`);

    // Execute pending action (e.g. proceed to checkout)
    if (authState.pendingAction) {
        authState.pendingAction();
        authState.pendingAction = null;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    clearAuthErrors();

    const firstName       = document.getElementById('reg-first-name').value;
    const lastName        = document.getElementById('reg-last-name').value;
    const email           = document.getElementById('reg-email').value;
    const password        = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const btn             = document.getElementById('register-btn');

    btn.textContent = 'Creating account...';
    btn.disabled = true;

    const result = await registerUser({ firstName, lastName, email, password, confirmPassword });

    btn.textContent = 'Create Account';
    btn.disabled = false;

    if (!result.success) {
        showAuthError('register-error', result.message);
        return;
    }

    // Auto-login after registration
    const loginResult = await loginUser({ email, password });
    if (loginResult.success) {
        authState.currentUser = loginResult.user;
        updateHeaderAuth();
        closeAuthModal();
        showToast(`Welcome to TickHub, ${loginResult.user.firstName}! 🎉`);

        if (authState.pendingAction) {
            authState.pendingAction();
            authState.pendingAction = null;
        }
    }
}

// ============================================
// SAVE ORDER TO USER HISTORY
// ============================================
function saveOrderToHistory(cart) {
    const user = getCurrentUser();
    if (!user) return;

    const users = getUsers();
    const userRecord = users[user.email];
    if (!userRecord) return;

    const order = {
        id: generateRandomHex(6).toUpperCase(),
        date: Date.now(),
        items: cart.map(item => ({ ...item })),
        total: cart.reduce((s, i) => s + i.price * i.quantity, 0),
    };

    userRecord.orderHistory = userRecord.orderHistory || [];
    userRecord.orderHistory.unshift(order);
    users[user.email] = userRecord;
    saveUsers(users);
    return order.id;
}

// ============================================
// AUTH MODAL HTML — injected into <body>
// ============================================
function injectAuthModal() {
    const html = `
    <!-- Auth Modal -->
    <div id="auth-modal" class="modal hidden">
        <div class="modal-content auth-modal-content">
            <button class="auth-modal-close" id="auth-modal-close">✕</button>

            <!-- Tabs -->
            <div class="auth-tabs">
                <button class="auth-tab active" data-tab="login">Sign In</button>
                <button class="auth-tab"        data-tab="register">Create Account</button>
            </div>

            <!-- Login Panel -->
            <div id="login-panel">
                <h2 class="auth-title">Welcome Back</h2>
                <p class="auth-subtitle">Sign in to purchase tickets</p>

                <div id="login-error" class="auth-error hidden"></div>

                <form id="login-form" novalidate>
                    <div class="auth-field">
                        <label class="auth-label" for="login-email">Email</label>
                        <input type="email" id="login-email" class="form-input" placeholder="your@email.com" required autocomplete="email">
                    </div>
                    <div class="auth-field">
                        <label class="auth-label" for="login-password">Password</label>
                        <div class="password-input-wrap">
                            <input type="password" id="login-password" class="form-input" placeholder="••••••••" required autocomplete="current-password">
                            <button type="button" class="toggle-password" data-target="login-password">
                                <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button type="submit" class="auth-submit-btn" id="login-btn">Sign In</button>
                </form>

                <p class="auth-switch">
                    Don't have an account?
                    <button class="auth-link" onclick="switchAuthTab('register')">Create one free</button>
                </p>
            </div>

            <!-- Register Panel -->
            <div id="register-panel" class="hidden">
                <h2 class="auth-title">Create Account</h2>
                <p class="auth-subtitle">Join TickHub — it's free</p>

                <div id="register-error" class="auth-error hidden"></div>

                <form id="register-form" novalidate>
                    <div class="auth-row">
                        <div class="auth-field">
                            <label class="auth-label" for="reg-first-name">First Name</label>
                            <input type="text" id="reg-first-name" class="form-input" placeholder="Thabo" required autocomplete="given-name">
                        </div>
                        <div class="auth-field">
                            <label class="auth-label" for="reg-last-name">Last Name</label>
                            <input type="text" id="reg-last-name" class="form-input" placeholder="Nkosi" required autocomplete="family-name">
                        </div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label" for="reg-email">Email</label>
                        <input type="email" id="reg-email" class="form-input" placeholder="your@email.com" required autocomplete="email">
                    </div>
                    <div class="auth-field">
                        <label class="auth-label" for="reg-password">Password</label>
                        <div class="password-input-wrap">
                            <input type="password" id="reg-password" class="form-input" placeholder="Create a strong password" required autocomplete="new-password">
                            <button type="button" class="toggle-password" data-target="reg-password">
                                <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                        <div id="password-strength" class="password-strength"></div>
                    </div>
                    <div class="auth-field">
                        <label class="auth-label" for="reg-confirm-password">Confirm Password</label>
                        <div class="password-input-wrap">
                            <input type="password" id="reg-confirm-password" class="form-input" placeholder="Repeat password" required autocomplete="new-password">
                            <button type="button" class="toggle-password" data-target="reg-confirm-password">
                                <svg class="eye-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p class="auth-terms">By creating an account you agree to our <a href="#" class="auth-link">Terms</a> and <a href="#" class="auth-link">Privacy Policy</a>.</p>
                    <button type="submit" class="auth-submit-btn" id="register-btn">Create Account</button>
                </form>

                <p class="auth-switch">
                    Already have an account?
                    <button class="auth-link" onclick="switchAuthTab('login')">Sign in</button>
                </p>
            </div>
        </div>
    </div>

    <!-- User Dropdown (injected next to user icon) -->
    <div id="user-dropdown" class="user-dropdown hidden"></div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // Also inject the user avatar button (hidden until logged in)
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        const avatarBtn = document.createElement('button');
        avatarBtn.id = 'user-menu-btn';
        avatarBtn.className = 'user-avatar-btn';
        avatarBtn.style.display = 'none';
        avatarBtn.innerHTML = `<span id="user-initials">??</span>`;
        avatarBtn.addEventListener('click', toggleUserDropdown);
        headerActions.insertBefore(avatarBtn, headerActions.querySelector('#cart-btn'));
    }
}

// ============================================
// USER DROPDOWN RENDER
// ============================================
function renderUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    const user = getCurrentUser();
    if (!dropdown || !user) return;

    const users = getUsers();
    const userRecord = users[user.email] || {};
    const orderCount = (userRecord.orderHistory || []).length;

    dropdown.innerHTML = `
        <div class="user-dropdown-header">
            <div class="user-dropdown-name">${user.firstName} ${user.lastName}</div>
            <div class="user-dropdown-email">${user.email}</div>
        </div>
        <div class="user-dropdown-body">
            <button class="user-dropdown-item" onclick="showOrderHistory()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
                My Tickets <span class="dropdown-badge">${orderCount}</span>
            </button>
            <button class="user-dropdown-item logout-item" onclick="logoutUser()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
            </button>
        </div>
    `;
    dropdown.classList.remove('hidden');
}

// ============================================
// ORDER HISTORY MODAL
// ============================================
function showOrderHistory() {
    const user = getCurrentUser();
    if (!user) return;

    const users = getUsers();
    const userRecord = users[user.email];
    const orders = userRecord?.orderHistory || [];

    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) dropdown.classList.add('hidden');

    let existing = document.getElementById('order-history-modal');
    if (existing) existing.remove();

    const ordersHTML = orders.length === 0
        ? `<div class="empty-orders">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                </svg>
                <p>No orders yet</p>
           </div>`
        : orders.map(order => `
            <div class="order-history-item">
                <div class="order-history-header">
                    <span class="order-id">Order #${order.id}</span>
                    <span class="order-date">${new Date(order.date).toLocaleDateString('en-ZA')}</span>
                </div>
                ${order.items.map(item => `
                    <div class="order-history-row">
                        <span>${item.eventTitle} — ${item.ticketTypeName} × ${item.quantity}</span>
                        <span>${formatCurrency(item.price * item.quantity)}</span>
                    </div>
                `).join('')}
                <div class="order-history-total">Total: <strong>${formatCurrency(order.total * 1.1)}</strong></div>
            </div>
        `).join('');

    document.body.insertAdjacentHTML('beforeend', `
        <div id="order-history-modal" class="modal">
            <div class="modal-content order-history-modal-content">
                <div class="order-history-header-row">
                    <h2 class="auth-title">My Tickets</h2>
                    <button class="auth-modal-close" onclick="document.getElementById('order-history-modal').remove(); document.body.style.overflow='';">✕</button>
                </div>
                <div class="order-history-list">${ordersHTML}</div>
            </div>
        </div>
    `);
    document.body.style.overflow = 'hidden';
}

// ============================================
// ATTACH ALL AUTH EVENT LISTENERS
// ============================================
function initAuth() {
    injectAuthModal();
    updateHeaderAuth();

    // Modal close
    document.getElementById('auth-modal-close').addEventListener('click', closeAuthModal);
    document.getElementById('auth-modal').addEventListener('click', e => {
        if (e.target.id === 'auth-modal') closeAuthModal();
    });

    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => switchAuthTab(tab.dataset.tab));
    });

    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);

    // Password strength live feedback
    document.getElementById('reg-password').addEventListener('input', e => {
        updatePasswordStrength(e.target.value);
    });

    // Show/hide password toggles
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = document.getElementById(btn.dataset.target);
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // User icon → open login modal
    document.getElementById('user-btn').addEventListener('click', () => openAuthModal('login'));

    // User dropdown: re-render each time it's opened
    document.getElementById('user-menu-btn')?.addEventListener('click', () => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown.classList.contains('hidden')) {
            renderUserDropdown();
        } else {
            dropdown.classList.add('hidden');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', e => {
        const dropdown = document.getElementById('user-dropdown');
        const menuBtn  = document.getElementById('user-menu-btn');
        if (dropdown && menuBtn && !dropdown.contains(e.target) && !menuBtn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}

// ============================================
// EXPORTS (used by app.js)
// ============================================
window.openAuthModal    = openAuthModal;
window.closeAuthModal   = closeAuthModal;
window.switchAuthTab    = switchAuthTab;
window.logoutUser       = logoutUser;
window.isLoggedIn       = isLoggedIn;
window.getCurrentUser   = getCurrentUser;
window.saveOrderToHistory = saveOrderToHistory;
window.showOrderHistory = showOrderHistory;
window.initAuth         = initAuth;