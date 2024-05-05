import { login } from "#controllers/controllerLogin.js"
import { logout } from "#controllers/controllerLogout.js"
import { signUp } from "#controllers/controllerSignup.js"
import express from "express"
import { authMiddleware } from "#middleware/authMiddleware.js"
import { current } from "#controllers/controllerCurrent.js"
import { validateSchema } from "#validation/joi.js"
import { updateAvatar } from "#controllers/controllerUpdateAvatar.js"
import { uploadMiddleware } from "#middleware/uploadMiddleware.js"
import { verifyToken } from "#controllers/controllerVerifyToken.js"
import { verifyAgain } from "#controllers/controllerVerifyAgain.js"

const router = express.Router()

router.post('/signup', validateSchema, signUp)
router.post('/login', validateSchema, login)
router.post('/verify', verifyAgain)
router.get('/logout', authMiddleware, logout)
router.get('/current', authMiddleware, current)
router.get('/verify/:verificationToken', verifyToken)
router.patch('/avatars', authMiddleware, uploadMiddleware.single("avatar"), updateAvatar)

export default router

