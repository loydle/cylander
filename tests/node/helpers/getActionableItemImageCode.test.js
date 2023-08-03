const getActionableItemImageCode = require('../../../scene-generator/helpers/getActionableItemImageCode.js');

describe('getActionableItemImageCode', () => {
  it('should return the correct code for creating an image with specified position', () => {
    const actionableItem = {
      name: 'item1',
      position: { x: 100, y: 200 },
    };
    const result = getActionableItemImageCode(actionableItem);
    const expectedCode = `this.item1 = this.add.image(100, 200, "item1");`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code for creating an image at the center', () => {
    const actionableItem = {
      name: 'item2',
      position: { x: 'center', y: 'center' },
    };
    const result = getActionableItemImageCode(actionableItem);
    const expectedCode = `this.item2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "item2");`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
