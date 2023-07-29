export class Robot {
  constructor(scene) {
    this.scene = scene;
    this.dialogVisible = false;
    this.dialogText = null;
  }

  preload() {
    this.scene.load.image('robot', 'src/assets/robot.png');
  }

  create() {
    this.robotImage = this.scene.add.image(1529, 1040, 'robot').setDepth(2);

    this.dialogText = this.scene.add
      .text(1529, 740, '', {
        fontFamily: 'Arial',
        fontSize: 24,
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: {
          x: 20,
          y: 10,
        },
      })
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);
  }

  showDialog(text, delay = 2000) {
    if (this.dialogVisible) {
      this.dialogText.setVisible(false);
      this.dialogVisible = false;
      this.scene.time.delayedCall(delay, () => {
        this.dialogText.setText(text);
        this.dialogText.setVisible(true);
        this.dialogVisible = true;
      });
    } else {
      this.dialogText.setText(text);
      this.dialogText.setVisible(true);
      this.dialogVisible = true;
      this.scene.time.delayedCall(delay, () => {
        this.dialogText.setVisible(false);
        this.dialogVisible = false;
      });
    }
  }

  moveTextPosition(x, y) {
    this.dialogText.setPosition(x, y);
  }
}
