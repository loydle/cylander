import * as Phaser from "phaser";
import { DefaultScene } from "./scenes/DefaultScene.js";
import { Scene1 } from "./scenes/Scene1.js";
import { Scene2 } from "./scenes/Scene2.js";

// Configuration for the game
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: "game-container",
  scene: [DefaultScene, Scene1, Scene2], // Add all scene classes to the scene configuration
};

// Create the game instance
const game = new Phaser.Game(config);

// Function to resize the game to fit the screen proportionally
function resizeGame() {
  const canvas = document.querySelector("canvas");
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}

// Call the resize function initially to fit the game on the screen
resizeGame();

// Add an event listener for the window resize event
window.addEventListener("resize", resizeGame);
