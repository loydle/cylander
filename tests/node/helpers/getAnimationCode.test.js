const getAnimationCode = require('../../../scene-generator/helpers/getAnimationCode.js');

describe('getAnimationCode', () => {
  it('should return an empty string if animation is falsy', () => {
    const name = 'someObject';
    const animation = null;
    const result = getAnimationCode(name, animation);
    expect(result).toEqual('');
  });

  it('should return an empty string if name is falsy', () => {
    const name = null;
    const animation = { options: { duration: 1000, alpha: 0.5 } };
    const result = getAnimationCode(name, animation);
    expect(result).toEqual('');
  });

  it('should return the correct code if both name and animation are truthy', () => {
    const name = 'someObject';
    const animation = {
      options: {
        duration: 1000,
        someOther: 'value',
      },
    };
    const result = getAnimationCode(name, animation);
    const expectedCode = `
  this.tweens.add({
    targets: this.${name},
    duration: 1000,
    someOther: 'value'
  });
`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
