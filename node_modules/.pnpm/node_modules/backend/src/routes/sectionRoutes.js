import express from 'express';
import { createSection, getSections, updateSection, deleteSection, addStudent, assignInstructor } from '../controllers/sectionController.js';
import { verifyToken, isAdmin, isInstructorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isInstructorOrAdmin, createSection);
router.get('/', getSections);
router.put('/:id', verifyToken, isInstructorOrAdmin, updateSection);
router.delete('/:id', verifyToken, isAdmin, deleteSection);

// Additional APIs for assigning users to sections
router.post('/:id/add-student', verifyToken, isInstructorOrAdmin, addStudent);
router.post('/:id/assign-instructor', verifyToken, isAdmin, assignInstructor);

export default router;
