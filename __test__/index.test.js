/**
 * Jest unit tests
 * TODO - test rejections for formatJson
 *      - test toQueryString function also
 */

const Destiny2API = require('../index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json'));

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

test('toQueryString tests', () => {
    // this is making sure it appends components query string
    // correctly onto url, may refactor this
    return destiny.getProfile(1, '4611686018452936098', [100, 101])
        .then((res) => {
            expect(destiny.options.path)
                .toEqual('/Platform/Destiny2/1/Profile/4611686018452936098/?components=100,101');
        });
});

test('getManifest returns the API\'s manifest', () => {
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

test('getDestinyEntityDefinition returns static definition of entity', () => {
    return destiny.getDestinyEntityDefinition('DestinyInventoryItemDefinition', '2907129557')
        .then((res) => {
            expect(res.Response).toHaveProperty('hash');
            expect(res.Response.hash).toEqual(2907129557);
        });
});

test('searchDestinyPlayer returns list of memberships tied to account', () => {
    return destiny.searchDestinyPlayer(-1, 'Roflz1lla')
        .then((res) => {
            expect(res.Response).toMatchObject([
                {
                    iconPath: '/img/theme/destiny/icons/icon_xbl.png',
                    membershipType: 1,
                    membershipId: '4611686018452936098',
                    displayName: 'Roflz1lla'
                }
            ])
        });
});

// may have to move this into one test itself due to all possible enum values
test('getProfile returns user profile object', () => {
    return destiny.getProfile(1, '4611686018452936098', [100])
        .then((res) => {
            expect(res.Response).toHaveProperty('profile');
            expect(res.Response).toHaveProperty('itemComponents');
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
        .then((res) => {
            expect(res.Response).toHaveProperty('character');
            expect(res.Response.character).toHaveProperty('data');
            expect(res.Response.character.data).toHaveProperty('characterId');
            expect(res.Response.character.data.characterId).toEqual('2305843009278477570');
        });
});

test('getClanWeeklyRewardState returns the current clan progress', () => {
    return destiny.getClanWeeklyRewardState('2114365')
        .then((res) => {
            expect(res.Response).toHaveProperty('milestoneHash');
            expect(res.Response.milestoneHash).toEqual(4253138191); // this may change not sure
            expect(res.Response).toHaveProperty('rewards');
            expect(res.Response).toHaveProperty('startDate');
            expect(res.Response).toHaveProperty('endDate');
        });
});

test('getItem return a object with a specific item\'s info from my inventory', () => {
    return destiny.getItem(1, '4611686018452936098', '6917529034457803619', [300])
        .then((res) => {
            expect(res.Response).toHaveProperty('characterId');
            expect(res.Response.characterId).toEqual('2305843009278477570');
            expect(res.Response).toHaveProperty('instance');
            expect(res.Response.instance.data.damageTypeHash).toEqual(3373582085); // not sure if needed
        });
});

// getVendors (BETA) endpoint not active yet

// getVendor (BETA) endpoint not active yet

test('getPostGameCarnageReport for activityId 328104460', () => {
    return destiny.getPostGameCarnageReport('328104460')
        .then((res) => {
            expect(res.Response).toHaveProperty('period');
            expect(res.Response).toHaveProperty('activityDetails');
            expect(res.Response).toHaveProperty('entries');
            expect(res.Response).toHaveProperty('teams');
            // not sure if these tests are required but I guess it doesn't hurt
            expect(res.Response.activityDetails.referenceId).toEqual(1720510574);
            expect(res.Response.activityDetails.directorActivityHash).toEqual(3243161126);
            expect(res.Response.activityDetails.instanceId).toEqual('328104460');
        });
});

test('searchDestinyEntities returns page list for MIDA Multi-tool search', () => {
    return destiny.searchDestinyEntities('DestinyInventoryItemDefinition', 'MIDA Multi-Tool', 0)
        .then((res) => {
            expect(res.ErrorCode).toEqual(1);
            expect(res.Response).toHaveProperty('suggestedWords');
            expect(res.Response).toHaveProperty('results');
        });
});

test('getHistoricalStatsDefinition returns historical stats definitions', () => {
    return destiny.getHistoricalStatsDefinition()
        .then((res) => {
            expect(res.ErrorCode).toEqual(1); // success
        });
});

// getClanAggregateStats (BETA)

// hash is a clan's weekly rewards progress
test('getPublicMilestoneContent for the hash 4253138191', () => {
    return destiny.getPublicMilestoneContent('4253138191')
        .then((res) => {
            expect(res.Response).toHaveProperty('about');
            expect(res.Response).toHaveProperty('status');
            expect(res.Response).toHaveProperty('tips');
        });
})

// since these always change we just check error code for success
test('getPublicMilestones returns list of current milestones', () => {
    return destiny.getPublicMilestones()
        .then((res) => {
            expect(res.ErrorCode).toEqual(1);
        });
});