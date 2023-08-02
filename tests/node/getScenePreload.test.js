const getScenePreload = require('../../scene-generator/getScenePreload');

describe('getScenePreload', () => {
  test('should get preload code for background image', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        image: {
          fileName: 'test-background.png',
        },
      },
    };
    const expectedPreloadCode = `this.load.image("background-testscene", "src/assets/test-background.png");\n`;
    const getdPreloadCode = getScenePreload(sceneName, sceneConfig);
    expect(getdPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should get preload code for image actionable items', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      actionableItems: [
        { name: 'item1', type: 'image', image: { url: 'item1.png' } },
        { name: 'item2', type: 'image', image: { url: 'item2.png' } },
      ],
    };
    const expectedPreloadCode = `this.load.image("item1", "item1.png");\nthis.load.image("item2", "item2.png");\n`;
    const getdPreloadCode = getScenePreload(sceneName, sceneConfig);
    expect(getdPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should get preload code for mainNPC', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      mainNPC: {},
    };
    const expectedPreloadCode = `this.mainNPC = new MainNPC(this);\nthis.mainNPC.preload();\n`;
    const getdPreloadCode = getScenePreload(sceneName, sceneConfig);
    expect(getdPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should get empty preload code for no background, actionable items, and mainNPC', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: null,
      actionableItems: [],
      mainNPC: null,
    };
    const expectedPreloadCode = '';
    const getdPreloadCode = getScenePreload(sceneName, sceneConfig);
    expect(getdPreloadCode).toEqual(expectedPreloadCode);
  });
});
