"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ws_1 = require("ws");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./api/routes"));
const ingestion_service_1 = require("./services/ingestion/ingestion-service");
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
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
                url: `http://localhost:${config_1.config.port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/backend/api/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Routes
app.use('/api', routes_1.default);
// Serve frontend in production
if (config_1.config.nodeEnv === 'production') {
    app.use(express_1.default.static('dist/frontend'));
    app.get('*', (req, res) => {
        res.sendFile('dist/frontend/index.html', { root: process.cwd() });
    });
}
// Initialize services
const ingestionService = new ingestion_service_1.IngestionService();
ingestionService.initialize().catch(console.error);
// Start server
const server = app.listen(config_1.config.port, () => {
    console.log(`🎃 Haunted Refactorium backend running on port ${config_1.config.port}`);
    console.log(`📚 API docs available at http://localhost:${config_1.config.port}/api-docs`);
    console.log(`🔮 Deployment mode: ${config_1.config.deploymentMode}`);
});
// WebSocket for real-time updates
const wss = new ws_1.WebSocketServer({ server, path: '/ws' });
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
//# sourceMappingURL=index.js.map