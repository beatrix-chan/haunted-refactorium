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
app.use(helmet());
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

// Serve frontend in production
if (config.nodeEnv === 'production') {
  app.use(express.static('dist/frontend'));
  app.get('*', (req, res) => {
    res.sendFile('dist/frontend/index.html', { root: process.cwd() });
  });
}

// Initialize services
const ingestionService = new IngestionService();
ingestionService.initialize().catch(console.error);

// Start server
const server = app.listen(config.port, () => {
  console.log(`🎃 Haunted Refactorium backend running on port ${config.port}`);
  console.log(`📚 API docs available at http://localhost:${config.port}/api-docs`);
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
