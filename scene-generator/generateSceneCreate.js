/* eslint-env node */

function generateSceneCreate(sceneName, sceneConfig) {
  const { backgroundImage, actionableItems, robot } = sceneConfig;
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

      function generateRobotDialogAction(robot) {
        return `
          this.robot.dialogContent = "${robot.dialog.content}";
          this.robot.showDialog(this.robot.dialogContent, ${
            robot.dialog?.duration || 3000
          });
        `;
      }

      function generateTransitionAction(
        name,
        type,
        transitionTo,
        transition,
        robot
      ) {
        return `
          this.${name}.on("${type.toLowerCase()}", function () {
            ${
              robot && robot.dialog?.content
                ? generateRobotDialogAction(robot)
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
        ({ type, transitionTo, transition, robot, collideWith }) => {
          if (type === 'collide') {
            createCode += `
            this.physics.add.collider(this.${name}, this.${collideWith}, () => {
              ${
                robot && robot.dialog?.content
                  ? generateRobotDialogAction(robot)
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
              robot
            );
          }
        }
      );
    }
  );

  if (robot) {
    createCode += `
          this.robot.create();
          this.robot.dialogContent = "";
          this.robot.showDialog("${robot?.dialog?.content}", ${robot?.dialog?.duration || 3000});
          this.robot.robotImage.setPosition(${robot.position.x}, ${
            robot.position.y
          });
          this.robot.moveTextPosition(${robot.position.x}, ${
            robot.dialog?.position?.top
              ? `${robot.position.y} - this.robot.robotImage.height  + ${robot.dialog?.position?.top}`
              : `${robot.position.y} - this.robot.robotImage.height / 2`
          });

          ${
            robot?.animation
              ? `this.tweens.add({
              targets: this.robot.robotImage,
              ${Object.entries(robot.animation.options)
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
