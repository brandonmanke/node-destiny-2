const https = require('https');

/** 
 * promiseRequest function, basically wraps promise in function with callback,
 * this makes it easier to reuse similar code over and over.
 * @param options {Object} Https request options
 * @param callback {function} Callback function which takes the http response,
 *                 along with the resolve and reject params to handle the promise.
 * @return {promise} A promise based on the the success of the http request.
 */
const promiseRequest = (options, callback) => {
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            callback(res, resolve, reject);
        }).on('error', (err) => {
            reject(err.message);
        }).end();
    });
};

module.exports = promiseRequest;

module.exports.globalAgent = https.globalAgent;
