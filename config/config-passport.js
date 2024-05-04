import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "#models/userSchema.js"
import passport from 'passport'


export function JWTStrategy() {
    const secret = process.env.SECRET
    const params = {
        secretOrKey: secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    passport.use(
        new Strategy(params, function (payload, done) {
            User.find({ _id: payload.id })
                .then(([user]) => {
                    if (!user) {
                        return done(new Error('User not found'))
                    }
                    return done(null, user)
                })
                .catch((err) => done(err))
        }),
    )
}