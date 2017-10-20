const https = require('https');

/** 
 * promiseRequest function, basically wraps promise in function with callback,
 * this makes it easier to reuse similar code over and over.
 * @param options {object} Https request options
 * @param callback {function} Callback function which takes the http response,
 *                 along with the resolve and reject params to handle the promise.
 * @return {promise} A promise based on the the success of the http request.
 */
module.exports = (options, callback) => {
    return new Promise((resolve, reject) => {
        https.request(options, (res) => {
            callback(res, resolve, reject);
        }).on('error', (err) => {
            console.log(`Error: ${err}`);
            reject(err.message);
        }).end();
    });
}

module.exports.globalAgent = https.globalAgent;
