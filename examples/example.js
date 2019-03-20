// These examples are temporary
// https://www.bungie.net/en/Help/Article/45481

const Destiny2API = require('../index.js'); // you would use 'node-destiny2' instead
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('../config/config.json'));

const destiny = new Destiny2API({
    key: config.apikey
});

destiny.getManifest()
    .then(res => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch(err => {
        console.error(`Get Manifest Error: ${err}`);
    });

// Looking up sunshot item definition
destiny.getDestinyEntityDefinition('DestinyInventoryItemDefinition', '2907129557')
    .then(res => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch(err => {
        console.error(`getEntityDefinition Error: ${err}`);
    });

destiny.searchDestinyPlayer(-1, 'Roflz1lla')
    .then(res => {
        const data = res.Response;
        console.log(data);
        console.log('\n\n');
    })
    .catch(err => {
        console.error(`searchPlayer Error: ${err}`);
    });

// Look up bungie net profile
destiny.getProfile(1, '4611686018452936098', [100])
    .then(res => {
        console.log(res.Response);
    })
    .catch(err => {
        console.error(`getProfile Error: ${err}`);
    });

// Looking up my character: charId: 2305843009278477570
destiny.getCharacter(1, '4611686018452936098', '2305843009278477570', [200])
    .then(res => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getCharacter Error: ${err}`);
    });

// Decided to choose a random somewhat active clan
// https://www.bungie.net/en/ClanV2?groupId=206662
destiny.getClanWeeklyRewardState('206662')
    .then(res => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getClanWeeklyRewardState Error: ${err}`);
    });

// Get a specific items description from my inventory 
// via instanceId: 6917529034451059181
destiny.getItem(1, '4611686018452936098', '6917529034451059181', [300])
    .then(res => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getItem Error: ${err}`);
    });


// gets list of current vendors - endpoint active but probably requires oauth
// /operation_get_Destiny2-GetVendor.html#operation_get_Destiny2-GetVendor
/*
destiny.getVendors(1, '4611686018452936098', '2305843009278477570', [402])
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
         console.log(`getVendors Error: ${err}`);
    });
*/

// Gets one of my post game carnage reports
destiny.getPostGameCarnageReport('328104460')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getPostGameCarnageReport Error: ${err}`);
    });

destiny.getHistoricalStatsDefinition()
    .then(res => {
        console.log(res.ErrorCode); // Response is very long (should be 1)
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getHistoricalStatsDefinition Error: ${err}`);
    });

// searching for MIDA Multi-tool weapon
destiny.searchDestinyEntities('DestinyInventoryItemDefinition', 'MIDA Multi-Tool', [0])
    .then(res => {
        console.log(res.Response);
    })
    .catch(err => {
        console.log(`searchDestinyEntities Error: ${err}`);
    });

// gets information on a specific public milestone
destiny.getPublicMilestoneContent('4253138191')
    .then(res => {
        console.log(res.Response);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getPublicMilestoneContent Error: ${err}`);
    });

// lists current public milestones
destiny.getPublicMilestones()
    .then(res => {
        console.log(res.ErrorCode);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getPublicMilestones Error: ${err}`);
    });


// empty response for now (endpoint not ready)
destiny.getClanLeaderboards('206662')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(`getClanLeaderboards Error: ${err}`);
    });

destiny.getClanAggregateStats('206662')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });

// modes 7 is allpve and groups 2 is weapons only 
// will add enums to make this much easier to work with
destiny.getHistoricalStats(1, 
                          '4611686018452936098', 
                          '2305843009278477570', 
                          { modes: [7], groups: [2] })
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });

destiny.getHistoricalStatsForAccount(1, '4611686018452936098')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });

// get activity history for a character, return 5 rows, and filter for only PvE
destiny.getActivityHistory(1, 
                           '4611686018452936098', 
                           '2305843009278477570', 
                           { count: [5], mode: [7] })
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });

destiny.getUniqueWeaponHistory(1, '4611686018452936098', '2305843009278477570')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });


destiny.getDestinyAggregateActivityStats(1, '4611686018452936098', '2305843009278477570')
    .then(res => {
        console.log(res);
        console.log('\n\n');
    })
    .catch(err => {
        console.log(err);
    });
