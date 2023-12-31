const getSceneClass = require('../../scene-generator/getSceneClass');

describe('getSceneClass function', () => {
  it('should get basic Class structure', () => {
    const sceneName = 'SampleScene';
    const sceneConfig = {};
    const result = getSceneClass(sceneName, sceneConfig);
    expect(result).toContain("import * as Phaser from 'phaser';");
    expect(result).toContain(`export class ${sceneName} extends Phaser.Scene`);
    expect(result.replace(/\s+/g, '')).toContain(
      `constructor() { super({ key: '${sceneName}' }); }`.replace(/\s+/g, '')
    );
    expect(result).toContain(`preload()`);
    expect(result).toContain(`create()`);
  });

  it('should import mainNPC if present', () => {
    const sceneName = 'SampleScene';
    const sceneConfig = {
      mainNPC: {},
    };

    const result = getSceneClass(sceneName, sceneConfig);
    expect(result).toContain(
      `import { MainNPC } from '../../src/js/MainNPC.js';`
    );
  });

  it('should not import mainNPC if not present', () => {
    const sceneName = 'SampleScene';
    const sceneConfig = {};

    const result = getSceneClass(sceneName, sceneConfig);
    expect(result).not.toContain(
      `import { MainNPC } from '../../src/js/MainNPC.js';`
    );
  });

  it('should include debug import when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    const sceneConfig = {
      mainNPC: true,
    };

    const sceneName = 'TestScene';
    const sceneClass = getSceneClass(sceneName, sceneConfig);

    expect(sceneClass).toContain(
      "import { debug } from '../../src/js/debug.js';"
    );
    process.env.NODE_ENV = 'test';
  });

  it('should exclude debug import when NODE_ENV is not development', () => {
    process.env.NODE_ENV = 'production';
    const sceneConfig = {
      mainNPC: true,
    };
    const sceneName = 'TestScene';
    const sceneClass = getSceneClass(sceneName, sceneConfig);
    expect(sceneClass).not.toContain(
      "import { debug } from '../../src/js/debug.js';"
    );
    process.env.NODE_ENV = 'test';
  });
});
