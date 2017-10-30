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
    }

    /**
     * Gets current version of the Destiny API manifest
     * Links to sqlite database file containing information on items/entities etc.
     * Useful for large/frequent requests for item information and other things.
     */
    getManifest() {
        this.options.path = '/Platform/Destiny2/Manifest/';
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

   /**
    * Gets a static definition of an entity. 
    * If lots of requests are needed use db in manifest.
    * @param {String} typeDefinition type/category of entity
    * @param {String} hashIdentifier unique hashId tied to entity
    */
    getDestinyEntityDefinition(typeDefinition, hashIdentifier) {
        this.options.path = `${this.path}/Manifest/${typeDefinition}/${hashIdentifier}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Returns list of memberships tied to account
     * @param {Number} membershipType enum of values for specifying platform
     * @param {String} displayName
     */
    searchDestinyPlayer(membershipType, displayName) {
        this.options.path = `${this.path}/SearchDestinyPlayer/${membershipType}/${displayName}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        })
    }

    /**
     * Get bungie net profile, based on membership id and filter by membership type
     * @param {Number} membershipType type of membership enum (-1: all, 0: none, 1: Xbox, 2: PS4, 3:Blizzard)
     * @param {String} destinyMembershipId account id (platform specific)
     * @param {Number[]} destinyComponentType enum to pass as query string, can contain multiple params
     * See https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType 
     * for value definitions
     */
    getProfile(membershipType, destinyMembershipId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/`;
        const queryString = this.componentToQueryString(destinyComponentType);
        this.options.path += queryString; // add query string to end
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(err);
                }
            });
        });
    }

    /**
     * Returns object containing character information
     * @param {Number} membershipType
     * @param {String} destinyMembershipId
     * @param {String} characterId
     */
    getCharacter(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/character/${characterId}/`;
        const queryString = this.componentToQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Looks up clan progress based on groupId
     * @param {String} groupId 
     */
    getClanWeeklyRewardState(groupId) {
        this.options.path = `${this.path}/Clan/${groupId}/WeeklyRewardState/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Returns info about a specific item in a character's inventory
     */
    getItem(membershipType, destinyMembershipId, itemInstanceId, destinyComponentType) {
        this.options.path = `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/`;
        const queryString = this.componentToQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is not active as of yet (BETA)
     * Get available vendors info
     */
    getVendors(membershipType, destinyMembershipId, characterId, destinyComponentType) {
        this.options.path = 
            `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/`;
        const queryString = this.componentToQueryString(destinyComponentType);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is not active as of yet (BETA)
     * Get specific vendor info based on vendorHash
     */
    getVendor(membershipType, destinyMembershipId, characterId, vendorHash) {
        this.options.path = 
            `${this.path}/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
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
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    getHistoricalStatsDefinition() {
        this.options.path = `${this.path}/Stats/Definition/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    // returns undefined as of right now
                    resolve(JSON.parse(rawData));
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    /**
     * This endpoint is still in beta
     */
    getClanLeaderboards(groupId) {
        this.options.path = `${this.path}/Stats/Leaderboards/Clans/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getClanAggregateStats(groupId) {
        this.options.path = `${this.path}/Stats/AggregateClanStats/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getLeaderboards(membershipType, destinyMembershipId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getLeaderboardsForCharacter(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Gets a page list of items
     * @param {String} type item type
     * @param {String} searchTerm
     * @param {Number[]} page that search goes to (starts at 0) (currently singleton array, but may change)
     */
    searchDestinyEntities(type, searchTerm, page) {
        this.options.path = `${this.path}/Armory/Search/${type}/${searchTerm}/`;
        const queryString = this.componentToQueryString(page);
        this.options.path += queryString;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getHistoricalStats(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getHistoricalStatsForAccount(membershipType, destinyMembershipId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getActivityHistory(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getUniqueWeaponHistory(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * This endpoint is still in beta
     */
    getDestinyAggregateActivityStats(membershipType, destinyMembershipId, characterId) {
        this.options.path = `${this.path}/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Gets custom localized content for the milestone of the given hash, if it exists.
     * @param {Number} milestoneHash
     */
    getPublicMilestoneContent(milestoneHash) {
        this.options.path = `${this.path}/Milestones/${milestoneHash}/Content/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Gets public information about currently available Milestones.
     */
    getPublicMilestones() {
        this.options.path = `${this.path}/Milestones/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
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
        });
    }

    /**
     * Formats component values into query string format
     * @param {Number[]} destinyComponentType array of elements containing component enum values
     */
    componentToQueryString(destinyComponentType) {
        let queryString = '?components=';
        for (let i = 0; i < destinyComponentType.length - 1; i++) {
            queryString += destinyComponentType[i] + ',';
        }
        queryString += destinyComponentType[destinyComponentType.length - 1];
        return queryString;
    }
}

module.exports = Destiny2API;
