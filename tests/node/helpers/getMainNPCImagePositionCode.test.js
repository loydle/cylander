const getMainNPCImagePositionCode = require('../../../scene-generator/helpers/getMainNPCImagePositionCode.js');

describe('getMainNPCImagePositionCode', () => {
  it('should return the correct code with default values', () => {
    const position = {};
    const result = getMainNPCImagePositionCode(position);
    const expectedCode = `
      this.mainNPC?.mainNPCImage.setPosition(this.mainNPC?.initialPosition?.x, this.mainNPC?.initialPosition?.y);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with specified x and y position', () => {
    const position = {
      x: 100,
      y: 200,
    };
    const result = getMainNPCImagePositionCode(position);
    const expectedCode = `
      this.mainNPC?.mainNPCImage.setPosition(100, 200);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with only x position', () => {
    const position = {
      x: 150,
    };
    const result = getMainNPCImagePositionCode(position);
    const expectedCode = `
      this.mainNPC?.mainNPCImage.setPosition(150, this.mainNPC?.initialPosition?.y);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with only y position', () => {
    const position = {
      y: 250,
    };
    const result = getMainNPCImagePositionCode(position);
    const expectedCode = `
      this.mainNPC?.mainNPCImage.setPosition(this.mainNPC?.initialPosition?.x, 250);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
