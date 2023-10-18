const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../.prettierrc.json');
const {
  getSceneObj,
  createBaseCaptionFields,
  getTranslationObjCode,
} = require('./translationHelpers');
const locales = require('./locales');

const distDir = path.join(__dirname, '../dist');
const translationsDir = path.join(distDir, './translations');

function readSceneRequirements(sceneFilePath) {
  const sceneRequirements = fs.readFileSync(sceneFilePath, 'utf-8');
  return JSON.parse(sceneRequirements);
}

async function writeTranslationToFile(translationObj, locale) {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
  }
  if (!fs.existsSync(translationsDir)) {
    fs.mkdirSync(translationsDir);
  }

  const translationFilePath = path.join(translationsDir, `${locale}.js`);

  try {
    const formattedTranslationObj = await prettier.format(translationObj, {
      ...prettierConfig,
    });

    fs.writeFileSync(translationFilePath, formattedTranslationObj, 'utf-8');
    console.log(`\x1b[32mCreated translation file: ${locale}.js.\x1b[0m`);
  } catch (error) {
    console.error(
      `Error formatting and writing "${locale}" translation to file:`,
      error
    );
  }
}

function deleteTranslationFiles() {
  if (!fs.existsSync(translationsDir)) {
    return;
  }

  const sceneFiles = fs
    .readdirSync(translationsDir)
    .filter((file) => file.endsWith('.js'));
  sceneFiles.forEach((file) => {
    const filePath = path.join(translationsDir, file);
    fs.unlinkSync(filePath);
    console.log(`Deleted translation file: ${file}`);
  });
}

function getTranslations(sceneTemplates) {
  const translations = createBaseCaptionFields();
  const scenes = {};
  sceneTemplates.forEach((sceneTemplate) => {
    scenes[sceneTemplate.title] = getSceneObj(sceneTemplate);
  });
  Object.entries(scenes).forEach(([sceneName, captionFields]) => {
    locales.forEach((locale) => {
      translations[locale][sceneName] = captionFields[locale];
    });
  });

  return translations;
}

function generateTranslations(sceneTemplates) {
  console.log('\x1b[33mGenerating translations...\x1b[0m');
  deleteTranslationFiles();
  console.log('\x1b[33mAll translation files deleted successfully.\x1b[0m');

  const translations = getTranslations(sceneTemplates);
  Object.entries(translations).forEach(([locale, translation]) => {
    const translationObjCode = getTranslationObjCode(translation);
    writeTranslationToFile(translationObjCode, locale);
  });
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
generateTranslations(sceneTemplates);
