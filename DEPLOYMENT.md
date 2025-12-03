# Deployment Guide

Haunted Refactorium supports two deployment strategies with different AI backends.

## 🏠 Local Deployment (Docker + Ollama)

**Best for:** Enterprise environments, sensitive codebases, offline usage

### Prerequisites

- Docker and Docker Compose installed
- At least 8GB RAM (16GB recommended for larger models)
- 10GB+ free disk space

### Setup

1. **Clone and configure:**

```bash
git clone <repository-url>
cd haunted-refactorium
cp .env.example .env
```

2. **Start services:**

```bash
docker-compose up -d
```

3. **Pull AI model (first time):**

```bash
# CodeLlama (recommended, ~4GB)
docker exec -it haunted-ollama ollama pull codellama

# Or Llama 3 for better quality (~4.7GB)
docker exec -it haunted-ollama ollama pull llama3

# Or smaller model for testing (~2GB)
docker exec -it haunted-ollama ollama pull codellama:7b
```

4. **Access the app:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

### Features

- ✅ Complete offline capability
- ✅ Larger, more accurate AI models
- ✅ Full privacy - no external API calls
- ✅ Local Redis caching
- ✅ Ollama model management

### Stopping Services

```bash
docker-compose down
```

### Updating

```bash
git pull
docker-compose down
docker-compose build
docker-compose up -d
```

---

## ☁️ Online Deployment (Railway)

**Best for:** Quick demos, public use, non-sensitive codebases

### Prerequisites

- GitHub account
- Railway account (free tier available)

### Setup

1. **Push to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects configuration from `railway.json`

3. **Configure environment (optional):**
   - Railway automatically sets `PORT`
   - Add Redis: Click "New" → "Database" → "Add Redis"
   - Set `DEPLOYMENT_MODE=online` (should be default)

4. **Access your deployment:**
   - Railway provides a public URL
   - API docs at `https://your-app.railway.app/api-docs`

### Features

- ✅ No Docker required
- ✅ Free/public LLM APIs (no API keys needed)
- ✅ Auto-deploy on git push
- ✅ Supports large file uploads
- ✅ WebSocket support
- ✅ No timeout issues

### Limitations

- ⚠️ Requires internet connection
- ⚠️ Smaller AI models (faster but less accurate)
- ⚠️ Public API rate limits may apply

### Monitoring

```bash
# Install Railway CLI
npm i -g @railway/cli

# View logs
railway logs

# Check status
railway status
```

---

## 🔄 Switching Between Deployments

Both deployments use the same codebase. The key difference is the `DEPLOYMENT_MODE` environment variable:

**Local (Docker):**

```env
DEPLOYMENT_MODE=local
OLLAMA_URL=http://ollama:11434
OLLAMA_MODEL=codellama
```

**Online (Railway):**

```env
DEPLOYMENT_MODE=online
HUGGINGFACE_API_URL=https://api-inference.huggingface.co/models
HUGGINGFACE_MODEL=bigcode/starcoder
```

---

## 🐛 Troubleshooting

### Local Deployment

**Ollama not responding:**

```bash
docker logs haunted-ollama
docker restart haunted-ollama
```

**Out of memory:**

- Use smaller model: `ollama pull codellama:7b`
- Increase Docker memory limit in Docker Desktop settings

**Port conflicts:**

- Change ports in `docker-compose.yml`

### Online Deployment

**Build fails:**

- Check Railway logs
- Ensure all dependencies in `package.json`
- Verify `railway.json` configuration

**API errors:**

- Check Hugging Face API status
- Verify `DEPLOYMENT_MODE=online` is set
- Check Railway environment variables

**Slow responses:**

- Hugging Face free tier has rate limits
- Consider upgrading Railway plan for better performance

---

## 📊 Performance Comparison

| Feature           | Local (Docker)      | Online (Railway)      |
| ----------------- | ------------------- | --------------------- |
| Setup Time        | 10-15 min           | 5 min                 |
| AI Quality        | High (large models) | Medium (small models) |
| Speed             | Medium              | Fast                  |
| Privacy           | Complete            | Public APIs           |
| Cost              | Free (self-hosted)  | Free tier available   |
| Internet Required | No (after setup)    | Yes                   |
| Maintenance       | Manual updates      | Auto-deploy           |

---

## 🔒 Security Notes

**Local Deployment:**

- All data stays on your infrastructure
- No external API calls
- Suitable for sensitive codebases

**Online Deployment:**

- Code sent to Hugging Face API for analysis
- Use only for non-sensitive projects
- Consider data privacy regulations

---

## 📈 Scaling

**Local:**

- Scale horizontally with multiple backend containers
- Use external Redis for distributed caching
- Load balance with nginx

**Online:**

- Railway handles auto-scaling
- Add Redis add-on for better performance
- Consider upgrading to paid plan for higher limits
