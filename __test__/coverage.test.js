const EventEmitter = require('events');
const https = require('https');
const { promisePost } = require('../lib/async-https.js');

const getMockedDestiny2API = () => {
    jest.resetModules();
    jest.doMock('../lib/async-https.js', () => ({
        promiseRequest: jest.fn(),
        promisePost: jest.fn(),
        globalAgent: 'test-agent'
    }));
    jest.doMock('../lib/format-json.js', () => jest.fn());

    const Destiny2API = require('../lib/destiny-2-api.js');
    const { promiseRequest } = require('../lib/async-https.js');
    const mockedFormatJson = require('../lib/format-json.js');

    return { Destiny2API, promiseRequest, mockedFormatJson };
};

afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
});

test('promisePost rejects on request error', async () => {
    const req = new EventEmitter();
    req.write = jest.fn();
    req.end = jest.fn();
    jest.spyOn(https, 'request').mockImplementation(() => req);

    const promise = promisePost({ host: 'example.com' }, { foo: 'bar' });
    req.emit('error', new Error('post failed'));

    await expect(promise).rejects.toEqual('post failed');
    expect(req.write).toHaveBeenCalledWith(JSON.stringify({ foo: 'bar' }));
    expect(req.end).toHaveBeenCalled();
});

test('getVendors delegates to request/format helpers', async () => {
    const { Destiny2API, promiseRequest, mockedFormatJson } = getMockedDestiny2API();
    promiseRequest.mockResolvedValue('raw');
    mockedFormatJson.mockReturnValue({ ok: true });
    const destiny = new Destiny2API({ key: 'test-key' });

    const result = await destiny.getVendors(1, 'member', 'char', [100, 200]);

    expect(promiseRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'GET',
        path: '/Platform/Destiny2/1/Profile/member/Character/char/Vendors/?components=100,200'
    }));
    expect(mockedFormatJson).toHaveBeenCalledWith('raw');
    expect(result).toEqual({ ok: true });
});

test('constructor keeps provided oauth config values', () => {
    const { Destiny2API } = getMockedDestiny2API();
    const destiny = new Destiny2API({
        key: 'test-key',
        oauthConfig: {
            id: 'oauth-id',
            secret: 'oauth-secret'
        }
    });

    expect(destiny.oauthConfig).toEqual({
        id: 'oauth-id',
        secret: 'oauth-secret',
        url: 'https://www.bungie.net/en/OAuth/Authorize/'
    });
});

test('getVendor delegates to request/format helpers', async () => {
    const { Destiny2API, promiseRequest, mockedFormatJson } = getMockedDestiny2API();
    promiseRequest.mockResolvedValue('raw');
    mockedFormatJson.mockReturnValue({ ok: true });
    const destiny = new Destiny2API({ key: 'test-key' });

    const result = await destiny.getVendor(1, 'member', 'char', 'vendorHash');

    expect(promiseRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'GET',
        path: '/Platform/Destiny2/1/Profile/member/Character/char/Vendors/vendorHash'
    }));
    expect(mockedFormatJson).toHaveBeenCalledWith('raw');
    expect(result).toEqual({ ok: true });
});

test('searchDestinyEntities rejects and does not call request helper', async () => {
    const expectedMessage = 'searchDestinyEntities is unsupported because Bungie deprecated ' +
        'the /Armory/Search endpoint. See: https://github.com/Bungie-net/api/issues/1922';
    const { Destiny2API, promiseRequest, mockedFormatJson } = getMockedDestiny2API();
    const destiny = new Destiny2API({ key: 'test-key' });
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(
        destiny.searchDestinyEntities('DestinyFactionDefinition', 'Dead Orbit', [2])
    ).rejects.toThrow(expectedMessage);
    expect(promiseRequest).not.toHaveBeenCalled();
    expect(mockedFormatJson).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(expectedMessage);
});

test('getHistoricalStats uses default empty query object', async () => {
    const { Destiny2API, promiseRequest, mockedFormatJson } = getMockedDestiny2API();
    promiseRequest.mockResolvedValue('raw');
    mockedFormatJson.mockReturnValue({ ok: true });
    const destiny = new Destiny2API({ key: 'test-key' });

    const result = await destiny.getHistoricalStats(1, 'member', 'char');

    expect(promiseRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'GET',
        path: '/Platform/Destiny2/1/Account/member/Character/char/Stats/'
    }));
    expect(mockedFormatJson).toHaveBeenCalledWith('raw');
    expect(result).toEqual({ ok: true });
});

test('getActivityHistory uses default empty query object', async () => {
    const { Destiny2API, promiseRequest, mockedFormatJson } = getMockedDestiny2API();
    promiseRequest.mockResolvedValue('raw');
    mockedFormatJson.mockReturnValue({ ok: true });
    const destiny = new Destiny2API({ key: 'test-key' });

    const result = await destiny.getActivityHistory(1, 'member', 'char');

    expect(promiseRequest).toHaveBeenCalledWith(expect.objectContaining({
        method: 'GET',
        path: '/Platform/Destiny2/1/Account/member/Character/char/Stats/Activities/'
    }));
    expect(mockedFormatJson).toHaveBeenCalledWith('raw');
    expect(result).toEqual({ ok: true });
});
