import db from '../../config/db.js';

export const getCourses = async (req, res) => {
    try {
        const category = req.query.category;
        const search = req.query.search;
        let query = 'SELECT c.*, u.name as instructor_name FROM courses c JOIN users u ON c.instructor_id = u.id WHERE 1=1';
        let params = [];
        
        if (category) {
            query += ' AND c.category = ?';
            params.push(category);
        }
        
        if (search) {
            query += ' AND (c.title LIKE ? OR c.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }
        
        const [courses] = await db.query(query, params);
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error fetching courses' });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const [courses] = await db.query('SELECT c.*, u.name as instructor_name FROM courses c JOIN users u ON c.instructor_id = u.id WHERE c.id = ?', [id]);
        
        if (courses.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        const course = courses[0];
        
        // Fetch lessons for the course
        const [lessons] = await db.query('SELECT * FROM lessons WHERE course_id = ? ORDER BY lesson_order ASC', [id]);
        course.lessons = lessons;
        
        res.json(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ message: 'Server error fetching course' });
    }
};

export const createCourse = async (req, res) => {
    try {
        if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only instructors can create courses' });
        }
        
        const { title, description, category, duration, thumbnail } = req.body;
        const instructor_id = req.user.id;
        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        
        const [result] = await db.query(
            'INSERT INTO courses (title, description, instructor_id, category, duration, thumbnail) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, instructor_id, category, duration, thumbnail]
        );
        
        res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ message: 'Server error creating course' });
    }
};
