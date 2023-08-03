const getSetInteractiveCode = require('../../../scene-generator/helpers/getSetInteractiveCode.js');

describe('getSetInteractiveCode', () => {
  it('should return an empty string if name is "input" or not provided', () => {
    const name1 = 'input';
    const name2 = undefined;
    const result1 = getSetInteractiveCode(name1);
    const result2 = getSetInteractiveCode(name2);
    expect(result1.replace(/\s+/g, '')).toEqual('');
    expect(result2.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for setting interactive property', () => {
    const name = 'gameObject';
    const result = getSetInteractiveCode(name);
    const expectedCode = `this.gameObject.setInteractive();`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
