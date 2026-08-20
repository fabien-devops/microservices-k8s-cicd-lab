const test = require('node:test');
const assert = require('node:assert');
const app = require('../../server');

test('Unit Test: Verify that the Express app is initialized', () => {
  assert.strictEqual(typeof app, 'function');
});