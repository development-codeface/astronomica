import express from 'express';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/NotificationController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/* Public routes */
router.get('/', getAllNotifications);
router.get('/:id', getNotificationById);

/* Admin only routes */
router.post('/',  createNotification);
router.put('/:id',  updateNotification);
router.delete('/:id', authenticate, authorize('admin'), deleteNotification);

export default router;