import express from 'express';
import { enrollCourse, getMyCourses } from '../controllers/enrollController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, enrollCourse);
router.get('/', protect, getMyCourses);

export default router;
