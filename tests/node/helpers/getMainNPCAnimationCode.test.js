const getMainNPCAnimationCode = require('../../../scene-generator/helpers/getMainNPCAnimationCode.js');

describe('getMainNPCAnimationCode', () => {
  it('should return an empty string if animation is not provided', () => {
    const animation = undefined;
    const result = getMainNPCAnimationCode(animation);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code with animation options', () => {
    const animation = {
      options: {
        duration: 1000,
        repeat: -1,
      },
    };
    const result = getMainNPCAnimationCode(animation);
    const expectedCode = `
      this.tweens.add({ targets: this.mainNPC?.mainNPCImage, duration: 1000, repeat: -1 });
    `;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });

  it('should return the correct code with animation options containing string values', () => {
    const animation = {
      options: {
        duration: '1s',
        ease: 'Linear',
      },
    };
    const result = getMainNPCAnimationCode(animation);
    const expectedCode = `
      this.tweens.add({ targets: this.mainNPC?.mainNPCImage, duration: '1s', ease: 'Linear' });
    `;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });
});
