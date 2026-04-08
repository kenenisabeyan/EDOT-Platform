import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

// Route Imports
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import lessonRoutes from './src/routes/lessonRoutes.js';
import enrollRoutes from './src/routes/enrollRoutes.js';
import sectionRoutes from './src/routes/sectionRoutes.js';
import attendanceRoutes from './src/routes/attendanceRoutes.js';

import initDB from './src/models/initDB.js';

dotenv.config();

const app = express();

// Initialize DB tables
initDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('EDOT Platform API is running...');
});

// Test database connection
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        res.json({ message: 'Database connection successful!', data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enroll', enrollRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
