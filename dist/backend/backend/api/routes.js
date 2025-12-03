"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ingestion_service_1 = require("../services/ingestion/ingestion-service");
const analysis_service_1 = require("../services/analysis/analysis-service");
const generation_service_1 = require("../services/generation/generation-service");
const uuid_1 = require("uuid");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const ingestionService = new ingestion_service_1.IngestionService();
const analysisService = new analysis_service_1.AnalysisService();
const generationService = new generation_service_1.GenerationService();
// Store in-memory for demo (use Redis in production)
const analyses = new Map();
const proposals = new Map();
/**
 * @swagger
 * /api/clone:
 *   post:
 *     summary: Clone and analyze a GitHub repository
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repoUrl:
 *                 type: string
 *                 example: https://github.com/username/repo.git
 *     responses:
 *       200:
 *         description: Analysis started
 */
router.post('/clone', async (req, res) => {
    try {
        let { repoUrl } = req.body;
        if (!repoUrl) {
            return res.status(400).json({ error: 'Repository URL is required' });
        }
        // Validate and normalize GitHub URL
        const githubUrlPattern = /^https?:\/\/(github\.com|gitlab\.com|bitbucket\.org)\/.+/;
        if (!githubUrlPattern.test(repoUrl)) {
            return res
                .status(400)
                .json({ error: 'Invalid repository URL. Must be from GitHub, GitLab, or Bitbucket.' });
        }
        // Add .git if not present
        if (!repoUrl.endsWith('.git')) {
            repoUrl = repoUrl + '.git';
        }
        const codebaseId = (0, uuid_1.v4)();
        const extractPath = path_1.default.join('uploads', codebaseId);
        // Clone repository
        await ingestionService.cloneRepository(repoUrl, extractPath);
        const metadata = await ingestionService.analyzeCodebase(extractPath);
        // Create analysis ID upfront
        const analysisId = `analysis-${codebaseId}`;
        // Create pending analysis entry
        analyses.set(analysisId, {
            id: analysisId,
            codebaseId,
            status: 'analyzing',
            progress: 0,
            technologies: [],
            codeSmells: [],
            cursedFiles: [],
            ghostlyDependencies: [],
            metrics: {
                totalFiles: 0,
                totalLines: 0,
                avgComplexity: 0,
                technicalDebtScore: 0,
            },
            createdAt: new Date(),
        });
        // Start analysis asynchronously
        analysisService
            .analyzeCodebase(codebaseId, extractPath)
            .then(result => {
            console.log('✅ Analysis complete for', codebaseId);
            console.log('📊 Technologies detected:', result.technologies.map(t => t.name).join(', '));
            console.log('📈 Technical debt score:', result.metrics.technicalDebtScore);
            analyses.set(analysisId, { ...result, id: analysisId });
        })
            .catch(error => {
            console.error('❌ Analysis error:', error);
            analyses.set(analysisId, {
                ...analyses.get(analysisId),
                status: 'failed',
                error: error.message,
            });
        });
        res.json({
            codebaseId,
            analysisId,
            message: 'Repository cloned, analysis started',
            metadata: { ...metadata, id: codebaseId, uploadedAt: new Date() },
        });
    }
    catch (error) {
        console.error('Clone error:', error);
        res.status(500).json({ error: 'Failed to clone repository' });
    }
});
/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload and analyze a codebase archive
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               archive:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Analysis started
 */
router.post('/upload', upload.single('archive'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const codebaseId = (0, uuid_1.v4)();
        // For demo: create mock analysis result
        // In production, you'd extract the archive and analyze it
        const mockAnalysis = {
            id: `analysis-${codebaseId}`,
            codebaseId,
            status: 'complete',
            progress: 100,
            technologies: [
                { name: 'jQuery', version: '2.1.0', deprecated: true, severity: 'cursed' },
                { name: 'Bower', deprecated: true, severity: 'cursed' },
            ],
            codeSmells: [
                {
                    type: 'deprecated-syntax',
                    file: 'app.js',
                    line: 10,
                    severity: 'haunted',
                    description: 'Using deprecated "var" keyword',
                    recommendation: 'Replace with "const" or "let"',
                },
            ],
            cursedFiles: [
                {
                    path: 'app.js',
                    severity: 'haunted',
                    issues: 5,
                    complexity: 12,
                    lines: 250,
                },
            ],
            ghostlyDependencies: [
                { name: 'jQuery', version: '2.1.0', deprecated: true, severity: 'cursed' },
            ],
            metrics: {
                totalFiles: 42,
                totalLines: 5000,
                avgComplexity: 8,
                technicalDebtScore: 65,
            },
            createdAt: new Date(),
            completedAt: new Date(),
        };
        analyses.set(mockAnalysis.id, mockAnalysis);
        res.json({
            codebaseId,
            analysisId: mockAnalysis.id,
            message: 'Analysis complete (demo mode)',
            metadata: {
                id: codebaseId,
                name: req.file.originalname,
                uploadedAt: new Date(),
                size: req.file.size,
                fileCount: 42,
                languages: { JavaScript: 30, CSS: 8, HTML: 4 },
            },
        });
    }
    catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to process upload' });
    }
});
/**
 * @swagger
 * /api/analysis/{id}:
 *   get:
 *     summary: Get analysis results
 *     tags: [Analysis]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analysis results
 */
router.get('/analysis/:id', (req, res) => {
    const analysis = analyses.get(req.params.id);
    if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
    }
    res.json(analysis);
});
/**
 * @swagger
 * /api/proposal:
 *   post:
 *     summary: Generate architecture proposal
 *     tags: [Generation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               analysisId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proposal generated
 */
router.post('/proposal', async (req, res) => {
    try {
        const { analysisId } = req.body;
        const analysis = analyses.get(analysisId);
        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }
        const proposal = await generationService.generateArchitectureProposal(analysis);
        proposals.set(proposal.id, proposal);
        res.json(proposal);
    }
    catch (error) {
        console.error('Proposal generation error:', error);
        res.status(500).json({ error: 'Failed to generate proposal' });
    }
});
/**
 * @swagger
 * /api/scaffold/{proposalId}:
 *   get:
 *     summary: Generate project scaffold
 *     tags: [Generation]
 *     parameters:
 *       - in: path
 *         name: proposalId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Scaffold generated
 */
router.get('/scaffold/:proposalId', async (req, res) => {
    try {
        const proposal = proposals.get(req.params.proposalId);
        if (!proposal) {
            return res.status(404).json({ error: 'Proposal not found' });
        }
        const scaffold = await generationService.generateScaffold(proposal);
        res.json({ scaffold });
    }
    catch (error) {
        console.error('Scaffold generation error:', error);
        res.status(500).json({ error: 'Failed to generate scaffold' });
    }
});
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date() });
});
exports.default = router;
//# sourceMappingURL=routes.js.map