function getSetInteractiveCode(actionableItem) {
  if (actionableItem.name === 'input' || !actionableItem.name) return '';
  if (actionableItem.type === "sprite") {
    return `this.${actionableItem.name}Sprite.setInteractive();`
  }
  return `this.${actionableItem.name}.setInteractive();`;
}

module.exports = getSetInteractiveCode;
