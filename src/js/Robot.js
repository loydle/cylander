import { robotConfig } from '../configs/robotConfig.js';

export class Robot {
  constructor(scene) {
    this.scene = scene;
    this.dialogVisible = false;
    this.dialogText = null;
  }

  preload() {
    this.scene.load.image('robot', robotConfig.imageFilePath);
  }

  create() {
    this.robotImage = this.scene.add
      .image(
        robotConfig.initialPosition.x,
        robotConfig.initialPosition.y,
        'robot'
      )
      .setDepth(2);

    this.robotImage.setScale(robotConfig.initialScale);

    this.dialogText = this.scene.add
      .text(
        robotConfig.dialog.initialPosition.x,
        robotConfig.dialog.initialPosition.y,
        '',
        {
          fontFamily: robotConfig.dialog.font.family,
          fontSize: robotConfig.dialog.font.size,
          color: robotConfig.dialog.textColor,
          backgroundColor: robotConfig.dialog.backgroundColor,
          padding: robotConfig.dialog.padding,
        }
      )
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);
  }

  showDialog(text, duration = robotConfig.dialog.defaultDuration) {
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
