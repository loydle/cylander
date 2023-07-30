/* eslint-env node */

function generateScenePreload(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, instructorNPC } = sceneConfig;
  let preloadCode = '';

  if (backgroundImage) {
    preloadCode += `this.load.image("background-${sceneName.toLowerCase()}", "src/assets/${backgroundImage}");\n`;
  }

  actionableItems.forEach(({ name, type, image }) => {
    if (type === 'image') {
      preloadCode += `this.load.image("${name}", "${image.url}");\n`;
    }
  });

  if (instructorNPC) {
    preloadCode += `this.instructorNPC = new InstructorNPC(this);\nthis.instructorNPC.preload();\n`;
  }

  return preloadCode;
}

module.exports = generateScenePreload;
