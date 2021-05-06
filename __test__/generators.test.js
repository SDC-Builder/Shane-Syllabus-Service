/* eslint-disable no-undef */
const { generate, getRandomWeeks, randomNumber } = require('../db/data/refactored/generatorNew');

let data;
let parsed;

beforeAll(() => {
  data = generate(1);
  parsed = JSON.parse(data);
});

describe('Generating Data', () => {
  test('It should output a valid stringified object', () => {
    expect(typeof data).toBe('string');
    expect(typeof parsed).toBe('object');
    expect(Array.isArray(parsed)).toBeFalsy();
  });
  test('It should use the passed-in ID as the record id', () => {
    expect(parsed.id).toBeTruthy();
    expect(parsed.id).toBe(1);
  });
  test('It should have a weeks array with at least one record', () => {
    expect(parsed.weeks).toBeTruthy();
    expect(parsed.weeks.length).toBeGreaterThanOrEqual(1);
  });
  test('It should have the correct shape', () => {
    expect(parsed.weeks[0].lessons).toBeTruthy();
    expect(parsed.weeks[0].lessons.length).toBeGreaterThanOrEqual(1);
  });
});
