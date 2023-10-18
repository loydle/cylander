function getActionableItemTextCode(actionableItem) {
  return `this.${actionableItem?.name} = this.add.text(${
    actionableItem?.position?.x === 'center'
      ? `this.cameras.main.centerX`
      : actionableItem?.position?.x
  }, ${
    actionableItem?.position?.y === 'center'
      ? `this.cameras.main.centerY`
      : actionableItem?.position?.y
  }, localeConfig.msg("${actionableItem?.name}"), ${JSON.stringify(
    actionableItem?.text?.styles
  )});
 `;
}

module.exports = getActionableItemTextCode;
