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

    this.physics.world.enable(this.exitDoor);

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
        this.robot.dialogContent = 'This is just a visible hitbox!';
        this.robot.showDialog(this.robot.dialogContent, 3000);
      },
      this
    );
    this.whiteObject = this.add
      .rectangle(1044, 988, 100, 100, 0xfffffff)
      .setInteractive();

    this.input.setDraggable(this.whiteObject);
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.physics.world.enable(this.whiteObject);

    this.whiteObject.on(
      'pointerup',
      function () {
        this.robot.dialogContent = 'Find something to interact with!';
        this.robot.showDialog(this.robot.dialogContent, 1000);
      },
      this
    );

    this.physics.add.collider(this.whiteObject, this.exitDoor, () => {
      this.robot.dialogContent = 'Something happend!';
      this.robot.showDialog(this.robot.dialogContent, 5000);
    });

    this.robot.create();
    this.robot.dialogContent = '';
    this.robot.showDialog('Welcome to Scene 2!', 3000);
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
