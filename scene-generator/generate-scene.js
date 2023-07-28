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
    ${backgroundImage ? `this.load.image("background", "src/assets/${backgroundImage}");`: ''}

    ${actions
      .map(({ name, type, image }) => {
        return type === "image" ? `this.load.image("${name}", "${image.url}");` : '';
      })
      .join('\n    ')}
    this.robot = new Robot(this);
    this.robot.preload();
  }

  create() {
    ${backgroundImage ? `this.add.image(0, 0, "background").setOrigin(0);`: ''}

    ${actions.map(
      ({ name, type, position, width, height, actions, isDraggable, animation }) =>
      `
      ${type === "hitbox" ? `this.${name} = this.add.rectangle(${position.x}, ${position.y}, ${width}, ${height}).setInteractive();` : '' }
      ${type === "image" ? `this.${name} = this.add.image(${position.x}, ${position.y}, "${name}").setInteractive();` : '' }
      ${animation  ? `
      this.tweens.add({
        targets: this.${name}, ${JSON.stringify(animation.options).replaceAll(/[{}]/g, '')}
      });

      `: ''}

      ${isDraggable ? `
        this.input.setDraggable(this.${name});
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
        ` : ''}
      ${actions.map(({ type, transitionTo, transition, robot}) => { return `
            this.${name}.on("${type.toLowerCase()}", () => {
            ${robot && robot.dialog ? `this.robot.showDialog("${robot.dialog}");` : ''}
            ${transition ?
              `this.cameras.main.${transition.type}(${transition.options}, (camera, progress) => {
                if (progress === 1) {
                  this.scene.start("${transitionTo}");
                }
            });` : ''
          }
        });
      `;
    }).join('')}`).join('')}

    ${robot ? `
    this.robot.create();
    this.robot.showDialog("${robot.defaultDialog}", 30000);
    this.robot.robotImage.setPosition(${robot.position.x}, ${robot.position.y});

    ${robot?.animation ? `this.tweens.add({targets: this.robot.robotImage,${robot.animation.options} })` : ''}

    ` : ''}
  }
}
`;

  return sceneClass;
}

function writeSceneToFile(sceneName, sceneClass) {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
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
