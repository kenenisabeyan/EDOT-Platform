import express from 'express';
import { getLessonsByCourse, completeLesson, createLesson } from '../controllers/lessonController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:courseId', getLessonsByCourse);
router.post('/complete', protect, completeLesson);
router.post('/', protect, createLesson);

export default router;
