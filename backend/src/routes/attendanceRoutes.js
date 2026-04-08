import express from 'express';
import { markAttendance, getAttendance, getAttendanceUsers } from '../controllers/attendanceController.js';
import { verifyToken, isInstructorOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isInstructorOrAdmin, markAttendance);
router.get('/', verifyToken, getAttendance);
router.get('/users', verifyToken, isInstructorOrAdmin, getAttendanceUsers);

export default router;
