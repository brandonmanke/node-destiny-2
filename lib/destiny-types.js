/**
 * This will contain some of the basic enums offered by the Destiny 2 API
 * See https://bungie-net.github.io/multi/schema_BungieMembershipType.html#schema_BungieMembershipType
 * for example.
 */
const destinyMembershipType = {
    None: 0,
    Xbox: 1,
    PSN: 2,
    Steam: 3,
    Blizzard: 4,
    Stadia: 5,
    TigerDemon: 10,
    BungieNext: 254,
    All: -1
};

module.exports = { destinyMembershipType }
