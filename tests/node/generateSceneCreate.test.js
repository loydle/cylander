const generateSceneCreate = require('../../scene-generator/generateSceneCreate');

describe('generateSceneCreate function', () => {
  it('should generate code for background image if provided', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        image: {
          fileName: 'background-image.png',
        },
      },
      actionableItems: [],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.add.image(0, 0, "background-testscene").setOrigin(0);
      `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for background color if provided', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        color: '0xabcdef',
      },
      actionableItems: [],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.cameras.main.setBackgroundColor(0xabcdef);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for hitbox actionable item', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'hitbox1',
          type: 'hitbox',
          position: { x: 100, y: 200 },
          size: { width: 50, height: 50 },
          backgroundColor: '0xff0000',
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.hitbox1 = this.add.rectangle(100, 200, 50, 50, 0xff0000).setInteractive();
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for text actionable item', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
          position: { x: 200, y: 150 },
          size: { width: 0, height: 0 }, // Not used for text type
          text: {
            content: 'Hello, World!',
            styles: {
              fontFamily: 'Arial',
              fontSize: '24px',
              color: '#ffffff',
            },
            origin: 0.5,
            scale: 1,
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.text1 = this.add.text(200, 150, "Hello, World!", {"fontFamily":"Arial","fontSize":"24px","color":"#ffffff"}).setOrigin(0.5).setScale(1)
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for image actionable item with scale', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'image1',
          type: 'image',
          position: { x: 300, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          image: {
            url: 'path/to/image.png',
            scale: 2,
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(300, 200, "image1").setInteractive();
      this.image1.setScale(2);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for draggable actionable item', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'draggable1',
          type: 'image',
          position: { x: 400, y: 300 },
          size: { width: 0, height: 0 }, // Not used for image type
          isDraggable: true,
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.draggable1 = this.add.image(400, 300, "draggable1").setInteractive();
      this.input.setDraggable(this.draggable1);

      this.draggable1.on('pointerdown', function () {
        this.scene.children.bringToTop(this);
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      });
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    const formattedExpectedCode = expectedCode.replace(/\s+/g, '');
    const formattedResult = result.replace(/\s+/g, '');
    expect(formattedResult).toEqual(formattedExpectedCode);
  });

  it('should generate code for actionable item with animation', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          animation: {
            options: {
              duration: 1000,
              repeat: 2,
              yoyo: true,
            },
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1").setInteractive();
      this.tweens.add({
          targets: this.item1,
          duration: 1000,
          repeat: 2,
          yoyo: true
      });
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with physics enabled', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          hasPhysicsEnabled: true,
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1").setInteractive();
      this.physics.world.enable(this.item1);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with collide event', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          events: [
            {
              eventType: 'collide',
              eventTarget: 'something',
              actions: [
                {
                  actionType: 'mainNPCDialog',
                  action: {
                    dialog: {
                      content: 'Collide event with main NPC dialog.',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      mainNPC: {
        // Add the necessary properties for mainNPC here
        dialog: {
          content: 'Main NPC dialog content.',
          duration: 3000,
        },
        position: {
          x: 300,
          y: 400,
        },
        // Add other necessary properties for mainNPC if needed
      },
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.mainNPC.create();
    this.mainNPC.showDialog("Main NPC dialog content.", 3000);
    this.mainNPC.mainNPCImage.setPosition(300, 400);
    this.mainNPC.moveTextPosition(300, 400 - this.mainNPC.mainNPCImage.height / 2);

    this.item1 = this.add.image(100, 200, "item1").setInteractive();
    this.physics.add.overlap(this.item1, this.something, () => {
        this.mainNPC.dialogContent = "Collide event with main NPC dialog.";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
    });
  `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with pointerdown event', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          events: [
            {
              eventType: 'PointerDown',
              actions: [
                {
                  actionType: 'mainNPCDialog',
                  action: {
                    dialog: {
                      content: 'PointerDown event with main NPC dialog.',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1").setInteractive();
      this.item1.on("pointerdown", function () {
        this.mainNPC.dialogContent = "PointerDown event with main NPC dialog.";
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
    }, this);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with multiple events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          size: { width: 0, height: 0 }, // Not used for image type
          events: [
            {
              eventType: 'PointerDown',
              actions: [
                {
                  actionType: 'mainNPCDialog',
                  action: {
                    dialog: {
                      content: 'PointerDown event with main NPC dialog.',
                    },
                  },
                },
              ],
            },
            {
              eventType: 'collide',
              eventTarget: 'something',
              actions: [
                {
                  actionType: 'sceneTransition',
                  action: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1").setInteractive();
      this.item1.on("pointerdown", function () {
        this.mainNPC.dialogContent = "PointerDown event with main NPC dialog.";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      }, this);

      this.physics.add.overlap(this.item1, this.something, () => {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start("NextScene");
            }
          });
        }
      });
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
