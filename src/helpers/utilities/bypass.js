export const bypassHelper = {
    shouldBypass
};

function shouldBypass(req) {
    let bypassEndpoints = [
        '/api/v1/categories',
        '/api/v1/products'
    ];

    return bypassEndpoints.includes(req.baseUrl) && req.method === 'GET';
}
