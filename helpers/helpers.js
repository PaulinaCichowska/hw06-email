import { promises as fs } from 'fs';
import Jimp from 'jimp';

const isAccessible = (path) =>
    fs.access(path)
        .then(() => true)
        .catch(() => false);

export const setupFolder = async (path) => {
    const folderExist = await isAccessible(path);
    if (!folderExist) {
        try {
            await fs.mkdir(path);
        } catch (e) {
            console.log("no permissions!");
            process.exit(1);
        }
    }
};
const MAX_AVATAR_WIDTH = 250;
const MAX_AVATAR_HEIGHT = 250;

export const transformAvatar = async (path) =>
    new Promise((resolve) => {
        Jimp.read(path, async (err, image) => {
            if (err) resolve(false);

            try {
                const w = image.getWidth();
                const h = image.getHeight();

                const cropWidth = w > MAX_AVATAR_WIDTH ? MAX_AVATAR_WIDTH : w;
                const cropHeight = h > MAX_AVATAR_HEIGHT ? MAX_AVATAR_HEIGHT : h;

                const centerX = Math.round(w / 2 - cropWidth / 2);
                const centerY = Math.round(h / 2 - cropHeight / 2);

                await image
                    .rotate(360)
                    .crop(
                        centerX < 0 ? 0 : centerX,
                        centerY < 0 ? 0 : centerY,
                        cropWidth,
                        cropHeight
                    )
                    .write(path);
                resolve(true);
            } catch (e) {
                console.log(e);
                resolve(false);
            }
        });
    });

