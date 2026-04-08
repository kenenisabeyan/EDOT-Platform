import db from '../../config/db.js';

const ensureBioColumn = async () => {
    try {
        await db.query(`ALTER TABLE users ADD COLUMN bio TEXT`);
    } catch(err) {
        // Will throw an error if column already exists; ignore it silently.
    }
};

export const getProfile = async (req, res) => {
    try {
        await ensureBioColumn();
        const userId = req.user.id;
        
        const [users] = await db.query('SELECT id, fullName, email, role, bio, created_at FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(users[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error retrieving profile' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        await ensureBioColumn();
        const userId = req.user.id;
        const { fullName, bio } = req.body;

        await db.query(
            'UPDATE users SET fullName = ?, bio = ? WHERE id = ?',
            [fullName, bio || null, userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};
