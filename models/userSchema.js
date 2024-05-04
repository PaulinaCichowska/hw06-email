import mongoose, { mongo } from "mongoose";
import bCrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    avatarURL: String,
})

userSchema.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};
userSchema.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};

export const User = mongoose.model("user", userSchema, "users")

