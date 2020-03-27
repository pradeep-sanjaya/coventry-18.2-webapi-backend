const path = require('path');
var appDir = path.dirname(require.main.filename);
const imagePath = path.join(appDir, '/public');

export default async function imageController(req, res) {
    console.log(imagePath);

    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({ error: 'Please provide an image' });
    }
    const filename = await fileUpload.save(req.file.buffer);
    return res.status(200).json({ name: filename });

    res
        .status(200)
        .send('image uploaded');
}
