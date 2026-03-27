import express from 'express';
import {
  getAllQuestionnaires,
  getQuestionnaireById,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  getQuestionnaireStats,
} from '../controllers/questionnaireController.js';
import {
  getUserResponses,
  submitResponse,
  getResponse,
  updateResponse,
  deleteResponse,
  getAllResponses,
  getResponseAnalytics,
} from '../controllers/questionnaireResponseController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes (optional auth for filtering)
router.get('/', optionalAuth, getAllQuestionnaires);
router.get('/:id', optionalAuth, getQuestionnaireById);

// Admin routes
router.post('/', authenticate, authorize('admin'), createQuestionnaire);
router.put('/:id', authenticate, authorize('admin'), updateQuestionnaire);
router.delete('/:id', authenticate, authorize('admin'), deleteQuestionnaire);
router.get('/:id/stats', authenticate, authorize('admin'), getQuestionnaireStats);

// Response routes (require authentication)
router.use(authenticate);

// User response routes
router.get('/responses/user', getUserResponses);
router.post('/responses', submitResponse);
router.get('/:questionnaireId/response', getResponse);
router.put('/:questionnaireId/response', updateResponse);
router.delete('/:questionnaireId/response', deleteResponse);

// Admin response management routes
router.get('/:questionnaireId/responses', authorize('admin'), getAllResponses);
router.get('/:questionnaireId/analytics', authorize('admin'), getResponseAnalytics);

export default router;