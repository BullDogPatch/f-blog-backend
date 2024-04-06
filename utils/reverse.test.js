const { test } = require('node:test');
const assert = require('node:assert');

const reverse = require('./for_testing').reverse;

test('reverse of a', () => {
  const result = reverse('a');
  assert.strictEqual(result, 'a');
});

test('reverse of react', () => {
  const result = reverse('react');
  assert.strictEqual(result, 'tcaer');
});

test('reverse of `craig clayton', () => {
  const result = reverse('craig clayton');
  assert.strictEqual(result, 'notyalc giarc');
});
