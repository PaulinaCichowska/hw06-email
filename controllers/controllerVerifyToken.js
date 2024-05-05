import { User } from "#models/userSchema.js"
export const verifyToken = async (req, res, next) => {
    const { verificationToken } = req.params
    try {
        const update = {
            verify: true,
            verificationToken: null,
        }
        const user = await User.findOneAndUpdate(
            { verificationToken },
            { $set: update }
        )

        if (!user) {
            return res.status(404).json({
                status: 'error',
                code: 404,
                message: 'User not found',
            })
        }
        return res.status(200).json({
            status: 'OK',
            code: 200,
            message: 'Verification successful',
        })
    } catch (e) {
        next(e)
    }
}
