
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class DefaultScene extends Phaser.Scene {
  constructor() {
    super({ key: "DefaultScene" });
    this.robot = null;
    this.robotText = null;
  }

  preload() {
    
    
      this.load.image("logo", "src/assets/logo-cylander.svg");
    
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    
    
      
      this.logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "logo").setInteractive();

      
      this.tweens.add({
        targets: this.logo,
        scaleX: 1.5,scaleY: 1.5,ease: 'Linear',duration: 800,yoyo: true,repeat: -1
      });
      

      

      
        this.logo.on("pointerup", function () {
          
          
          this.cameras.main.fadeOut(500, 0,0,0, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("Scene1");
            }
          });
          
        }, this);
      
    

    
  }
}
