
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class DefaultScene extends Phaser.Scene {
  constructor() {
    super({ key: "DefaultScene" });
    this.robot = null;
    this.robotText = null;
  }

  // Preload assets required for the scene
  preload() {
    // Preload background image if provided
    
    // Preload actionable items (images) if provided
    
      this.load.image("logo", "src/assets/logo-cylander.svg");
    
    // Preload the Robot class assets
    this.robot = new Robot(this);
    this.robot.preload();
  }

  // Create the scene and add elements to it
  create() {
    // Add background image if provided
    
    // Add actionable items to the scene
    
      
      this.logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "logo").setInteractive();

      // Add animation to the item if provided
      
      this.tweens.add({
        targets: this.logo,
        scaleX: 1.5,scaleY: 1.5,ease: 'Linear',duration: 800,yoyo: true,repeat: -1
      });
      

      // Make the item draggable if required
      

      // Set up actions for the item
      
        this.logo.on("pointerup", function () {
          // Show Robot dialog if provided
          
          // Perform transition if provided
          
          this.cameras.main.fadeOut(500, 0,0,0, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("Scene1");
            }
          });
          
        }, this);
      
    

    // Set up the Robot if provided
    
  }
}
