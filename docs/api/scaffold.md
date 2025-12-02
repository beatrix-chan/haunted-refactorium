# GET /api/scaffold/:proposalId

Download a modern project scaffold based on the architecture proposal.

## Endpoint

```
GET /api/scaffold/:proposalId
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| proposalId | string | Yes | Proposal ID from architecture proposal |

## Response

### Success (200)

```json
{
  "scaffold": "{\"package.json\":{\"name\":\"modernized-app\",\"version\":\"1.0.0\",...},\"tsconfig.json\":{...},\"vite.config.ts\":\"...\",\"src/App.tsx\":\"...\",\"src/main.tsx\":\"...\"}"
}
```

The scaffold is returned as a JSON string containing the file structure and contents.

### Error Responses

#### 404 Not Found

```json
{
  "error": "Proposal not found"
}
```

#### 500 Internal Server Error

```json
{
  "error": "Failed to generate scaffold"
}
```

## Scaffold Contents

The generated scaffold includes:

### Configuration Files
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `.eslintrc.json` - ESLint rules
- `.prettierrc` - Prettier formatting
- `tailwind.config.js` - Tailwind CSS config

### Source Files
- `src/App.tsx` - Main React component
- `src/main.tsx` - Application entry point
- `src/index.css` - Global styles
- `index.html` - HTML template

### Additional Files
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules
- `.env.example` - Environment variables template

## Example Usage

### cURL

```bash
curl http://localhost:3001/api/scaffold/arch-1701518400000 \
  -o scaffold.json
```

### JavaScript (Fetch)

```javascript
const proposalId = 'arch-1701518400000';

const response = await fetch(
  `http://localhost:3001/api/scaffold/${proposalId}`
);

const data = await response.json();
const scaffold = JSON.parse(data.scaffold);

// Download as file
const blob = new Blob([data.scaffold], { type: 'application/json' });
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'modern-scaffold.json';
a.click();
```

### JavaScript (Extract Files)

```javascript
const response = await fetch(
  `http://localhost:3001/api/scaffold/${proposalId}`
);

const data = await response.json();
const scaffold = JSON.parse(data.scaffold);

// Extract individual files
for (const [filename, content] of Object.entries(scaffold)) {
  console.log(`File: ${filename}`);
  console.log(typeof content === 'object' 
    ? JSON.stringify(content, null, 2) 
    : content
  );
  console.log('---');
}
```

### Python

```python
import requests
import json
import os

response = requests.get(
    'http://localhost:3001/api/scaffold/arch-1701518400000'
)

data = response.json()
scaffold = json.loads(data['scaffold'])

# Create project directory
os.makedirs('modernized-app', exist_ok=True)

# Extract files
for filename, content in scaffold.items():
    filepath = os.path.join('modernized-app', filename)
    
    # Create subdirectories if needed
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    # Write file
    with open(filepath, 'w') as f:
        if isinstance(content, dict):
            f.write(json.dumps(content, indent=2))
        else:
            f.write(content)

print('Scaffold extracted to modernized-app/')
```

## Using the Scaffold

After downloading:

1. **Extract the files** to a new directory
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start development**:
   ```bash
   npm run dev
   ```
4. **Customize** based on your specific needs

## Customization

The scaffold provides a minimal starting point. You'll want to:

- Add your business logic
- Configure environment variables
- Set up database connections
- Add authentication
- Implement routing
- Add state management
- Configure deployment

## Next Steps

- Review the [Quick Start Guide](/guide/quick-start) for using the scaffold
- Check the [Architecture Proposals Guide](/guide/architecture-proposals) for understanding the recommendations
- Explore the [Migration Strategy](/guide/migration-strategy) for implementation guidance
