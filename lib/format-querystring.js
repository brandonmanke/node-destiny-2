/**
 * Formats object of arrays to queryString
 * @param {Object} queryStrings object of queryStrings and their associated params (number[])
 */
const toQueryString = queryStrings => {
    let formatted = '?';
    for (let key in queryStrings) {
        formatted += key + '=';
        // consider adding checks to see if key is tied to an array
        // or just a single value. This would make more sense for parameter
        // passing instead of just forcing people to wrap stuff in arrays.
        const size = queryStrings[key].length;
        for (let i = 0; i < size - 1; i++) {
            formatted += queryStrings[key][i] + ',';
        }
        formatted += queryStrings[key][size - 1] + '&';
    }
    formatted = formatted.substring(0, formatted.length - 1); // cut off last '&'
    return formatted;
};

module.exports = toQueryString;
