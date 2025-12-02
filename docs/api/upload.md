# POST /api/upload

Upload and analyze a code archive.

## Endpoint

```
POST /api/upload
```

## Request

This endpoint accepts `multipart/form-data` for file uploads.

### Form Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| archive | file | Yes | Code archive file |

### Supported Formats

- `.zip`
- `.tar`
- `.tar.gz` / `.tgz`
- `.tar.bz2`
- `.tar.xz`
- `.7z`

### File Size Limits

- Maximum upload size: 100MB
- Maximum archive size (extracted): 500MB

## Response

### Success (200)

```json
{
  "codebaseId": "550e8400-e29b-41d4-a716-446655440000",
  "analysisId": "analysis-550e8400",
  "message": "Analysis complete (demo mode)",
  "metadata": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "my-project.zip",
    "uploadedAt": "2024-12-02T10:30:00.000Z",
    "size": 1048576,
    "fileCount": 42,
    "languages": {
      "JavaScript": 30,
      "CSS": 8,
      "HTML": 4
    }
  }
}
```

### Error Responses

#### 400 Bad Request

```json
{
  "error": "No file uploaded"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Failed to process upload"
}
```

## Example Usage

### cURL

```bash
curl -X POST http://localhost:3001/api/upload \
  -F "archive=@/path/to/project.zip"
```

### JavaScript (Fetch)

```javascript
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('archive', file);

const response = await fetch('http://localhost:3001/api/upload', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log('Analysis ID:', data.analysisId);

// Navigate to results
window.location.href = `/analysis/${data.analysisId}`;
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const formData = new FormData();
formData.append('archive', file);

const response = await axios.post(
  'http://localhost:3001/api/upload',
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
);

console.log('Analysis:', response.data);
```

### Python

```python
import requests

# Upload file
with open('project.zip', 'rb') as f:
    files = {'archive': f}
    response = requests.post(
        'http://localhost:3001/api/upload',
        files=files
    )

data = response.json()
print('Analysis ID:', data['analysisId'])
```

## Notes

- Files are temporarily stored in the `uploads/` directory
- Archive extraction happens automatically
- Analysis starts immediately after upload
- The `analysisId` is returned directly (no polling needed)
- Temporary files are cleaned up after analysis

## Demo Mode

Currently, the upload endpoint returns mock analysis data for demonstration purposes. To enable real analysis:

1. Install archive extraction packages:
```bash
npm install unzipper tar
npm install -D @types/tar
```

2. Update the ingestion service to extract archives
3. The analysis will then process the actual uploaded files

## Next Steps

After uploading, use the returned `analysisId` with the [Analysis Endpoint](/api/analysis) to view detailed results.
