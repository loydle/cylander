function generateSceneCreate(sceneName, sceneConfig) {
  const { background, actionableItems, mainNPC } = sceneConfig;
  let createCode = '';
  createCode += 'let isTransitionInProgress = false;\n';

  if (background?.image?.fileName) {
    createCode += `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);\n`;
  } else if (background?.color) {
    createCode += `this.cameras.main.setBackgroundColor(${background?.color});\n`;
  }

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

  if (actionableItems && actionableItems.length > 0) {
    actionableItems?.forEach((actionableItem) => {
      if (actionableItem?.type === 'hitbox') {
        createCode += generateActionableItemHitbox(actionableItem);
      }

      if (actionableItem?.type === 'image') {
        createCode += generateActionableItemImage(actionableItem);
      }
      if (actionableItem?.type === 'text') {
        createCode += generateActionableItemText(actionableItem);
      }

      if (actionableItem?.scale) {
        createCode += setScale(actionableItem, actionableItem?.scale);
      }

      if (actionableItem?.name !== 'input') {
        // input is a reserved name
        createCode += `this.${actionableItem?.name}.setInteractive();`;
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

      function setScale(actionableItem, scale) {
        return `this.${actionableItem?.name}.setScale(${scale});`;
      }

      function generateActionableItemImage(actionableItem) {
        return `this.${actionableItem?.name} = this.add.image(${actionableItem?.position?.x}, ${actionableItem?.position?.y}, "${actionableItem?.name}");`;
      }

      function generateActionableItemText(actionableItem) {
        return `this.${actionableItem?.name} = this.add.text(${
          actionableItem?.position?.x
        }, ${actionableItem?.position?.y}, "${
          actionableItem?.text?.content
        }", ${JSON.stringify(actionableItem?.text?.styles)}).setOrigin(${
          actionableItem?.text?.origin
        });`;
      }

      function generateActionableItemHitbox(actionableItem) {
        return `this.${actionableItem?.name} = this.add.rectangle(${actionableItem?.position?.x}, ${actionableItem?.position?.y}, ${actionableItem?.size?.width}, ${actionableItem?.size?.height}, ${actionableItem?.backgroundColor});`;
      }

      function generateMainNPCDialogEvent(event) {
        return `
          this.mainNPC.dialogContent = "${event.dialog?.content}";
          this.mainNPC.showDialog(this.mainNPC.dialogContent, ${
            event.dialog?.duration || 3000
          });
        `;
      }

      function generateSceneTransition(event) {
        let cameraPosition = null;
        if (
          event?.transition?.camera?.position?.x &&
          event?.transition?.camera?.position?.y
        ) {
          cameraPosition = event?.transition?.camera?.position;
        } else if (
          event?.transition?.camera?.position?.actionableItemReference
        ) {
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
              ? `
          this.cameras.main.pan(${cameraPosition.x}, ${cameraPosition.y});`
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

      function generateEvents(name, actionType, actionTarget, events) {
        let content = '';
        if (actionType === 'collide') {
          if (
            events.some(
              ({ eventType }) =>
                eventType === 'sceneTransition' || eventType === 'mainNPCDialog'
            )
          ) {
            content += `
        this.physics.add.overlap(this.${name}, this.${actionTarget}, () => {
      `;
            events.forEach(({ eventType, event }) => {
              if (eventType === 'sceneTransition') {
                content += generateSceneTransition(event);
              }
              if (eventType === 'mainNPCDialog') {
                content += generateMainNPCDialogEvent(event);
              }
            });
            content += `});`;
          }
        } else {
          events?.forEach(({ eventType, event }) => {
            content += `
              this.${name}.on("${actionType.toLowerCase()}", function () {
                ${
                  eventType === 'sceneTransition'
                    ? generateSceneTransition(event)
                    : ''
                }
                ${
                  eventType === 'mainNPCDialog'
                    ? generateMainNPCDialogEvent(event)
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
            this.${actionableItem?.name}.getBounds()?.x + (this.${
              actionableItem?.name
            }.getBounds()?.width / 2), this.${
              actionableItem?.name
            }.getBounds()?.y - this.${
              actionableItem?.name
            }.getBounds()?.height / 2, "${actionableItem.label}",
            ${JSON.stringify(sceneConfig?.labelStyles)}
          ).setOrigin(0.5);
        `;
      }

      if (actionableItem?.actions && actionableItem?.actions.length > 0) {
        actionableItem?.actions.forEach(
          ({ actionType, events, actionTarget }) => {
            createCode += generateEvents(
              actionableItem?.name,
              actionType,
              actionTarget,
              events
            );
          }
        );
      }
    });
  }
  return createCode;
}

module.exports = generateSceneCreate;
