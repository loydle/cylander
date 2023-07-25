// Scene2.js
import * as Phaser from 'phaser';
import { Robot } from './Robot.js';

export class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    preload() {
        this.load.image('scene2', 'assets/scene2.jpg');
        this.load.image('key', 'assets/key.png'); // Load the key image
        this.robot = new Robot(this);
        this.robot.preload();
    }

    create(data) {
        this.add.image(0, 0, 'scene2').setOrigin(0);
        let interactiveObject = this.add.image(data.x, data.y, 'key');
        interactiveObject.setInteractive();
        interactiveObject.setDepth(1);

        this.input.setDraggable(interactiveObject);

        // Add text to display the coordinates
        const textCoordinates = this.add.text(interactiveObject.x, interactiveObject.y + 60, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', stroke: '#000000', strokeThickness: 4 });
        textCoordinates.setOrigin(0.5);

        // Listen for the 'drag' event to update the text when the key image is dragged
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

            textCoordinates.setText(`x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}`);
            textCoordinates.setPosition(gameObject.x, gameObject.y + 60);
        });

        // Add a exit door to Scene2
        const exitDoor = this.add.rectangle(766, 520, 200, 300);
        exitDoor.setInteractive();
        exitDoor.setOrigin(0.5);
        exitDoor.setDepth(0);

        // Add click event to the exit door
        exitDoor.on('pointerup', function () {
            // Switch back to the DefaultScene
            this.scene.start('DefaultScene');
        }, this);

        // Add a text for collision display
        const collisionText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, '', {
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });
        collisionText.setOrigin(0.5);

        // Check for collision between the key and exit door in the update loop
        this.events.on('update', function () {
            if (Phaser.Geom.Rectangle.Overlaps(interactiveObject.getBounds(), exitDoor.getBounds())) {
                collisionText.setText('COLLISION');
            } else {
                collisionText.setText('');
            }
        });

        this.robot.create();
        this.robot.showDialog('Well done :)');
    }
}
