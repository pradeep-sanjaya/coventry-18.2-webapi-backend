function encodeUrl(url) {
    return Buffer.from(url).toString('base64');
}

function decodeUrl(urlEncoded) {
    return Buffer.from(urlEncoded, 'base64').toString('utf8');
}

module.exports = { encodeUrl, decodeUrl };
