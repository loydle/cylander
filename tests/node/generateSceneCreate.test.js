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

  it('should generate actionable item as interactive', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
        },
        {
          name: 'image1',
          type: 'image',
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setInteractive();

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setInteractive();

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setInteractive();
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate actionable items with correct position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
          position: { x: 200, y: 150 },
        },
        {
          name: 'text2',
          type: 'text',
          position: { x: 'center', y: 150 },
        },

        {
          name: 'text3',
          type: 'text',
          position: { x: 'center', y: 'center' },
        },
        {
          name: 'image1',
          type: 'image',
          position: { x: 200, y: 150 },
        },
        {
          name: 'image2',
          type: 'image',
          position: { x: 'center', y: 150 },
        },
        {
          name: 'image3',
          type: 'image',
          position: { x: 'center', y: 'center' },
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          position: { x: 200, y: 150 },
        },
        {
          name: 'hitbox2',
          type: 'hitbox',
          position: { x: 'center', y: 150 },
        },

        {
          name: 'hitbox3',
          type: 'hitbox',
          position: { x: 'center', y: 'center' },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.text1 = this.add.text(200, 150, "undefined", undefined);
    this.text1.setInteractive();

    this.text2 = this.add.text(this.cameras.main.centerX, 150, "undefined", undefined);
    this.text2.setInteractive();

    this.text3 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "undefined", undefined);
    this.text3.setInteractive();

    this.image1 = this.add.image(200, 150, "image1");
    this.image1.setInteractive();

    this.image2 = this.add.image(this.cameras.main.centerX, 150, "image2");
    this.image2.setInteractive();

    this.image3 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "image3");
    this.image3.setInteractive();

    this.hitbox1 = this.add.rectangle(200, 150, undefined, undefined, undefined);
    this.hitbox1.setInteractive();

    this.hitbox2 = this.add.rectangle(this.cameras.main.centerX, 150, undefined, undefined, undefined);
    this.hitbox2.setInteractive();

    this.hitbox3 = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, undefined, undefined, undefined);
    this.hitbox3.setInteractive();
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate actionable items with correct origin', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
          origin: {
            x: 0.5,
            y: 0.5,
          },
        },
        {
          name: 'image1',
          type: 'image',
          origin: {
            x: 0.5,
            y: 0.5,
          },
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          origin: {
            x: 0.5,
            y: 0.5,
          },
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setOrigin(0.5, 0.5);
      this.text1.setInteractive();

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setOrigin(0.5, 0.5);
      this.image1.setInteractive();

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setOrigin(0.5, 0.5);
      this.hitbox1.setInteractive();

    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate actionable items with correct scale', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'image1',
          type: 'image',
          scale: 1,
        },
        {
          name: 'image2',
          type: 'image',
        },
        {
          name: 'text1',
          type: 'text',
          scale: 1,
        },
        {
          name: 'text2',
          type: 'text',
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          scale: 1,
        },
        {
          name: 'hitbox2',
          type: 'hitbox',
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setScale(1);
      this.image1.setInteractive();

      this.image2 = this.add.image(undefined, undefined, "image2");
      this.image2.setInteractive();

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setScale(1);
      this.text1.setInteractive();

      this.text2 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text2.setInteractive();

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setScale(1);
      this.hitbox1.setInteractive();

      this.hitbox2 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox2.setInteractive();
    `;

    const result = generateSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should generate draggable actionable items', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'image1',
          type: 'image',
          isDraggable: true,
        },
        {
          name: 'text1',
          type: 'text',
          isDraggable: true,
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          isDraggable: true,
        },
      ],
      mainNPC: null,
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setInteractive();
      this.input.setDraggable(this.image1);
      this.image1.on('pointerdown', function () {
          this.scene.children.bringToTop(this);
      });

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setInteractive();
      this.input.setDraggable(this.text1);
        this.text1.on('pointerdown', function () {
          this.scene.children.bringToTop(this);
      });

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setInteractive();
      this.input.setDraggable(this.hitbox1);
      this.hitbox1.on('pointerdown', function () {
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
    console.log();
    expect(formattedResult).toEqual(formattedExpectedCode);
  });

  it('should generate actionable item with animation', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
          animation: {
            options: {
              duration: 1000,
              repeat: 2,
              yoyo: true,
            },
          },
        },
        {
          name: 'image1',
          type: 'image',
          animation: {
            options: {
              duration: 1000,
              repeat: 2,
              yoyo: true,
            },
          },
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
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

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setInteractive();
      this.tweens.add({
        targets: this.text1,
        duration: 1000,
        repeat: 2,
        yoyo: true
      });

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setInteractive();
      this.tweens.add({
        targets: this.image1,
        duration: 1000,
        repeat: 2,
        yoyo: true
      });

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setInteractive();
      this.tweens.add({
        targets: this.hitbox1,
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
          name: 'text1',
          type: 'text',
          hasPhysicsEnabled: true,
        },
        {
          name: 'image1',
          type: 'image',
          hasPhysicsEnabled: true,
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          hasPhysicsEnabled: true,
        },
      ],
    };

    const expectedCode = `
    let isTransitionInProgress = false;

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.setInteractive();
      this.physics.world.enable(this.text1);

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.setInteractive();
      this.physics.world.enable(this.image1);

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.setInteractive();
      this.physics.world.enable(this.hitbox1);

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
    this.item2 = this.add.text(300, 250, "Clickable Text", {"fontFamily":"Arial","fontSize":"18px","color":"#ff0000"});
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
