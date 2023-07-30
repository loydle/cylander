// Scene1.js
import * as Phaser from 'phaser';
import { InstructorNPC } from '../InstructorNPC.js';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene1' });
    this.door = null;
    this.cactus = null;
    this.arrow = null;
    this.hintText = null;
    this.clickCount = 0;
    this.hintShown = false;
  }

  preload() {
    this.load.image('background', 'src/assets/scene1.jpg');
    this.load.image('scene2', 'src/assets/scene2.jpg');
    this.load.image('key', 'src/assets/key.png');
    this.instructorNPC = new InstructorNPC(this);
    this.instructorNPC.preload();
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0);

    this.key = this.add.image(73, 900, 'key');
    this.key.setInteractive().setDepth(1);
    this.input.setDraggable(this.key);

    this.cactus = this.add.rectangle(444, 588, 100, 200).setInteractive();

    this.door = this.add
      .rectangle(637, 544, 100, 100)
      .setInteractive()
      .setOrigin(0.5)
      .setDepth(0);
    this.door.on(
      'pointerup',
      function () {
        this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            this.scene.start('Scene2', { x: this.key.x, y: this.key.y });
          }
        });
      },
      this
    );

    const textCoordinates = this.add
      .text(this.key.x, this.key.y + 60, '', {
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
      textCoordinates.setText(
        `Current Position: x ${gameObject.x.toFixed(
          0
        )}, y ${gameObject.y.toFixed(0)}`
      );
      textCoordinates.setPosition(gameObject.x, gameObject.y + 60);
      this.hideHint();
    });

    this.instructorNPC.create();
    this.instructorNPC.showDialog(
      'Find the door or explore your surroundings.',
      30000
    );

    this.tweens.add({
      targets: this.instructorNPC.robotImage,
      y: 951,
      duration: 300,
      ease: 'Linear',
      yoyo: false,
      repeat: 0,
    });
    this.input.on('pointerup', (pointer) => {
      const doorBounds = this.door.getBounds();
      if (doorBounds.contains(pointer.x, pointer.y)) {
        this.clickCount = 0;
        this.hideHint();
        return;
      }

      const cactusBounds = this.cactus.getBounds();
      if (cactusBounds.contains(pointer.x, pointer.y)) {
        this.instructorNPC.showDialog("Watch out! It's a cactus!");
      } else {
        this.instructorNPC.showDialog('Hmmm, not the door! Keep exploring.');
        this.clickCount++;
        if (this.clickCount >= 5 && !this.hintShown) {
          this.showHintArrow(580, 550);
        }
      }
    });
  }

  showHintArrow(x, y) {
    this.arrow = this.add.graphics();
    this.arrow.fillStyle(0xff0000, 0.8);
    this.arrow.lineStyle(2, 0x000000, 1);

    const arrowWidth = 20;
    const arrowHeight = 40;
    const arrowOffsetX = 10;

    this.arrow.beginPath();
    this.arrow.moveTo(x - arrowOffsetX, y);
    this.arrow.lineTo(x - arrowOffsetX + arrowWidth, y + arrowHeight / 2);
    this.arrow.lineTo(x - arrowOffsetX, y + arrowHeight);
    this.arrow.closePath();
    this.arrow.fillPath();
    this.arrow.strokePath();

    this.tweens.add({
      targets: this.arrow,
      y: '-=10',
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    const hintTextContent = 'The door is that way!';
    this.hintText = this.add
      .text(x, y + 60, hintTextContent, {
        fontFamily: 'Arial',
        fontSize: 20,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4,
      })
      .setOrigin(0.5);

    this.hintShown = true;
  }

  hideHint() {
    if (this.arrow) {
      this.arrow.destroy();
    }
    if (this.hintText) {
      this.hintText.destroy();
    }
    this.hintShown = false;
    this.clickCount = 0;
  }
}
