const ActionType = require('../actionTypes.js');
const EventType = require('../eventTypes.js');
const getSceneTransitionCode = require('./getSceneTransitionCode.js');
const getMainNPCDialogEventCode = require('./getMainNPCDialogEventCode.js');

function getEventsCode(name, actionType, actionTarget, events, sceneConfig) {
    if (!events) return '';

    let content = '';
    if (actionType === ActionType.COLLIDE) {
        if (
            events.some(
                ({ eventType }) =>
                    eventType === EventType.SCENE_TRANSITION ||
                    eventType === EventType.MAIN_NPC_DIALOG
            )
        ) {
            content += `
       this.physics.add.overlap(this.${name}, this.${actionTarget}, () => {
     `;
            events.forEach(({ eventType, event }) => {
                if (eventType === EventType.SCENE_TRANSITION) {
                    content += getSceneTransitionCode(event, sceneConfig);
                }
                if (eventType === EventType.MAIN_NPC_DIALOG) {
                    content += getMainNPCDialogEventCode(event, sceneConfig);
                }
            });
            content += `});
     `;
        }
    } else {
        content += `
       this.${name}.on("${actionType.toLowerCase()}", function () {`;
        events?.forEach(({ eventType, event }) => {
            content += `
         ${
                eventType === EventType.SCENE_TRANSITION
                    ? getSceneTransitionCode(event)
                    : ''
            }
         ${
                eventType === EventType.MAIN_NPC_DIALOG
                    ? getMainNPCDialogEventCode(event)
                    : ''
            }`;
        });
        content += `
       }, this);
      `;
    }
    return content;
}

module.exports = getEventsCode;
