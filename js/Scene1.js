import * as Phaser from 'phaser';
import { Robot } from './Robot.js';

export class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
        this.door = null;
        this.cactus = null;

    }

    preload() {
        this.load.image('background', 'assets/scene1.jpg');
        this.load.image('scene2', 'assets/scene2.jpg');
        this.load.image('key', 'assets/key.png');
        this.robot = new Robot(this);
        this.robot.preload();
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0);

        // Key image
        this.key = this.add.image(73, 900, 'key');
        this.key.setInteractive().setDepth(1);
        this.input.setDraggable(this.key);

        // Cactus object
        this.cactus = this.add.rectangle(444, 588, 100, 200).setInteractive();

        // Door object
        this.door = this.add.rectangle(637, 544, 100, 100).setInteractive().setOrigin(0.5).setDepth(0);
        this.door.on('pointerup', function () {
            this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
                if (progress === 1) {
                    this.scene.start('Scene2', { x: this.key.x, y: this.key.y });
                }
            });
        }, this);

        // Text for displaying the coordinates of the key image
        const textCoordinates = this.add.text(this.key.x, this.key.y + 60, '', {
            fontFamily: 'Arial',
            fontSize: 16,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            textCoordinates.setText(`x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}`);
            textCoordinates.setPosition(gameObject.x, gameObject.y + 60);
        });

        // Robot
        this.robot.create();
        this.robot.showDialog('Drag the key around or find the right door!');

        // Click event to handle clicks outside the door
        this.input.on('pointerup', this.onSceneClick, this);

    }

    onSceneClick(pointer) {
        const doorBounds = this.door.getBounds();
        if (doorBounds.contains(pointer.x, pointer.y)) {
            // Clicked on the door, do nothing
            return;
        }

        const cactusBounds = this.cactus.getBounds();
        if (cactusBounds.contains(pointer.x, pointer.y)) {
            // Clicked on the cactus, show the "This is a cactus :p" dialog
            this.robot.showDialog('This is a cactus :p');
        } else {
            // Clicked elsewhere, show the "Find the door" dialog
            this.robot.showDialog('This is not the door!');
        }
    }
}
