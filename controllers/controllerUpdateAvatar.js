import path from "path"
import { v4 as uuidV4 } from "uuid"
import { promises as fs } from 'fs';
import { transformAvatar } from "#helpers/helpers.js";
import { User } from "#models/userSchema.js";
import { subscribe } from "diagnostics_channel";

const storeImageDir = path.join(process.cwd(), "public/avatars");

export const updateAvatar =
    async (req, res, next) => {
        const userID = req.user._id

        if (!req.file) {
            return res.status(400).json({ message: "File isn't a photo" });
        }
        const { path: temporaryPath } = req.file;
        const extension = path.extname(temporaryPath);
        const fileName = `${uuidV4()}${extension}`;
        const filePath = path.join(storeImageDir, fileName);

        try {
            await fs.rename(temporaryPath, filePath);
        } catch (e) {
            await fs.unlink(temporaryPath)
            return next(e)
        }

        const isValidAndTransform = await transformAvatar(filePath);
        if (!isValidAndTransform) {
            await fs.unlink(filePath);
            return res
                .status(400)
                .json({ message: "File isn't a photo but is pretending" });
        }
        const update = { avatarURL: filePath }

        const upadteUserAvatar = await User.findOneAndUpdate(
            { _id: userID },
            { $set: update },
        )

        res.status(200).json({
            "avatarURL": filePath
        })
        return upadteUserAvatar

    }
