function getActionableItemHitboxCode(actionableItem) {
  return `this.${actionableItem?.name} = this.add.rectangle(${
    actionableItem?.position?.x === 'center'
      ? `this.cameras.main.centerX`
      : actionableItem?.position?.x
  }, ${
    actionableItem?.position?.y === 'center'
      ? `this.cameras.main.centerY`
      : actionableItem?.position?.y
  }, ${actionableItem?.size?.width}, ${actionableItem?.size?.height}, ${
    actionableItem?.backgroundColor
  });
 `;
}

module.exports = getActionableItemHitboxCode;
