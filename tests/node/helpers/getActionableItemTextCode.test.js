const getActionableItemTextCode = require('../../../scene-generator/helpers/getActionableItemTextCode.js');

describe('getActionableItemTextCode', () => {
  it('should return the correct code for creating a text with specified position and content', () => {
    const actionableItem = {
      name: 'text1',
      position: { x: 300, y: 400 },
      text: {
        content: 'Hello, this is a text.',
        styles: { fontFamily: 'Arial', fontSize: '16px', color: '#ffffff' },
      },
    };
    const result = getActionableItemTextCode(actionableItem);
    const expectedCode = `this.text1 = this.add.text(300, 400, "Hello, this is a text.", {"fontFamily":"Arial","fontSize":"16px","color":"#ffffff"});`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code for creating a text at the center', () => {
    const actionableItem = {
      name: 'text2',
      position: { x: 'center', y: 'center' },
      text: {
        content: 'Centered Text',
        styles: { fontFamily: 'Verdana', fontSize: '20px', color: '#000000' },
      },
    };
    const result = getActionableItemTextCode(actionableItem);
    const expectedCode = `this.text2 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "Centered Text", {"fontFamily":"Verdana","fontSize":"20px","color":"#000000"});`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
