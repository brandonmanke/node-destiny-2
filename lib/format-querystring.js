/**
 * Formats object of arrays to queryString
 * @param {Object} queryStrings object of queryStrings and their associated params (number[])
 */
const toQueryString = (queryStrings) => {
    let formatted = '?';
    for (let key in queryStrings) {
        formatted += key + '='
        const size = queryStrings[key].length;
        for (let i = 0; i < size - 1; i++) {
            formatted += queryStrings[key][i] + ','
        }
        formatted += queryStrings[key][size - 1] + '&';
    }
    formatted = formatted.substring(0, formatted.length - 1); // cut off last '&'
    return formatted;
}

module.exports = toQueryString;