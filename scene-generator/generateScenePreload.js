/* eslint-env node */

function generateScenePreload(sceneName, sceneConfig) {
  const { background, actionableItems, mainNPC } = sceneConfig;
  let preloadCode = '';
  if (background?.image?.fileName) {
    preloadCode += `this.load.image("background-${sceneName.toLowerCase()}", "src/assets/${
      background?.image?.fileName
    }");\n`;
  }

  actionableItems.forEach(({ name, type, image }) => {
    if (type === 'image') {
      preloadCode += `this.load.image("${name}", "${image.url}");\n`;
    }
  });

  if (mainNPC) {
    preloadCode += `this.mainNPC = new MainNPC(this);\nthis.mainNPC.preload();\n`;
  }

  return preloadCode;
}

module.exports = generateScenePreload;
