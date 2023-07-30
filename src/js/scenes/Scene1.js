import * as Phaser from 'phaser';
import { Robot } from '../Robot.js';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    this.robot = null;
    this.robotText = null;
  }

  preload() {
    this.load.image('background-scene1', 'src/assets/scene1.jpg');
    this.load.image('key', 'src/assets/key.png');
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    this.add.image(0, 0, 'background-scene1').setOrigin(0);
    this.door = this.add
      .rectangle(637, 544, 100, 100, undefined)
      .setInteractive();

    this.door.on(
      'pointerup',
      function () {
        this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            this.scene.start('Scene2');
          }
        });
      },
      this
    );
    this.cactus = this.add
      .rectangle(444, 588, 100, 200, undefined)
      .setInteractive();

    this.cactus.on(
      'pointerup',
      function () {
        this.robot.dialogContent = "Watch out! It's a cactus!";
        this.robot.showDialog(this.robot.dialogContent, 3000);
      },
      this
    );
    this.key = this.add.image(120, 920, 'key').setInteractive();
    this.key.setScale(0.6);

    this.input.setDraggable(this.key);
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.key.on(
      'pointerup',
      function () {
        this.robot.dialogContent = 'You have a key!';
        this.robot.showDialog(this.robot.dialogContent, 1000);
      },
      this
    );

    this.robot.create();
    this.robot.dialogContent = '';
    this.robot.showDialog('Find the door or explore your surroundings.', 30000);
    this.robot.robotImage.setPosition(1529, 1040);
    this.robot.moveTextPosition(1529, 1040 - this.robot.robotImage.height + 20);

    this.tweens.add({
      targets: this.robot.robotImage,
      y: 900,
      duration: 300,
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
    });
  }
}
