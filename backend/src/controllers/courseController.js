import db from '../../config/db.js';

export const getCourses = async (req, res) => {
    try {
        // Construct the table dynamically if it doesn't exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS courses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                icon VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Check if there are courses. If not, auto-seed the default ones from the old HTML.
        const [existingCourses] = await db.query('SELECT * FROM courses');
        
        if (existingCourses.length === 0) {
            await db.query(`
                INSERT INTO courses (title, description, icon) VALUES 
                ('Mathematics', 'Build strong problem-solving skills.', '📘'),
                ('English', 'Improve reading, writing, and communication.', '📖'),
                ('Programming', 'Learn coding from basics to advanced.', '💻')
            `);
        }

        // Fetch fresh courses
        const [courses] = await db.query('SELECT * FROM courses ORDER BY id ASC');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error fetching courses' });
    }
};
