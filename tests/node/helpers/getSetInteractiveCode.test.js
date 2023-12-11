const getSetInteractiveCode = require('../../../scene-generator/helpers/getSetInteractiveCode.js');

describe('getSetInteractiveCode', () => {
  it('should return an empty string if name is "input" or not provided', () => {
    const actionableItem1 = {
      name: 'input',
    };

    const actionableItem2 = {
      name: undefined,
    };
    const result1 = getSetInteractiveCode(actionableItem1);
    const result2 = getSetInteractiveCode(actionableItem2);
    expect(result1.replace(/\s+/g, '')).toEqual('');
    expect(result2.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for setting interactive property', () => {
    const actionableItem1 = {
      name: 'gameObject',
    };
    const result = getSetInteractiveCode(actionableItem1);
    const expectedCode = `this.gameObject.setInteractive();`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
