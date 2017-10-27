/**
 * Jest unit tests
 * TODO - right now test coverage is pretty low, will work on improving
 */

const Destiny2API = require('../index.js');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json'));

const destiny = new Destiny2API({
    key: config.apikey
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