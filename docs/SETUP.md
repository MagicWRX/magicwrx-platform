# Magic WRX Setup Checklist

## 🚀 Quick Setup Guide

### Step 1: Clone and Install
```bash
git clone https://github.com/MagicWRX/MagicWRX.git
cd MagicWRX
npm install
```

### Step 2: Environment Configuration
1. Copy the environment template:
   ```bash
   cp .env.example .env.local
   ```

2. For **Demo Mode** (no Firebase required):
   - Just run: `npm run dev`
   - Visit: http://localhost:3000/demo-login

3. For **Full Setup** with Firebase:
   - Update `.env.local` with your Firebase config
   - Follow `FIREBASE_SETUP.md` for detailed instructions

### Step 3: Start Development
```bash
# Option 1: Use the provided script
./start-dev.sh

# Option 2: Manual start
npm run dev
```

## 📋 Verification Checklist

- [ ] Node.js 18+ installed
- [ ] Git repository initialized
- [ ] Dependencies installed (`npm install`)
- [ ] Environment file created (`.env.local`)
- [ ] Firebase project created (if using full setup)
- [ ] Development server starts without errors
- [ ] All template images display correctly
- [ ] Authentication works (demo or Firebase)

## 🔧 Troubleshooting

### Common Issues:
1. **Missing template images**: Run `npm run dev` - they should now display as SVG placeholders
2. **Firebase errors**: Use demo mode first, then configure Firebase later
3. **Permission denied on scripts**: Run `chmod +x *.sh` in project root
4. **Build errors**: Check that all dependencies are installed

### Getting Help:
- Check `/troubleshooting` page in the app
- Review `FIREBASE_SETUP.md` for Firebase configuration
- Run troubleshooting scripts: `./troubleshoot-github.sh`

## 🚢 Deployment

### Manual Deployment:
```bash
./deploy.sh
```

### Automated Deployment:
- GitHub Actions workflow is configured
- Set up repository secrets for Firebase
- Push to `main` branch triggers deployment

## 📝 Next Steps

1. Customize templates for your business
2. Configure Firebase Authentication
3. Set up custom domain
4. Configure Google Analytics
5. Add custom branding and content
