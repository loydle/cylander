// DefaultScene.js
import * as Phaser from 'phaser'; // Import Scene from Phaser

export class DefaultScene extends Phaser.Scene {
 constructor() {
     super({ key: 'DefaultScene' });
 }

 preload() {
     this.load.image('background', 'assets/scene1.jpg');
     this.load.image('scene2', 'assets/scene2.jpg'); // Load the new scene (scene2.jpg)
     // Load other assets here (characters, items, etc.)
 }

 create() {
     this.add.image(0, 0, 'background').setOrigin(0);

     // Add an interactive object (rectangle)
     const interactiveObject = this.add.rectangle(400, 300, 100, 100, 0x00ff00);
     interactiveObject.setInteractive();
     interactiveObject.setDepth(1); // Set a higher depth value for the green rectangle

     // Enable dragging for the interactive object
     this.input.setDraggable(interactiveObject);

     const redRectangle = this.add.rectangle(637, 544, 100, 100);
     redRectangle.setInteractive();
     redRectangle.setOrigin(0.5);
     redRectangle.setDepth(0); // Set a lower depth value for the red rectangle

     // Add click event to the red rectangle
     redRectangle.on('pointerup', function () {
         // Switch to the new scene with blue background
         this.scene.start('Scene2', { x: interactiveObject.x, y: interactiveObject.y });
     }, this);

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
 }
}
