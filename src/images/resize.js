import sharp from 'sharp';
import uuid from 'uuid/v4';
import *  as path from 'path';

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(buffer) {
        const filename = Resize.filename();
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .toFile(filepath);

        return filename;
    }

    static filename() {
        return `${uuid()}.png`;
    }

    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}

module.exports = Resize;
