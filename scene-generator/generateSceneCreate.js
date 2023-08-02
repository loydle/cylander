const ActionableItemType = require('./actionableItemTypes.js');
const EventType = require('./eventTypes.js');

function generateSceneCreate(sceneName, sceneConfig) {
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
    createCode += generateBackgroundCode(background, sceneName);
    createCode += generateMainNPCCode(mainNPC);

    if (actionableItems?.length > 0) {
      actionableItems.forEach((actionableItem) => {
        switch (actionableItem?.type) {
          case ActionableItemType.HITBOX:
            createCode += generateActionableItemHitboxCode(actionableItem);
            break;
          case ActionableItemType.IMAGE:
            createCode += generateActionableItemImageCode(actionableItem);
            break;
          case ActionableItemType.TEXT:
            createCode += generateActionableItemTextCode(actionableItem);
            break;
          default:
        }

        createCode += generateSetScaleCode(
          actionableItem?.name,
          actionableItem?.scale
        );
        createCode += generateSetOriginCode(
          actionableItem?.name,
          actionableItem?.origin
        );
        createCode += generateSetInteractiveCode(actionableItem?.name);
        createCode += generateAnimationCode(
          actionableItem?.name,
          actionableItem?.animation
        );
        createCode += generateSetDraggableCode(
          actionableItem?.name,
          actionableItem?.isDraggable
        );
        createCode += generateHasPhysicsCode(
          actionableItem?.name,
          actionableItem?.hasPhysicsEnabled
        );
        createCode += generateLabelCode(
          actionableItem?.name,
          actionableItem?.label,
          sceneConfig?.labelStyles
        );

        if (actionableItem?.actions?.length > 0) {
          actionableItem?.actions.forEach(
            ({ actionType, events, actionTarget }) => {
              createCode += generateEventsCode(
                actionableItem?.name,
                actionType,
                actionTarget,
                events
              );
            }
          );
        }
      });

      createCode += generateDragEventCode(sceneHasOneOrMoreDraggableItems);
    }
  }

  function generateBackgroundCode(background, sceneName) {
    if (!background) return '';
    if (background?.image) {
      return `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);`;
    } else if (background?.color) {
      return `this.cameras.main.setBackgroundColor(${background?.color});`;
    }
    return '';
  }

  function generateDragEventCode(sceneHasOneOrMoreDraggableItems) {
    if (!sceneHasOneOrMoreDraggableItems) return '';
    return `this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });`;
  }

  function generateLabelCode(name, label, labelStyles) {
    if (!label || !name) return '';
    return `
      this.add.text(
        this.${name}.getBounds()?.x + (this.${name}.getBounds()?.width / 2), this.${name}.getBounds()?.y - this.${name}.getBounds()?.height / 2, "${label}",
        ${JSON.stringify(labelStyles)}
      ).setOrigin(0.5);
    `;
  }

  function generateAnimationCode(name, animation) {
    if (!animation || !name) return '';
    return `
      this.tweens.add({
        targets: this.${name},
        ${Object.entries(animation?.options)
          .map(
            ([key, value]) =>
              `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
          )
          .join(',')}
      });
    `;
  }

  function generateSetDraggableCode(name, isDraggable) {
    if (!isDraggable || !name) return '';
    sceneHasOneOrMoreDraggableItems = true;
    return `
      this.input.setDraggable(this.${name});
      this.${name}.on('pointerdown', function () {
        this.scene.children.bringToTop(this);
      });
    `;
  }

  function generateSetScaleCode(name, scale) {
    if (!scale || !name) return '';
    return `this.${name}.setScale(${scale});`;
  }

  function generateSetOriginCode(name, origin) {
    if (!origin || !name) return '';
    return `this.${name}.setOrigin(${origin?.x || 0}, ${origin?.y || 0});`;
  }

  function generateSetInteractiveCode(name) {
    if (name === 'input' || !name) return '';
    return `this.${name}.setInteractive();`;
  }

  function generateHasPhysicsCode(name, hasPhysicsEnabled) {
    if (!hasPhysicsEnabled || !name) return '';
    return `this.physics.world.enable(this.${name});`;
  }

  function generateActionableItemImageCode(actionableItem) {
    return `this.${actionableItem?.name} = this.add.image(${
      actionableItem?.position?.x === 'center'
        ? `this.cameras.main.centerX`
        : actionableItem?.position?.x
    }, ${
      actionableItem?.position?.y === 'center'
        ? `this.cameras.main.centerY`
        : actionableItem?.position?.y
    }, "${actionableItem?.name}");
    `;
  }

  function generateActionableItemTextCode(actionableItem) {
    return `this.${actionableItem?.name} = this.add.text(${
      actionableItem?.position?.x === 'center'
        ? `this.cameras.main.centerX`
        : actionableItem?.position?.x
    }, ${
      actionableItem?.position?.y === 'center'
        ? `this.cameras.main.centerY`
        : actionableItem?.position?.y
    }, "${actionableItem?.text?.content}", ${JSON.stringify(
      actionableItem?.text?.styles
    )});
    `;
  }

  function generateActionableItemHitboxCode(actionableItem) {
    return `this.${actionableItem?.name} = this.add.rectangle(${
      actionableItem?.position?.x === 'center'
        ? `this.cameras.main.centerX`
        : actionableItem?.position?.x
    }, ${
      actionableItem?.position?.y === 'center'
        ? `this.cameras.main.centerY`
        : actionableItem?.position?.y
    }, ${actionableItem?.size?.width}, ${actionableItem?.size?.height}, ${
      actionableItem?.backgroundColor
    });
    `;
  }

  function generateMainNPCDialogEventCode(event) {
    if (!event.dialog) return '';
    return `
      this.mainNPC.dialogContent = "${event.dialog?.content}";
      this.mainNPC.showDialog(this.mainNPC.dialogContent, ${
        event.dialog?.duration || 3000
      });
    `;
  }

  function generateSceneTransitionCode(event) {
    if (!event.transition) return '';
    let cameraPosition = null;
    if (
      event?.transition?.camera?.position?.x &&
      event?.transition?.camera?.position?.y
    ) {
      cameraPosition = event?.transition?.camera?.position;
    } else if (event?.transition?.camera?.position?.actionableItemReference) {
      const reference =
        event?.transition?.camera?.position?.actionableItemReference;
      cameraPosition = sceneConfig?.actionableItems?.find(
        (item) => item.name === reference
      )?.position;
      cameraPosition = { reference };
    }
    return `
      if (!isTransitionInProgress) {
        isTransitionInProgress = true;
        ${
          cameraPosition?.x && cameraPosition?.y
            ? `this.cameras.main.pan(${cameraPosition.x}, ${cameraPosition.y});`
            : ''
        }

        ${
          cameraPosition?.reference
            ? `
        this.cameras.main.pan(this.${cameraPosition?.reference}?.getBounds()?.x, this.${cameraPosition?.reference}?.getBounds()?.y);`
            : ''
        }
        this.cameras.main.${event?.transition?.effect}(${
          event?.transition?.options
        }, (camera, progress) => {
        if (progress === 1) {
          isTransitionInProgress = false;
          this.scene.start("${event?.transition?.to}");
        }
      });
      }
    `;
  }

  function generateEventsCode(name, actionType, actionTarget, events) {
    if (!events) return '';

    let content = '';
    if (actionType === 'collide') {
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
            content += generateSceneTransitionCode(event);
          }
          if (eventType === EventType.MAIN_NPC_DIALOG) {
            content += generateMainNPCDialogEventCode(event);
          }
        });
        content += `});
        `;
      }
    } else {
      events?.forEach(({ eventType, event }) => {
        content += `
          this.${name}.on("${actionType.toLowerCase()}", function () {
            ${
              eventType === EventType.SCENE_TRANSITION
                ? generateSceneTransitionCode(event)
                : ''
            }
            ${
              eventType === EventType.MAIN_NPC_DIALOG
                ? generateMainNPCDialogEventCode(event)
                : ''
            }
          }, this);
        `;
      });
    }
    return content;
  }

  function generateMainNPCCode(mainNPC) {
    if (!mainNPC) return '';
    return `
      this.mainNPC?.create();
      ${generateMainNPCDefaultDialogCode(mainNPC?.dialog)}
      ${generateMainNPCImagePositionCode(mainNPC?.position)}
      ${generateMainNPCDialogPositionCode(mainNPC)}
      ${generateMainNPCAnimationCode(mainNPC?.animation)}
    `;

    function generateMainNPCDefaultDialogCode(dialog) {
      if (!dialog) return '';
      const content = dialog.content ?? '';
      const duration = dialog.duration || 3000;
      return `this.mainNPC?.showDialog("${content}", ${duration});`;
    }

    function generateMainNPCImagePositionCode(position) {
      return `
        this.mainNPC?.mainNPCImage.setPosition(${
          position?.x || `this.mainNPC?.initialPosition?.x`
        }, ${position?.y || `this.mainNPC?.initialPosition?.y`});
      `;
    }
    function generateMainNPCDialogPositionCode(mainNPC) {
      return `
      this.mainNPC?.moveTextPosition(${
        mainNPC?.position?.x || `this.mainNPC?.initialPosition?.x`
      }, ${
        mainNPC.dialog?.position?.top
          ? `${
              mainNPC?.position?.y || `this.mainNPC?.initialPosition?.y`
            } - this.mainNPC?.mainNPCImage?.height  + ${
              mainNPC.dialog?.position?.top
            }`
          : `${
              mainNPC?.position?.y || `this.mainNPC?.initialPosition?.y`
            } - this.mainNPC?.mainNPCImage?.height / 2`
      });
      `;
    }

    function generateMainNPCAnimationCode(animation) {
      if (!animation) return '';
      const options = Object.entries(animation.options)
        .map(
          ([key, value]) =>
            `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
        )
        .join(',');
      return `this.tweens.add({ targets: this.mainNPC?.mainNPCImage, ${options} });`;
    }
  }

  return createCode;
}

module.exports = generateSceneCreate;
