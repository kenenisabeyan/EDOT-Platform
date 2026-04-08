import express from 'express';
import { getProfile, updateProfile, getUsers } from '../controllers/userController.js';
import { protect, isAdmin, isInstructorOrAdmin, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, isInstructorOrAdmin, getUsers);

router.route('/me')
    .get(protect, getProfile)
    .put(protect, updateProfile);

export default router;
