function getActionableItemImageCode(actionableItem) {
  return `this.${actionableItem?.name} = this.add.image(${
    actionableItem?.position?.x === 'center'
      ? `this.cameras.main.centerX`
      : actionableItem?.position?.x
  }, ${
    actionableItem?.position?.y === 'center'
      ? `this.cameras.main.centerY`
      : actionableItem?.position?.y
  }, "${actionableItem?.name}");
 `;
}

module.exports = getActionableItemImageCode;
