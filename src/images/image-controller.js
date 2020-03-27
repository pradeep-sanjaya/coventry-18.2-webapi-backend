import * as path from 'path';

import { errorResponse, successResponse } from '../helpers/response/response-dispatcher';
import HttpResponseType from '../models/http-response-type';

const appDir = path.dirname(require.main.filename);
const imagePath = path.join(appDir, '/public');

export default async function imageController(req, res) {
    console.log(imagePath);

    const fileUpload = new Resize(imagePath);

    if (!req.file) {
        errorResponse(res, {
            code: HttpResponseType.UNPROCESSABLE_ENTITY,
            message: 'Please provide an image'
        });
    }

    const filename = await fileUpload.save(req.file.buffer);

    successResponse(res, {
        status: HttpResponseType.SUCCESS,
        message: 'Image upload successful',
        data: { name: filename }
    });
}
