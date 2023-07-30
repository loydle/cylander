import * as Phaser from 'phaser';
import { MainNPC } from '../MainNPC.js';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
    this.mainNPC = null;
    this.mainNPCText = null;
  }

  preload() {
    this.load.image('background-scene2', 'src/assets/scene2.jpg');
    this.mainNPC = new MainNPC(this);
    this.mainNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene2').setOrigin(0);
    this.exitDoor = this.add
      .rectangle(766, 520, 200, 300, undefined)
      .setInteractive();
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
    this.purpleHitbox = this.add
      .rectangle(844, 988, 100, 100, 0xfff00ff)
      .setInteractive();

    this.purpleHitbox.on(
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
    this.yellowHitbox = this.add
      .rectangle(644, 988, 100, 100, 0xfffff00)
      .setInteractive();

    this.input.setDraggable(this.yellowHitbox);
    this.yellowHitbox.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.physics.world.enable(this.yellowHitbox);
    this.yellowHitbox.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'This is just a visible hitbox!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      },
      this
    );
    this.whiteObject = this.add
      .rectangle(1044, 988, 100, 100, 0xfffffff)
      .setInteractive();

    this.input.setDraggable(this.whiteObject);
    this.whiteObject.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.physics.world.enable(this.whiteObject);
    this.whiteObject.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'Find something to interact with!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 1000);
      },
      this
    );

    this.physics.add.overlap(this.whiteObject, this.exitDoor, () => {
      this.mainNPC.dialogContent = 'Something happend!';
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 5000);
    });

    this.physics.add.overlap(this.whiteObject, this.yellowHitbox, () => {
      this.mainNPC.dialogContent = 'Boom!';
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 5000);
    });

    this.mainNPC.create();
    this.mainNPC.showDialog('Welcome to Scene 2!', 3000);
    this.mainNPC.mainNPCImage.setPosition(1055, 488);
    this.mainNPC.moveTextPosition(
      1055,
      488 - this.mainNPC.mainNPCImage.height / 2
    );

    this.tweens.add({
      targets: this.mainNPC.mainNPCImage,
      y: 530,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });
  }
}
