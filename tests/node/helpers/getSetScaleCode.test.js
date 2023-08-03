const getSetScaleCode = require('../../../scene-generator/helpers/getSetScaleCode.js');

describe('getSetScaleCode', () => {
  it('should return an empty string if scale or name is not provided', () => {
    const scale = 1.5;
    const name = undefined;
    const result = getSetScaleCode(name, scale);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for setting scale', () => {
    const scale = 1.5;
    const name = 'gameObject';
    const result = getSetScaleCode(name, scale);
    const expectedCode = `this.gameObject.setScale(${scale});`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
