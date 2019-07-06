const https = require('https');

/**
 * This function  wraps promise in function with callback,
 * this makes it easier to reuse similar code over and over.
 * @param {Object} options Https request options
 * @return {promise} A promise based on the the success of the http request.
 */
const promiseRequest = options => {
    return new Promise((resolve, reject) => {
        https.request(options, res => {
            resolve(res);
        }).on('error', err => {
            reject(err.message);
        }).end();
    });
};

module.exports = promiseRequest;

module.exports.globalAgent = https.globalAgent;
