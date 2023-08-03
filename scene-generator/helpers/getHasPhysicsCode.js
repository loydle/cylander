function getHasPhysicsCode(name, hasPhysicsEnabled) {
  if (!hasPhysicsEnabled || !name) return '';
  return `this.physics.world.enable(this.${name});`;
}

module.exports = getHasPhysicsCode;
