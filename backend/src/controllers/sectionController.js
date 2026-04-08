import db from '../../config/db.js';

export const createSection = async (req, res) => {
    try {
        const { name, courseId, instructorId, schedule } = req.body;
        
        if (!name || !courseId || !instructorId) {
            return res.status(400).json({ error: 'Name, courseId, and instructorId are required' });
        }

        const [result] = await db.query(
            'INSERT INTO sections (name, course_id, instructor_id, schedule) VALUES (?, ?, ?, ?)',
            [name, courseId, instructorId, schedule || null]
        );

        res.status(201).json({ id: result.insertId, message: 'Section created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating section', details: error.message });
    }
};

export const getSections = async (req, res) => {
    try {
        const { courseId } = req.query;
        let query = `
            SELECT s.*, u.name as instructor_name, COUNT(ss.student_id) as student_count
            FROM sections s
            JOIN users u ON s.instructor_id = u.id
            LEFT JOIN section_students ss ON s.id = ss.section_id
        `;
        let params = [];
        
        if (courseId) {
            query += ' WHERE s.course_id = ?';
            params.push(courseId);
        }
        
        query += ' GROUP BY s.id';

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching sections', details: error.message });
    }
};

export const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, schedule } = req.body;
        
        await db.query(
            'UPDATE sections SET name = ?, schedule = ? WHERE id = ?',
            [name, schedule || null, id]
        );

        res.json({ message: 'Section updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating section', details: error.message });
    }
};

export const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM sections WHERE id = ?', [id]);
        res.json({ message: 'Section deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting section', details: error.message });
    }
};

export const addStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { studentIds } = req.body;
        
        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ error: 'studentIds array is required' });
        }

        // Insert each student
        for (const studentId of studentIds) {
            // First check if they're already in the section
            const [existing] = await db.query(
                'SELECT * FROM section_students WHERE section_id = ? AND student_id = ?',
                [id, studentId]
            );
            
            if (existing.length === 0) {
                await db.query(
                    'INSERT INTO section_students (section_id, student_id) VALUES (?, ?)',
                    [id, studentId]
                );
            }
        }
        
        res.json({ message: 'Students added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding students', details: error.message });
    }
};

export const assignInstructor = async (req, res) => {
    try {
        const { id } = req.params;
        const { instructorId } = req.body;
        
        if (!instructorId) {
            return res.status(400).json({ error: 'instructorId is required' });
        }

        await db.query(
            'UPDATE sections SET instructor_id = ? WHERE id = ?',
            [instructorId, id]
        );

        res.json({ message: 'Instructor assigned successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error assigning instructor', details: error.message });
    }
};
