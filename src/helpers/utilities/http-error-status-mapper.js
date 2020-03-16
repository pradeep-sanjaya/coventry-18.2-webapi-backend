exports.httpErrorStatusMapper = (statusCode) => {
    switch (statusCode) {
    case 400:
        return 'CS-4000';
    case 401:
        return 'CS-4001';
    case 403:
        return 'CS-4030';
    case 404:
        return 'CS-4040';
    case 405:
        return 'CS-4050';
    case 408:
        return 'CS-4080';
    case 409:
        return 'CS-4090';
    case 500:
        return 'CS-5000';
    case 502:
        return 'CS-5020';
    case 503:
        return 'CS-5030';
    default:
        return 'CS-0000';
    }
};
