// These examples are temporary
// https://www.bungie.net/en/Help/Article/45481
const Destiny2API = require('../index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json'));

const destiny = new Destiny2API({
    key: config.apikey
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

// Looking up sunshot item definition
destiny.getDestinyEntityDefinition('DestinyInventoryItemDefinition', '2907129557')
    .then((res) => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch((error) => {
        console.error(`getEntityDefinition Error: ${error}`);
    });

destiny.searchDestinyPlayer(-1, 'Roflz1lla')
    .then((res) => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch((error) => {
        console.error(`searchPlayer Error: ${error}`);
    });

// Look up bungie net profile

destiny.getProfile(1, '4611686018452936098', [100])
    .then((res) => {
        console.log(res.Response);
    })
    .catch((error) => {
        console.error(`getProfile Error: ${error}`);
    });

// Looking up my character: charId: 2305843009278477570
destiny.getCharacter(1, '4611686018452936098', '2305843009278477570', [200])
    .then((res) => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch((error) => {
        console.log(`getCharacter Error: ${error}`);
    });

// Decided to choose a random somewhat active clan
// https://www.bungie.net/en/ClanV2?groupId=2114365
destiny.getClanWeeklyRewardState('2114365')
    .then((res) => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch((error) => {
        console.log(`getClanWeeklyRewardState Error: ${error}`);
    });


