/**
 * API Wrapper for Destiny 2, built with Node.js
 * @author Brandon Manke
 */
const https = require('https');
const promiseRequest = require('./lib/asyncHttps.js');

class Destiny2API {
    constructor(config) {
        this.host = 'www.bungie.net';
        this.api = `https://www.bungie.net/Platform/Destiny2`;
        this.path = '/Platform/Destiny2';
        this.key = config.key;
        this.userAgent = config.userAgent || https.globalAgent;
        this.oauthConfig = {
            id: config.oauthConfig.id,
            secret: config.oauthConfig.secret
        } || {};
        this.options = {
            host: this.host,
            path: '',
            method: '',
            headers: {
                'User-Agent': this.userAgent,
                'X-API-Key': this.key
            }
        }
    }

    /**
     * Async GetManifest
     * Links to sqlite database file, so I don't really know how to handle this
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
                    resolve(rawData);
                } catch (err) {
                    //console.error(err.message);
                    reject(err.message);
                }
            });
        });
    }

    /**
     * 
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
                    resolve(rawData);
                } catch (err) {
                    //console.error(err.message);
                    reject(err.message);
                }
            });
        });
    }

    searchPlayer(membershipType, displayName) {
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
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        })
    }

    /**
     * Get bungie net profile, based on membership id and filter by membership type
     */
    getProfile(membershipType, destinyMembershipId) {
        this.options.path = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getCharacter(membershipType, destinyMembershipId, characterId) {
        this.options.path = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/character/${characterId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getClanWeeklyRewardState(groupId) {
        this.options.path = `/Destiny2/Clan/${groupId}/WeeklyRewardState/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getItem(membershipType, destinyMembershipId, itemInstanceId) {
        this.options.path = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Item/${itemInstanceId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    /**
     * This endpoint is not active as of yet
     * Get available vendors info
     */
    getVendors(membershipType, destinyMembershipId, characterId) {
        this.options.path = 
            `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    /**
     * This endpoint is not active as of yet
     * Get specific vendor info based on vendorHash
     */
    getVendor(membershipType, destinyMembershipId, characterId, vendorHash) {
        this.options.path = 
            `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/Character/${characterId}/Vendors/${vendorHash}`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    // TODO post requests, seem to need oauth

    // ====

    getPostGameCarnageReport(activityId) {
        this.options.path = `/Destiny2/Stats/PostGameCarnageReport/${activityId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getHistoricalStatsDefinition() {
        this.options.path = `/Destiny2/Stats/Definition/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/Stats/Leaderboards/Clans/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/Stats/AggregateClanStats/${groupId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Stats/Leaderboards/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/Stats/Leaderboards/${membershipType}/${destinyMembershipId}/${characterId}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    searchDestinyEntities(type, searchTerm) {
        this.options.path = `/Destiny2/Armory/Search/${type}/${searchTerm}/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Stats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/UniqueWeapons/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
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
        this.options.path = `/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/AggregateActivityStats/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getPublicMilestoneContent(milestoneHash) {
        this.options.path = `/Destiny2/Milestones/${milestoneHash}/Content/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

    getPublicMilestones() {
        this.options.path = `/Destiny2/Milestones/`;
        this.options.method = 'GET';
        return promiseRequest(this.options, (res, resolve, reject) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; } );
            res.on('end', () => {
                try {
                    resolve(rawData);
                } catch (err) {
                    reject(err.message);
                }
            });
        });
    }

}

module.exports = Destiny2API;