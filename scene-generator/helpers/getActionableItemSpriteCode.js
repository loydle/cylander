function getActionableItemSpriteCode(actionableItem) {
  return `this.${actionableItem?.name} = this.anims.create({
    key: '${actionableItem?.key}',
    frames: this.anims.generateFrameNumbers('${actionableItem?.name}'),
    frameRate: ${actionableItem?.frameRate},
  });
  const ${actionableItem?.name}Sprite = this.add.sprite(${actionableItem?.position.x},${actionableItem?.position.y}, '${actionableItem?.name}').setScale(${actionableItem?.scale});
  ${actionableItem?.name}Sprite.play({ key: '${actionableItem?.key}', repeat: ${actionableItem?.repeat} });
    
  this.tweens.add({
      targets: ${actionableItem?.name}Sprite,
      x: ${actionableItem?.move.x},
      duration: ${actionableItem?.duration},
      ease: '${actionableItem?.ease}'
  });
  
 `;
}

module.exports = getActionableItemSpriteCode;
