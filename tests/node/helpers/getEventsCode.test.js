const ActionType = require('../../../scene-generator/actionTypes.js');
const EventType = require('../../../scene-generator/eventTypes.js');

const getEventsCode = require('../../../scene-generator/helpers/getEventsCode.js');

describe('getEventsCode', () => {
  it('should return an empty string if events are not provided', () => {
    const name = 'player';
    const actionType = ActionType.COLLIDE;
    const events = undefined;
    const sceneConfig = {};
    const result = getEventsCode(
      name,
      actionType,
      'obstacle',
      events,
      sceneConfig
    );
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code for scene transition and main NPC dialog events in a collision', () => {
    const name = 'player';
    const actionType = ActionType.COLLIDE;
    const actionTarget = 'obstacle';
    const events = [
      {
        eventType: EventType.SCENE_TRANSITION,
        event: {
          transition: {
            effect: 'fadeEffect',
            options: '200,0,0,0',
            to: 'nextScene',
          },
        },
      },
      {
        eventType: EventType.MAIN_NPC_DIALOG,
        event: {
          dialog: {
            content: 'Hello',
            duration: 3000,
          },
        },
      },
    ];
    const sceneConfig = {};
    const result = getEventsCode(
      name,
      actionType,
      actionTarget,
      events,
      sceneConfig
    );
    const expectedCode = `
    this.physics.add.overlap(this.player, this.obstacle, () => {
     if (!isTransitionInProgress) {
       isTransitionInProgress = true;
       this.cameras.main.fadeEffect(200,0,0,0, (camera, progress) => {
         if (progress === 1) {
           isTransitionInProgress = false;
           this.scene.start("nextScene");
         }
       });
     }

     this.mainNPC.dialogContent = "Hello";
     this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
   });
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code for scene transition event on action type', () => {
    const name = 'player';
    const actionType = 'CLICK';
    const events = [
      {
        eventType: EventType.SCENE_TRANSITION,
        event: {
          transition: {
            effect: 'fadeEffect',
            options: '200,0,0,0',
            to: 'otherScene',
          },
        },
      },
    ];
    const sceneConfig = {};
    const result = getEventsCode(
      name,
      actionType,
      'button',
      events,
      sceneConfig
    );
    const expectedCode = `
      this.player.on("click", function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.fadeEffect(200,0,0,0, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start("otherScene");
            }
          });
        }
      }, this);
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
