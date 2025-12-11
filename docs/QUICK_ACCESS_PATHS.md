# 🔧 Magic WRX Quick Access Paths

> **Essential file paths and service access points for Magic WRX**

---

## 📁 **Configuration Files**

### **Environment Configuration**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/.env.local
/Users/brianlindahl/Development/Business/Websites/MagicWRX/.env.example
```

### **Service Configuration Files**
```
# Vercel
/Users/brianlindahl/Development/Business/Websites/MagicWRX/vercel.json

# Firebase
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firebase.json
/Users/brianlindahl/Development/Business/Websites/MagicWRX/.firebaserc
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firestore.rules
/Users/brianlindahl/Development/Business/Websites/MagicWRX/storage.rules
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firestore.indexes.json

# Next.js
/Users/brianlindahl/Development/Business/Websites/MagicWRX/next.config.js
/Users/brianlindahl/Development/Business/Websites/MagicWRX/package.json
/Users/brianlindahl/Development/Business/Websites/MagicWRX/tsconfig.json

# Tailwind CSS
/Users/brianlindahl/Development/Business/Websites/MagicWRX/tailwind.config.js
/Users/brianlindahl/Development/Business/Websites/MagicWRX/postcss.config.js
```

---

## 📚 **Documentation Files**

### **Setup & Configuration Guides**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/README.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/SETUP.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/FIREBASE_SETUP.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/VERCEL_SETUP.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/AUTHENTICATION.md
```

### **Implementation Guides**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/FREEMIUM_PLATFORM_TRANSFORMATION.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/IMMEDIATE_IMPLEMENTATION_STEPS.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/SITE_BUILDER_IMPLEMENTATION.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/TEMPLATE_INTEGRATION_GUIDE.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/STRIPE_INTEGRATION_PLAN.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/STRIPE_INTEGRATION_SETUP.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/TOOLS_ADVANCEMENT_PLAN.md
```

### **Command References**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/VERCEL_COMMANDS.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/QUICK_START_IMPLEMENTATION.md
```

### **Master Control Documents**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/MAGIC_WRX_MASTER_CONTROL_GUIDE.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/NODEJS_SERVICE_PROTOCOLS.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/SERVICE_STATUS_DASHBOARD.md
```

---

## 🛠️ **Automation Scripts**

### **Development Scripts**
```bash
# Start development server
/Users/brianlindahl/Development/Business/Websites/MagicWRX/start-dev.sh

# Start Firebase emulators
/Users/brianlindahl/Development/Business/Websites/MagicWRX/start-emulators.sh

# Verify setup
/Users/brianlindahl/Development/Business/Websites/MagicWRX/verify-setup.sh
```

### **Deployment Scripts**
```bash
# Deploy to Vercel
/Users/brianlindahl/Development/Business/Websites/MagicWRX/deploy-vercel.sh

# Deploy to Firebase
/Users/brianlindahl/Development/Business/Websites/MagicWRX/deploy.sh

# Check environment and deploy
/Users/brianlindahl/Development/Business/Websites/MagicWRX/check-env-and-deploy.sh
```

### **Setup & Configuration Scripts**
```bash
# Authentication setup
/Users/brianlindahl/Development/Business/Websites/MagicWRX/auth-setup.sh

# GitHub setup
/Users/brianlindahl/Development/Business/Websites/MagicWRX/setup-github.sh

# Vercel setup
/Users/brianlindahl/Development/Business/Websites/MagicWRX/setup-vercel.sh
/Users/brianlindahl/Development/Business/Websites/MagicWRX/setup-vercel-cli.sh
/Users/brianlindahl/Development/Business/Websites/MagicWRX/setup-vercel-env.sh

# Environment management
/Users/brianlindahl/Development/Business/Websites/MagicWRX/import-firebase-env.sh
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firebase-switch.sh
```

### **Testing & Monitoring Scripts**
```bash
# Test integrations
/Users/brianlindahl/Development/Business/Websites/MagicWRX/test-integrations.sh

# Test authentication
/Users/brianlindahl/Development/Business/Websites/MagicWRX/auth-test.sh

# General test script
/Users/brianlindahl/Development/Business/Websites/MagicWRX/test-script.sh

# Firebase status check
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firebase-status.sh

# Troubleshooting
/Users/brianlindahl/Development/Business/Websites/MagicWRX/troubleshoot-github.sh
```

### **Utility Scripts**
```bash
# Push to GitHub
/Users/brianlindahl/Development/Business/Websites/MagicWRX/push-to-github.sh
```

---

## 💻 **Source Code Structure**

### **Application Source**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   │   ├── page.tsx
│   │   ├── login/page.tsx
│   │   └── dashboard/page.tsx
│   ├── api/               # API routes
│   │   └── stripe/        # Stripe integrations
│   ├── contact/page.tsx   # Contact page
│   ├── pricing/page.tsx   # Pricing page
│   ├── sites/             # Site builder
│   │   ├── [id]/         # Individual site editing
│   │   └── new/page.tsx  # Site creation
│   ├── templates/         # Template showcase
│   ├── tools/            # Platform tools
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── CTA.tsx
│   ├── CustomizationPanel.tsx
│   ├── DragDropEditor.tsx
│   ├── Features.tsx
│   ├── FirebaseStatus.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── PaymentButton.tsx
│   └── TemplateSelector.tsx
├── hooks/                 # Custom React hooks
│   ├── useAdminAuth.ts
│   └── useAuth.ts
├── lib/                  # Utilities and configurations
│   ├── firebase.ts       # Firebase configuration
│   └── stripe.ts         # Stripe configuration
└── types/                # TypeScript type definitions
    └── site-builder.ts
```

### **Public Assets**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/public/
├── favicon.svg
├── hero-images/
│   ├── index-01.jpg
│   ├── index-02.jpg
│   └── index-03.jpg
└── templates/
    ├── corporate.svg
    ├── ecommerce.svg
    ├── portfolio.svg
    ├── restaurant.svg
    └── saas.svg
```

---

## 🌐 **Service URLs & Dashboards**

### **Production URLs**
```
# Main Application
https://magic-g7ua1cnfl-magicwrxs-projects.vercel.app

# Admin Access
https://magic-g7ua1cnfl-magicwrxs-projects.vercel.app/admin/login

# API Endpoints
https://magic-g7ua1cnfl-magicwrxs-projects.vercel.app/api/*
```

### **Development URLs**
```
# Local Development
http://localhost:3000

# Local Admin
http://localhost:3000/admin/login

# Local API
http://localhost:3000/api/*
```

### **Service Dashboards**
```
# Vercel Dashboard
https://vercel.com/magicwrxs-projects/magic-wrx

# Firebase Console
https://console.firebase.google.com/project/magic-wrx

# Supabase Dashboard
https://supabase.com/dashboard/project/ujfcflnrtrkdgfclwelz

# Stripe Dashboard
https://dashboard.stripe.com

# Resend Dashboard
https://resend.com/dashboard

# GitHub Repository
https://github.com/MagicWRX/MagicWRX
```

---

## 🔑 **Access Credentials**

### **Admin Emails**
```
brian@amazinglystrange.com
brian@magicwrx.com
```

### **Service IDs**
```
# Firebase Project ID
magic-wrx

# Supabase Project Reference
ujfcflnrtrkdgfclwelz

# Vercel Team
magicwrxs-projects

# GitHub Organization
MagicWRX
```

---

## 📊 **Status & Monitoring Files**

### **Generated Status Files**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/test-results.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/test-core-functionality.md
/Users/brianlindahl/Development/Business/Websites/MagicWRX/SERVICE_STATUS_DASHBOARD.md
```

### **Log Files**
```
/Users/brianlindahl/Development/Business/Websites/MagicWRX/database-debug.log
/Users/brianlindahl/Development/Business/Websites/MagicWRX/firestore-debug.log
/Users/brianlindahl/Development/Business/Websites/MagicWRX/pubsub-debug.log
```

---

## 🚀 **Quick Commands**

### **Navigation to Project**
```bash
cd /Users/brianlindahl/Development/Business/Websites/MagicWRX
```

### **Start Development**
```bash
npm run dev
# or
./start-dev.sh
```

### **Deploy Production**
```bash
./deploy-vercel.sh
# or
vercel --prod
```

### **Check Status**
```bash
./firebase-status.sh
./verify-setup.sh
```

---

*This quick access guide provides direct paths to all essential Magic WRX files and services.*
