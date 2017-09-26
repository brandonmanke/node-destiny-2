/**
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
     * Right now it links to sqlite database file, so I don't really know how to handle this as of right now 
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

    /**
     * 
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
                    //console.error(err.message);
                    reject(err.message);
                }
            });
        });
    }
}

module.exports = Destiny2API;