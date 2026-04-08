import db from '../../config/db.js';

export const markAttendance = async (req, res) => {
    try {
        const { courseId, sectionId, date, records } = req.body;
        // records is an array of { userId, role, status }

        if (!courseId || !sectionId || !date || !records) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if attendance already exists for this date and section
        let [existing] = await db.query(
            'SELECT id FROM attendance WHERE section_id = ? AND date = ?',
            [sectionId, date]
        );

        let attendanceId;

        if (existing.length > 0) {
            attendanceId = existing[0].id;
            // Optionally delete old records or we just add/update
            await db.query('DELETE FROM attendance_records WHERE attendance_id = ?', [attendanceId]);
        } else {
            const [result] = await db.query(
                'INSERT INTO attendance (course_id, section_id, date) VALUES (?, ?, ?)',
                [courseId, sectionId, date]
            );
            attendanceId = result.insertId;
        }

        // Insert records
        for (const rec of records) {
            await db.query(
                'INSERT INTO attendance_records (attendance_id, user_id, role, status) VALUES (?, ?, ?, ?)',
                [attendanceId, rec.userId, rec.role || 'student', rec.status]
            );
        }

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error marking attendance', details: error.message });
    }
};

export const getAttendance = async (req, res) => {
    try {
        const { courseId, sectionId, date } = req.query;
        let query = `
            SELECT a.id, a.date, ar.user_id, ar.role, ar.status, u.name as user_name
            FROM attendance a
            JOIN attendance_records ar ON a.id = ar.attendance_id
            JOIN users u ON ar.user_id = u.id
            WHERE 1=1
        `;
        let params = [];

        if (courseId) { query += ' AND a.course_id = ?'; params.push(courseId); }
        if (sectionId) { query += ' AND a.section_id = ?'; params.push(sectionId); }
        if (date) { query += ' AND a.date = ?'; params.push(date); }

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching attendance', details: error.message });
    }
};

export const getAttendanceUsers = async (req, res) => {
    try {
        const { sectionId } = req.query;
        if (!sectionId) return res.status(400).json({ error: 'sectionId is required' });

        const [rows] = await db.query(`
            SELECT ss.student_id as id, u.name, u.role
            FROM section_students ss
            JOIN users u ON ss.student_id = u.id
            WHERE ss.section_id = ?
            UNION
            SELECT s.instructor_id as id, iu.name, iu.role
            FROM sections s
            JOIN users iu ON s.instructor_id = iu.id
            WHERE s.id = ?
        `, [sectionId, sectionId]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users for section', details: error.message });
    }
};
