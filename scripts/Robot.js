// Robot.js
import * as Phaser from 'phaser';

export class Robot {
    constructor(scene) {
        this.scene = scene;
        this.dialogVisible = false;
        this.dialogText = null;
    }

    preload() {
        this.scene.load.image('robot', 'assets/robot.png');
    }

    create() {
        this.robotImage = this.scene.add.image(1529, 951, 'robot');
        this.robotImage.setDepth(2);

        // Create a text object for displaying the dialog
        this.dialogText = this.scene.add.text(1529, 760, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 10,
            },
        });
        this.dialogText.setOrigin(0.5);
        this.dialogText.setDepth(2);
        this.dialogText.setVisible(false); // Hide the dialog initially
    }

    showDialog(text) {
        if (this.dialogVisible) {
            // Hide existing dialog if it's already visible
            this.dialogText.setVisible(false);
            this.dialogVisible = false;
            this.scene.time.delayedCall(2000, () => {
                this.dialogText.setText(text);
                this.dialogText.setVisible(true);
                this.dialogVisible = true;
            });
        } else {
            // Show dialog if it's not already visible
            this.dialogText.setText(text);
            this.dialogText.setVisible(true);
            this.dialogVisible = true;
            this.scene.time.delayedCall(2000, () => {
                this.dialogText.setVisible(false);
                this.dialogVisible = false;
            });
        }
    }
}
