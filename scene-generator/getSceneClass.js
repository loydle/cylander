const getScenePreload = require('./getScenePreload');
const getSceneCreate = require('./getSceneCreate');

function getSceneClass(sceneName, sceneConfig) {
  const preloadCode = getScenePreload(sceneName, sceneConfig);
  const createCode = getSceneCreate(sceneName, sceneConfig);

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

module.exports = getSceneClass;
