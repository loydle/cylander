import * as Phaser from 'phaser';
import { Robot } from '../Robot.js';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
    this.robot = null;
    this.robotText = null;
  }

  preload() {
    this.load.image('background-scene2', 'src/assets/scene2.jpg');
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    this.add.image(0, 0, 'background-scene2').setOrigin(0);
    this.exitDoor = this.add.rectangle(766, 520, 200, 300).setInteractive();

    this.exitDoor.on(
      'pointerup',
      function () {
        this.cameras.main.zoomTo(
          1.5,
          1000,
          'Linear',
          true,
          (camera, progress) => {
            if (progress === 1) {
              this.scene.start('Scene1');
            }
          }
        );
      },
      this
    );
    this.exitDoor2 = this.add
      .rectangle(844, 988, 100, 100, 0xfff00ff)
      .setInteractive();

    this.exitDoor2.on(
      'pointerup',
      function () {
        this.cameras.main.zoomTo(
          1.5,
          1000,
          'Linear',
          true,
          (camera, progress) => {
            if (progress === 1) {
              this.scene.start('DefaultScene');
            }
          }
        );
      },
      this
    );
    this.somehitbox = this.add
      .rectangle(644, 988, 100, 100, 0xfffff00)
      .setInteractive();

    this.somehitbox.on(
      'pointerup',
      function () {
        this.robot.dialogContent = 'This is just a visible hitbox!'; // Update dialog content
        this.robot.showDialog(this.robot.dialogContent, 3000);
      },
      this
    );

    this.robot.create();
    this.robot.dialogContent = ''; // Initialize the dialog content to an empty string
    this.robot.showDialog('Well done!', 30000);
    this.robot.robotImage.setPosition(1055, 488);
    this.robot.moveTextPosition(1055, 488 - this.robot.robotImage.height / 2);

    this.tweens.add({
      targets: this.robot.robotImage,
      y: 530,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });
  }
}
