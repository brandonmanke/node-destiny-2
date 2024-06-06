/**
 * Jest unit tests
 * TODO - test rejections for formatJson
 */
const Destiny2API = require('../index.js');
const fs = require('fs')
let config = {}
if (process.env.BUNGIE_NET_API_KEY) {
    config.apikey = process.env.BUNGIE_NET_API_KEY
} else {
    config = JSON.parse(fs.readFileSync('./config/config.json'));
}

jest.setTimeout(12000);

const destiny = new Destiny2API({
    key: config.apikey
});

test('Destiny2API empty config tests', () => {
    const emptyDestiny = new Destiny2API();
    expect(emptyDestiny.key).toEqual(undefined);
});

test('Destiny2API config tests', () => {
    const testiny = new Destiny2API({
        key: config.apikey
    });
    // not sure if this is redundant, may add other tests
    expect(testiny.key).toEqual(config.apikey);
});

test('toQueryString test', () => {
    const toQueryString = require('../lib/format-querystring.js');
    const queryString = toQueryString({ components: [100, 101], page: [2], modes: [12,43] });
    expect(queryString).toEqual('?components=100,101&page=2&modes=12,43');
});

test('async https rejection test', () => {
    const { promiseRequest, promisePost } = require('../lib/async-https.js');
    return promiseRequest({}).catch(err => {
        expect(err).not.toBeNull();
    });
});

/*test('format json rejection test', () => {
    //const http = require('http');
    const formatJson = require('../lib/format-json.js');
    const badJson = `{ foo: bar, { foo: }`;
    const options = {};
    http.get(options, res => {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.write(badJson, () => {
            formatJson(res).catch(err => {
                console.log('err', err)
                expect(err).toEqual('foo')
            });
        });
    });

    formatJson(badJson)
})*/

test('getBungieNetUserById returns bungienet account information', () => {
    return destiny.getBungieNetUserById(18372687)
        .then(res => {
            expect(res.Response).toHaveProperty('membershipId');
            expect(res.Response).toHaveProperty('uniqueName');
            expect(res.Response).toHaveProperty('isDeleted');
        });
});

test('SearchDestinyPlayerByBungieName returns Destiny memberships given a bungie name', () => {
    return destiny.searchDestinyPlayerByBungieName("Special Weapon Enjoyer", 1566)
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
        });
})

test('getMembershipDataById returns all linked accounts and their membershipId\'s', () => {
    return destiny.getMembershipDataById(-1, "4611686018475222724")
        .then(res => {
            expect(res.Response).toHaveProperty('destinyMemberships');
            expect(res.Response).toHaveProperty('primaryMembershipId');
            expect(res.Response).toHaveProperty('bungieNetUser');
        });
})

test('getManifest returns the API\'s manifest', () => {
    //expect.assertions(1);
    return destiny.getManifest()
        .then(res => {
            expect(res.Response).toHaveProperty('version');
            expect(res.Response).toHaveProperty('mobileAssetContentPath');
            expect(res.Response).toHaveProperty('mobileGearAssetDataBases');
            expect(res.Response).toHaveProperty('mobileWorldContentPaths');
            expect(res.Response).toHaveProperty('mobileClanBannerDatabasePath');
            expect(res.Response).toHaveProperty('mobileGearCDN');
        });
});

test('getDestinyEntityDefinition returns static definition of entity', () => {
    return destiny.getDestinyEntityDefinition('DestinyInventoryItemDefinition', '2907129557')
        .then(res => {
            expect(res.Response).toHaveProperty('hash');
            expect(res.Response.hash).toEqual(2907129557);
        });
});

test('searchDestinyPlayer returns list of memberships tied to account', () => {
    return destiny.searchDestinyPlayer(-1, 'Roflz1lla')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
        });
});

// may have to move this into one test itself due to all possible enum values
test('getProfile returns user profile object', () => {
    return destiny.getProfile(1, '4611686018452936098', [100])
        .then(res => {
            expect(res.Response).toHaveProperty('profile');
            expect(res.Response.profile).toHaveProperty('data');
            expect(res.Response.profile).toHaveProperty('privacy');
            expect(res.Response.profile.data).toHaveProperty('userInfo');
            expect(res.Response.profile.data).toHaveProperty('dateLastPlayed');
            expect(res.Response.profile.data).toHaveProperty('versionsOwned');
            expect(res.Response.profile.data).toHaveProperty('characterIds');
        });
});

test('getCharacter returns character object', () => {
    return destiny.getCharacter(1, '4611686018452936098', '2305843009278477570', [200])
        .then(res => {
            expect(res.Response).toHaveProperty('character');
            expect(res.Response.character).toHaveProperty('data');
            expect(res.Response.character.data).toHaveProperty('characterId');
            expect(res.Response.character.data.characterId).toEqual('2305843009278477570');
        });
});

test('getClanWeeklyRewardState returns the current clan progress', () => {
    return destiny.getClanWeeklyRewardState('206662')
        .then(res => {
            expect(res.Response).toHaveProperty('milestoneHash');
            expect(res.Response.milestoneHash).toEqual(4253138191); // this may change not sure
            expect(res.Response).toHaveProperty('rewards');
            expect(res.Response).toHaveProperty('startDate');
            expect(res.Response).toHaveProperty('endDate');
        });
});

test('getItem return a object with a specific item\'s info from my inventory', () => {
    return destiny.getItem(1, '4611686018452936098', '6917529055771173872', [300])
        .then(res => {
            expect(res.Response).toHaveProperty('characterId');
            expect(res.Response.characterId).toEqual('2305843009278477570');
            expect(res.Response).toHaveProperty('instance');
        });
});

// getVendors (BETA) endpoint not active yet

// getVendor (BETA) endpoint not active yet

test('getPostGameCarnageReport for activityId 328104460', () => {
    return destiny.getPostGameCarnageReport('328104460')
        .then(res => {
            expect(res.Response).toHaveProperty('period');
            expect(res.Response).toHaveProperty('activityDetails');
            expect(res.Response).toHaveProperty('entries');
            expect(res.Response).toHaveProperty('teams');
            // not sure if these tests are required but I guess it doesn't hurt
            expect(res.Response.activityDetails.referenceId).toEqual(1583254851);
            expect(res.Response.activityDetails.directorActivityHash).toEqual(3243161126);
            expect(res.Response.activityDetails.instanceId).toEqual('328104460');
        });
});

test('searchDestinyEntities returns page list for MIDA Multi-tool search', () => {
    return destiny.searchDestinyEntities('DestinyInventoryItemDefinition', 'MIDA Multi-Tool', [0])
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('suggestedWords');
            expect(res.Response).toHaveProperty('results');
        });
});

test('getHistoricalStats returns object containing historical stats for account for allPvE', () => {
    return destiny.getHistoricalStats(1,
                                      '4611686018452936098',
                                      '2305843009278477570',
                                      { modes: [7] })
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('allPvE');
            expect(res.Response.allPvE).toHaveProperty('allTime');
        });
});

test('getHistoricalStatsForAccount returns aggregated stats for account', () => {
    return destiny.getHistoricalStatsForAccount(1, '4611686018452936098')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('mergedDeletedCharacters');
            expect(res.Response).toHaveProperty('mergedAllCharacters');
            expect(res.Response).toHaveProperty('characters');
        });
});

test('getActivityHistory returns object containing 5 most recent PvE activities for char', () => {
    return destiny.getActivityHistory(1,
                           '4611686018452936098',
                           '2305843009278477570',
                           { count: [5], mode: [7] })
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('activities');
            expect(res.Response.activities.length).toEqual(5);
        });
});

test('getUniqueWeaponHistory returns object w/ weapon stats for specific character' , () => {
    return destiny.getUniqueWeaponHistory(1, '4611686018452936098', '2305843009278477570')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('weapons');
        });
});

test('getDestinyAggregateActivityStats returns all stats for all activities done by char', () => {
    return destiny.getDestinyAggregateActivityStats(1, '4611686018452936098', '2305843009278477570')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('activities');
        })
});

test('getHistoricalStatsDefinition returns historical stats definitions', () => {
    return destiny.getHistoricalStatsDefinition()
        .then(res => {
            expect(res.ErrorCode).toEqual(1); // success
        });
});

test('getClanLeaderboards test', () => {
    destiny.getClanLeaderboards('206662')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            // since response is {} for now I won't test anything else
        });
});

test('getClanAggregateStats returns aggregated clan stats', () => {
    return destiny.getClanAggregateStats('206662')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response.length).toEqual(44);
        });
});

// hash is a clan's weekly rewards progress
test('getPublicMilestoneContent for the hash 4253138191', () => {
    return destiny.getPublicMilestoneContent('4253138191')
        .then(res => {
            expect(res.Response).toHaveProperty('about');
            expect(res.Response).toHaveProperty('status');
            expect(res.Response).toHaveProperty('tips');
        });
})

// since these always change we just check error code for success
test('getPublicMilestones returns list of current milestones', () => {
    return destiny.getPublicMilestones()
        .then(res => expect(res.ErrorCode).toEqual(1));
});

test('getMembershipFromHardLinkedCredential returns a membership from steam id ', () => {
    return destiny.getMembershipFromHardLinkedCredential('76561198253960732')
        .then(res => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('membershipType');
            expect(res.Response).toHaveProperty('membershipType');
            expect(res.Response.membershipType).toEqual(3); // always 3(Steam) for now
            expect(res.Response).toHaveProperty('membershipId');
            expect(res.Response).toHaveProperty('CrossSaveOverriddenType');
        });
})
