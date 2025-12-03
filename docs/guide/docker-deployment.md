# Docker Deployment

Deploy Haunted Refactorium locally with Docker for complete offline capability and local AI models.

## Overview

Docker deployment includes:

- **Frontend** (Nginx) on port 3000
- **Backend** (Node.js) on port 3001
- **Ollama** (Local AI) on port 11434
- **Redis** (Cache) on port 6379

## Prerequisites

- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** - Usually included with Docker Desktop
- **8GB+ RAM** - For running Ollama with larger models
- **10GB+ Disk Space** - For Docker images and AI models

## Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/your-org/haunted-refactorium.git
cd haunted-refactorium
```

### 2. Start Services

```bash
docker-compose up -d
```

This starts all services in the background.

### 3. Check Status

```bash
docker-compose ps
```

All services should show "Up" status.

### 4. Pull AI Model

```bash
# CodeLlama (recommended, ~4GB)
docker exec -it haunted-ollama ollama pull codellama

# Or Llama 3 (better quality, ~4.7GB)
docker exec -it haunted-ollama ollama pull llama3

# Or smaller model for testing (~2GB)
docker exec -it haunted-ollama ollama pull codellama:7b
```

### 5. Verify Model

```bash
docker exec -it haunted-ollama ollama list
```

### 6. Access Application

Visit http://localhost:3000

## Configuration

### Environment Variables

Edit `docker-compose.yml` to customize:

```yaml
services:
  backend:
    environment:
      - NODE_ENV=production
      - DEPLOYMENT_MODE=local
      - OLLAMA_URL=http://ollama:11434
      - OLLAMA_MODEL=codellama
      - REDIS_URL=redis://redis:6379
```

### Ports

Change ports if needed:

```yaml
services:
  frontend:
    ports:
      - '3000:80' # Change 3000 to your preferred port

  backend:
    ports:
      - '3001:3001' # Change 3001 to your preferred port
```

## Managing Services

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f ollama
```

### Restart Services

```bash
# All services
docker-compose restart

# Specific service
docker-compose restart backend
```

### Stop Services

```bash
# Stop but keep containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything (including volumes)
docker-compose down -v
```

### Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

## AI Models

### Available Models

**CodeLlama** (Recommended):

```bash
docker exec -it haunted-ollama ollama pull codellama
```

- Size: ~4GB
- Best for code analysis
- Good balance of speed and quality

**Llama 3**:

```bash
docker exec -it haunted-ollama ollama pull llama3
```

- Size: ~4.7GB
- Better quality responses
- Slower inference

**CodeLlama 7B** (Lightweight):

```bash
docker exec -it haunted-ollama ollama pull codellama:7b
```

- Size: ~2GB
- Faster inference
- Lower quality

### Switch Models

Edit `docker-compose.yml`:

```yaml
backend:
  environment:
    - OLLAMA_MODEL=llama3 # Change model here
```

Then restart:

```bash
docker-compose restart backend
```

## Troubleshooting

### Services Won't Start

Check Docker is running:

```bash
docker ps
```

Check logs for errors:

```bash
docker-compose logs
```

### Out of Memory

**Increase Docker memory:**

1. Open Docker Desktop
2. Settings → Resources → Memory
3. Increase to 8GB or more
4. Apply & Restart

**Or use smaller model:**

```bash
docker exec -it haunted-ollama ollama pull codellama:7b
```

### Ollama Not Responding

```bash
# Check Ollama logs
docker logs haunted-ollama

# Restart Ollama
docker restart haunted-ollama

# Verify model is loaded
docker exec -it haunted-ollama ollama list
```

### Port Conflicts

If ports are in use, change them in `docker-compose.yml`:

```yaml
services:
  frontend:
    ports:
      - '8080:80' # Use different port
```

### Cannot Connect to Backend

Check backend is running:

```bash
docker-compose ps backend
```

Check backend logs:

```bash
docker-compose logs backend
```

Test health endpoint:

```bash
curl http://localhost:3001/api/health
```

### Redis Connection Failed

Check Redis is running:

```bash
docker-compose ps redis
```

Test Redis connection:

```bash
docker exec -it haunted-redis redis-cli ping
```

Should return "PONG".

## Performance Optimization

### Resource Limits

Add resource limits in `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

### Volume Caching

Use volumes for better performance:

```yaml
services:
  backend:
    volumes:
      - ./uploads:/app/uploads
      - node_modules:/app/node_modules
```

## Security

### Production Deployment

For production, update:

1. **Change default ports**
2. **Add authentication** (not included by default)
3. **Use HTTPS** with reverse proxy (nginx, Caddy)
4. **Set strong passwords** for Redis
5. **Limit network exposure**

### Reverse Proxy Example (Nginx)

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Backup & Restore

### Backup Data

```bash
# Backup uploads
docker cp haunted-backend:/app/uploads ./backup-uploads

# Backup Redis data
docker exec haunted-redis redis-cli SAVE
docker cp haunted-redis:/data/dump.rdb ./backup-redis.rdb
```

### Restore Data

```bash
# Restore uploads
docker cp ./backup-uploads haunted-backend:/app/uploads

# Restore Redis
docker cp ./backup-redis.rdb haunted-redis:/data/dump.rdb
docker restart haunted-redis
```

## Next Steps

- [Local Development](/guide/local-development) - Development setup
- [Railway Deployment](/guide/railway-deployment) - Cloud deployment
- [API Reference](/api/overview) - API documentation
