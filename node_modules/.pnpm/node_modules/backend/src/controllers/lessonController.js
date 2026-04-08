import db from '../../config/db.js';

export const getLessonsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const [lessons] = await db.query('SELECT * FROM lessons WHERE course_id = ? ORDER BY lesson_order ASC', [courseId]);
        res.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({ message: 'Server error fetching lessons' });
    }
};

export const completeLesson = async (req, res) => {
    try {
        const { lessonId } = req.body;
        const userId = req.user.id;

        // Check if lesson exists
        const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [lessonId]);
        if (lessons.length === 0) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        
        const courseId = lessons[0].course_id;

        // Insert into completed_lessons, ignore if already completed
        await db.query(
            'INSERT IGNORE INTO completed_lessons (user_id, lesson_id) VALUES (?, ?)',
            [userId, lessonId]
        );

        // Update enrollment progress
        // Get total lessons in course
        const [totalLessons] = await db.query('SELECT COUNT(*) as count FROM lessons WHERE course_id = ?', [courseId]);
        // Get user's completed lessons in course
        const [completed] = await db.query(
            `SELECT COUNT(*) as count FROM completed_lessons cl
             JOIN lessons l ON cl.lesson_id = l.id
             WHERE cl.user_id = ? AND l.course_id = ?`,
             [userId, courseId]
        );

        const progressPercent = totalLessons[0].count === 0 ? 0 : Math.round((completed[0].count / totalLessons[0].count) * 100);

        // Update progress in enrollment
        await db.query(
            'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?',
            [progressPercent, userId, courseId]
        );

        res.json({ message: 'Lesson marked as completed', progress: progressPercent });
    } catch (error) {
        console.error('Error completing lesson:', error);
        res.status(500).json({ message: 'Server error completing lesson' });
    }
};

export const createLesson = async (req, res) => {
    try {
        if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only instructors can create lessons' });
        }

        const { courseId, title, description, videoUrl, order } = req.body;

        if (!courseId || !title) {
            return res.status(400).json({ message: 'Course ID and title are required' });
        }

        const [result] = await db.query(
            'INSERT INTO lessons (course_id, title, description, video_url, lesson_order) VALUES (?, ?, ?, ?, ?)',
            [courseId, title, description, videoUrl, order || 0]
        );

        res.status(201).json({ message: 'Lesson created successfully', lessonId: result.insertId });
    } catch (error) {
        console.error('Error creating lesson:', error);
        res.status(500).json({ message: 'Server error creating lesson' });
    }
};
