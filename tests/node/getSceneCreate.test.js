const getSceneCreate = require('../../scene-generator/getSceneCreate');

describe('getSceneCreate function', () => {
  it('should throw an error if the sceneName is not provided', () => {
    const sceneName = undefined;
    const sceneConfig = {};

    expect(() => getSceneCreate(sceneName, sceneConfig)).toThrowError(
      'Invalid sceneName. A valid PascalCase string sceneName is required.'
    );
  });

  it('should throw an error if the sceneName is not a string', () => {
    const sceneName = 123;
    const sceneConfig = {};

    expect(() => getSceneCreate(sceneName, sceneConfig)).toThrowError(
      'Invalid sceneName. A valid PascalCase string sceneName is required.'
    );
  });

  it('should throw an error if the sceneName is not in PascalCase format', () => {
    const sceneName = 'notPascalCase';
    const sceneConfig = {};

    expect(() => getSceneCreate(sceneName, sceneConfig)).toThrowError(
      'Invalid sceneName. A valid PascalCase string sceneName is required.'
    );
  });

  it('should throw an error if the sceneConfig is not provided', () => {
    const sceneName = 'ValidPascalCase';
    const sceneConfig = undefined;

    expect(() => getSceneCreate(sceneName, sceneConfig)).toThrowError(
      'Invalid sceneConfig. An object sceneConfig is required.'
    );
  });

  it('should throw an error if the sceneConfig is not an object', () => {
    const sceneName = 'ValidPascalCase';
    const sceneConfig = 'notAnObject';

    expect(() => getSceneCreate(sceneName, sceneConfig)).toThrowError(
      'Invalid sceneConfig. An object sceneConfig is required.'
    );
  });

  it('should get background image', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        image: {
          fileName: 'background-image.png',
        },
      },
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.add.image(0, 0, "background-testscene").setOrigin(0);
      `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get background color', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {
        color: '0xabcdef',
      },
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.cameras.main.setBackgroundColor(0xabcdef);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get mainNPC with default values', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      mainNPC: {},
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.mainNPC?.create();
    this.mainNPC?.mainNPCImage.setPosition(this.mainNPC?.initialPosition?.x, this.mainNPC?.initialPosition?.y);
    this.mainNPC?.moveTextPosition(this.mainNPC?.initialPosition?.x, this.mainNPC?.initialPosition?.y - this.mainNPC?.mainNPCImage?.height / 2);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items and set them as interactive elements', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
      this.text1.name = "text1";
      this.text1.setInteractive();

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with correct position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.text1 = this.add.text(200, 150, "undefined", undefined);
    this.text1.name = "text1";
    this.text1.setInteractive();

    this.text2 = this.add.text(this.cameras.main.centerX, 150, "undefined", undefined);
    this.text2.name = "text2";
    this.text2.setInteractive();

    this.text3 = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, "undefined", undefined);
    this.text3.name = "text3";
    this.text3.setInteractive();

    this.image1 = this.add.image(200, 150, "image1");
    this.image1.name = "image1";
    this.image1.setInteractive();

    this.image2 = this.add.image(this.cameras.main.centerX, 150, "image2");
    this.image2.name = "image2";
    this.image2.setInteractive();

    this.image3 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "image3");
    this.image3.name = "image3";
    this.image3.setInteractive();

    this.hitbox1 = this.add.rectangle(200, 150, undefined, undefined, undefined);
    this.hitbox1.isHitbox = true;
    this.hitbox1.name = "hitbox1";
    this.hitbox1.setInteractive();

    this.hitbox2 = this.add.rectangle(this.cameras.main.centerX, 150, undefined, undefined, undefined);
    this.hitbox2.isHitbox = true;
    this.hitbox2.name = "hitbox2";
    this.hitbox2.setInteractive();

    this.hitbox3 = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.centerY, undefined, undefined, undefined);
    this.hitbox3.isHitbox = true;
    this.hitbox3.name = "hitbox3";
    this.hitbox3.setInteractive();
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with correct origin', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.text1.setOrigin(0.5, 0.5);

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
      this.image1.setOrigin(0.5, 0.5);

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.hitbox1.setOrigin(0.5, 0.5);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with correct scale', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setScale(1);
      this.image1.setInteractive();

      this.image2 = this.add.image(undefined, undefined, "image2");
      this.image2.name = "image2";
      this.image2.setInteractive();

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setScale(1);
      this.text1.setInteractive();

      this.text2 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text2.name = "text2";
      this.text2.setInteractive();

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setScale(1);
      this.hitbox1.setInteractive();

      this.hitbox2 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox2.isHitbox = true;
      this.hitbox2.name = "hitbox2";
      this.hitbox2.setInteractive();
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with label', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      actionableItems: [
        {
          name: 'image1',
          type: 'image',
          label: {
            content: 'label',
            styles: {},
          },
        },
        {
          name: 'text1',
          type: 'text',
          label: {
            content: 'label',
            styles: {
              styles: {
                font: '36px monospace',
                fill: '#00ff00',
                backgroundColor: '#333',
                padding: {
                  x: 10,
                  y: 10,
                },
              },
            },
          },
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          label: {
            content: 'label',
            styles: {},
          },
        },
      ],
    };

    const expectedCode = `
    let isTransitionInProgress = false;
    this.image1 = this.add.image(undefined, undefined, "image1");
    this.image1.name = "image1";
    this.image1.setInteractive();
    this.image1.label = this.add.text(
        this.image1.getBounds()?.x + (this.image1.getBounds()?.width / 2), this.image1.getBounds()?.y - this.image1.getBounds()?.height / 2, "label",
        {}
      ).setOrigin(0.5);

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.text1.label = this.add.text(
          this.text1.getBounds()?.x + (this.text1.getBounds()?.width / 2), this.text1.getBounds()?.y - this.text1.getBounds()?.height / 2, "label",
          {"styles":
            {
              "font":"36pxmonospace",
              "fill":"#00ff00",
              "backgroundColor":
              "#333",
              "padding":
              {
                "x":10,
                "y":10
              }
            }
          }
        ).setOrigin(0.5);

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.hitbox1.label = this.add.text(
          this.hitbox1.getBounds()?.x + (this.hitbox1.getBounds()?.width / 2), this.hitbox1.getBounds()?.y - this.hitbox1.getBounds()?.height / 2, "label",
          {}
        ).setOrigin(0.5);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get draggable actionable items', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
      this.input.setDraggable(this.image1);
      this.image1.on('pointerdown', function () {
          this.scene.children.bringToTop(this);
          if (this.label) {
            this.scene.children.bringToTop(this.label);
          }
      });
      
      this.input.on("drag", (pointer,gameObject,dragX,dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        if(gameObject.label) {
          gameObject.label.x = gameObject.getBounds()?.x + gameObject.getBounds()?.width/2;
          gameObject.label.y = gameObject.getBounds()?.y - gameObject.getBounds()?.height/2;
        }
      });

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.input.setDraggable(this.text1);
        this.text1.on('pointerdown', function () {
          this.scene.children.bringToTop(this);
          if (this.label) {
            this.scene.children.bringToTop(this.label);
          }
      });
      
      this.input.on("drag", (pointer,gameObject,dragX,dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        if(gameObject.label) {
          gameObject.label.x = gameObject.getBounds()?.x + gameObject.getBounds()?.width/2;
          gameObject.label.y = gameObject.getBounds()?.y - gameObject.getBounds()?.height/2;
        }
      });

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.input.setDraggable(this.hitbox1);
      this.hitbox1.on('pointerdown', function () {
        this.scene.children.bringToTop(this);
        if (this.label) {
          this.scene.children.bringToTop(this.label);
        }
      });

      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        if (gameObject.label) {
          gameObject.label.x = gameObject.getBounds()?.x + gameObject.getBounds()?.width / 2;
          gameObject.label.y = gameObject.getBounds()?.y - gameObject.getBounds()?.height / 2;
        }
      });
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    const formattedExpectedCode = expectedCode.replace(/\s+/g, '');
    const formattedResult = result.replace(/\s+/g, '');
    expect(formattedResult).toEqual(formattedExpectedCode);
  });

  it('should get actionable item with animation', () => {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;

      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.tweens.add({
        targets: this.text1,
        duration: 1000,
        repeat: 2,
        yoyo: true
      });

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
      this.tweens.add({
        targets: this.image1,
        duration: 1000,
        repeat: 2,
        yoyo: true
      });

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.tweens.add({
        targets: this.hitbox1,
        duration: 1000,
        repeat: 2,
        yoyo: true
      });
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable item with physics enabled', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.physics.world.enable(this.text1);

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
      this.physics.world.enable(this.image1);

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.physics.world.enable(this.hitbox1);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with collide action and trigger events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
          actions: [
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'Scene1',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'image1',
          type: 'image',
          actions: [
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content: 'Collide event dialog',
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'hitbox1',
          type: 'hitbox',
          actions: [
            {
              actionType: 'collide',
              actionTarget: 'something',
              events: [
                {
                  eventType: 'sceneTransition',
                  event: {
                    transition: {
                      to: 'Scene1',
                      effect: 'zoomTo',
                      options: '1.5, 1000, "Linear", true',
                    },
                  },
                },
                {
                  eventType: 'mainNPCDialog',
                  event: {
                    dialog: {
                      content: 'Collide event dialog',
                    },
                  },
                },
              ],
            },
          ],
        },
      ],
    };

    const expectedCode = `
    let isTransitionInProgress = false;

    this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
    this.text1.name = "text1";
    this.text1.setInteractive();
    this.physics.add.overlap(this.text1, this.something, () => {
      if (!isTransitionInProgress) {
        isTransitionInProgress = true;
        this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
          if (progress === 1) {
            isTransitionInProgress = false;
            this.scene.start("Scene1");
          }
        });
      }
    });

  this.image1 = this.add.image(undefined, undefined, "image1");
  this.image1.name = "image1";
  this.image1.setInteractive();
  this.physics.add.overlap(this.image1, this.something, () => {
    this.mainNPC.dialogContent = "Collide event dialog";
    this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
  });

  this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
  this.hitbox1.isHitbox = true;
  this.hitbox1.name = "hitbox1";
  this.hitbox1.setInteractive();
  this.physics.add.overlap(this.hitbox1, this.something, () => {
    if (!isTransitionInProgress) {
      isTransitionInProgress = true;
      this.cameras.main.zoomTo(1.5, 1000, "Linear", true, (camera, progress) => {
        if (progress === 1) {
          isTransitionInProgress = false;
          this.scene.start("Scene1");
        }
      });
    }
    this.mainNPC.dialogContent = "Collide event dialog";
    this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
  });
`;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable items with pointerdown action and trigger events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      actionableItems: [
        {
          name: 'text1',
          type: 'text',
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
        {
          name: 'image1',
          type: 'image',
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
        {
          name: 'hitbox1',
          type: 'hitbox',
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
    };

    const expectedCode = `

      let isTransitionInProgress = false;
      this.text1 = this.add.text(undefined, undefined, "undefined", undefined);
      this.text1.name = "text1";
      this.text1.setInteractive();
      this.text1.on("pointerdown", function () {
        this.mainNPC.dialogContent = "PointerDown event with main NPC dialog.";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      }, this);

      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
      this.image1.on("pointerdown", function () {
        this.mainNPC.dialogContent = "PointerDown event with main NPC dialog.";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      }, this);

      this.hitbox1 = this.add.rectangle(undefined, undefined, undefined, undefined, undefined);
      this.hitbox1.isHitbox = true;
      this.hitbox1.name = "hitbox1";
      this.hitbox1.setInteractive();
      this.hitbox1.on("pointerdown", function () {
        this.mainNPC.dialogContent = "PointerDown event with main NPC dialog.";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, 3000);
      }, this);
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get transitions with custom/fixed camera position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item1.name = "item1";
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

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get transitions with camera position relative to actionableItem current position', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
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
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.item0.name = "item0";
      this.item0.setInteractive();
      this.item1.name = "item1";
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

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });

  it('should get actionable item that have no triggered events', () => {
    const sceneName = 'TestScene';
    const sceneConfig = {
      background: {},
      actionableItems: [
        {
          name: 'image1',
          type: 'image',
          actions: [],
        },
      ],
    };

    const expectedCode = `
      let isTransitionInProgress = false;
      this.image1 = this.add.image(undefined, undefined, "image1");
      this.image1.name = "image1";
      this.image1.setInteractive();
    `;

    const result = getSceneCreate(sceneName, sceneConfig);
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
  it('should include debug code when NODE_ENV is development', () => {
    process.env.NODE_ENV = 'development';
    const sceneConfig = {
      actionableItems: [
        {
          type: 'Hitbox',
          name: 'hitbox1',
        },
      ],
    };

    const sceneName = 'TestScene';
    const createCode = getSceneCreate(sceneName, sceneConfig);
    expect(createCode).toContain('debug(this);');
    process.env.NODE_ENV = 'test';
  });

  it('should exclude debug code when NODE_ENV is not development', () => {
    process.env.NODE_ENV = 'production';
    const sceneConfig = {
      actionableItems: [
        {
          type: 'Hitbox',
          name: 'hitbox1',
        },
      ],
    };

    const sceneName = 'TestScene';
    const createCode = getSceneCreate(sceneName, sceneConfig);
    expect(createCode).not.toContain('debug(this);');
    process.env.NODE_ENV = 'test';
  });
});
