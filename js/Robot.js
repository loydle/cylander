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
        // Robot image
        this.robotImage = this.scene.add.image(1529, 1040, 'robot').setDepth(2);

        // Text object for displaying the dialog
        this.dialogText = this.scene.add.text(1529, 740, '', {
            fontFamily: 'Arial',
            fontSize: 24,
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: {
                x: 20,
                y: 10,
            },
        }).setOrigin(0.5).setDepth(2).setVisible(false); // Hide the dialog initially
    }

    showDialog(text, delay = 2000) {
        if (this.dialogVisible) {
            // Hide existing dialog if it's already visible
            this.dialogText.setVisible(false);
            this.dialogVisible = false;
            this.scene.time.delayedCall(delay, () => {
                this.dialogText.setText(text);
                this.dialogText.setVisible(true);
                this.dialogVisible = true;
            });
        } else {
            // Show dialog if it's not already visible
            this.dialogText.setText(text);
            this.dialogText.setVisible(true);
            this.dialogVisible = true;
            this.scene.time.delayedCall(delay, () => {
                this.dialogText.setVisible(false);
                this.dialogVisible = false;
            });
        }
    }

    // Function to move the position of the text
    moveTextPosition(x, y) {
        this.dialogText.setPosition(x, y);
    }
}
