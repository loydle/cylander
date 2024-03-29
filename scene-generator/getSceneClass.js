const getScenePreload = require('./getScenePreload');
const getSceneCreate = require('./getSceneCreate');

function getSceneClass(sceneName, sceneConfig) {
  const preloadCode = getScenePreload(sceneName, sceneConfig);
  const createCode = getSceneCreate(sceneName, sceneConfig);

  const sceneClass = `
import * as Phaser from 'phaser';
${
  process.env.NODE_ENV === 'development'
    ? `import { debug } from '../../src/js/debug.js';`
    : ''
}
${
  sceneConfig.mainNPC
    ? `import { MainNPC } from '../../src/js/MainNPC.js';`
    : ''
}
import { settings } from '../../src/js/settings.js';
import localization from '../../src/js/localization.js';

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
