import * as Phaser from 'phaser';
import { InstructorNPC } from '../InstructorNPC.js';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
    this.instructorNPC = null;
    this.instructorNPCText = null;
  }

  preload() {
    this.load.image('background-scene2', 'src/assets/scene2.jpg');
    this.instructorNPC = new InstructorNPC(this);
    this.instructorNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene2').setOrigin(0);
    this.exitDoor = this.add.rectangle(766, 520, 200, 300).setInteractive();
    this.physics.world.enable(this.exitDoor);
    this.exitDoor.on(
      'pointerup',
      function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.zoomTo(
            1.5,
            1000,
            'Linear',
            true,
            (camera, progress) => {
              if (progress === 1) {
                isTransitionInProgress = false;
                this.scene.start('Scene1');
              }
            }
          );
        }
      },
      this
    );
    this.exitDoor2 = this.add
      .rectangle(844, 988, 100, 100, 0xfff00ff)
      .setInteractive();

    this.exitDoor2.on(
      'pointerup',
      function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.zoomTo(
            1.5,
            1000,
            'Linear',
            true,
            (camera, progress) => {
              if (progress === 1) {
                isTransitionInProgress = false;
                this.scene.start('DefaultScene');
              }
            }
          );
        }
      },
      this
    );
    this.somehitbox = this.add
      .rectangle(644, 988, 100, 100, 0xfffff00)
      .setInteractive();
    this.physics.world.enable(this.somehitbox);
    this.somehitbox.on(
      'pointerup',
      function () {
        this.instructorNPC.dialogContent = 'This is just a visible hitbox!';
        this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 3000);

        // Delay hiding the dialog to prevent conflicts with other dialogs
        this.time.delayedCall(3000, () => {
          this.instructorNPC.hideDialog();
        });
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
        this.instructorNPC.dialogContent = 'Find something to interact with!';
        this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 1000);

        // Delay hiding the dialog to prevent conflicts with other dialogs
        this.time.delayedCall(1000, () => {
          this.instructorNPC.hideDialog();
        });
      },
      this
    );

    this.physics.add.collider(this.whiteObject, this.exitDoor, () => {
      this.instructorNPC.dialogContent = 'Something happend!';
      this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 5000);

      // Delay hiding the dialog to prevent conflicts with other dialogs
      this.time.delayedCall(5000, () => {
        this.instructorNPC.hideDialog();
      });
    });

    this.physics.add.collider(this.whiteObject, this.somehitbox, () => {
      this.instructorNPC.dialogContent = 'Boom!';
      this.instructorNPC.showDialog(this.instructorNPC.dialogContent, 5000);

      // Delay hiding the dialog to prevent conflicts with other dialogs
      this.time.delayedCall(5000, () => {
        this.instructorNPC.hideDialog();
      });
    });

    this.instructorNPC.create();
    this.instructorNPC.dialogContent = '';
    this.instructorNPC.showDialog('Welcome to Scene 2!', 3000);
    this.instructorNPC.instructorNPCImage.setPosition(1055, 488);
    this.instructorNPC.moveTextPosition(
      1055,
      488 - this.instructorNPC.instructorNPCImage.height / 2
    );

    this.tweens.add({
      targets: this.instructorNPC.instructorNPCImage,
      y: 530,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });
  }
}
