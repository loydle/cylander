import * as Phaser from 'phaser';
import { MainNPC } from '../MainNPC.js';

export class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene3' });
  }

  preload() {
    this.load.image('background-scene3', 'src/assets/scene3.jpg');
    this.mainNPC = new MainNPC(this);
    this.mainNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene3').setOrigin(0);
    this.mainNPC?.create();
    this.mainNPC?.showDialog('Welcome to Scene 3!', 3000);

    this.mainNPC?.mainNPCImage.setPosition(
      this.mainNPC?.initialPosition?.x,
      this.mainNPC?.initialPosition?.y
    );

    this.mainNPC?.moveTextPosition(
      this.mainNPC?.initialPosition?.x,
      this.mainNPC?.initialPosition?.y - this.mainNPC?.mainNPCImage?.height / 2
    );

    this.purpleHitbox = this.add.rectangle(844, 988, 100, 100, 0xfff00ff);

    this.purpleHitbox.isHitbox = true;
    this.purpleHitbox.setScale(1);
    this.purpleHitbox.setInteractive();
    this.add
      .text(
        this.purpleHitbox.getBounds()?.x +
          this.purpleHitbox.getBounds()?.width / 2,
        this.purpleHitbox.getBounds()?.y -
          this.purpleHitbox.getBounds()?.height / 2,
        'Scene2',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

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
                this.scene.start('Scene2');
              }
            }
          );
        }
      },
      this
    );
    debug(this);
  }
}
