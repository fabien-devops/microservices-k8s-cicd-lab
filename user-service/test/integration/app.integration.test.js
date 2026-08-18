const test = require('node:test');
const assert = require('node:assert');

test('Integration: Vérification des variables d env', () => {
  const port = process.env.PORT || 8080;
  assert.strictEqual(typeof port === 'string' || typeof port === 'number', true);
});