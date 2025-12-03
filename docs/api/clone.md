# POST /api/clone

Clone and analyze a GitHub repository.

## Endpoint

```
POST /api/clone
```

## Request Body

```json
{
  "repoUrl": "https://github.com/username/repo"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| repoUrl | string | Yes | GitHub, GitLab, or Bitbucket repository URL |

### Supported URL Formats

Both formats work:
- `https://github.com/username/repo` (automatically adds .git)
- `https://github.com/username/repo.git`

### Supported Platforms

- GitHub (github.com)
- GitLab (gitlab.com)
- Bitbucket (bitbucket.org)

## Response

### Success (200)

```json
{
  "codebaseId": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Repository cloned, analysis started",
  "metadata": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "repo",
    "uploadedAt": "2024-12-02T10:30:00.000Z",
    "size": 1048576,
    "fileCount": 42,
    "languages": {
      "JavaScript": 30,
      "TypeScript": 8,
      "CSS": 4
    }
  }
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "error": "Repository URL is required"
}
```

```json
{
  "error": "Invalid repository URL. Must be from GitHub, GitLab, or Bitbucket."
}
```

#### 500 Internal Server Error

```json
{
  "error": "Failed to clone repository"
}
```

## Example Usage

### cURL

```bash
curl -X POST http://localhost:3001/api/clone \
  -H "Content-Type: application/json" \
  -d '{
    "repoUrl": "https://github.com/jquery/jquery"
  }'
```

### JavaScript (Fetch)

```javascript
const response = await fetch('http://localhost:3001/api/clone', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    repoUrl: 'https://github.com/jquery/jquery'
  })
});

const data = await response.json();
console.log('Codebase ID:', data.codebaseId);

// Poll for analysis results
const checkAnalysis = async () => {
  const analysisResponse = await fetch(
    `http://localhost:3001/api/analysis/${data.codebaseId}`
  );
  const analysis = await analysisResponse.json();
  
  if (analysis.status === 'complete') {
    console.log('Analysis complete:', analysis);
  } else {
    setTimeout(checkAnalysis, 2000);
  }
};

checkAnalysis();
```

### Python

```python
import requests
import time

# Clone repository
response = requests.post(
    'http://localhost:3001/api/clone',
    json={'repoUrl': 'https://github.com/jquery/jquery'}
)

data = response.json()
codebase_id = data['codebaseId']

# Poll for analysis results
while True:
    analysis_response = requests.get(
        f'http://localhost:3001/api/analysis/{codebase_id}'
    )
    analysis = analysis_response.json()
    
    if analysis.get('status') == 'complete':
        print('Analysis complete:', analysis)
        break
    
    time.sleep(2)
```

## Notes

- Cloning large repositories may take 1-2 minutes
- Only public repositories are supported (private repo support coming soon)
- The repository is cloned with `--depth 1` for faster downloads
- Analysis starts automatically after cloning completes
- Use the returned `codebaseId` to check analysis status

## Next Steps

After cloning, use the [Analysis Endpoint](/api/analysis) to retrieve results.
