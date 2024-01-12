function getActionableItemSpriteCode(actionableItem) {
  let options = JSON.stringify(actionableItem?.play?.options);
  return `this.${actionableItem?.name}Anim = this.anims.create({
    key: '${actionableItem?.name}Key',
    frames: this.anims.generateFrameNumbers('${actionableItem?.name}'),
    frameRate: ${actionableItem?.animation?.options?.frameRate},
  });
  this.${actionableItem?.name} = this.add.sprite(${actionableItem?.position?.x},${actionableItem?.position?.y}, '${actionableItem?.name}').setScale(${actionableItem?.scale});
  this.${actionableItem?.name}.play({ key: '${actionableItem?.name}Key', ...${options} });
    
 `;
}

module.exports = getActionableItemSpriteCode;
