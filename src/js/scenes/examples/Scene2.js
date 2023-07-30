// Scene2.js
import * as Phaser from 'phaser';
import { InstructorNPC } from '../InstructorNPC.js';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
  }

  preload() {
    this.load.image('scene2', 'src/assets/scene2.jpg');
    this.load.image('key', 'src/assets/key.png');
    this.instructorNPC = new InstructorNPC(this);
    this.instructorNPC.preload();
  }

  create(data) {
    this.add.image(0, 0, 'scene2').setOrigin(0);
    this.key = this.add.image(data.x, data.y, 'key');
    this.key.setInteractive();
    this.key.setDepth(1);

    this.input.setDraggable(this.key);
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.exitDoor = this.add.rectangle(766, 520, 200, 300);
    this.exitDoor.setInteractive();
    this.exitDoor.setOrigin(0.5);
    this.exitDoor.setDepth(0);

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

    this.instructorNPC.create();
    this.instructorNPC.instructorNPCImage.setPosition(1055, 490);

    this.tweens.add({
      targets: this.instructorNPC.instructorNPCImage,
      y: 530,
      duration: 500,
      ease: 'Linear',
      yoyo: true,
      repeat: -1,
    });

    this.instructorNPC.moveTextPosition(1055, 300);

    this.instructorNPC.showDialog(
      'Well done! You found the door!\nNow, explore further and find the exit!',
      30000
    );
  }
}
