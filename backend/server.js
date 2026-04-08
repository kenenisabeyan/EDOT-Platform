import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';

// Route Imports
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
