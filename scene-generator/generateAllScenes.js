const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../.prettierrc.json');
const getSceneClass = require('./getSceneClass');
const sceneConfig = require('../src/configs/sceneConfig.json');

function readSceneRequirements(sceneFilePath) {
  const sceneRequirements = fs.readFileSync(sceneFilePath, 'utf-8');
  return JSON.parse(sceneRequirements);
}

async function writeSceneToFile(sceneName, sceneClass) {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    fs.mkdirSync(scenesDir);
  }

  const sceneFilePath = path.join(scenesDir, `${sceneName}.js`);

  try {
    const formattedSceneClass = await prettier.format(sceneClass, {
      ...prettierConfig,
    });

    fs.writeFileSync(sceneFilePath, formattedSceneClass, 'utf-8');
    console.log(`\x1b[32mCreated scene file: ${sceneName}.js.\x1b[0m`);
  } catch (error) {
    console.error(
      `Error formatting and writing scene "${sceneName}" to file:`,
      error
    );
  }
}

function deleteSceneFiles() {
  const scenesDir = path.join(__dirname, '../src/js/scenes');
  if (!fs.existsSync(scenesDir)) {
    return;
  }

  const sceneFiles = fs
    .readdirSync(scenesDir)
    .filter((file) => file.endsWith('.js'));
  sceneFiles.forEach((file) => {
    const filePath = path.join(scenesDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted scene file: ${file}`);
  });
}

function getScenesForTemplate(sceneTemplate) {
  const { title, actionableItems, mainNPC } = sceneTemplate;
  const sceneClass = getSceneClass(title, {
    background: sceneTemplate.background,
    actionableItems,
    mainNPC,
    ...sceneConfig,
  });
  writeSceneToFile(title, sceneClass);
}

function generateAllScenes(sceneTemplates) {
  console.log('\x1b[33mGenerating scenes...\x1b[0m');
  deleteSceneFiles();
  sceneTemplates.forEach((sceneTemplate) => {
    getScenesForTemplate(sceneTemplate);
  });
  console.log('\x1b[33mAll scenes getd successfully.\x1b[0m');
}

const sceneTemplatesDir = path.join(__dirname, 'scenes-requierments');
const sceneTemplates = fs
  .readdirSync(sceneTemplatesDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const sceneFilePath = path.join(sceneTemplatesDir, file);
    return readSceneRequirements(sceneFilePath);
  });

// get scenes based on the templates
generateAllScenes(sceneTemplates);
