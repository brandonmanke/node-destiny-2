/**
 * @param {Object} res response object
 */
const formatJson = res => {
    return new Promise((resolve, reject) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => { rawData += chunk; });
        res.on('end', () => {
            try {
                const json = JSON.parse(rawData)
                resolve(json);
            } catch (err) {
                reject(err.message);
            }
        });
    });
};

module.exports = formatJson;
