import * as Phaser from 'phaser';
import { InstructorNPC } from '../InstructorNPC.js';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    this.instructorNPC = null;
    this.instructorNPCText = null;
  }

  preload() {
    this.load.image('background-scene1', 'src/assets/scene1.jpg');
    this.load.image('key', 'src/assets/key.png');
    this.instructorNPC = new InstructorNPC(this);
    this.instructorNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene1').setOrigin(0);
    this.door = this.add
      .rectangle(637, 544, 100, 100, undefined)
      .setInteractive();

    this.door.on(
      'pointerup',
      function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start('Scene2');
            }
          });
        }
      },
      this
    );
    this.cactus = this.add
      .rectangle(444, 588, 100, 200, undefined)
      .setInteractive();

    this.cactus.on(
      'pointerup',
      function () {
        this.instructorNPC.dialogContent = "Watch out! It's a cactus!";
        this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 3000);

        // Delay hiding the dialog to prevent conflicts with other dialogs
        this.time.delayedCall(3000, () => {
          this.instructorNPC.hideDialog();
        });
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
        this.instructorNPC.dialogContent = 'You found a key!';
        this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 3000);

        // Delay hiding the dialog to prevent conflicts with other dialogs
        this.time.delayedCall(3000, () => {
          this.instructorNPC.hideDialog();
        });
      },
      this
    );

    this.instructorNPC.create();
    this.instructorNPC.dialogContent = '';
    this.instructorNPC.showDialog(
      'Find the door or explore your surroundings.',
      5000
    );
    this.instructorNPC.instructorNPCImage.setPosition(1529, 1040);
    this.instructorNPC.moveTextPosition(
      1529,
      1040 - this.instructorNPC.instructorNPCImage.height + 20
    );

    this.tweens.add({
      targets: this.instructorNPC.instructorNPCImage,
      y: 900,
      duration: 300,
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
    });
  }
}
