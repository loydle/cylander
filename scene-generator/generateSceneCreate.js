/* eslint-env node */

function generateSceneCreate(sceneName, sceneConfig) {
  const { background, actionableItems, mainNPC } = sceneConfig;
  let createCode = '';
  createCode += 'let isTransitionInProgress = false;\n';

  if (background?.image?.fileName) {
    createCode += `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);\n`;
  } else if (background?.color) {
    createCode += `this.cameras.main.setBackgroundColor(${background?.color});\n`;
  }

  actionableItems.forEach((actionableItem) => {
    if (actionableItem?.type === 'hitbox') {
      createCode += `this.${actionableItem?.name} = this.add.rectangle(${actionableItem?.position?.x}, ${actionableItem?.position?.y}, ${actionableItem?.size?.width}, ${actionableItem?.size?.height}, ${actionableItem?.backgroundColor}).setInteractive();\n`;
    }

    if (actionableItem?.type === 'image') {
      createCode += `this.${actionableItem?.name} = this.add.image(${actionableItem?.position?.x}, ${actionableItem?.position?.y}, "${actionableItem?.name}").setInteractive();\n`;
      if (actionableItem?.image && actionableItem?.image?.scale) {
        createCode += `this.${actionableItem?.name}.setScale(${actionableItem?.image?.scale});\n`;
      }
    }

    if (actionableItem?.animation) {
      createCode += `
        this.tweens.add({
          targets: this.${actionableItem?.name},
          ${Object.entries(actionableItem?.animation?.options)
            .map(
              ([key, value]) =>
                `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
            )
            .join(',')}
        });
      `;
    }

    if (actionableItem?.isDraggable) {
      createCode += `
        this.input.setDraggable(this.${actionableItem?.name});
        this.${actionableItem?.name}.on('pointerdown', function () {
          this.scene.children.bringToTop(this);
        });

        this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
          gameObject.x = dragX;
          gameObject.y = dragY;
        });
      `;
    }

    if (actionableItem?.hasPhysicsEnabled) {
      createCode += `this.physics.world.enable(this.${actionableItem?.name});`;
    }

    function generateMainNPCDialogAction(action) {
      return `
        this.mainNPC.dialogContent = "${action.dialog?.content}";
        this.mainNPC.showDialog(this.mainNPC.dialogContent, ${
          action.dialog?.duration || 3000
        });
      `;
    }

    function generateActions(name, eventType, eventTarget, actions) {
      let content = '';
      if (eventType === 'collide') {
        actions.forEach(({ actionType, action }) => {
          content += `
            this.physics.add.overlap(this.${name}, this.${eventTarget}, () => {
              ${
                actionType === 'mainNPCDialog'
                  ? generateMainNPCDialogAction(action)
                  : ''
              }
            });
          `;
        });
      } else {
        actions.forEach(({ actionType, action }) => {
          content += `
            this.${name}.on("${eventType.toLowerCase()}", function () {
              ${
                actionType === 'sceneTransition'
                  ? `
                if (!isTransitionInProgress) {
                  isTransitionInProgress = true;
                  this.cameras.main.${action?.transition?.effect}(${action?.transition?.options}, (camera, progress) => {
                    if (progress === 1) {
                      isTransitionInProgress = false;
                      this.scene.start("${action?.transition?.to}");
                    }
                  });
                }
                `
                  : ''
              }
              ${
                actionType === 'mainNPCDialog'
                  ? generateMainNPCDialogAction(action)
                  : ''
              }
            }, this);
          `;
        });
      }
      return content;
    }

    if (actionableItem?.label) {
      createCode += `
        this.add.text(
          ${actionableItem.position.x},
          ${actionableItem.position.y - actionableItem.size.height},
          "${actionableItem.label}",
          ${JSON.stringify(sceneConfig?.labelStyles)}
        ).setOrigin(0.5);
      `;
    }

    actionableItem?.events.forEach(({ eventType, actions, eventTarget }) => {
      createCode += generateActions(
        actionableItem?.name,
        eventType,
        eventTarget,
        actions
      );
    });
  });

  if (mainNPC) {
    createCode += `
      this.mainNPC.create();
      this.mainNPC.showDialog("${mainNPC?.dialog?.content}", ${
        mainNPC?.dialog?.duration || 3000
      });
      this.mainNPC.mainNPCImage.setPosition(${
        mainNPC?.position?.x || `this.mainNPC.initialPosition.x`
      }, ${mainNPC?.position?.y || `this.mainNPC.initialPosition.y`});
      this.mainNPC.moveTextPosition(${
        mainNPC?.position?.x || `this.mainNPC.initialPosition.x`
      }, ${
        mainNPC.dialog?.position?.top
          ? `${
              mainNPC?.position?.y || `this.mainNPC.initialPosition.y`
            } - this.mainNPC.mainNPCImage.height  + ${
              mainNPC.dialog?.position?.top
            }`
          : `${
              mainNPC?.position?.y || `this.mainNPC.initialPosition.y`
            } - this.mainNPC.mainNPCImage.height / 2`
      });

      ${
        mainNPC?.animation
          ? `this.tweens.add({
        targets: this.mainNPC.mainNPCImage,
        ${Object.entries(mainNPC.animation.options)
          .map(
            ([key, value]) =>
              `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
          )
          .join(',')},
      });`
          : ''
      }
    `;
  }

  return createCode;
}

module.exports = generateSceneCreate;
