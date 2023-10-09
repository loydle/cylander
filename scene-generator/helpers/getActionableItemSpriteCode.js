function getActionableItemSpriteCode(actionableItem) {
  return `this.${actionableItem?.name} = this.anims.create({
  key: 'walk',
  frames: this.anims.generateFrameNumbers('mummy'),
  frameRate: 16,
  });
  
  const sprite = this.add.sprite(50, 300, 'mummy').setScale(4);

  sprite.play({ key: 'walk', repeat: 7 });
    
    this.tweens.add({
        targets: sprite,
        x: 750,
        duration: 8800,
        ease: 'Linear'
    });
  
 `;
}

module.exports = getActionableItemSpriteCode;
