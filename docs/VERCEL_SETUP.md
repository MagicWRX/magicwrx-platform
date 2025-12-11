# Vercel Setup Guide for Magic-WRX

This guide will help you set up Vercel deployment for your Magic-WRX project.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Node.js**: Version 18 or higher

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

## Step 3: Link Your Project

Navigate to your project directory and run:

```bash
vercel link
```

This will:
- Create a new Vercel project
- Link your local project to Vercel
- Create a `.vercel` directory with project configuration

## Step 4: Set Up Environment Variables

### Option A: Using Vercel CLI

```bash
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
vercel env add FIREBASE_PRIVATE_KEY
vercel env add FIREBASE_CLIENT_EMAIL
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### Option B: Using Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add each environment variable

## Step 5: Deploy Your Project

### First Deployment

```bash
vercel --prod
```

### Subsequent Deployments

```bash
npm run deploy:vercel
```

Or use the deployment script:

```bash
./deploy-vercel.sh
```

## Step 6: Set Up GitHub Integration

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Git
4. Connect your GitHub repository
5. Configure automatic deployments

## Step 7: Configure GitHub Secrets (for CI/CD)

If you want to use the GitHub Actions workflow, add these secrets to your repository:

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add the following secrets:

```
VERCEL_TOKEN
ORG_ID
PROJECT_ID
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
FIREBASE_PRIVATE_KEY
FIREBASE_CLIENT_EMAIL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

### Getting Vercel Tokens

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token
3. Copy the token value

### Getting Project IDs

```bash
vercel project ls
```

## Step 8: Custom Domain (Optional)

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain
5. Configure DNS settings

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Yes |
| `FIREBASE_PRIVATE_KEY` | Firebase Service Account Private Key | Yes |
| `FIREBASE_CLIENT_EMAIL` | Firebase Service Account Email | Yes |
| `STRIPE_SECRET_KEY` | Stripe Secret Key | Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key | Yes |

## Troubleshooting

### Build Errors

1. Check your environment variables are set correctly
2. Ensure all dependencies are installed
3. Check for TypeScript errors: `npm run lint`

### Deployment Errors

1. Check Vercel logs in the dashboard
2. Verify environment variables are set
3. Ensure your project is linked correctly

### Environment Variables Not Working

1. Make sure variables are set for the correct environment (Production/Preview/Development)
2. Redeploy after adding new environment variables
3. Check variable names match exactly

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployment logs
vercel logs

# List projects
vercel project ls

# View project info
vercel project inspect

# Remove project link
vercel unlink
```

## Next Steps

1. Set up automatic deployments from GitHub
2. Configure custom domain
3. Set up monitoring and analytics
4. Configure preview deployments for pull requests

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Next.js Documentation](https://nextjs.org/docs) 