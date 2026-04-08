import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/me')
    .get(protect, getProfile)
    .put(protect, updateProfile);

export default router;
