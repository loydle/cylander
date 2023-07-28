
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
    this.robot = null;
    this.robotText = null;
  }

  preload() {
    this.load.image("background", "src/assets/scene1.jpg");

    
    
    this.load.image("key", "src/assets/key.png");
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    
      this.door = this.add.rectangle(637, 544, 100, 100).setInteractive();
      
      

      
      
            this.door.on("pointerup", () => {
            
            this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
                if (progress === 1) {
                  this.scene.start("Scene2");
                }
            });
        });
      
      this.cactus = this.add.rectangle(444, 588, 100, 200).setInteractive();
      
      

      
      
            this.cactus.on("pointerup", () => {
            this.robot.showDialog("Watch out! It's a cactus!");
            
        });
      
      
      this.key = this.add.image(120, 920, "key").setInteractive();
      

      
        this.input.setDraggable(this.key);
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
        
      
            this.key.on("pointerup", () => {
            this.robot.showDialog("You have a key!");
            
        });
      

    
    this.robot.create();
    this.robot.showDialog("Find the door or explore your surroundings.", 30000);
    this.robot.robotImage.setPosition(1529, 1040);

    this.tweens.add({targets: this.robot.robotImage,y: 951, duration: 300, ease: 'Linear', yoyo: false, repeat: 0, })

    
  }
}
