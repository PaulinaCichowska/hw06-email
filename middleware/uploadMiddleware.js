import multer from "multer";
import path from "path";
import { v4 as uuidV4 } from "uuid"
const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidV4()}${file.originalname}`);
    },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const uploadMiddleware = multer({
    storage,
    fileFilter: async (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetype = file.mimetype;
        if (
            !extensionWhiteList.includes(extension) ||
            !mimetypeWhiteList.includes(mimetype)
        ) {
            return cb(null, false);
        }
        return cb(null, true);
    },
});
