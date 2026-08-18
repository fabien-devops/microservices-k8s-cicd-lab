const test = require('node:test');
const assert = require('node:assert');
const app = require('../../index');

test('Unit Test: Vérification que l application Express est initialisée', () => {
  assert.strictEqual(typeof app, 'function');
});