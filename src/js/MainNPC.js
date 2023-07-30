import { mainNPCConfig } from '../configs/mainNPCConfig.js';

export class MainNPC {
  constructor(scene) {
    this.scene = scene;
    this.dialogVisible = false;
    this.dialogText = null;
  }

  preload() {
    this.scene.load.image('mainNPC', mainNPCConfig.imageFilePath);
  }

  create() {
    this.mainNPCImage = this.scene.add
      .image(
        mainNPCConfig.initialPosition.x,
        mainNPCConfig.initialPosition.y,
        'mainNPC'
      )
      .setDepth(2);

    this.mainNPCImage.setScale(mainNPCConfig.initialScale);

    this.dialogText = this.scene.add
      .text(
        mainNPCConfig.dialog.initialPosition.x,
        mainNPCConfig.dialog.initialPosition.y,
        '',
        {
          fontFamily: mainNPCConfig.dialog.font.family,
          fontSize: mainNPCConfig.dialog.font.size,
          color: mainNPCConfig.dialog.textColor,
          backgroundColor: mainNPCConfig.dialog.backgroundColor,
          padding: mainNPCConfig.dialog.padding,
        }
      )
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);
  }

  showDialog(text, duration = mainNPCConfig.dialog.defaultDuration) {
    this.dialogText.setText(text);
    this.dialogText.setVisible(true);
    this.dialogVisible = true;
    this.scene.time.delayedCall(duration, () => {
      this.dialogText.setVisible(false);
      this.dialogVisible = false;
    });
  }

  moveTextPosition(x, y) {
    this.dialogText.setPosition(x, y);
  }
}
