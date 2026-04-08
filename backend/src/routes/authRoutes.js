import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Route: /api/auth/register
router.post('/register', register);

// Route: /api/auth/login
router.post('/login', login);

export default router;
