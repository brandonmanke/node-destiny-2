const Destiny2API = require('../index.js'); // you would use 'node-destiny2' instead
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json'));

const destiny = new Destiny2API({
    key: config.apikey,
    oauthConfg: {
        id: config.oauth_client_id,
        secret: config.oauth_secret_id
    }
});

// this would be a example of a sign in url, that should be able to be given by our wrapper
console.log(`${destiny.oauthConfig.url}?client_id=${config.oauth_client_id}&response_type=code`);

destiny.getManifest()
    .then(res => {
        const data = res;
        console.log(data);
        console.log('\n\n');
    })
    .catch(err => {
        console.error(`Get Manifest Error: ${err}`);
    });

// examples of endpoints with oauth required
// TODO checks for sign in before calling oauth endpoints
/*destiny.getLeaderboardsForCharacter(
    1, 
    '4611686018452936098', 
    '2305843009278477570',
    {
        maxtop: [10],
        modes: [7], // story
    })
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(`getLeaderboardsForCharacter Error: ${error}`);
    });*/