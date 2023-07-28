/* eslint-env node */

const fs = require('fs');
const path = require('path');

function readSceneRequirements(sceneFilePath) {
  const sceneRequirements = fs.readFileSync(sceneFilePath, 'utf-8');
  return JSON.parse(sceneRequirements);
}

function generateSceneClass(sceneName, sceneConfig) {
  const { backgroundImage, actions, robot } = sceneConfig;
  const sceneClass = `
import * as Phaser from "phaser";
import { Robot } from "../Robot.js";

export class ${sceneName} extends Phaser.Scene {
  constructor() {
    super({ key: "${sceneName}" });
    this.robot = null;
    this.robotText = null;
  }

  preload() {
    this.load.image("background", "src/assets/${backgroundImage}");
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    this.add.image(0, 0, "background").setOrigin(0);

    // Create interactive elements
    ${actions.map(
      ({ name, position }) =>
        `this.${name} = this.add.rectangle(${position.x}, ${position.y}, 100, 100).setInteractive();`
    ).join('\n    ')}

    this.robot.create();
    this.robot.showDialog("${robot.defaultDialog}", 30000);
    this.robot.robotImage.setPosition(${robot.position.x}, ${robot.position.y});

    ${robot?.animation ? `this.tweens.add({
      targets: this.robot.robotImage,${robot.animation.options} })` : ''}


    // Set up actions for interactive elements
    ${actions
      .map(({ name, actions }) => {
        return actions
          .map(
            ({ type, transitionTo, transition }) =>
              `this.${name}.on("${type.toLowerCase()}", () => {
                ${
                  transition
                    ? `this.cameras.main.${transition.type}(${transition.options}, (camera, progress) => {
                      if (progress === 1) {
                        this.scene.start("${transitionTo}");
                      }
                    });`
                    : ''
                }
              });`
          )
          .join('\n    ');
      })
      .join('\n    ')}
  }
}
`;

  return sceneClass;
}

function writeSceneToFile(sceneName, sceneClass) {
  const scenesDir = path.join(__dirname, 'scenes');
  if (!fs.existsSync(scenesDir)) {
    fs.mkdirSync(scenesDir);
  }

  const sceneFilePath = path.join(scenesDir, `${sceneName}.js`);
  fs.writeFileSync(sceneFilePath, sceneClass, 'utf-8');
  console.log(`Scene "${sceneName}" generated and saved to file.`);
}

function generateScenesForTemplate(sceneTemplate) {
  const { title, actions, robot } = sceneTemplate;
  const sceneClass = generateSceneClass(title, { backgroundImage: sceneTemplate.backgroundImage, actions, robot });
  writeSceneToFile(title, sceneClass);
}

function generateAllScenes(sceneTemplates) {
  sceneTemplates.forEach((sceneTemplate) => {
    generateScenesForTemplate(sceneTemplate);
  });
}

const sceneTemplatesDir = path.join(__dirname, 'scenes-requierments');
const sceneTemplates = fs
  .readdirSync(sceneTemplatesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const sceneFilePath = path.join(sceneTemplatesDir, file);
    return readSceneRequirements(sceneFilePath);
  });

generateAllScenes(sceneTemplates);
