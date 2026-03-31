import express from 'express';
import {
  getAllTutors,
  getFeaturedTutors,
  getTutorById,
  createTutor,
  updateTutor,
  deleteTutor,
} from '../controllers/tutorController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/* Public routes */
router.get('/featured', getFeaturedTutors);
router.get('/', getAllTutors);
router.get('/:id', getTutorById);

/* Admin only routes */
router.post('/', authenticate, authorize('admin'), createTutor);
router.put('/:id', authenticate, authorize('admin'), updateTutor);
router.delete('/:id', authenticate, authorize('admin'), deleteTutor);

export default router;