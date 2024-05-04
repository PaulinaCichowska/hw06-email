import passport from "passport";
import { Blacklist } from "#models/BlacklistSchema.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(204);
    const accessToken = authHeader.split(' ')[1];
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkIfBlacklisted) return res.json({ message: "Not authorized" });
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};
