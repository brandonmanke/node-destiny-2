/**
 * API Wrapper for Destiny 2, built with Node.js
 * @author Brandon Manke
 */
const promiseRequest = require('./lib/asyncHttps.js');

class Destiny2API {
    constructor(config = {}) {
        this.host = 'www.bungie.net';
        this.api = `https://www.bungie.net/Platform/Destiny2`;
        this.path = '/Platform/Destiny2';
        this.key = config.key;
        this.userAgent = config.userAgent || promiseRequest.globalAgent;
        this.oauthConfig = {
            // hopefully this isn't the only way to do this...
            id: typeof config.oauthConfig === 'undefined' ? null : config.oauthConfig.id,
            secret: typeof config.oauthConfig === 'undefined' ? null : config.oauthConfig.secret
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
        //toQueryString.bind(this)(this);
        //formatJson.bind(this)();
    }

    /**
     * Gets current version of the Destiny API manifest
     * Links to sqlite database file containing information on items/entities etc.
     * Useful for large/frequent requests for item information and other things.
     */
    getManifest() {
        this.options.path = '/Platform/Destiny2/Manifest/';
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
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
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Returns list of memberships tied to account
     * @param {number} membershipType enum of values for specifying platform
     * @param {string} displayName
     */
    searchDestinyPlayer(membershipType, displayName) {
        this.options.path = `${this.path}/SearchDestinyPlayer/${membershipType}/${displayName}/`;
        this.options.path = this.options.path.split(' ').join('%20');
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Get bungie net profile, based on membership id and filter by membership type
     * @param {number} membershipType type of membership enum (-1: all, 0: none, 1: Xbox, 2: PS4, 3:Blizzard)
     * @param {string} destinyMembershipId account id (platform specific)
     * @param {number[]} destinyComponentType enum to pass as query string, can contain multiple params
     * See https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType 
     * for value definitions
     */
    getProfile(membershipType, destinyMembershipId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/`;
        const queryString = toQueryString(destinyComponentType);
        this.options.path += queryString; // add query string to end
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Returns object containing character information
     * @param {number} membershipType
     * @param {string} destinyMembershipId
     * @param {string} characterId
     */
    getCharacter(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/character/${characterId}/`;
        const queryString = toQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Looks up clan progress based on groupId
     * @param {string} groupId 
     */
    getClanWeeklyRewardState(groupId) {
        this.options.path = `${this.path}/Clan/${groupId}/WeeklyRewardState/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Returns info about a specific item in a character's inventory
     */
    getItem(membershipType, destinyMembershipId, itemInstanceId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/`;
        const queryString = toQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is not active as of yet (BETA)
     * Get available vendors info
     */
    getVendors(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = 
            `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/`;
        const queryString = toQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is not active as of yet (BETA)
     * Get specific vendor info based on vendorHash
     */
    getVendor(membershipType, destinyMembershipId, characterId, vendorHash) {
        this.options.path = 
            `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /*  TODO post requests, some seem to need oauth, 
     *  also TODO maybe change how promise requests works because a lot of copy pasting
     *   
     *   POST: /Destiny2/Actions/Items/TransferItem/
     *   POST: /Destiny2/Actions/Items/EquipItem/
     *   POST: /Destiny2/Actions/Items/EquipItems/
     *   POST: /Destiny2/Actions/Items/SetLockState/
     *   POST: /Destiny2/Actions/Items/InsertSocketPlug/ Preview - Not Ready for Release
     *   POST: /Destiny2/Actions/Items/ActivateTalentNode/ Preview - Not Ready for Release 
     */

    getPostGameCarnageReport(activityId) {
        this.options.path = `${this.path}/Stats/PostGameCarnageReport/${activityId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    // returns undefined as of right now
    getHistoricalStatsDefinition() {
        this.options.path = `${this.path}/Stats/Definition/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getClanLeaderboards(groupId) {
        this.options.path = `${this.path}/Stats/Leaderboards/Clans/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getClanAggregateStats(groupId) {
        this.options.path = `${this.path}/Stats/AggregateClanStats/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getLeaderboards(membershipType, destinyMembershipId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getLeaderboardsForCharacter(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Gets a page list of items
     * @param {string} type item type see #schema_Destiny-DestinyItemType on api
     * @param {string} searchTerm
     * @param {number[]} page that search goes to (starts at 0) (currently singleton array, but may change)
     */
    searchDestinyEntities(type, searchTerm, page) {
        this.options.path = `${this.path}/Armory/Search/${type}/${searchTerm}/`;
        this.options.path += `?page=${page}`;
        this.options.path = this.options.path.split(' ').join('%20');
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getHistoricalStats(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getHistoricalStatsForAccount(membershipType, destinyMembershipId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getActivityHistory(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getUniqueWeaponHistory(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * This endpoint is still in beta
     */
    getDestinyAggregateActivityStats(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @param {number} milestoneHash
     */
    getPublicMilestoneContent(milestoneHash) {
        this.options.path = `${this.path}/Milestones/${milestoneHash}/Content/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }

    /**
     * Gets public information about currently available Milestones.
     */
    getPublicMilestones() {
        this.options.path = `${this.path}/Milestones/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => formatJson(res, resolve, reject));
    }
}

/**
 * Callback for promise request, trys to format response to json
 * @param {object} res response object
 * @param {function} resolve
 * @param {function} reject
 */
const formatJson = (res, resolve, reject) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; } );
    res.on('end', () => {
        try {
            resolve(JSON.parse(rawData));
        } catch (err) {
            reject(err.message);
        }
    });
}

/**
 * Formats component values into query string format
 * @param {number[]} destinyComponentType array of elements containing component enum values
 */
const toQueryString = (destinyComponentType) => {
    let queryString = '?components=';
    for (let i = 0; i < destinyComponentType.length - 1; i++) {
        queryString += destinyComponentType[i] + ',';
    }
    queryString += destinyComponentType[destinyComponentType.length - 1];
    return queryString;
}

module.exports = Destiny2API;
