/**
 * Jest unit tests
 * TODO
 */

const Destiny2API = require('../index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json'));

// TODO
const destiny = new Destiny2API({
    key: config.apikey,
    oauthConfig: {}
});

test('getManifest() - returns the API\'s manifest', () => {
    //expect.assertions(1);
    return destiny.getManifest()
        .then((res) => {
            expect(res.Response).toHaveProperty('version');
            expect(res.Response).toHaveProperty('mobileAssetContentPath');
            expect(res.Response).toHaveProperty('mobileGearAssetDataBases');
            expect(res.Response).toHaveProperty('mobileWorldContentPaths');
            expect(res.Response).toHaveProperty('mobileClanBannerDatabasePath');
            expect(res.Response).toHaveProperty('mobileGearCDN');
        });
});