const getSetOriginCode = require('../../../scene-generator/helpers/getSetOriginCode.js');

describe('getSetOriginCode', () => {
  it('should return an empty string if origin or name is not provided', () => {
    const result1 = getSetOriginCode(undefined, { x: 0.5, y: 0.5 });
    const result2 = getSetOriginCode('someName', undefined);
    expect(result1.replace(/\s+/g, '')).toEqual('');
    expect(result2.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for setting origin', () => {
    const origin = { x: 0.5, y: 0.5 };
    const name = 'gameObject';
    const result = getSetOriginCode(name, origin);
    const expectedCode = `this.gameObject.setOrigin(${origin.x}, ${origin.y});`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with default origin in an empty object and name is provided', () => {
    const origin = {};
    const name = 'gameObject';
    const result = getSetOriginCode(name, origin);
    const expectedCode = `this.gameObject.setOrigin(0, 0);`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
