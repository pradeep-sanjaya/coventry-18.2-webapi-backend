import express from 'express';

let router = express.Router();

import imageController from '../images/image-controller';

/* upload images */
router.post('/upload', (req, res) => {
    imageController(req, res);
});

module.exports = router;
