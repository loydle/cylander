/* eslint-env node */

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../.prettierrc.json');

function readSceneRequirements(sceneFilePath) {
  const sceneRequirements = fs.readFileSync(sceneFilePath, 'utf-8');
  return JSON.parse(sceneRequirements);
}

function generateScenePreload(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, robot } = sceneConfig;
  let preloadCode = '';

  if (backgroundImage) {
    preloadCode += `this.load.image("background-${sceneName.toLowerCase()}", "src/assets/${backgroundImage}");\n`;
  }

  actionableItems.forEach(({ name, type, image }) => {
    if (type === 'image') {
      preloadCode += `this.load.image("${name}", "${image.url}");\n`;
    }
  });

  if (robot) {
    preloadCode += `this.robot = new Robot(this);\nthis.robot.preload();\n`;
  }

  return preloadCode;
}

function generateSceneCreate(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, robot } = sceneConfig;
  let createCode = '';

  if (backgroundImage) {
    createCode += `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);\n`;
  }

  actionableItems.forEach(
    ({
      name,
      type,
      position,
      size,
      actions,
      isDraggable,
      animation,
      backgroundColor,
    }) => {
      if (type === 'hitbox') {
        createCode += `this.${name} = this.add.rectangle(${position?.x}, ${position?.y}, ${size.width}, ${size.height}, ${backgroundColor}).setInteractive();\n`;
      } else if (type === 'image') {
        createCode += `this.${name} = this.add.image(${position?.x}, ${position?.y}, "${name}").setInteractive();\n`;
      }

      if (animation) {
        createCode += `
      this.tweens.add({
        targets: this.${name},
        ${Object.entries(animation.options)
          .map(
            ([key, value]) =>
              `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
          )
          .join(',')}
      });
      `;
      }

      if (isDraggable) {
        createCode += `
        this.input.setDraggable(this.${name});
        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
      `;
      }

      actions.forEach(({ type, transitionTo, transition, robot }) => {
        createCode += `
        this.${name}.on("${type.toLowerCase()}", function () {
          ${
            robot && robot.dialog?.content
              ? `this.robot.showDialog("${robot.dialog?.content}", ${
                  robot.dialog?.delay ? robot.dialog.delay : '3000'
                });`
              : ''
          }
          ${
            transition
              ? `
          this.cameras.main.${transition.type}(${transition?.options}, (camera, progress) => {
            if (progress === 1) {
              this.scene.start("${transitionTo}");
            }
          });
          `
              : ''
          }
        }, this);
      `;
      });
    }
  );

  if (robot) {
    createCode += `
    this.robot.create();
    this.robot.showDialog("${robot.defaultDialog}", 30000);
    this.robot.robotImage.setPosition(${robot.position.x}, ${robot.position.y});
    this.robot.moveTextPosition(${robot.position.x}, ${
      robot.dialogMargin?.top
        ? `${robot.position.y} - this.robot.robotImage.height  + ${robot.dialogMargin.top}`
        : `${robot.position.y} - this.robot.robotImage.height / 2`
    });

    ${
      robot?.animation
        ? `this.tweens.add({
      targets: this.robot.robotImage,
      ${Object.entries(robot.animation.options)
        .map(
          ([key, value]) =>
            `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
        )
        .join(',')}
    });`
        : ''
    }
    `;
  }

  return createCode;
}

function generateSceneClass(sceneName, sceneConfig) {
  const preloadCode = generateScenePreload(sceneName, sceneConfig);
  const createCode = generateSceneCreate(sceneName, sceneConfig);

  const sceneClass = `
import * as Phaser from "phaser";
${sceneConfig.robot ? `import { Robot } from "../Robot.js";` : ''}

export class ${sceneName} extends Phaser.Scene {
  constructor() {
    super({ key: "${sceneName}" });
    ${sceneConfig.robot ? 'this.robot = null;\n    this.robotText = null;' : ''}
  }

  preload() {
    ${preloadCode}
  }

  create() {
    ${createCode}
  }
}
`;

  return sceneClass;
}

async function writeSceneToFile(sceneName, sceneClass) {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    fs.mkdirSync(scenesDir);
  }

  const sceneFilePath = path.join(scenesDir, `${sceneName}.js`);

  try {
    const formattedSceneClass = await prettier.format(sceneClass, {
      ...prettierConfig,
    });

    fs.writeFileSync(sceneFilePath, formattedSceneClass, 'utf-8');
    console.log(
      `\x1b[32mScene "${sceneName}" generated and saved to file.\x1b[0m`
    );
  } catch (error) {
    console.error(
      `Error formatting and writing scene "${sceneName}" to file:`,
      error
    );
  }
}

function deleteSceneFiles() {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    return;
  }

  const sceneFiles = fs
    .readdirSync(scenesDir)
    .filter((file) => file.endsWith('.js'));
  sceneFiles.forEach((file) => {
    const filePath = path.join(scenesDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted scene file: ${file}`);
  });
}

function generateScenesForTemplate(sceneTemplate) {
  const { title, actionableItems, robot } = sceneTemplate;
  const sceneClass = generateSceneClass(title, {
    backgroundImage: sceneTemplate.backgroundImage,
    actionableItems,
    robot,
  });
  writeSceneToFile(title, sceneClass);
}

function generateAllScenes(sceneTemplates) {
  console.log('\x1b[33mGenerating scenes...\x1b[0m');
  deleteSceneFiles();
  sceneTemplates.forEach((sceneTemplate) => {
    generateScenesForTemplate(sceneTemplate);
  });
  console.log('\x1b[33mAll scenes generated successfully.\x1b[0m');
}

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
