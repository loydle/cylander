/* eslint-env node */

const generateScenePreload = require('./generateScenePreload');
const generateSceneCreate = require('./generateSceneCreate');

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

module.exports = generateSceneClass;
