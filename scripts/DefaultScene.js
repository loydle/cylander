// DefaultScene.js
import * as Phaser from 'phaser';
import { Robot } from './Robot.js';

export class DefaultScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DefaultScene' });
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

        // Add an interactive object (key image)
        const keyImage = this.add.image(73, 900, 'key');
        keyImage.setInteractive();
        keyImage.setDepth(1);

        this.input.setDraggable(keyImage);

        // Add a cactus object
        this.cactus = this.add.rectangle(444, 588, 100, 200);
        this.cactus.setInteractive();

        // Add a door object
        this.door = this.add.rectangle(637, 544, 100, 100);
        this.door.setInteractive();
        this.door.setOrigin(0.5);
        this.door.setDepth(0);

        // Event listener for the door object
        this.door.on('pointerup', function () {
            this.scene.start('Scene2', { x: keyImage.x, y: keyImage.y });
        }, this);

        // Text to display the coordinates of the key image
        const textCoordinates = this.add.text(keyImage.x, keyImage.y + 60, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', stroke: '#000000', strokeThickness: 4 });
        textCoordinates.setOrigin(0.5);

        // Listen for the 'drag' event to update the text when the key image is dragged
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

            textCoordinates.setText(`x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}`);
            textCoordinates.setPosition(gameObject.x, gameObject.y + 60);
        });

        // Create the robot and show initial dialog
        this.robot.create();
        this.robot.showDialog('Drag the key around or find the right door!');

        // Add a click event to the scene to handle clicks outside the door
        this.input.on('pointerup', this.onSceneClick, this);
    }

    onSceneClick(pointer) {
        // Check if the click event happened on the door
        const doorBounds = this.door.getBounds();
        if (doorBounds.contains(pointer.x, pointer.y)) {
            // Clicked on the door, do nothing
            return;
        }

        // Check if the click event happened on the cactus
        const cactusBounds = this.cactus.getBounds();
        if (cactusBounds.contains(pointer.x, pointer.y)) {
            // Clicked on the cactus, show the "This is a cactus :p" dialog
            this.robot.showDialog('This is a cactus :p');
            return;
        }

        // If clicked elsewhere, show the "Find the door" dialog
        this.robot.showDialog('This is not the door!');
    }
}
