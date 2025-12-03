# API Overview

Haunted Refactorium provides a REST API for analyzing codebases and generating modernization plans.

## Base URL

```
http://localhost:3001/api
```

For production deployments, replace with your deployed URL.

## Authentication

Currently, no authentication is required. This may change in future versions for rate limiting and user management.

## Response Format

All API responses follow this structure:

```json
{
  "data": { ... },
  "error": "Error message if applicable"
}
```

## Endpoints

### Analysis Endpoints

- [POST /clone](/api/clone) - Clone and analyze a GitHub repository
- [POST /upload](/api/upload) - Upload and analyze a code archive
- [GET /analysis/:id](/api/analysis) - Get analysis results

### Generation Endpoints

- [POST /proposal](/api/proposal) - Generate architecture proposal
- [GET /scaffold/:proposalId](/api/scaffold) - Download project scaffold

### System Endpoints

- [GET /health](/api/health) - Health check

## Interactive API Documentation

When running the backend, visit:

```
http://localhost:3001/api-docs
```

This provides an interactive Swagger UI where you can test all endpoints directly.

## Rate Limits

Currently no rate limits are enforced. For production deployments, consider implementing rate limiting based on your needs.

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error |

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## WebSocket

Real-time progress updates are available via WebSocket:

```
ws://localhost:3001/ws
```

Connect to receive live updates during analysis.

## Example Usage

### Using cURL

```bash
# Clone a repository
curl -X POST http://localhost:3001/api/clone \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/jquery/jquery"}'

# Get analysis results
curl http://localhost:3001/api/analysis/analysis-123
```

### Using JavaScript

```javascript
// Clone a repository
const response = await fetch('http://localhost:3001/api/clone', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ repoUrl: 'https://github.com/jquery/jquery' })
});

const data = await response.json();
console.log(data);
```

### Using Python

```python
import requests

# Clone a repository
response = requests.post(
    'http://localhost:3001/api/clone',
    json={'repoUrl': 'https://github.com/jquery/jquery'}
)

data = response.json()
print(data)
```

## Next Steps

- [Clone Endpoint](/api/clone) - Detailed documentation for repository cloning
- [Upload Endpoint](/api/upload) - Detailed documentation for file uploads
- [Analysis Endpoint](/api/analysis) - Detailed documentation for retrieving results
