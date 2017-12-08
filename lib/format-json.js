/**
 * TODO: test error handling?
 * Callback for promise request, trys to format response to json
 * @param {Object} res response object
 * @param {function} resolve
 * @param {function} reject
 */
const formatJson = (res, resolve, reject) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; } );
    res.on('end', () => {
        try {
            resolve(JSON.parse(rawData));
        } catch (err) {
            reject(err.message);
        }
    });
};

module.exports = formatJson;
