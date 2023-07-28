
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
    this.robot = null;
    this.robotText = null;
  }

  // Preload assets required for the scene
  preload() {
    // Preload background image if provided
    this.load.image("background-scene1", "src/assets/scene1.jpg");
    // Preload actionable items (images) if provided
    
      
    
    
      
    
    
      this.load.image("key", "src/assets/key.png");
    
    // Preload the Robot class assets
    this.robot = new Robot(this);
    this.robot.preload();
  }

  // Create the scene and add elements to it
  create() {
    // Add background image if provided
    this.add.image(0, 0, "background-scene1").setOrigin(0);
    // Add actionable items to the scene
    
      this.door = this.add.rectangle(637, 544, 100, 100, undefined).setInteractive();
      

      // Add animation to the item if provided
      

      // Make the item draggable if required
      

      // Set up actions for the item
      
        this.door.on("pointerup", function () {
          // Show Robot dialog if provided
          
          // Perform transition if provided
          
          this.cameras.main.fadeOut({
            duration: undefined,
            red: undefined,
            green: undefined,
            blue: undefined
          }, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("Scene2");
            }
          });
          
        }, this);
      
    
    
      this.cactus = this.add.rectangle(444, 588, 100, 200, undefined).setInteractive();
      

      // Add animation to the item if provided
      

      // Make the item draggable if required
      

      // Set up actions for the item
      
        this.cactus.on("pointerup", function () {
          // Show Robot dialog if provided
          this.robot.showDialog("Watch out! It's a cactus!", 3000);
          // Perform transition if provided
          
        }, this);
      
    
    
      
      this.key = this.add.image(120, 920, "key").setInteractive();

      // Add animation to the item if provided
      

      // Make the item draggable if required
      
        this.input.setDraggable(this.key);
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
      

      // Set up actions for the item
      
        this.key.on("pointerup", function () {
          // Show Robot dialog if provided
          this.robot.showDialog("You have a key!", 1000);
          // Perform transition if provided
          
        }, this);
      
    

    // Set up the Robot if provided
    
    this.robot.create();
    this.robot.showDialog("Find the door or explore your surroundings.", 30000);
    this.robot.robotImage.setPosition(1529, 1040);
    this.robot.moveTextPosition(1529, 1040 - this.robot.robotImage.height  + 20);

    // Add Robot animation if provided
    this.tweens.add({
      targets: this.robot.robotImage,
      y: 900,duration: 300,ease: 'Linear',yoyo: false,repeat: 0
    });
    
  }
}
