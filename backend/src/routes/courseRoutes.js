import express from 'express';
import { getCourses } from '../controllers/courseController.js';

const router = express.Router();

// GET /api/courses
router.get('/', getCourses);

export default router;
