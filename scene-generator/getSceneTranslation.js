const EventType = require('./eventTypes');
const locales = require('./locales');

const createBaseCaptionFields = () => {
  const obj = {};
  locales.forEach((locale) => (obj[locale] = {}));
  return obj;
};

const getActionableItemLabels = (actionableItems) => {
  const captionFields = createBaseCaptionFields();
  actionableItems.forEach(({ type, name, label, text }) => {
    if (!name || !type || (!label && !text)) return;
    const captionObj = type === 'text' ? text : label;
    if (!captionObj.content) return;
    locales.forEach((locale) => {
      captionFields[locale][`${name}-label`] = captionObj.content[locale];
    });
  });
  return captionFields;
};

const getActionableItemEventCaptions = (actionableItems) => {
  const captionFields = createBaseCaptionFields();
  actionableItems.forEach(({ name, actions }) => {
    if (!name || !actions || !actions.length) return;
    actions.forEach(({ actionType, events }) => {
      if (!actionType || !events || !events.length) return;
      events.forEach(({ eventType, event }, index) => {
        if (eventType !== EventType.MAIN_NPC_DIALOG) return;
        locales.forEach((locale) => {
          captionFields[locale][`${name}-${actionType}-npcDialog-${index}`] =
            event?.dialog?.content?.[locale];
        });
      });
    });
  });
  return captionFields;
};

const getMainNPCDialog = (mainNPC) => {
  const captionFields = createBaseCaptionFields();
  locales.forEach((locale) => {
    captionFields[locale][`mainNPC-dialog-content`] =
      mainNPC?.dialog?.content[locale];
  });
  return captionFields;
};

const getSceneTranslation = (sceneConfig) => {
  if (!sceneConfig) return '';
  const captionFields = createBaseCaptionFields();
  const AILabels = getActionableItemLabels(sceneConfig.actionableItems);
  const AIEventCaptions = getActionableItemEventCaptions(
    sceneConfig.actionableItems
  );
  const MNPCDialog = getMainNPCDialog(sceneConfig.mainNPC);

  locales.forEach((locale) => {
    captionFields[locale] = {
      ...AILabels[locale],
      ...AIEventCaptions[locale],
      ...MNPCDialog[locale],
    };
  });

  return captionFields;
};

module.exports = {
  getSceneTranslation,
};
