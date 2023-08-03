const getMainNPCDialogPositionCode = require('../../../scene-generator/helpers/getMainNPCDialogPositionCode.js');

describe('getMainNPCDialogPositionCode', () => {
  it('should return the correct code with default values', () => {
    const mainNPC = {};
    const result = getMainNPCDialogPositionCode(mainNPC);
    const expectedCode = `
      this.mainNPC?.moveTextPosition(this.mainNPC?.initialPosition?.x, this.mainNPC?.initialPosition?.y - this.mainNPC?.mainNPCImage?.height / 2);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with specified x and y position', () => {
    const mainNPC = {
      position: {
        x: 100,
        y: 200,
      },
    };
    const result = getMainNPCDialogPositionCode(mainNPC);
    const expectedCode = `
      this.mainNPC?.moveTextPosition(100, 200 - this.mainNPC?.mainNPCImage?.height / 2);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with top position', () => {
    const mainNPC = {
      dialog: {
        position: {
          top: 20,
        },
      },
    };
    const result = getMainNPCDialogPositionCode(mainNPC);
    const expectedCode = `
      this.mainNPC?.moveTextPosition(this.mainNPC?.initialPosition?.x, this.mainNPC?.initialPosition?.y - this.mainNPC?.mainNPCImage?.height  + 20);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code with specified x, y position, and top position', () => {
    const mainNPC = {
      position: {
        x: 150,
        y: 250,
      },
      dialog: {
        position: {
          top: 30,
        },
      },
    };
    const result = getMainNPCDialogPositionCode(mainNPC);
    const expectedCode = `
      this.mainNPC?.moveTextPosition(150, 250 - this.mainNPC?.mainNPCImage?.height  + 30);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
