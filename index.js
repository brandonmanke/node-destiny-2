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
}

module.exports = Destiny2API;