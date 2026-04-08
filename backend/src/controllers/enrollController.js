import db from '../../config/db.js';

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(400).json({ message: 'Course ID is required' });
        }

        // Check if course exists
        const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
        if (courses.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if already enrolled
        const [enrollments] = await db.query('SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?', [userId, courseId]);
        if (enrollments.length > 0) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        await db.query(
            'INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, ?)',
            [userId, courseId, 0]
        );

        res.status(201).json({ message: 'Successfully enrolled in course' });
    } catch (error) {
        console.error('Error enrolling:', error);
        res.status(500).json({ message: 'Server error during enrollment' });
    }
};

export const getMyCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [myCourses] = await db.query(
            `SELECT c.*, e.progress, u.name as instructor_name 
             FROM courses c 
             JOIN enrollments e ON c.id = e.course_id 
             JOIN users u ON c.instructor_id = u.id 
             WHERE e.user_id = ?`,
            [userId]
        );

        res.json(myCourses);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ message: 'Server error fetching enrollments' });
    }
};
