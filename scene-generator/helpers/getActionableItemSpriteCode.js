function getActionableItemSpriteCode(actionableItem) {
    /*
    PlayAnimationConfig {
        "key": "",
        "frameRate": 0,
        "duration": 0,
        "delay": 0,
        "repeat": 0,
        "repeatDelay": 0,
        "yoyo": false,
        "showOnStart": true,
        "hideOnComplete": false,
    }
    */
    let options = JSON.stringify(actionableItem?.play?.options);
  return `this.${actionableItem?.name}Anim = this.anims.create({
    key: '${actionableItem?.name}Key',
    frames: this.anims.generateFrameNumbers('${actionableItem?.name}'),
    frameRate: ${actionableItem?.animation?.options?.frameRate},
  });
  this.${actionableItem?.name} = this.add.sprite(${actionableItem?.position?.x},${actionableItem?.position?.y}, '${actionableItem?.name}').setScale(${actionableItem?.scale});
  this.${actionableItem?.name}.play({ key: '${actionableItem?.name}Key', ...${options} });
  this.${actionableItem?.name}.anims.msPerFrame = Math.floor(${actionableItem?.animation?.options?.duration}/(${actionableItem?.animation?.options?.frameRate}*${actionableItem?.animation?.options?.repeat}));
  
 `;
}

module.exports = getActionableItemSpriteCode;
