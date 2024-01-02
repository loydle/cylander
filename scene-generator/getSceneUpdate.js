const ActionableItemType = require('./actionableItemTypes.js');

const getSpriteLabelUpdateCode = require('./helpers/getSpriteLabelUpdateCode');

function geSceneUpdate(sceneName, sceneConfig) {
  if (
    !sceneName ||
    typeof sceneName !== 'string' ||
    !/^[A-Z][a-zA-Z0-9]*$/.test(sceneName)
  ) {
    throw new Error(
      'Invalid sceneName. A valid PascalCase string sceneName is required.'
    );
  }

  if (!sceneConfig || typeof sceneConfig !== 'object') {
    throw new Error('Invalid sceneConfig. An object sceneConfig is required.');
  }

  let updateCode = '';

  renderSceneUpdate(sceneName, sceneConfig);

  function renderSceneUpdate(sceneName, sceneConfig) {
    const { background, actionableItems, mainNPC } = sceneConfig;

    if (actionableItems?.length > 0) {
      actionableItems.forEach((actionableItem) => {

        if(actionableItem?.type === ActionableItemType.SPRITE) {
          updateCode += getSpriteLabelUpdateCode(
              actionableItem?.name,
              actionableItem?.label
          );
        }
      });

      if (process.env.NODE_ENV === 'development') {
        updateCode += 'debug(this);';
      }
    }
  }

  return updateCode;
}

module.exports = geSceneUpdate;
