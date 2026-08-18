const test = require('node:test');
const assert = require('node:assert');
const http = require('http');
const app = require('../../index'); 

test('GET /health doit retourner status UP', (t, done) => {
  http.get('http://localhost:8080/health', (res) => {
    assert.strictEqual(res.statusCode, 200);
    done();
  });
});