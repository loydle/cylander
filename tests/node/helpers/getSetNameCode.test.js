const getSetNameCode = require('../../../scene-generator/helpers/getSetNameCode.js');

describe('getSetNameCode', () => {
  it('should throw an error if actionable item has no name', () => {
    const name = ''; // Empty string
    const testFunction = () => {
      getSetNameCode(name);
    };

    expect(testFunction).toThrowError('Actionable Item name is missing.');
  });

  it('should return the correct code for setting name', () => {
    const name = 'gameObject';
    const result = getSetNameCode(name);
    const expectedCode = 'this.gameObject.name = "gameObject";';
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
