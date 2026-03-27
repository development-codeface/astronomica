import express from 'express';
import {
  getAllOnboardingQuestionnaires,
  getOnboardingQuestionnaireById,
  createOnboardingQuestionnaire,
  updateOnboardingQuestionnaire,
  deleteOnboardingQuestionnaire,
  
} from '../controllers/onboardingQuestionnaireController.js';
import {
  getMyOnboardingResponses,
  submitOnboardingResponse,
  getMyOnboardingResponseByQuestionnaire,
  updateMyOnboardingResponse,
  deleteMyOnboardingResponse,
  getAllResponsesForQuestionnaire,
  getOnboardingResponseAnalytics,
} from '../controllers/onboardingResponseController.js';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

/* Questionnaire routes */


router.post('/questionnaires', authenticate, authorize('admin'), createOnboardingQuestionnaire);
router.put('/questionnaires/:id', authenticate, authorize('admin'), updateOnboardingQuestionnaire);
router.get('/questionnaires', getAllOnboardingQuestionnaires);
router.get('/questionnaires/:id',  getOnboardingQuestionnaireById);
router.delete('/questionnaires/:id', authenticate, authorize('admin'), deleteOnboardingQuestionnaire);

/* Response routes */
router.get('/responses/me', authenticate, getMyOnboardingResponses);
router.post('/responses', authenticate, submitOnboardingResponse);
router.get(
  '/questionnaires/:onboardingQuestionnaireId/response/me',
  authenticate,
  getMyOnboardingResponseByQuestionnaire
);
router.put(
  '/questionnaires/:onboardingQuestionnaireId/response/me',
  authenticate,
  updateMyOnboardingResponse
);
router.delete(
  '/questionnaires/:onboardingQuestionnaireId/response/me',
  authenticate,
  deleteMyOnboardingResponse
);

/* Admin response routes */
router.get(
  '/questionnaires/:onboardingQuestionnaireId/responses',
  authenticate,
  authorize('admin'),
  getAllResponsesForQuestionnaire
);
router.get(
  '/questionnaires/:onboardingQuestionnaireId/analytics',
  authenticate,
  authorize('admin'),
  getOnboardingResponseAnalytics
);

export default router;