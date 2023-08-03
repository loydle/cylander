const getSceneTransitionCode = require('../../../scene-generator/helpers/getSceneTransitionCode.js');

describe('getSceneTransitionCode', () => {
  it('should return the correct code for a scene transition with camera position provided', () => {
    const event = {
      transition: {
        effect: 'fadeEffect',
        options: '500, 0, 0, 0',
        to: 'nextScene',
        camera: {
          position: { x: 200, y: 300 },
        },
      },
    };
    const sceneConfig = {
      actionableItems: [],
    };
    const result = getSceneTransitionCode(event, sceneConfig);
    const expectedCode = `
      if (!isTransitionInProgress) {
        isTransitionInProgress = true;
        this.cameras.main.pan(200, 300);
        this.cameras.main.fadeEffect(500, 0, 0, 0, (camera, progress) => {
        if (progress === 1) {
          isTransitionInProgress = false;
          this.scene.start("nextScene");
        }
      });
      }
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return the correct code for a scene transition with camera reference provided', () => {
    const event = {
      transition: {
        effect: 'shakeEffect',
        options: '1, 2, 3, 4',
        to: 'otherScene',
        camera: {
          position: { actionableItemReference: 'playerCharacter' },
        },
      },
    };
    const sceneConfig = {
      actionableItems: [
        {
          name: 'playerCharacter',
          position: { x: 150, y: 250 },
        },
      ],
    };
    const result = getSceneTransitionCode(event, sceneConfig);
    const expectedCode = `
      if (!isTransitionInProgress) {
        isTransitionInProgress = true;
        this.cameras.main.pan(this.playerCharacter?.getBounds()?.x, this.playerCharacter?.getBounds()?.y);
        this.cameras.main.shakeEffect(1, 2, 3, 4, (camera, progress) => {
        if (progress === 1) {
          isTransitionInProgress = false;
          this.scene.start("otherScene");
        }
      });
      }
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should return an empty string if transition is not provided', () => {
    const event = {};
    const sceneConfig = {};
    const result = getSceneTransitionCode(event, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });
});
