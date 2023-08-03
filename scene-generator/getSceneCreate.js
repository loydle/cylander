const ActionableItemType = require('./actionableItemTypes.js');
const getAnimationCode = require('./helpers/getAnimationCode.js');
const getBackgroundCode = require('./helpers/getBackgroundCode.js');
const getLabelCode = require('./helpers/getLabelCode.js');
const getDragEventCode = require('./helpers/getDragEventCode.js');
const getSetScaleCode = require('./helpers/getSetScaleCode.js');
const getSetOriginCode = require('./helpers/getSetOriginCode.js');

const getSetInteractiveCode = require('./helpers/getSetInteractiveCode.js');
const getHasPhysicsCode = require('./helpers/getHasPhysicsCode.js');
const getActionableItemImageCode = require('./helpers/getActionableItemImageCode.js');
const getActionableItemTextCode = require('./helpers/getActionableItemTextCode.js');
const getActionableItemHitboxCode = require('./helpers/getActionableItemHitboxCode.js');
const getEventsCode = require('./helpers/getEventsCode.js');
const getMainNPCCode = require('./helpers/getMainNPCCode.js');

function geSceneCreate(sceneName, sceneConfig) {
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

  let createCode = '';
  let sceneHasOneOrMoreDraggableItems = false;

  renderScene(sceneName, sceneConfig);

  function renderScene(sceneName, sceneConfig) {
    const { background, actionableItems, mainNPC } = sceneConfig;
    createCode += 'let isTransitionInProgress = false;';
    createCode += getBackgroundCode(background, sceneName);
    createCode += getMainNPCCode(mainNPC);

    if (actionableItems?.length > 0) {
      actionableItems.forEach((actionableItem) => {
        switch (actionableItem?.type) {
          case ActionableItemType.HITBOX:
            createCode += getActionableItemHitboxCode(actionableItem);
            break;
          case ActionableItemType.IMAGE:
            createCode += getActionableItemImageCode(actionableItem);
            break;
          case ActionableItemType.TEXT:
            createCode += getActionableItemTextCode(actionableItem);
            break;
          default:
        }

        createCode += getSetScaleCode(
          actionableItem?.name,
          actionableItem?.scale
        );
        createCode += getSetOriginCode(
          actionableItem?.name,
          actionableItem?.origin
        );
        createCode += getSetInteractiveCode(actionableItem?.name);
        createCode += getAnimationCode(
          actionableItem?.name,
          actionableItem?.animation
        );
        createCode += getSetDraggableCode(
          actionableItem?.name,
          actionableItem?.isDraggable
        );
        createCode += getHasPhysicsCode(
          actionableItem?.name,
          actionableItem?.hasPhysicsEnabled
        );
        createCode += getLabelCode(
          actionableItem?.name,
          actionableItem?.label,
          sceneConfig?.labelStyles
        );

        if (actionableItem?.actions?.length > 0) {
          actionableItem?.actions.forEach(
            ({ actionType, events, actionTarget }) => {
              createCode += getEventsCode(
                actionableItem?.name,
                actionType,
                actionTarget,
                events,
                sceneConfig
              );
            }
          );
        }
      });

      createCode += getDragEventCode(sceneHasOneOrMoreDraggableItems);
    }
  }
  function getSetDraggableCode(name, isDraggable) {
    if (!isDraggable || !name) return '';
    sceneHasOneOrMoreDraggableItems = true;
    return `
      this.input.setDraggable(this.${name});
      this.${name}.on('pointerdown', function () {
        this.scene.children.bringToTop(this);
      });
    `;
  }

  return createCode;
}

module.exports = geSceneCreate;
