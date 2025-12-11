# Magic WRX - Premium Business Website Builder

A modern, full-featured business website built with Next.js and Firebase, designed for professional businesses and ready for both web and mobile app integration.

![Magic WRX](https://img.shields.io/badge/Magic%20WRX-Business%20Solution-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Firebase](https://img.shields.io/badge/Firebase-v10-orange?style=for-the-badge&logo=firebase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## � Quick Start

### Option 1: Demo Mode (No Firebase Setup Required)
```bash
npm install
npm run dev
```
Visit [http://localhost:3000/demo-login](http://localhost:3000/demo-login) to explore all features without Firebase configuration.

### Option 2: Full Setup with Firebase
```bash
git clone https://github.com/MagicWRX/MagicWRX.git
cd MagicWRX
npm install
./start-dev.sh
```

## ✨ Features

### 🎨 **Premium Templates**
- **E-commerce Store** - Complete online shopping platform
- **SaaS Platform** - Software as a Service application  
- **Portfolio Website** - Creative professional showcase
- **Restaurant Menu** - Digital menu and ordering system
- **Corporate Website** - Professional business site

### 🔐 **Authentication System**
- Firebase Authentication with email/password
- Google OAuth integration
- Admin dashboard with user management
- Secure session handling

### 📱 **Modern UI/UX**
- Mobile-first responsive design
- Custom Tailwind CSS with gradients and shadows
- Professional card-based layouts
- Smooth animations and transitions

### 🛠️ **Developer Experience**
- TypeScript for type safety
- ESLint for code quality
- Comprehensive error handling
- Built-in troubleshooting tools

## 📁 Project Structure

```
magic-wrx/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── login/             # Authentication pages
│   │   ├── templates/         # Business template showcase
│   │   ├── troubleshooting/   # Firebase help guide
│   │   └── ...
│   ├── components/            # Reusable React components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utilities and Firebase config
├── firebase.json              # Firebase hosting configuration
├── deploy.sh                  # Automated deployment script
└── FIREBASE_SETUP.md         # Complete Firebase setup guide
```

## 🌐 Live Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Landing page with hero and features |
| **Templates** | `/templates` | Showcase of all business templates |
| **Pricing** | `/pricing` | Subscription plans and pricing |
| **Contact** | `/contact` | Contact form and information |
| **Login** | `/login` | User authentication |
| **Admin** | `/admin` | Dashboard (requires authentication) |
| **Troubleshooting** | `/troubleshooting` | Firebase setup help |

## 🔧 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Backend**: Firebase (Auth, Firestore, Analytics, Storage)
- **Deployment**: Firebase Hosting
- **Development**: ESLint, PostCSS

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom gradients
- **Backend**: Firebase (Auth, Firestore, Analytics, Storage)
- **Payment**: Stripe integration ready
- **Mobile**: Flutter compatibility built-in

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd MagicWRX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Copy your Firebase config to `src/lib/firebase.ts`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── pricing/           # Pricing page
│   ├── signup/            # Signup page
│   ├── templates/         # Templates showcase
│   │   ├── 1/            # E-commerce template
│   │   ├── 2/            # SaaS template
│   │   ├── 3/            # Portfolio template
│   │   ├── 4/            # Restaurant template
│   │   └── 5/            # Corporate template
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   └── CTA.tsx
├── hooks/                 # Custom React hooks
│   └── useAuth.ts
└── lib/                   # Utility libraries
    └── firebase.ts        # Firebase configuration
```

## Firebase Configuration

The project uses Firebase v10 with the modular SDK. Configure your Firebase project in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};
```

## Custom Styling

The project includes custom CSS classes for consistent theming:

- `.gradient-text` - Gradient text effect
- `.card-shadow` - Consistent card shadows
- `.hero-gradient` - Hero section background gradient

## Flutter Integration

The design system is built to be compatible with Flutter applications:

- Consistent color schemes
- Shared design tokens
- API-first architecture
- Mobile-responsive components

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@magicwrx.com or join our Discord community.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy

### Firebase Hosting

```bash
npm run build
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Environment Variables

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```
