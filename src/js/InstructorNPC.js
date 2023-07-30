import { instructorNPCConfig } from '../configs/instructorNPCConfig.js';

export class InstructorNPC {
  constructor(scene) {
    this.scene = scene;
    this.dialogVisible = false;
    this.dialogText = null;
  }

  preload() {
    this.scene.load.image('instructorNPC', instructorNPCConfig.imageFilePath);
  }

  create() {
    this.robotImage = this.scene.add
      .image(
        instructorNPCConfig.initialPosition.x,
        instructorNPCConfig.initialPosition.y,
        'instructorNPC'
      )
      .setDepth(2);

    this.robotImage.setScale(instructorNPCConfig.initialScale);

    this.dialogText = this.scene.add
      .text(
        instructorNPCConfig.dialog.initialPosition.x,
        instructorNPCConfig.dialog.initialPosition.y,
        '',
        {
          fontFamily: instructorNPCConfig.dialog.font.family,
          fontSize: instructorNPCConfig.dialog.font.size,
          color: instructorNPCConfig.dialog.textColor,
          backgroundColor: instructorNPCConfig.dialog.backgroundColor,
          padding: instructorNPCConfig.dialog.padding,
        }
      )
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);
  }

  showDialog(text, duration = instructorNPCConfig.dialog.defaultDuration) {
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
