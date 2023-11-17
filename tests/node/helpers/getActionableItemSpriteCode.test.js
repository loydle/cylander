const getActionableItemSpriteCode = require('../../../scene-generator/helpers/getActionableItemSpriteCode');

describe('getActionableItemSpriteCode', () => {
  it('should return the correct code for creating a sprite with specified position', () => {
    const actionableItem = {
      name: 'item1',
      position: { x: 100, y: 200 },
      move: { x: 190, y: 0 },
    };
    const result = getActionableItemSpriteCode(actionableItem);
    const expectedBegin = `this.item1 = this.anims.create`;
    const expectedPosition = `this.add.sprite(100,200,'item1')`;
    expect(result.replace(/\s+/g, '')).toMatch(
        new RegExp(`^${expectedBegin.replace(/\s+/g, '')}?`)
    );
    expect(result.replace(/\s+/g, '')).toMatch(
        expectedPosition
    );
  });
});
