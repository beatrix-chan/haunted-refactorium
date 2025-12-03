# GET /api/analysis/:id

Get analysis results for a codebase.

## Endpoint

```
GET /api/analysis/:id
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Analysis ID returned from upload or clone |

## Response

### Success (200)

```json
{
  "id": "analysis-550e8400",
  "codebaseId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "complete",
  "progress": 100,
  "technologies": [
    {
      "name": "jQuery",
      "version": "2.1.0",
      "deprecated": true,
      "severity": "cursed"
    },
    {
      "name": "Bower",
      "deprecated": true,
      "severity": "cursed"
    }
  ],
  "codeSmells": [
    {
      "type": "deprecated-syntax",
      "file": "app.js",
      "line": 10,
      "severity": "haunted",
      "description": "Using deprecated 'var' keyword",
      "recommendation": "Replace with 'const' or 'let'"
    }
  ],
  "cursedFiles": [
    {
      "path": "app.js",
      "severity": "haunted",
      "issues": 5,
      "complexity": 12,
      "lines": 250
    }
  ],
  "ghostlyDependencies": [
    {
      "name": "jQuery",
      "version": "2.1.0",
      "deprecated": true,
      "severity": "cursed"
    }
  ],
  "metrics": {
    "totalFiles": 42,
    "totalLines": 5000,
    "avgComplexity": 8,
    "technicalDebtScore": 65
  },
  "createdAt": "2024-12-02T10:30:00.000Z",
  "completedAt": "2024-12-02T10:31:00.000Z"
}
```

### Error Responses

#### 404 Not Found

```json
{
  "error": "Analysis not found"
}
```

## Status Values

| Status | Description |
|--------|-------------|
| pending | Analysis queued but not started |
| analyzing | Analysis in progress |
| complete | Analysis finished successfully |
| failed | Analysis encountered an error |

## Severity Levels

| Level | Description | Color |
|-------|-------------|-------|
| cursed | Critical issues requiring immediate attention | Red |
| haunted | High priority issues | Orange |
| spooky | Medium priority issues | Yellow |
| clean | No issues detected | Green |

## Example Usage

### cURL

```bash
curl http://localhost:3001/api/analysis/analysis-550e8400
```

### JavaScript (Fetch)

```javascript
const analysisId = 'analysis-550e8400';

const response = await fetch(
  `http://localhost:3001/api/analysis/${analysisId}`
);

const analysis = await response.json();

console.log('Status:', analysis.status);
console.log('Technical Debt Score:', analysis.metrics.technicalDebtScore);
console.log('Cursed Files:', analysis.cursedFiles.length);
console.log('Code Smells:', analysis.codeSmells.length);
```

### JavaScript (Polling)

```javascript
async function waitForAnalysis(analysisId) {
  while (true) {
    const response = await fetch(
      `http://localhost:3001/api/analysis/${analysisId}`
    );
    const analysis = await response.json();
    
    if (analysis.status === 'complete') {
      return analysis;
    }
    
    if (analysis.status === 'failed') {
      throw new Error('Analysis failed');
    }
    
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

// Usage
const analysis = await waitForAnalysis('analysis-550e8400');
console.log('Analysis complete:', analysis);
```

### Python

```python
import requests
import time

def wait_for_analysis(analysis_id):
    while True:
        response = requests.get(
            f'http://localhost:3001/api/analysis/{analysis_id}'
        )
        analysis = response.json()
        
        if analysis['status'] == 'complete':
            return analysis
        
        if analysis['status'] == 'failed':
            raise Exception('Analysis failed')
        
        time.sleep(2)

# Usage
analysis = wait_for_analysis('analysis-550e8400')
print('Technical Debt Score:', analysis['metrics']['technicalDebtScore'])
```

## Understanding the Results

### Technologies
List of detected technologies with deprecation status and severity.

### Code Smells
Specific issues found in the code with file locations and recommendations.

### Cursed Files
Files with the most issues, ranked by severity and complexity.

### Ghostly Dependencies
Deprecated or outdated dependencies that should be updated.

### Metrics
Overall codebase statistics including technical debt score (0-100, higher is worse).

## Next Steps

After reviewing analysis results, use the [Proposal Endpoint](/api/proposal) to generate a modernization plan.
