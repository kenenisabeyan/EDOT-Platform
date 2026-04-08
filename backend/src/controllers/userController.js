import db from '../../config/db.js';

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const [users] = await db.query('SELECT id, name, email, role, bio, created_at FROM users WHERE id = ?', [userId]);

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
        const userId = req.user.id;
        const { name, bio } = req.body;

        await db.query(
            'UPDATE users SET name = ?, bio = ? WHERE id = ?',
            [name, bio || null, userId]
        );

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating profile' });
    }
};
