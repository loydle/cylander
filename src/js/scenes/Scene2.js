import * as Phaser from 'phaser';
import { MainNPC } from '../MainNPC.js';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Scene2' });
  }

  preload() {
    this.load.image('background-scene2', 'src/assets/scene2.jpg');
    this.mainNPC = new MainNPC(this);
    this.mainNPC.preload();
  }

  create() {
    let isTransitionInProgress = false;
    this.add.image(0, 0, 'background-scene2').setOrigin(0);

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
    this.exitDoor = this.add.rectangle(766, 520, 200, 300, undefined);
    this.exitDoor.setInteractive();
    this.physics.world.enable(this.exitDoor);
    this.exitDoor.on(
      'pointerup',
      function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;

          this.cameras.main.pan(766, 520);

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
    this.redHitbox = this.add.rectangle(1244, 988, 100, 100, 0xfff0000);
    this.redHitbox.setInteractive();
    this.add
      .text(
        this.redHitbox.getBounds()?.x + this.redHitbox.getBounds()?.width / 2,
        this.redHitbox.getBounds()?.y - this.redHitbox.getBounds()?.height / 2,
        'Scene3',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

    this.redHitbox.on(
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
                this.scene.start('Scene3');
              }
            }
          );
        }
      },
      this
    );
    this.purpleHitbox = this.add.rectangle(844, 988, 100, 100, 0xfff00ff);
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

          this.cameras.main.pan(
            this.whiteHitbox?.getBounds()?.x,
            this.whiteHitbox?.getBounds()?.y
          );
          this.cameras.main.zoomTo(
            4,
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
    this.yellowHitbox = this.add.rectangle(644, 988, 100, 100, 0xfffff00);
    this.yellowHitbox.setInteractive();
    this.input.setDraggable(this.yellowHitbox);
    this.yellowHitbox.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.physics.world.enable(this.yellowHitbox);
    this.add
      .text(
        this.yellowHitbox.getBounds()?.x +
          this.yellowHitbox.getBounds()?.width / 2,
        this.yellowHitbox.getBounds()?.y -
          this.yellowHitbox.getBounds()?.height / 2,
        'Label',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

    this.yellowHitbox.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'This is just a visible hitbox!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      },
      this
    );
    this.yellowHitbox2 = this.add.rectangle(244, 988, 100, 100, 0xfffff00);
    this.yellowHitbox2.setInteractive();
    this.input.setDraggable(this.yellowHitbox2);
    this.yellowHitbox2.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.physics.world.enable(this.yellowHitbox2);
    this.add
      .text(
        this.yellowHitbox2.getBounds()?.x +
          this.yellowHitbox2.getBounds()?.width / 2,
        this.yellowHitbox2.getBounds()?.y -
          this.yellowHitbox2.getBounds()?.height / 2,
        'Label',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

    this.yellowHitbox2.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'This is just a visible hitbox!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      },
      this
    );

    this.physics.add.overlap(this.yellowHitbox2, this.yellowHitbox, () => {
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

      this.mainNPC.dialogContent = 'Collide event dialog';
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
    });
    this.whiteHitbox = this.add.rectangle(1044, 988, 100, 100, 0xfffffff);
    this.whiteHitbox.setInteractive();
    this.input.setDraggable(this.whiteHitbox);
    this.whiteHitbox.on('pointerdown', function () {
      this.scene.children.bringToTop(this);
    });

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.physics.world.enable(this.whiteHitbox);
    this.add
      .text(
        this.whiteHitbox.getBounds()?.x +
          this.whiteHitbox.getBounds()?.width / 2,
        this.whiteHitbox.getBounds()?.y -
          this.whiteHitbox.getBounds()?.height / 2,
        'Label',
        {
          font: '20px Arial',
          fill: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 5, y: 5 },
        }
      )
      .setOrigin(0.5);

    this.whiteHitbox.on(
      'pointerup',
      function () {
        this.mainNPC.dialogContent = 'Find something to interact with!';
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 1000);
      },
      this
    );

    this.physics.add.overlap(this.whiteHitbox, this.exitDoor, () => {
      this.mainNPC.dialogContent = 'Something happend!';
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 5000);
    });
    this.physics.add.overlap(this.whiteHitbox, this.yellowHitbox, () => {
      this.mainNPC.dialogContent = 'Boom!';
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 5000);
    });
  }
}
