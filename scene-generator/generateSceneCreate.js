/* eslint-env node */

function generateSceneCreate(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, instructorNPC } = sceneConfig;
  let createCode = '';

  if (backgroundImage) {
    createCode += `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);\n`;
  }

  actionableItems.forEach(
    ({
      name,
      type,
      position,
      size,
      actions,
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
        createCode += `
              this.physics.world.enable(this.${name});
            `;
      }

      function generateRobotDialogAction(instructorNPC) {
        return `
          this.instructorNPC.dialogContent = "${instructorNPC.dialog.content}";
          this.instructorNPC.showDialog(this.instructorNPC.dialogContent, ${
            instructorNPC.dialog?.duration || 3000
          });
        `;
      }

      function generateTransitionAction(
        name,
        type,
        transitionTo,
        transition,
        instructorNPC
      ) {
        return `
          this.${name}.on("${type.toLowerCase()}", function () {
            ${
              instructorNPC && instructorNPC.dialog?.content
                ? generateRobotDialogAction(instructorNPC)
                : ''
            }
            ${
              transition
                ? `
              this.cameras.main.${transition.type}(${transition?.options}, (camera, progress) => {
                if (progress === 1) {
                  this.scene.start("${transitionTo}");
                }
              });
              `
                : ''
            }
          }, this);
        `;
      }

      actions.forEach(
        ({ type, transitionTo, transition, instructorNPC, collideWith }) => {
          if (type === 'collide') {
            createCode += `
            this.physics.add.collider(this.${name}, this.${collideWith}, () => {
              ${
                instructorNPC && instructorNPC.dialog?.content
                  ? generateRobotDialogAction(instructorNPC)
                  : ''
              }
            });
          `;
          } else {
            createCode += generateTransitionAction(
              name,
              type,
              transitionTo,
              transition,
              instructorNPC
            );
          }
        }
      );
    }
  );

  if (instructorNPC) {
    createCode += `
          this.instructorNPC.create();
          this.instructorNPC.dialogContent = "";
          this.instructorNPC.showDialog("${instructorNPC?.dialog?.content}", ${
            instructorNPC?.dialog?.duration || 3000
          });
          this.instructorNPC.robotImage.setPosition(${
            instructorNPC.position.x
          }, ${instructorNPC.position.y});
          this.instructorNPC.moveTextPosition(${instructorNPC.position.x}, ${
            instructorNPC.dialog?.position?.top
              ? `${instructorNPC.position.y} - this.instructorNPC.robotImage.height  + ${instructorNPC.dialog?.position?.top}`
              : `${instructorNPC.position.y} - this.instructorNPC.robotImage.height / 2`
          });

          ${
            instructorNPC?.animation
              ? `this.tweens.add({
              targets: this.instructorNPC.robotImage,
              ${Object.entries(instructorNPC.animation.options)
                .map(
                  ([key, value]) =>
                    `${key}: ${
                      typeof value === 'string' ? `'${value}'` : value
                    }`
                )
                .join(',')}
                });`
              : ''
          }
              `;
  }

  return createCode;
}

module.exports = generateSceneCreate;
