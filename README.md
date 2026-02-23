# TickHub 🎫

<div align="center">

![TickHub Banner](https://img.shields.io/badge/TickHub-Event_Ticketing_Platform-fbbf24?style=for-the-badge&logo=ticket&logoColor=black)

**South Africa's Premier Event Ticketing Platform**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Security](#-security)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**TickHub** is a full-stack event ticketing platform designed specifically for South African events. Built with a focus on security, performance, and user experience, TickHub enables users to discover, purchase, and manage tickets for sports matches, concerts, comedy shows, and more.

The platform features a modern brutalist design aesthetic, end-to-end encryption, and a mobile-first approach with both web and native mobile applications.

### Why TickHub?

- 🇿🇦 **Built for South Africa** — Rands (ZAR) currency, local events, SA payment gateways
- 🔒 **Security First** — SHA-256 password hashing, account lockout, POPIA compliant
- ⚡ **Lightning Fast** — Optimized performance, instant ticket delivery
- 📱 **Cross-Platform** — Web, iOS, and Android with shared codebase
- 🎨 **Modern Design** — Bold brutalist aesthetic with dark mode support

---

## ✨ Features

### Core Features

- **🎟️ Event Discovery**
  - Browse 11+ curated South African events (PSL matches, Amapiano concerts, comedy shows)
  - Advanced search and filtering (by category, date, price, venue)
  - Live availability updates
  - Multiple ticket tiers per event (General, VIP, Meet & Greet)

- **🔐 Authentication & Security**
  - SHA-256 password hashing with unique salt per user
  - Session-based authentication with 24-hour expiry
  - Account lockout after 5 failed login attempts (15-minute cooldown)
  - Email verification and password reset
  - POPIA (Protection of Personal Information Act) compliant

- **🛒 Shopping Cart & Checkout**
  - Real-time cart updates with badge notifications
  - Multiple ticket types in a single order
  - 10% service fee (transparent pricing)
  - Form validation with visual feedback
  - Auto-formatting for card numbers and expiry dates

- **📧 Ticket Management**
  - Instant email delivery with QR codes
  - Order history with detailed breakdown
  - Ticket transfers (coming soon)
  - Refund requests for cancelled events

- **🌙 User Experience**
  - Dark mode support
  - Responsive design (mobile-first)
  - Smooth animations and transitions
  - Accessibility features (ARIA labels, keyboard navigation)
  - Pull-to-refresh on mobile

### Platform-Specific Features

#### Web Platform
- Progressive Web App (PWA) support
- Browser notification API integration
- LocalStorage for session persistence
- Service worker for offline support

#### Mobile Platform (React Native)
- Native performance
- QR code generation via device camera
- AsyncStorage for offline-first architecture
- Push notifications (iOS/Android)
- Biometric authentication (Face ID, fingerprint)

---

## 🛠️ Tech Stack

### Frontend (Web)

```
HTML5 / CSS3 / Vanilla JavaScript
├── No frameworks (lightweight, fast)
├── Custom brutalist design system
├── CSS Grid & Flexbox layouts
└── Web Crypto API for SHA-256 hashing
```

### Frontend (Mobile)

```
React Native + Expo
├── React Navigation (Stack & Tab navigators)
├── Expo Crypto (SHA-256 hashing)
├── AsyncStorage (local persistence)
├── React Native QR Code SVG
├── Expo Notifications
└── React Context API (state management)
```

### Backend Architecture (Recommended)

```
Node.js + Express.js
├── MongoDB (user data, orders, events)
├── Redis (session storage, caching)
├── JWT (authentication tokens)
├── Stripe / PayFast (payment processing)
├── SendGrid (email delivery)
└── AWS S3 (ticket storage)
```

*Note: Current demo uses localStorage/AsyncStorage for frontend-only prototype*

---

## 📁 Project Structure

```
tickhub/
│
├── web/                          # Web application
│   ├── index.html                # Main HTML structure
│   ├── styles.css                # Brutalist design system
│   ├── app.js                    # Core application logic
│   ├── auth.js                   # Authentication module
│   └── pages.js                  # Legal pages & navigation
│
├── mobile/                       # React Native application
│   ├── App.js                    # Root component + navigation
│   ├── package.json              # Dependencies
│   ├── app.json                  # Expo configuration
│   │
│   ├── context/                  # State management
│   │   ├── ThemeContext.js       # Dark mode provider
│   │   ├── AuthContext.js        # Authentication provider
│   │   └── CartContext.js        # Shopping cart provider
│   │
│   ├── screens/                  # Application screens
│   │   ├── HomeScreen.js         # Event grid + search
│   │   ├── EventDetailScreen.js # Ticket selection
│   │   ├── CheckoutScreen.js     # Purchase flow
│   │   ├── MyTicketsScreen.js   # Order history + QR codes
│   │   └── AuthScreen.js         # Login/Register
│   │
│   ├── services/                 # Business logic
│   │   └── auth.js               # SHA-256 authentication
│   │
│   ├── components/               # Reusable components
│   └── data/                     # Static data
│       └── events.js             # Event catalogue
│
└── docs/                         # Documentation
    ├── SECURITY.md               # Security practices
    └── CONTRIBUTING.md           # Contribution guidelines
```

---

## 🚀 Installation

### Prerequisites

- **Node.js** 16.x or higher
- **npm** 7.x or higher (or yarn 1.22+)
- **Git**
- **Expo Go** app (for mobile development)

### Web Application

```bash
# Clone the repository
git clone https://github.com/LethaboMash71/TickHub
cd tickhub

# Open web app
cd web
# Serve with any HTTP server (e.g., Live Server in VS Code)
# Or use Python:
python3 -m http.server 8000

# Navigate to http://localhost:8000
```

### Mobile Application

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start Expo development server
npx expo start

# Scan QR code with:
# - iOS: Camera app
# - Android: Expo Go app
```

---

## 💻 Usage

### Web Application

1. **Browse Events**
   - Navigate to the home page
   - Use category filters (Sports, Music, Comedy, Theatre)
   - Search by event name or venue

2. **Purchase Tickets**
   - Click on an event card
   - Select ticket type and quantity
   - Add to cart
   - Proceed to checkout (requires account)

3. **Create Account**
   - Click user icon (top right)
   - Fill in registration form
   - Password must meet requirements:
     - Minimum 8 characters
     - 1 uppercase, 1 lowercase, 1 number, 1 special character

4. **View Tickets**
   - Sign in
   - Click user avatar → "My Tickets"
   - View order history and QR codes

### Mobile Application

1. **Install Expo Go** on your mobile device
2. **Start the development server** (`npx expo start`)
3. **Scan the QR code** displayed in your terminal
4. **Create an account** or sign in
5. **Browse and purchase tickets** seamlessly

---

## 🔐 Security

TickHub implements industry-standard security practices:

### Password Security
- **SHA-256 Hashing** — All passwords hashed using SHA-256 algorithm
- **Unique Salt** — Each user has a unique 32-byte salt (defeats rainbow tables)
- **Never Stored in Plaintext** — Passwords never logged or stored unencrypted

### Session Management
- **Cryptographically Random Tokens** — 64-character hex session tokens
- **24-Hour Expiry** — Sessions automatically expire
- **Secure Storage** — Sessions stored in httpOnly cookies (backend) / localStorage (frontend demo)

### Attack Prevention
- **Rate Limiting** — Max 5 login attempts per email
- **Account Lockout** — 15-minute lockout after failed attempts
- **Timing-Safe Comparison** — Prevents timing attacks on password verification
- **Input Sanitisation** — All user input stripped of HTML/script tags (XSS prevention)

### Compliance
- **POPIA Compliant** — Adheres to South Africa's Protection of Personal Information Act
- **GDPR Inspired** — User data rights (access, delete, correct)
- **Transparent Privacy Policy** — Clear data usage policies

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Standards

- **JavaScript**: ES6+ syntax, no semicolons
- **CSS**: BEM naming convention for web
- **React Native**: Functional components with hooks
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `docs:`)

### Testing

```bash
# Run web tests
npm test

# Run mobile tests
cd mobile && npm test

# Run linter
npm run lint
```

---

## 🗺️ Roadmap

### Phase 1: MVP (✅ Complete)
- [x] Event discovery and browsing
- [x] User authentication (SHA-256)
- [x] Shopping cart
- [x] Checkout flow
- [x] Order history with QR codes
- [x] Dark mode
- [x] Mobile app (React Native)

### Phase 2: Enhancement (🚧 In Progress)
- [ ] Backend API (Node.js + Express)
- [ ] Payment gateway integration (Stripe, PayFast)
- [ ] Email delivery (SendGrid)
- [ ] Push notifications
- [ ] Ticket transfers
- [ ] Event organizer dashboard

### Phase 3: Scale (📅 Planned)
- [ ] Multi-language support (English, Afrikaans, Zulu, Xhosa)
- [ ] Social login (Google, Facebook)
- [ ] Referral program
- [ ] Gift cards
- [ ] Advanced analytics dashboard
- [ ] White-label solution for event organizers

### Phase 4: Future (💡 Ideas)
- [ ] AI-powered event recommendations
- [ ] Augmented reality venue previews
- [ ] Blockchain-based ticket verification (NFT tickets)
- [ ] Integration with Uber/Bolt for transport
- [ ] Loyalty rewards program

---

## 📊 Event Catalogue

TickHub currently features **11 curated South African events**:

### Sports (PSL Matches)
1. **Soweto Derby** — Kaizer Chiefs vs Orlando Pirates @ FNB Stadium
2. **Sundowns vs Pirates** — @ Loftus Versfeld Stadium
3. **Chiefs vs Sundowns** — @ FNB Stadium

### Music (Amapiano & SA Artists)
4. **Major League DJz** — Amapiano Live @ Sun Arena
5. **Scorpion Kings** — Kabza De Small & DJ Maphorisa @ TicketPro Dome
6. **Amapiano All Stars Festival** — @ FNB Stadium
7. **Thandiswa Mazwai** — Sankofa Live @ Big Top Arena
8. **A-Reece** — The Reece Effect Tour @ Propaganda Pretoria
9. **SA Hip-Hop Fest** — Featuring Nasty C, Cassper Nyovest, K.O @ WeBuyCars Dome

### Comedy
10. **Trevor Noah** — Off The Record Tour @ Montecasino Teatro
11. **Mpho Popps** — Bae Goals Comedy Special @ Lyric Theatre

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 TickHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 📞 Contact

**Project Maintainer**: Lethabo Mashinini 
**Email**: lethabomashinini@gmail.com   
**LinkedIn**: [Lethabo Mashinini](https://www.linkedin.com/in/lethabo-mashinini-a215ba251)

**Project Link**: [https://github.com/LethaboMash71/TickHub](https://github.com/LethaboMash71/TickHub)

---

## 🙏 Acknowledgments

- **Anthropic Claude** — AI assistance in development
- **Unsplash** — Event imagery
- **Expo** — React Native framework
- **South African Event Organisers** — Inspiration for authentic local events
- **Open Source Community** — For amazing tools and libraries

---



---

<div align="center">

**Built with ❤️ for South African Events**

[⬆ Back to Top](#tickhub-)

</div>
