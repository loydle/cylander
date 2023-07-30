import { instructorNPCConfig } from '../configs/instructorNPCConfig.js';

export class InstructorNPC {
  constructor(scene) {
    this.scene = scene;
    this.dialogVisible = false;
    this.dialogText = null;
    this.dialogContent = '';
  }

  preload() {
    this.scene.load.image('instructorNPC', instructorNPCConfig.imageFilePath);
  }

  create() {
    this.instructorNPCImage = this.scene.add
      .image(
        instructorNPCConfig.initialPosition.x,
        instructorNPCConfig.initialPosition.y,
        'instructorNPC'
      )
      .setDepth(2);

    this.instructorNPCImage.setScale(instructorNPCConfig.initialScale);

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

  showDialog(content, duration) {
    -this.dialogText.setText(content);
    this.dialogText.visible = true;

    if (duration) {
      this.scene.time.delayedCall(duration, () => {
        this.hideDialog();
      });
    }
  }

  hideDialog() {
    // Hide the dialog box
    this.dialogText.visible = false;
  }

  moveTextPosition(x, y) {
    this.dialogText.setPosition(x, y);
  }
}
