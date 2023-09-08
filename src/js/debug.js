import * as Phaser from 'phaser';

function debug(scene) {
  const debugKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
  let debugModeIsActive = false;
  const gameObjects = scene.children.getChildren();

  debugKey.on('down', () => {
    debugModeIsActive = !debugModeIsActive;
    if (debugModeIsActive) {
      gameObjects.forEach(gameObject => {
        if (gameObject.body) {
          const rectangle = scene.add.rectangle(gameObject.getBounds().x, gameObject.getBounds().y, gameObject.width * gameObject.scaleX, gameObject.height * gameObject.scaleY,);
          rectangle.setStrokeStyle(2, 0x00ff00);
          rectangle.setOrigin(0, 0);
          gameObject.internalType = 'Physic';

          gameObject.on('drag', () => {
            gameObject.coordinatesText.setPosition(
              gameObject.getBounds().x,
              gameObject.getBounds().y + (gameObject.height * gameObject.scale) + 10,
              );
            gameObject.debugBackground.setPosition(
              gameObject.x,
              gameObject.y
            );
            rectangle.setPosition(
              gameObject.getBounds().x,
              gameObject.getBounds().y
            );
            gameObject.coordinatesText.setText(`x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}\nwidth: ${gameObject.width.toFixed(0)}, height: ${gameObject.height.toFixed(0)}\ntype: ${gameObject.internalType} - ${gameObject.type}`);
          });

        } else if (gameObject.isHitbox) {
          gameObject.isStroked = true;
          gameObject.strokeColor = '0xff0000';
          gameObject.lineWidth = 4;
          gameObject.internalType = 'Hitbox';
        }

        const coordinatesContent = `x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}\nwidth: ${gameObject.width.toFixed(0)}, height: ${gameObject.height.toFixed(0)}\ntype: ${gameObject.internalType} - ${gameObject.type}`;

        const coordinatesText = scene.add.text(
          gameObject.getBounds().x,
          gameObject.getBounds().y + (gameObject.height * gameObject.scale) + 10,
          coordinatesContent,
          {
            fontFamily: 'Arial',
            fontSize: 28,
            fontWeight: 'bold',
            color: '#fff',
            visible: false,
            backgroundColor: '#000',
            padding: 12,
          }
        );

        const backgroundRect = scene.add.rectangle(
          gameObject.x,
          gameObject.y,
          gameObject.width * gameObject.scaleX,
          gameObject.height * gameObject.scaleY,
          0x0000FF,
          0.4
        );
        backgroundRect.setDepth(999);

        gameObject.coordinatesText = coordinatesText;
        gameObject.debugBackground = backgroundRect;
        gameObject.coordinatesText.visible = false;
        gameObject.debugBackground.visible = false;

        gameObject.on('pointerover', () => {
          console.log(gameObject);
          gameObject.coordinatesText.visible = true;
          gameObject.debugBackground.visible = true;
        });

        gameObject.on('pointerout', () => {
          gameObject.coordinatesText.visible = false;
          gameObject.debugBackground.visible = false;
        });
      });
    } else {
      gameObjects.map(gameObject => {
        gameObject.isStroked = false;
        scene.input.removeDebug(gameObject);

        if (gameObject.coordinatesText) {
          gameObject.coordinatesText.destroy();
        }
        if (gameObject.debugBackground) {
          gameObject.debugBackground.destroy();
        }

        gameObject.off('drag');

        gameObject.off('pointerover');
        gameObject.off('pointerout');
      });
    }
  });
}

export { debug };
