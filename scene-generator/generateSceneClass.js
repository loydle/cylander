/* eslint-env node */

const generateScenePreload = require('./generateScenePreload');
const generateSceneCreate = require('./generateSceneCreate');

function generateSceneClass(sceneName, sceneConfig) {
  const preloadCode = generateScenePreload(sceneName, sceneConfig);
  const createCode = generateSceneCreate(sceneName, sceneConfig);

  const sceneClass = `
import * as Phaser from "phaser";
${
  sceneConfig.instructorNPC
    ? `import { InstructorNPC } from "../InstructorNPC.js";`
    : ''
}

export class ${sceneName} extends Phaser.Scene {
  constructor() {
    super({ key: "${sceneName}" });
    ${
      sceneConfig.instructorNPC
        ? 'this.instructorNPC = null;\n    this.robotText = null;'
        : ''
    }
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

module.exports = generateSceneClass;
