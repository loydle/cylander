import * as Phaser from "phaser";

export class DefaultScene extends Phaser.Scene {
  constructor() {
    super({ key: "DefaultScene" });
  }

  preload() {
    this.load.image("logo", "src/assets/logo-cylander.svg");
  }

  create() {
    this.logo = this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "logo")
      .setOrigin(0.5);
    this.logo.setScale(1, 1);

    // Add animation for the logo to grow and scale back
    this.tweens.add({
      targets: this.logo,
      scaleX: 1.5,
      scaleY: 1.5,
      ease: "Linear",
      duration: 800,
      yoyo: true,
      repeat: -1,
    });

    this.input.on(
      "pointerup",
      function () {
        // Add a fade-out transition when transitioning to Scene1
        this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
          if (progress === 1) {
            this.scene.start("Scene1");
          }
        });
      },
      this,
    );
  }
}
