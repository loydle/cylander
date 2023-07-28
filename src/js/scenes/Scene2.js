
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2" });
    this.robot = null;
    this.robotText = null;
  }

  // Preload assets required for the scene
  preload() {
    // Preload background image if provided
    this.load.image("background-scene2", "src/assets/scene2.jpg");
    // Preload actionable items (images) if provided
    
      
    
    
      
    
    // Preload the Robot class assets
    this.robot = new Robot(this);
    this.robot.preload();
  }

  // Create the scene and add elements to it
  create() {
    // Add background image if provided
    this.add.image(0, 0, "background-scene2").setOrigin(0);
    // Add actionable items to the scene
    
      this.exitDoor = this.add.rectangle(766, 520, 200, 300, ).setInteractive();
      

      // Add animation to the item if provided
      

      // Make the item draggable if required
      

      // Set up actions for the item
      
        this.exitDoor.on("pointerup", function () {
          // Show Robot dialog if provided
          
          // Perform transition if provided
          
          this.cameras.main.zoomTo({
            duration: undefined,
            red: undefined,
            green: undefined,
            blue: undefined
          }, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("Scene1");
            }
          });
          
        }, this);
      
    
    
      this.somehitbox = this.add.rectangle(644, 988, 100, 100, 0xfffff00).setInteractive();
      

      // Add animation to the item if provided
      

      // Make the item draggable if required
      

      // Set up actions for the item
      
        this.somehitbox.on("pointerup", function () {
          // Show Robot dialog if provided
          this.robot.showDialog("This is just a visible hitbox!", 3000);
          // Perform transition if provided
          
        }, this);
      
    

    // Set up the Robot if provided
    
    this.robot.create();
    this.robot.showDialog("Well done!", 30000);
    this.robot.robotImage.setPosition(1055, 488);
    this.robot.moveTextPosition(1055, 488 - this.robot.robotImage.height / 2);

    // Add Robot animation if provided
    this.tweens.add({
      targets: this.robot.robotImage,
      y: 530,duration: 500,ease: 'Linear',yoyo: true,repeat: -1
    });
    
  }
}
