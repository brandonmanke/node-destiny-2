/**
 * @author Brandon Manke
 * TODO rewrite http promise, to just be able to copy/paste it
 */
const https = require('https');

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
        return new Promise((resolve, reject) => {
            https.request(this.options, (res) => {
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
            }).on('error', (err) => {
                console.error(`getManifest Error: ${err.message}`);
                reject(err.message);
            }).end();
        });
    }

    /**
     *
     */
    getDestinyEntityDefinition(typeDefinition, hashIdentifier) {
        this.options.path = `${this.path}/Manifest/${typeDefinition}/${hashIdentifier}/`;
        this.options.method = 'GET';
        return new Promise((resolve, reject) => {
            https.request(this.options, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; } );
                res.on('end', () => {
                    try {
                        //console.log(`Raw Data:\n ${rawData}\n`);
                        //const parsedData = JSON.parse(rawData);
                        resolve(rawData);
                    } catch (err) {
                        //console.error(err.message);
                        reject(err.message);
                    }
                });
            }).on('error', (err) => {
                console.error(`getManifest Error: ${err.message}`);
                reject(err.message);
            }).end();
        });
    }

    /**
     * 
     */
    getProfile(membershipType, destinyMembershipId) {
        this.options.path = `/Destiny2/${membershipType}/Profile/${destinyMembershipId}/`;
        this.options.method = 'GET';
        return new Promise((resolve, reject) => {
            https.request(this.options, (res) => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; } );
                res.on('end', () => {
                    try {
                        //console.log(`Raw Data:\n ${rawData}\n`);
                        //const parsedData = JSON.parse(rawData);
                        resolve(rawData);
                    } catch (err) {
                        //console.error(err.message);
                        reject(err.message);
                    }
                });
            }).on('error', (err) => {
                reject(err.message);
            }).end();
        })
    }
}

module.exports = Destiny2API;