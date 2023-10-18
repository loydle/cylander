const getScenePreload = require('./getScenePreload');
const getSceneCreate = require('./getSceneCreate');
const { getSceneTranslation } = require('./getSceneTranslation');

function getSceneClass(sceneName, sceneConfig) {
  const preloadCode = getScenePreload(sceneName, sceneConfig);
  const createCode = getSceneCreate(sceneName, sceneConfig);
  const translationObject = JSON.stringify(getSceneTranslation(sceneConfig));

  const sceneClass = `
import * as Phaser from 'phaser';
${
  process.env.NODE_ENV === 'development'
    ? `import { debug } from '../../src/js/debug.js';`
    : ''
}
import localization from '../../src/js/localization.js';
${
  sceneConfig.mainNPC
    ? `import { MainNPC } from '../../src/js/MainNPC.js';`
    : ''
}

const translation = ${translationObject};

export class ${sceneName} extends Phaser.Scene {
  constructor() {
    super({ key: '${sceneName}' });
  }

  msg(key) {
    return translation[localization.locale][key];
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
