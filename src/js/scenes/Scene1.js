import * as Phaser from 'phaser';

import { MainNPC } from '../MainNPC.js';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
  }

  preload() {
    this.load.image('background-scene1', 'src/assets/scene1.jpg');
    this.load.image('key', 'src/assets/key.png');
    this.mainNPC = new MainNPC(this);
    this.mainNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene1').setOrigin(0);
    this.mainNPC?.create();
    this.mainNPC?.showDialog(
      'Find the door or explore your surroundings.',
      5000
    );

    this.mainNPC?.mainNPCImage.setPosition(1529, 1040);

    this.mainNPC?.moveTextPosition(
      1529,
      1040 - this.mainNPC?.mainNPCImage?.height + 20
    );

    this.tweens.add({
      targets: this.mainNPC?.mainNPCImage,
      y: 900,
      duration: 300,
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
    });
    this.door = this.add.rectangle(637, 544, 260, 200, undefined);

    this.door.isHitbox = true;
    this.door.setInteractive();
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
    this.cactus = this.add.rectangle(420, 570, 130, 220, undefined);

    this.cactus.isHitbox = true;
    this.cactus.setInteractive();
    this.cactus.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = "Watch out! It's a cactus!";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      },
      this
    );
    this.key = this.add.image(120, 920, 'key');
    this.key.setScale(0.6);
    this.key.setInteractive();
    this.input.setDraggable(this.key);
    this.key.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });
    this.physics.world.enable(this.key);
    this.add
      .text(
        this.key.getBounds()?.x + this.key.getBounds()?.width / 2,
        this.key.getBounds()?.y - this.key.getBounds()?.height / 2,
        'text',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

    this.key.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'You found a key!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 5000);
      },
      this
    );
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
  }
}
