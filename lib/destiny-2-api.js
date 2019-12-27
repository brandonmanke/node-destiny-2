/**
 * API Wrapper for Destiny 2, built with Node.js
 * @author Brandon Manke
 */
const promiseRequest = require('./async-https.js');
const toQueryString = require('./format-querystring.js');
const formatJson = require('./format-json.js');

class Destiny2API {
    constructor(config = {}) {
        this.host = 'www.bungie.net';
        this.api = `https://www.bungie.net/Platform/Destiny2`;
        this.path = '/Platform/Destiny2';
        this.key = config.key;
        this.userAgent = config.userAgent || promiseRequest.globalAgent;
        this.oauthConfig = {
            id: typeof config.oauthConfig === 'undefined' 
                ? null 
                : config.oauthConfig.id,
            secret: typeof config.oauthConfig === 'undefined' 
                ? null 
                : config.oauthConfig.secret,
            url: 'https://www.bungie.net/en/OAuth/Authorize/'
        };
        this.options = {
            host: this.host,
            path: '',
            method: '',
            headers: {
                'User-Agent': this.userAgent,
                'X-API-Key': this.key
            }
        };
    }

    /**
     * Gets current version of the Destiny API manifest.
     * Links to sqlite database file containing information on items/entities etc.
     * Useful for large/frequent requests for item information and other things.
     */
    getManifest() {
        this.options.path = '/Platform/Destiny2/Manifest/';
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

   /**
    * Gets a static definition of an entity. 
    * If lots of requests are needed use db in manifest.
    * @param {string} typeDefinition type/category of entity
    * @param {string} hashIdentifier unique hashId tied to entity
    */
    getDestinyEntityDefinition(typeDefinition, hashIdentifier) {
        this.options.path = `${this.path}/Manifest/${typeDefinition}/${hashIdentifier}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Returns list of memberships tied to account.
     * @param {number} membershipType enum of values for specifying platform
     * @param {string} displayName
     */
    searchDestinyPlayer(membershipType, displayName) {
        this.options.path = `${this.path}/SearchDestinyPlayer/${membershipType}/${displayName}/`;
        this.options.path = this.options.path.split(' ').join('%20');
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Get bungie net profile, based on membership id and filter by membership type.
     * @param {number} membershipType type of membership enum 
                       (-1: all, 0: none, 1: Xbox, 2: PS4, 3: Steam) See destiny-types.js for more
     * @param {string} destinyMembershipId account id (platform specific)
     * @param {number[]} destinyComponentType enum to pass as query string, i.e. [201, 300, ...]
     * See #schema_Destiny-DestinyComponentType for value definitions
     */
    getProfile(membershipType, destinyMembershipId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/`;
        const queryString = toQueryString({ components: destinyComponentType });
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Returns object containing character information.
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     * @param {number[]} destinyComponentType enum passed to queryString
     */
    getCharacter(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/` +
                            `${destinyMembershipId}/character/${characterId}/`;
        const queryString = toQueryString({ components: destinyComponentType });
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Looks up clan progress based on groupId.
     * @param {string} groupId 
     */
    getClanWeeklyRewardState(groupId) {
        this.options.path = `${this.path}/Clan/${groupId}/WeeklyRewardState/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Returns info about a specific item in a character's inventory.
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} itemInstanceId unique item id
     * @param {number[]} destinyComponentType enum passed to queryString
     */
    getItem(membershipType, destinyMembershipId, itemInstanceId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/` +
                            `${destinyMembershipId}/Item/${itemInstanceId}/`;
        const queryString = toQueryString({ components: destinyComponentType });
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Get available vendors info. (Requires OAuth) - TODO: test
     */
    getVendors(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/` +
                            `${destinyMembershipId}/Character/${characterId}/Vendors/`;
        const queryString = toQueryString({ components: destinyComponentType });
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Get specific vendor info based on vendorHash. (Requires OAuth) - TODO: test
     */
    getVendor(membershipType, destinyMembershipId, characterId, vendorHash) {
        this.options.path = `${this.path}/${membershipType}/Profile/` +
                            `${destinyMembershipId}/Character/${characterId}` +
                            `/Vendors/${vendorHash}`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /* 
     *   TODO post requests, need oauth
     *   POST: /Destiny2/Actions/Items/TransferItem/
     *   POST: /Destiny2/Actions/Items/EquipItem/
     *   POST: /Destiny2/Actions/Items/EquipItems/
     *   POST: /Destiny2/Actions/Items/SetLockState/
     *   POST: /Destiny2/Actions/Items/InsertSocketPlug/ Preview - Not Ready for Release
     *   POST: /Destiny2/Actions/Items/ActivateTalentNode/ Preview - Not Ready for Release 
     */

    /**
     * Gets post game stats for variety of modes.
     * @param {string} activityId unique id tied to match/game
     */
    getPostGameCarnageReport(activityId) {
        this.options.path = `${this.path}/Stats/PostGameCarnageReport/${activityId}/`;
        this.options.method = 'GET';
        const opsCopy = this.options;
        opsCopy.host = 'stats.bungie.net'
        return promiseRequest(opsCopy).then(res => formatJson(res));
    }

    /**
     * Gets historical stats definitions.
     */
    getHistoricalStatsDefinition() {
        this.options.path = `${this.path}/Stats/Definition/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * This endpoint is still in beta
     */
    getClanLeaderboards(groupId) {
        this.options.path = `${this.path}/Stats/Leaderboards/Clans/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * This endpoint is still in beta
     * @param groupId
     * @param {number[]} modes of which leaderboards to pull from
     * See: #schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType in docs
     */
    getClanAggregateStats(groupId, modes = []) {
        this.options.path = `${this.path}/Stats/AggregateClanStats/${groupId}/`;
        const queryString = toQueryString({ modes: modes });
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * This endpoint is still in beta
     * Endpoint error code returns exception currently.
     */
    /*getLeaderboards(membershipType, destinyMembershipId, queryStr = {}) {
        this.options.path = `${this.path}/${membershipType}/Account/` + 
                            `${destinyMembershipId}/Stats/Leaderboards/`;
        const qString = toQueryString(queryStr);
        this.options.path += qString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }*/

    /**
     * This endpoint is still in beta (Requires OAuth, unsure if working) - TODO: test
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     * @param {Object} queryStrings (valid queryString params: maxtop, modes, statid)
     */
    /*getLeaderboardsForCharacter(membershipType, destinyMembershipId, characterId, queryStr = {}) {
        this.options.path = `${this.path}/Stats/Leaderboards/` +
                            `${membershipType}/${destinyMembershipId}/${characterId}/`;
        const qString = toQueryString(queryStr); // multiple params can be passed
        this.options.path += qString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }*/

    /**
     * Gets a page list of items.
     * @param {string} type item type see #schema_Destiny-DestinyItemType on api
     * @param {string} searchTerm
     * @param {number[]} page that search goes to (starts at 0) 
     * (currently singleton array, but may change)
     */
    searchDestinyEntities(type, searchTerm, page) {
        this.options.path = `${this.path}/Armory/Search/${type}/${searchTerm}/`;
        const queryString = toQueryString({ page: page });
        this.options.path = this.options.path.split(' ').join('%20');
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets historical stats for specific character.
     * See #operation_get_Destiny2-GetHistoricalStats for more details
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     * @param {Object} queryStrings (dayend, daystart, groups, modes, period type)
     */
    getHistoricalStats(membershipType, destinyMembershipId, characterId, queryStr = {}) {
        this.options.path = `${this.path}/${membershipType}/Account/` +
                            `${destinyMembershipId}/Character/${characterId}/Stats/`;
        const qString = toQueryString(queryStr);
        this.options.path += qString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets historical stats for entire account (collection of all characters stats).
     * This is only for the specified platform (Xbox, PS4, PC) because Bungie treats each
     * as a seperate account.
     * See #operation_get_Destiny2-GetHistoricalStatsForAccount
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {number[]} filter groups in response (optional query string values)
     */
    getHistoricalStatsForAccount(membershipType, destinyMembershipId, groups = []) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Stats/`;
        const qString = toQueryString({ groups: groups });
        this.options.path += qString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets activity history stats for indicated character.
     * See #operation_get_Destiny2-GetActivityHistory
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     * @param {Object} queryStrings (count, mode, page)
     */
    getActivityHistory(membershipType, destinyMembershipId, characterId, queryStr = {}) {
        this.options.path = `${this.path}/${membershipType}/Account/` +
                            `${destinyMembershipId}/Character/` +
                            `${characterId}/Stats/Activities/`;
        const qString = toQueryString(queryStr);
        this.options.path += qString;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets stats about specific weapon history.
     * See #operation_get_Destiny2-GetUniqueWeaponHistory
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     */
    getUniqueWeaponHistory(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/` +
                            `${destinyMembershipId}/Character/` +
                            `${characterId}/Stats/UniqueWeapons/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets aggregated statistics of all activities character has participated in.
     * See #operation_get_Destiny2-GetDestinyAggregateActivityStats
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     */
    getDestinyAggregateActivityStats(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/` +
                            `${destinyMembershipId}/Character/` +
                            `${characterId}/Stats/AggregateActivityStats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @param {number} milestoneHash
     */
    getPublicMilestoneContent(milestoneHash) {
        this.options.path = `${this.path}/Milestones/${milestoneHash}/Content/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }

    /**
     * Gets public information about currently available Milestones.
     */
    getPublicMilestones() {
        this.options.path = `${this.path}/Milestones/`;
        this.options.method = 'GET';
        return promiseRequest(this.options).then(res => formatJson(res));
    }
}

module.exports = Destiny2API;
