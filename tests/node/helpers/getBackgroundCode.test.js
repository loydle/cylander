const getBackgroundCode = require('../../../scene-generator/helpers/getBackgroundCode.js');

describe('getBackgroundCode', () => {
  it('should return an empty string if background is falsy', () => {
    const background = null;
    const sceneName = 'someScene';
    const result = getBackgroundCode(background, sceneName);
    expect(result).toEqual('');
  });

  it('should return the correct code for background with image', () => {
    const background = { image: 'bg-image.png' };
    const sceneName = 'someScene';
    const result = getBackgroundCode(background, sceneName);

    const expectedCode = `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);`;
    expect(result).toEqual(expectedCode);
  });

  it('should return the correct code for background with color', () => {
    const background = { color: '0x336699' };
    const sceneName = 'someScene';
    const result = getBackgroundCode(background, sceneName);

    const expectedCode = `this.cameras.main.setBackgroundColor(0x336699);`;
    expect(result).toEqual(expectedCode);
  });
});
