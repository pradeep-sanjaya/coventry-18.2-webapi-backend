export const bypassHelper = {
    shouldBypass
};

function shouldBypass(req) {
    let bypassEndpoints = [
        '/api/v1/categories',
        '/api/v1/products'
    ];

    if (bypassEndpoints.includes(req.baseUrl) && req.method == 'GET') {
        return true;
    }

    return false;
}