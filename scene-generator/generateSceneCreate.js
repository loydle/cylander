/* eslint-env node */

function generateSceneCreate(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, instructorNPC } = sceneConfig;
  let createCode = '';
  createCode += 'let isTransitionInProgress = false;\n';

  if (backgroundImage) {
    createCode += `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);\n`;
  }

  actionableItems.forEach(
    ({
      name,
      type,
      position,
      size,
      events,
      isDraggable,
      isPhysics,
      animation,
      backgroundColor,
      image,
    }) => {
      if (type === 'hitbox') {
        createCode += `this.${name} = this.add.rectangle(${position?.x}, ${position?.y}, ${size.width}, ${size.height}, ${backgroundColor}).setInteractive();\n`;
      }

      if (type === 'image') {
        createCode += `this.${name} = this.add.image(${position?.x}, ${position?.y}, "${name}").setInteractive();\n`;
        if (image && image.scale) {
          createCode += `this.${name}.setScale(${image.scale});\n`;
        }
      }

      if (animation) {
        createCode += `
        this.tweens.add({
          targets: this.${name},
          ${Object.entries(animation.options)
            .map(
              ([key, value]) =>
                `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
            )
            .join(',')}
            });
            `;
      }

      if (isDraggable) {
        createCode += `
            this.input.setDraggable(this.${name});
            this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
              gameObject.x = dragX;
              gameObject.y = dragY;
            });
            `;
      }

      if (isPhysics) {
        createCode += `this.physics.world.enable(this.${name});`;
      }

      function generateInstructorNPCDialogAction(action) {
        return `
        this.instructorNPC.dialogContent = "${action.dialog.content}";
        this.instructorNPC.showDialog(this.instructorNPC.dialogContent, ${
          action.dialog?.duration || 3000
        });

        // Delay hiding the dialog to prevent conflicts with other dialogs
        this.time.delayedCall(${
          action.dialog?.duration || 3000
        }, () => { this.instructorNPC.hideDialog(); });
      `;
      }

      function generateActions(name, eventType, target, actions) {
        let content = '';
        if (eventType === 'collide') {
          actions.forEach(({ actionType, action }) => {
            content += `
          this.physics.add.collider(this.${name}, this.${target}, () => {
            ${
              actionType === 'instructorNPCDialog'
                ? generateInstructorNPCDialogAction(action)
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
                    actionType === 'instructorNPCDialog'
                      ? generateInstructorNPCDialogAction(action)
                      : ''
                  }
                }, this);
                `;
          });
        }
        return content;
      }

      events.forEach(({ eventType, actions, target }) => {
        createCode += generateActions(name, eventType, target, actions);
      });
    }
  );

  if (instructorNPC) {
    createCode += `
      this.instructorNPC.create();
      this.instructorNPC.dialogContent = "";
      this.instructorNPC.showDialog("${instructorNPC?.dialog?.content}", ${
        instructorNPC?.dialog?.duration || 3000
      });
      this.instructorNPC.instructorNPCImage.setPosition(${
        instructorNPC.position.x
      }, ${instructorNPC.position.y});
      this.instructorNPC.moveTextPosition(${instructorNPC.position.x}, ${
        instructorNPC.dialog?.position?.top
          ? `${instructorNPC.position.y} - this.instructorNPC.instructorNPCImage.height  + ${instructorNPC.dialog?.position?.top}`
          : `${instructorNPC.position.y} - this.instructorNPC.instructorNPCImage.height / 2`
      });

    ${
      instructorNPC?.animation
        ? `this.tweens.add({
        targets: this.instructorNPC.instructorNPCImage,
        ${Object.entries(instructorNPC.animation.options)
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
