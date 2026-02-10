/**
 * Unit tests for format-json.js
 * Tests both success and error cases for JSON parsing
 */
const formatJson = require('../lib/format-json.js');
const { EventEmitter } = require('events');

describe('formatJson', () => {
    test('successfully parses valid JSON from response', () => {
        // Create a mock response object that emits valid JSON
        const mockRes = new EventEmitter();
        mockRes.headers = { 'content-type': 'application/json' };
        mockRes.statusCode = 200;
        mockRes.setEncoding = jest.fn();

        const validJson = JSON.stringify({ foo: 'bar', baz: 123 });

        // Start the formatJson promise
        const promise = formatJson(mockRes);

        // Emit data and end events
        mockRes.emit('data', validJson);
        mockRes.emit('end');

        // Verify the promise resolves with parsed JSON
        return promise.then(result => {
            expect(result).toEqual({ foo: 'bar', baz: 123 });
            expect(mockRes.setEncoding).toHaveBeenCalledWith('utf8');
        });
    });

    test('successfully parses valid JSON from response with multiple chunks', () => {
        // Create a mock response object that emits valid JSON in chunks
        const mockRes = new EventEmitter();
        mockRes.headers = { 'content-type': 'application/json' };
        mockRes.statusCode = 200;
        mockRes.setEncoding = jest.fn();

        // Start the formatJson promise
        const promise = formatJson(mockRes);

        // Emit data in multiple chunks
        mockRes.emit('data', '{"foo":');
        mockRes.emit('data', '"bar",');
        mockRes.emit('data', '"baz":123}');
        mockRes.emit('end');

        // Verify the promise resolves with parsed JSON
        return promise.then(result => {
            expect(result).toEqual({ foo: 'bar', baz: 123 });
        });
    });

    test('rejects with error when given invalid JSON', () => {
        // Create a mock response object that emits invalid JSON
        const mockRes = new EventEmitter();
        mockRes.headers = { 'content-type': 'application/json' };
        mockRes.statusCode = 200;
        mockRes.setEncoding = jest.fn();

        const invalidJson = '{ foo: bar, { foo: }'; // Invalid JSON

        // Start the formatJson promise
        const promise = formatJson(mockRes);

        // Emit data and end events with invalid JSON
        mockRes.emit('data', invalidJson);
        mockRes.emit('end');

        // Verify the promise rejects with a SyntaxError
        return promise.catch(err => {
            expect(err).toBeInstanceOf(SyntaxError);
            expect(err.message).toMatch(/JSON/);
        });
    });

    test('rejects with error when given empty string', () => {
        // Create a mock response object that emits empty string
        const mockRes = new EventEmitter();
        mockRes.headers = { 'content-type': 'application/json' };
        mockRes.statusCode = 200;
        mockRes.setEncoding = jest.fn();

        // Start the formatJson promise
        const promise = formatJson(mockRes);

        // Emit end without any data (empty string)
        mockRes.emit('end');

        // Verify the promise rejects with a SyntaxError
        return promise.catch(err => {
            expect(err).toBeInstanceOf(SyntaxError);
        });
    });

    test('rejects with error when given malformed JSON with trailing comma', () => {
        // Create a mock response object
        const mockRes = new EventEmitter();
        mockRes.headers = { 'content-type': 'application/json' };
        mockRes.statusCode = 200;
        mockRes.setEncoding = jest.fn();

        const invalidJson = '{"foo": "bar",}'; // Trailing comma is invalid in JSON

        // Start the formatJson promise
        const promise = formatJson(mockRes);

        // Emit data and end events
        mockRes.emit('data', invalidJson);
        mockRes.emit('end');

        // Verify the promise rejects
        return promise.catch(err => {
            expect(err).toBeInstanceOf(SyntaxError);
        });
    });
});
