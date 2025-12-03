# Railway Deployment

Deploy Haunted Refactorium to the cloud with Railway for auto-scaling and easy management.

## Overview

Railway deployment provides:

- **Auto-scaling** based on traffic
- **GitHub integration** with auto-deploy
- **Free tier** available
- **No Docker** required
- **Built-in Redis** add-on
- **WebSocket support**
- **Large file uploads** (no 4.5MB limit)

## Prerequisites

- **GitHub account** - For repository hosting
- **Railway account** - Sign up at [railway.app](https://railway.app)
- **Git** - For pushing code

## Quick Deployment

### 1. Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/your-username/haunted-refactorium.git

# Push
git push -u origin main
```

### 2. Connect to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"Sign in with GitHub"**
3. Authorize Railway

### 3. Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `haunted-refactorium` repository
4. Railway auto-detects configuration from `railway.json`

### 4. Wait for Deployment

Railway will:

- Install dependencies (`npm install`)
- Build the application (`npm run build`)
- Start the server (`npm start`)
- Provide a public URL

### 5. Access Your Deployment

Railway provides a URL like:

```
https://haunted-refactorium-production.up.railway.app
```

## Configuration

### Environment Variables

Railway auto-configures most variables. To add custom ones:

1. Go to your project
2. Click on the service
3. Go to **"Variables"** tab
4. Add variables:

```
DEPLOYMENT_MODE=online
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models
HUGGINGFACE_MODEL=bigcode/starcoder
```

### Add Redis (Optional)

1. In your project, click **"New"**
2. Select **"Database"**
3. Choose **"Add Redis"**
4. Railway auto-connects it to your app
5. `REDIS_URL` is automatically set

### Custom Domain

1. Go to **"Settings"** tab
2. Click **"Generate Domain"** or **"Custom Domain"**
3. Add your domain
4. Update DNS records as shown

## Auto-Deploy

Railway automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Railway automatically:
# 1. Detects the push
# 2. Builds the app
# 3. Deploys the new version
# 4. Switches traffic to new deployment
```

## Monitoring

### View Logs

1. Go to your project
2. Click on the service
3. Go to **"Deployments"** tab
4. Click on a deployment
5. View logs in real-time

### Metrics

Railway provides:

- **CPU usage**
- **Memory usage**
- **Network traffic**
- **Request count**

### Alerts

Set up alerts for:

- Deployment failures
- High resource usage
- Downtime

## Scaling

### Vertical Scaling

Railway auto-scales resources based on usage.

To set limits:

1. Go to **"Settings"**
2. Set **"Resource Limits"**
3. Configure CPU and memory

### Horizontal Scaling

Railway can run multiple instances:

1. Go to **"Settings"**
2. Enable **"Horizontal Scaling"**
3. Set min/max instances

## Cost Management

### Free Tier

Railway offers:

- **$5 free credit** per month
- **500 hours** of usage
- Perfect for small projects

### Paid Plans

If you exceed free tier:

- **Pay as you go** - $0.000463/GB-hour
- **Pro plan** - $20/month + usage
- **Team plan** - Custom pricing

### Optimize Costs

1. **Use Redis caching** - Reduce API calls
2. **Set resource limits** - Prevent runaway costs
3. **Monitor usage** - Check dashboard regularly
4. **Scale down** when not needed

## Troubleshooting

### Build Fails

**Check build logs:**

1. Go to **"Deployments"**
2. Click failed deployment
3. View build logs

**Common issues:**

- Missing dependencies in `package.json`
- TypeScript errors
- Build script failures

**Fix:**

```bash
# Test build locally
npm run build

# Fix errors
# Commit and push
git add .
git commit -m "Fix build"
git push
```

### App Crashes

**Check runtime logs:**

1. Go to **"Deployments"**
2. View logs for errors

**Common issues:**

- Missing environment variables
- Port configuration
- Database connection

**Fix:**

1. Add missing variables
2. Check `PORT` is not hardcoded
3. Verify Redis connection

### Slow Performance

**Optimize:**

1. Add Redis caching
2. Enable CDN for static assets
3. Optimize database queries
4. Use smaller AI models

### WebSocket Issues

Railway supports WebSockets by default. If issues:

1. Check WebSocket URL uses `wss://`
2. Verify no proxy blocking
3. Check logs for connection errors

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install Railway CLI
        run: npm i -g @railway/cli

      - name: Deploy
        run: railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

### Pre-deployment Checks

Add checks before deploying:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: npm install
      - run: npm test
      - run: npm run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        run: railway up
```

## Rollback

### Automatic Rollback

Railway keeps previous deployments:

1. Go to **"Deployments"**
2. Find working deployment
3. Click **"Redeploy"**

### Manual Rollback

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# List deployments
railway status

# Rollback to specific deployment
railway rollback <deployment-id>
```

## Security

### Environment Variables

Never commit secrets:

- Use Railway's environment variables
- Add `.env` to `.gitignore`
- Rotate secrets regularly

### HTTPS

Railway provides HTTPS by default:

- All traffic encrypted
- Automatic SSL certificates
- No configuration needed

### Rate Limiting

Add rate limiting in code:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Best Practices

1. **Use environment variables** for configuration
2. **Enable Redis** for better performance
3. **Monitor logs** regularly
4. **Set resource limits** to control costs
5. **Use custom domain** for production
6. **Enable auto-deploy** for convenience
7. **Test locally** before pushing
8. **Keep dependencies updated**

## Next Steps

- [Local Development](/guide/local-development) - Development setup
- [Docker Deployment](/guide/docker-deployment) - Self-hosted option
- [API Reference](/api/overview) - API documentation
- [Monitoring](/guide/monitoring) - Track performance
