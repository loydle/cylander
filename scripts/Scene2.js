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
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // Add a blue rectangle to Scene2
        const blueRectangle = this.add.rectangle(650, 300, 100, 100, 0x0000ff);
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
