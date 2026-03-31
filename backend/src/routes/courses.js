import express from 'express';
import {
  getAllCourses,
  getTrendingCourses,
  getPopularCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

/* Public routes */
router.get('/trending', getTrendingCourses);
router.get('/popular', getPopularCourses);
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

/* Admin only routes */
router.post('/', authenticate, authorize('admin'), createCourse);
router.put('/:id', authenticate, authorize('admin'), updateCourse);
router.delete('/:id', authenticate, authorize('admin'), deleteCourse);

export default router;