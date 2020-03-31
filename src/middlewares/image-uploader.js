import multer from 'multer';

const uploadImg = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
});

module.exports = uploadImg;
