const generateScenePreload = require('./generateScenePreload');
const generateSceneCreate = require('./generateSceneCreate');

function generateSceneClass(sceneName, sceneConfig) {
  const preloadCode = generateScenePreload(sceneName, sceneConfig);
  const createCode = generateSceneCreate(sceneName, sceneConfig);

  const sceneClass = `
import * as Phaser from 'phaser';
${sceneConfig.mainNPC ? `import { MainNPC } from '../MainNPC.js';` : ''}

export class ${sceneName} extends Phaser.Scene {
  constructor() {
    super({ key: '${sceneName}' });
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
