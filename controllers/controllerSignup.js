import { User } from "#models/userSchema.js"
import gravatar from "gravatar"
import { v4 as uuidV4 } from "uuid"
import { sendVerifyMail } from "#config/config-mail.js";


export const signUp = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        })
    }
    try {
        const avatarURL = gravatar.url(email);
        const verificationToken = uuidV4();
        const newUser = new User({ email, avatarURL, verificationToken });
        newUser.setPassword(password);
        await newUser.save();
        await sendVerifyMail(email, verificationToken)
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                name: {
                    "email": email,
                    "subscription": "starter"
                },
            }
        });
    } catch (error) {
        next(error);
    }
}