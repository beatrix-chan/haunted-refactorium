import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { WebSocketServer } from 'ws';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './config';
import routes from './api/routes';
import { IngestionService } from './services/ingestion/ingestion-service';

const app = express();

// Middleware
// Configure helmet with relaxed CSP for docs (VitePress needs inline scripts)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        fontSrc: ["'self'", 'data:'],
        connectSrc: ["'self'", 'wss:', 'ws:'],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Haunted Refactorium API',
      version: '1.0.0',
      description: 'API for analyzing legacy codebases and generating modernization plans',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/backend/api/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

// Serve documentation (VitePress build output)
app.use('/docs', express.static('docs/.vitepress/dist', { index: 'index.html' }));
app.get('/docs/*', (req, res) => {
  res.sendFile('docs/.vitepress/dist/index.html', { root: process.cwd() });
});

// Serve frontend (built by Vite)
app.use(express.static('dist/frontend'));
app.get('*', (req, res, next) => {
  // Skip API routes and docs
  if (req.path.startsWith('/api') || req.path.startsWith('/docs') || req.path.startsWith('/api-docs')) {
    return next();
  }
  res.sendFile('dist/frontend/index.html', { root: process.cwd() });
});

// Initialize services
const ingestionService = new IngestionService();
ingestionService.initialize().catch(console.error);

// Start server
const server = app.listen(config.port, () => {
  console.log(`🎃 Haunted Refactorium backend running on port ${config.port}`);
  console.log(`📚 API docs available at http://localhost:${config.port}/api-docs`);
  console.log(`📖 Documentation available at http://localhost:${config.port}/docs`);
  console.log(`🔮 Deployment mode: ${config.deploymentMode}`);
});

// WebSocket for real-time updates
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', ws => {
  console.log('👻 Client connected to WebSocket');

  ws.on('message', message => {
    console.log('Received:', message.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
