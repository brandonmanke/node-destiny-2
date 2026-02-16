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

const destinyItemTypes = {
    None: 0,
    Currency: 1,
    Armor: 2,
    Weapon: 3,
    Message: 7,
    Engram: 8,
    Consumable: 9,
    ExchangeMaterial: 10,
    MissionReward: 11,
    QuestStep: 12,
    QuestStepComplete: 13,
    Emblem: 14,
    Quest: 15,
    Subclass: 16,
    ClanBanner: 17,
    Aura: 18,
    Mod: 19,
    Dummy: 20,
    Ship: 21,
    Vehicle: 22,
    Emote: 23,
    Ghost: 24,
    Package: 25,
    Bounty: 26,
    Wrapper: 27,
    SeasonalArtifact: 28,
    Finisher: 29,
    Pattern: 30
}

module.exports = {
    destinyMembershipType,
    destinyItemTypes
}