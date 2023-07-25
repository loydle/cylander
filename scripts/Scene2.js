// Scene2.js
import * as Phaser from 'phaser';

export class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    preload() {
        this.load.image('scene2', 'assets/scene2.jpg');
    }

    create(data) {
        this.add.image(0, 0, 'scene2').setOrigin(0);

        let interactiveObject = this.add.rectangle(data.x, data.y, 100, 100, 0x00ff00);
        interactiveObject.setInteractive();
        interactiveObject.setDepth(1);

        this.input.setDraggable(interactiveObject);

     // Add text to display the coordinates
     const textCoordinates = this.add.text(interactiveObject.x, interactiveObject.y + 60, '', { fontFamily: 'Arial', fontSize: 16, color: '#ffffff', stroke: '#000000', strokeThickness: 4 });
     textCoordinates.setOrigin(0.5);

     // Listen for the 'drag' event to update the text when the green rectangle is dragged
     this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
         // Update the position of the object based on the pointer's position
         gameObject.x = dragX;
         gameObject.y = dragY;

         // Update the text with the current coordinates
         textCoordinates.setText(`x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}`);
         textCoordinates.setPosition(gameObject.x, gameObject.y + 60);
     });

        // Add a blue rectangle to Scene2
        const blueRectangle = this.add.rectangle(766, 520, 100, 100, );
        blueRectangle.setInteractive();
        blueRectangle.setOrigin(0.5);
        blueRectangle.setDepth(0);

        // Add click event to the blue rectangle
        blueRectangle.on('pointerup', function () {
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

        // Check for collision between the green and blue rectangles in the update loop
        this.events.on('update', function () {
            if (Phaser.Geom.Rectangle.Overlaps(interactiveObject.getBounds(), blueRectangle.getBounds())) {
                collisionText.setText('COLLISION');
            } else {
                collisionText.setText('');
            }
        });
    }
}
