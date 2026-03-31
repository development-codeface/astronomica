import express from 'express';
import {
  getAllAnalytics,
  getAnalyticsById,
  getLatestPublishedAnalytics,
  createAnalytics,
  updateAnalytics,
  deleteAnalytics,
} from '../controllers/analyticsController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/* Public routes */
router.get('/latest', getLatestPublishedAnalytics);
router.get('/', getAllAnalytics);
router.get('/:id', getAnalyticsById);

/* Admin only routes */
router.post('/', authenticate, createAnalytics);
router.put('/:id', authenticate, updateAnalytics);
router.delete('/:id', authenticate,  deleteAnalytics);

export default router;