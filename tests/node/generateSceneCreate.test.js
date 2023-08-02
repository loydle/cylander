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
          scale: 1,
          size: {
            width: 42,
            height: 24,
          },
          position: { x: 100, y: 200 },
          backgroundColor: '0xff0000',
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.hitbox1 = this.add.rectangle(100, 200, 42, 24, 0xff0000);
      this.hitbox1.setScale(1);
      this.hitbox1.setInteractive();

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
          scale: 1,
          position: { x: 200, y: 150 },
          text: {
            content: 'Hello, World!',
            styles: {
              fontFamily: 'Arial',
              fontSize: '24px',
              color: '#ffffff',
            },
            origin: 0.5,
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.text1 = this.add.text(200, 150, "Hello, World!", {"fontFamily":"Arial","fontSize":"24px","color":"#ffffff"}).setOrigin(0.5);
      this.text1.setScale(1);
      this.text1.setInteractive();
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
          scale: 1,
          image: {
            url: 'path/to/image.png',
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(300, 200, "image1");
      this.image1.setScale(1);
      this.image1.setInteractive();
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
          isDraggable: true,
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.draggable1 = this.add.image(400, 300, "draggable1");
      this.draggable1.setInteractive();
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
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();
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
          hasPhysicsEnabled: true,
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();
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
          actions: [
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
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
        dialog: {
          content: 'Main NPC dialog content.',
          duration: 3000,
        },
        position: {
          x: 300,
          y: 400,
        },
      },
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.mainNPC.create();
    this.mainNPC.showDialog("Main NPC dialog content.", 3000);
    this.mainNPC.mainNPCImage.setPosition(300, 400);
    this.mainNPC.moveTextPosition(300, 400 - this.mainNPC.mainNPCImage.height / 2);

    this.item1 = this.add.image(100, 200, "item1");
    this.item1.setInteractive();
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
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
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
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();

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
          name: 'item0',
          type: 'image',
          position: { x: 42, y: 24 },
        },
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content: 'PointerDown event with main NPC dialog.',
                    },
                  },
                },
              ],
            },
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                    },
                  },
                },
              ],
            },
            {
              actionType: 'collide',
              actionTarget: 'somethingElse',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                      camera: {
                        position: {
                          x: 100,
                          y: 100,
                        },
                      },
                    },
                  },
                },
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                      camera: {
                        position: {
                          actionableItemReference: 'item0',
                        },
                      },
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
      this.item0 = this.add.image(42, 24, "item0");
      this.item0.setInteractive();
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();
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

      this.physics.add.overlap(this.item1, this.somethingElse, () => {


        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.pan(100, 100);
          this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start("NextScene");
            }
          });
        }

        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.pan(this.item0?.getBounds()?.x, this.item0?.getBounds()?.y);
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

  it('should generate transitions with custom/fixed camera position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                      camera: {
                        position: {
                          x: 100,
                          y: 100,
                        },
                      },
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
      this.item1.setInteractive();
      this.item1.on("pointerdown", function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.pan(100, 100);
          this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start("NextScene");
            }
          });
        }
      }, this);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate transitions with camera position relative to actionableItem current position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item0',
          position: { x: 42, y: 24 },
        },
        {
          name: 'item1',
          actions: [
            {
              actionType: 'collide',
              actionTarget: 'somethingElse',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                      camera: {
                        position: {
                          actionableItemReference: 'item0',
                        },
                      },
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
      this.item0.setInteractive();
      this.item1.setInteractive();
      this.physics.add.overlap(this.item1, this.somethingElse, () => {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.pan(this.item0?.getBounds()?.x, this.item0?.getBounds()?.y);
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

  it('should generate code for actionable item with both image and text types with multiple events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content:
                        'PointerDown event with main NPC dialog for image.',
                    },
                  },
                },
              ],
            },
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'NextScene',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                    },
                  },
                },
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content: 'Collide event with main NPC dialog for image.',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'item2',
          type: 'text',
          position: { x: 300, y: 250 },
          text: {
            content: 'Clickable Text',
            styles: {
              fontFamily: 'Arial',
              fontSize: '18px',
              color: '#ff0000',
            },
            origin: 0.5,
            scale: 1,
          },
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content:
                        'PointerDown event with main NPC dialog for text.',
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

    const expectedCodeForItem1 = `
    let isTransitionInProgress = false;
    this.item1 = this.add.image(100, 200, "item1");
    this.item1.setInteractive();

    this.item1.on("pointerdown", function () {
      this.mainNPC.dialogContent = "PointerDown event with main NPC dialog for image.";
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

      this.mainNPC.dialogContent = "Collide event with main NPC dialog for image.";
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
    });
    `;

    const expectedCodeForItem2 = `
    this.item2 = this.add.text(300, 250, "Clickable Text", {"fontFamily":"Arial","fontSize":"18px","color":"#ff0000"}).setOrigin(0.5);
    this.item2.setInteractive();

    this.item2.on("pointerdown", function () {
      this.mainNPC.dialogContent = "PointerDown event with main NPC dialog for text.";
      this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
    }, this);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      (expectedCodeForItem1 + expectedCodeForItem2).replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with no events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          actions: [],
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();

    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate code for actionable item with no mainNPC', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'item1',
          type: 'image',
          position: { x: 100, y: 200 },
          actions: [
            {
              actionType: 'PointerDown',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
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
      this.item1 = this.add.image(100, 200, "item1");
      this.item1.setInteractive();

      this.item1.on("pointerdown", function () {
        if (!isTransitionInProgress) {
          isTransitionInProgress = true;
          this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
            if (progress === 1) {
              isTransitionInProgress = false;
              this.scene.start("NextScene");
            }
          });
        }
      }, this);
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
