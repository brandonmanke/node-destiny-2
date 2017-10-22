// These examples are temporary
// https://www.bungie.net/en/Help/Article/45481
const Destiny2API = require('../index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json'));

const destiny = new Destiny2API({
    key: config.apikey,
    oauthConfig: {}
});

destiny.getManifest()
    .then((res) => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch((error) => {
        console.error(`Get Manifest Error: ${error}`);
    });

/**
 * Look up bungie net profile
 * This 404s now
 */
/*destiny.getProfile(-1, 4611686018452936098)
    .then((res) => {
        //const data = JSON.parse(res);
        console.log(res);
        console.log('\n\n');
    })
    .catch((error) => {
        console.log(`getProfile Error ${error}`);
    });*/

destiny.searchPlayer(-1, 'Roflz1lla')
    .then((res) => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch((error) => {
        console.error(`searchPlayer Error: ${error}`);
    });