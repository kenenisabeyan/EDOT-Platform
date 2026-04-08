import db from './backend/config/db.js';
import bcrypt from 'bcryptjs';

const seedData = async () => {
    try {
        console.log('🌱 Starting database seed script...');

        // Clear existing data for a clean slate
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE table attendance_records');
        await db.query('TRUNCATE table attendance');
        await db.query('TRUNCATE table section_students');
        await db.query('TRUNCATE table sections');
        await db.query('TRUNCATE table courses');
        await db.query('TRUNCATE table users');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // 1. Create Users
        console.log('👤 Creating users...');
        const users = [
            ['Admin User', 'admin@edot.com', hashedPassword, 'admin', 'System Administrator'],
            ['Dr. John Smith', 'john@edot.com', hashedPassword, 'instructor', 'Mathematics Professor'],
            ['Alice Walker', 'alice@edot.com', hashedPassword, 'student', 'First year student'],
            ['Bob Singer', 'bob@edot.com', hashedPassword, 'student', 'Second year student'],
            ['Charlie Davis', 'charlie@edot.com', hashedPassword, 'student', 'First year student']
        ];

        let insertUsersQuery = 'INSERT INTO users (name, email, password, role, bio) VALUES ?';
        await db.query(insertUsersQuery, [users]);

        // Get IDs
        const [admin] = await db.query('SELECT id FROM users WHERE role="admin" LIMIT 1');
        const [instructor] = await db.query('SELECT id FROM users WHERE role="instructor" LIMIT 1');
        
        // 2. Mock missing 'Admin Creates a Course' just in case no UI exists
        console.log('📚 Creating initial course...');
        await db.query(
            'INSERT INTO courses (title, description, instructor_id, category_main, category_sub, duration, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)',
            ['Advanced Mathematics: Calculus', 'Learn full calculus including limits and continuity.', instructor[0].id, 'Math', 'Calculus', '25h 00m', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80']
        );

        console.log('✅ Database seeded successfully! Ready for Demo.');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit();
    }
};

seedData();
