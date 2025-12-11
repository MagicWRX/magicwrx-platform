# Vercel Commands Quick Reference

## Setup Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link

# Unlink project from Vercel
vercel unlink
```

## Deployment Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy with specific environment
vercel --prod --env NODE_ENV=production

# Deploy with build command override
vercel --prod --build-env NODE_ENV=production
```

## Environment Variables

```bash
# Add environment variable
vercel env add VARIABLE_NAME

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME

# Pull environment variables
vercel env pull .env.local
```

## Project Management

```bash
# List projects
vercel project ls

# View project info
vercel project inspect

# List deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]
```

## Development

```bash
# Start development server with Vercel
vercel dev

# Pull latest environment variables
vercel env pull

# Link to existing project
vercel link --project=project-id
```

## Domain Management

```bash
# List domains
vercel domains ls

# Add domain
vercel domains add yourdomain.com

# Remove domain
vercel domains rm yourdomain.com
```

## Team Management

```bash
# List team members
vercel teams ls

# Add team member
vercel teams add user@example.com

# Remove team member
vercel teams rm user@example.com
```

## Useful Flags

```bash
# Force deployment (skip cache)
vercel --force

# Deploy with specific team
vercel --scope team-name

# Deploy with specific project
vercel --project project-id

# Show debug information
vercel --debug
```

## NPM Scripts (package.json)

```bash
# Deploy to production
npm run deploy:vercel

# Start Vercel dev server
npm run vercel:dev

# Open Vercel dashboard
vercel open
```

## Troubleshooting

```bash
# Clear Vercel cache
rm -rf .vercel

# Re-link project
vercel link

# Check Vercel status
vercel whoami

# View project settings
vercel project inspect
```

## Environment Variables Reference

### Firebase Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`

### Stripe Variables
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Quick Deploy

```bash
# One-liner for quick deployment
npm run build && vercel --prod
```

## Development Workflow

1. **Local Development**: `npm run dev`
2. **Preview Deployment**: `vercel`
3. **Production Deployment**: `vercel --prod`
4. **Environment Variables**: Set in Vercel dashboard
5. **Custom Domain**: Configure in Vercel dashboard 