const getHasPhysicsCode = require('../../../scene-generator/helpers/getHasPhysicsCode.js');

describe('getHasPhysicsCode', () => {
  it('shou', () => {
    const result1 = getHasPhysicsCode(undefined, true);
    const result2 = getHasPhysicsCode(true, false);
    expect(result1.replace(/\s+/g, '')).toEqual('');
    expect(result2.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for enabling physics', () => {
    const name = 'gameObject';
    const hasPhysicsEnabled = true;
    const result = getHasPhysicsCode(name, hasPhysicsEnabled);
    const expectedCode = `this.physics.world.enable(this.gameObject);`;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
