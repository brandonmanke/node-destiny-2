// manual test for now
// will write unit tests once stable version exists
// https://www.bungie.net/en/Help/Article/45481
const Destiny2API = require('./index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/apikey.json'));
const https = require('https');

const destiny = new Destiny2API({
    key: config.apikey,
    oauthConfig: {}
});

destiny.getManifest()
    .then((res) => {
        const data = JSON.parse(res);
    })
    .catch((error) => {
        console.error(`Get Manifest Error: ${error}`);
    });