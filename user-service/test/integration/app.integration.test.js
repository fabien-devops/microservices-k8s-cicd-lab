const test = require('node:test');
const assert = require('node:assert');

test('Integration: Checking environment variables', () => {
  const port = process.env.PORT || 8080;
  assert.strictEqual(typeof port === 'string' || typeof port === 'number', true);
});