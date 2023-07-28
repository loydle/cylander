/* eslint-env node */

const fs = require('fs');
const path = require('path');

// Helper function to read scene requirements from JSON file
function readSceneRequirements(sceneFilePath) {
  const sceneRequirements = fs.readFileSync(sceneFilePath, 'utf-8');
  return JSON.parse(sceneRequirements);
}

// Function to generate the scene class based on the scene configuration
function generateSceneClass(sceneName, sceneConfig) {
  // Destructure the sceneConfig object
  const { backgroundImage, actionableItems, robot } = sceneConfig;
  // Generate the scene class as a template string
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
    ${backgroundImage ? `this.load.image("background-${sceneName.toLowerCase()}", "src/assets/${backgroundImage}");` : ''}
    ${actionableItems.map(({ name, type, image }) => `
      ${type === "image" ? `this.load.image("${name}", "${image.url}");` : ''}
    `).join('\n    ')}
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    ${backgroundImage ? `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);` : ''}
    ${actionableItems.map(({ name, type, position, width, height, actions, isDraggable, animation, backgroundColor }) => `
      ${type === "hitbox" ? `this.${name} = this.add.rectangle(${position.x}, ${position.y}, ${width}, ${height}, ${backgroundColor}).setInteractive();` : ''}
      ${type === "image" ? `this.${name} = this.add.image(${position.x}, ${position.y}, "${name}").setInteractive();` : ''}

      ${animation ? `
      this.tweens.add({
        targets: this.${name},
        ${Object.entries(animation.options).map(([key, value]) => `${key}: ${typeof value === 'string' ? `'${value}'` : value}`).join(',')}
      });
      ` : ''}

      ${isDraggable ? `
        this.input.setDraggable(this.${name});
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
      ` : ''}

      ${actions.map(({ type, transitionTo, transition, robot }) => `
        this.${name}.on("${type.toLowerCase()}", function () {
          ${robot && robot.dialog?.content ? `this.robot.showDialog("${robot.dialog?.content}", ${robot.dialog?.delay ? robot.dialog.delay : '3000'});` : ''}
          ${transition ? `
          this.cameras.main.${transition.type}(${transition?.options}, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("${transitionTo}");
            }
          });
          ` : ''}
        }, this);
      `).join('\n      ')}
    `).join('\n    ')}

    ${robot ? `
    this.robot.create();
    this.robot.showDialog("${robot.defaultDialog}", 30000);
    this.robot.robotImage.setPosition(${robot.position.x}, ${robot.position.y});
    this.robot.moveTextPosition(${robot.position.x}, ${robot.dialogMargin?.top ? `${robot.position.y} - this.robot.robotImage.height  + ${robot.dialogMargin.top}`  : `${robot.position.y} - this.robot.robotImage.height / 2`});

    ${robot?.animation ? `this.tweens.add({
      targets: this.robot.robotImage,
      ${Object.entries(robot.animation.options).map(([key, value]) => `${key}: ${typeof value === 'string' ? `'${value}'` : value}`).join(',')}
    });` : ''}
    ` : ''}
  }
}
`;

  return sceneClass;
}

// Helper function to write the scene class to a file
function writeSceneToFile(sceneName, sceneClass) {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    fs.mkdirSync(scenesDir);
  }

  const sceneFilePath = path.join(scenesDir, `${sceneName}.js`);
  fs.writeFileSync(sceneFilePath, sceneClass, 'utf-8');
  console.log(`\x1b[32mScene "${sceneName}" generated and saved to file.\x1b[0m`);
}

function deleteSceneFiles() {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    return;
  }

  const sceneFiles = fs.readdirSync(scenesDir).filter((file) => file.endsWith('.js'));
  sceneFiles.forEach((file) => {
    const filePath = path.join(scenesDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted scene file: ${file}`);
  });
}

// Generate scenes based on scene templates
function generateScenesForTemplate(sceneTemplate) {
  const { title, actionableItems, robot } = sceneTemplate;
  const sceneClass = generateSceneClass(title, {
    backgroundImage: sceneTemplate.backgroundImage,
    actionableItems,
    robot,
  });
  writeSceneToFile(title, sceneClass);
}

// Generate all scenes from scene templates
function generateAllScenes(sceneTemplates) {
  console.log('\x1b[33mGenerating scenes...\x1b[0m');
  deleteSceneFiles();
  sceneTemplates.forEach((sceneTemplate) => {
    generateScenesForTemplate(sceneTemplate);
  });
  console.log('\x1b[33mAll scenes generated successfully.\x1b[0m');
}

// Directory containing scene templates in JSON format
const sceneTemplatesDir = path.join(__dirname, 'scenes-requierments');
const sceneTemplates = fs
  .readdirSync(sceneTemplatesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const sceneFilePath = path.join(sceneTemplatesDir, file);
    return readSceneRequirements(sceneFilePath);
  });

// Generate scenes based on the templates
generateAllScenes(sceneTemplates);
