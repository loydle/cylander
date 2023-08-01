const generateSceneClass = require('../../scene-generator/generateSceneClass');

describe('generateSceneClass function', () => {
  it('should generate basic Class structure', () => {
    const sceneName = 'SampleScene';
    const sceneConfig = {};

    const result = generateSceneClass(sceneName, sceneConfig);
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

    const result = generateSceneClass(sceneName, sceneConfig);
    expect(result).toContain(`import { MainNPC } from '../MainNPC.js';`);
  });

  it('should not import mainNPC if not present', () => {
    const sceneName = 'SampleScene';
    const sceneConfig = {};

    const result = generateSceneClass(sceneName, sceneConfig);
    expect(result).not.toContain(`import { MainNPC } from '../MainNPC.js';`);
  });
});
