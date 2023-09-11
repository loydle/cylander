import * as Phaser from 'phaser';
import { debug } from '../debug.js';

export class DefaultScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DefaultScene' });
  }

  preload() {
    this.load.image('logo', 'src/assets/logo-cylander.svg');
  }

  create() {
    let isTransitionInProgress = false;
    this.cameras.main.setBackgroundColor(0xffffff);
    this.logo = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'logo'
    );
    this.logo.setScale(1.5);
    this.logo.setInteractive();
    this.tweens.add({
      targets: this.logo,
      scaleX: 2,
      scaleY: 2,
      ease: 'Linear',
      duration: 800,
      yoyo: true,
      repeat: -1,
    });
    this.logo2 = this.add.text(
      this.cameras.main.centerX,
      750,
      'Click anywhere to start!',
      {
        font: '36px monospace',
        fill: '#ffffff',
        backgroundColor: '#333',
        padding: { x: 10, y: 10 },
      }
    );
    this.logo2.setOrigin(0.5, 0);
    this.logo2.setInteractive();
    this.input.on(
      'pointerup',
      function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;

          this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start('Scene1');
            }
          });
        }
      },
      this
    );
    debug(this);
  }
}
