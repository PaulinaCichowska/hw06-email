import { sendVerifyMail } from "#config/config-mail.js";
import { User } from "#models/userSchema.js";

export const verifyAgain = async (req, res, next) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.json({ "message": "Email is not exist" }).status(400)
        }
        const user = await User.findOne({ email }).lean()
        const token = user.verificationToken;
        const verify = user.verify;
        if (verify === false) {
            await sendVerifyMail(email, token)
            return res.json({ "message": "Verification send again" }).status(200)
        } else {
            return res.json({ "message": "Verification has already been passed" }).status(400)
        }

    } catch (e) {
        next(e)
    }
}