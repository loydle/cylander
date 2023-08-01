const generateScenePreload = require('../../scene-generator/generateScenePreload');

describe('generateScenePreload', () => {
  test('should generate preload code for background image', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        image: {
          fileName: 'test-background.png',
        },
      },
      actionableItems: [],
      mainNPC: null,
    };
    const expectedPreloadCode = `this.load.image("background-testscene", "src/assets/test-background.png");\n`;
    const generatedPreloadCode = generateScenePreload(sceneName, sceneConfig);
    expect(generatedPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should generate preload code for image actionable items', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: null,
      actionableItems: [
        { name: 'item1', type: 'image', image: { url: 'item1.png' } },
        { name: 'item2', type: 'image', image: { url: 'item2.png' } },
      ],
      mainNPC: null,
    };
    const expectedPreloadCode = `this.load.image("item1", "item1.png");\nthis.load.image("item2", "item2.png");\n`;
    const generatedPreloadCode = generateScenePreload(sceneName, sceneConfig);
    expect(generatedPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should generate preload code for mainNPC', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: null,
      actionableItems: [],
      mainNPC: {},
    };
    const expectedPreloadCode = `this.mainNPC = new MainNPC(this);\nthis.mainNPC.preload();\n`;
    const generatedPreloadCode = generateScenePreload(sceneName, sceneConfig);
    expect(generatedPreloadCode).toEqual(expectedPreloadCode);
  });

  test('should generate empty preload code for no background, actionable items, and mainNPC', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: null,
      actionableItems: [],
      mainNPC: null,
    };
    const expectedPreloadCode = '';
    const generatedPreloadCode = generateScenePreload(sceneName, sceneConfig);
    expect(generatedPreloadCode).toEqual(expectedPreloadCode);
  });
});
