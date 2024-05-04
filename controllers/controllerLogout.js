import { Blacklist } from "#models/BlacklistSchema.js"
export const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const accessToken = authHeader.split(' ')[1];
        const newBlacklist = new Blacklist({
            token: accessToken,
        });
        await newBlacklist.save();
        res.status(200).json({ message: 'You are logged out!' });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }
}