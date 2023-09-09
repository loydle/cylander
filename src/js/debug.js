import * as Phaser from 'phaser';

function debug(scene) {
  const debugKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.CTRL);
  const drawKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  let debugModeIsActive = false;
  let drawModeIsActive = false;
  let drawing = false;
  let startDrawingPoint;
  let currentRectangle;
  const drawnRectangles = [];

  drawKey.on('down', () => {
    drawModeIsActive = !drawModeIsActive;
    if (drawModeIsActive) {
      console.log('Entering Drawing Mode...');
      drawMode(scene);
    } else {
      console.log('Exiting Drawing Mode...');
      drawnRectangles.forEach((rectangle) => {
        rectangle.destroy();
      });
      drawnRectangles.length = 0;
      scene.input.off('pointerdown');
      scene.input.off('pointerup');
      scene.input.off('pointermove');
    }
  });

  const gameObjects = scene.children.getChildren();

  function drawMode(scene) {
    scene.input.on('pointerdown', startDrawing);
    scene.input.on('pointerup', stopDrawing);
    scene.input.on('pointermove', updateDrawing);

    function startDrawing(pointer) {
      drawing = true;
      startDrawingPoint = { x: pointer.x, y: pointer.y };
    }

    function stopDrawing() {
      if (currentRectangle) {
        const coordinatesContent = `x: ${currentRectangle.x.toFixed(0)}, y: ${currentRectangle.y.toFixed(0)}\nwidth: ${currentRectangle.width.toFixed(0)}, height: ${currentRectangle.height.toFixed(0)}`;

        const coordinatesText = scene.add.text(
          currentRectangle.getBounds().x,
          currentRectangle.getBounds().y + currentRectangle.height * currentRectangle.scale + 10,
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

        drawnRectangles.push(currentRectangle, coordinatesText);
      }
      if (drawing) {
        drawing = false;
        currentRectangle = null;
      }
    }

    function updateDrawing(pointer) {
      if (drawing) {
        if (currentRectangle) {
          currentRectangle.destroy();
        }
        const width = pointer.x - startDrawingPoint.x;
        const height = pointer.y - startDrawingPoint.y;
        currentRectangle = scene.add.rectangle(
          startDrawingPoint.x + width / 2,
          startDrawingPoint.y + height / 2,
          width,
          height,
          0xff0000
        );
        currentRectangle.setStrokeStyle(2, 0x00ff00);
        currentRectangle.setOrigin(0.5, 0.5);
        currentRectangle.setAlpha(0.7);
      }
    }
  }

  debugKey.on('down', () => {
    debugModeIsActive = !debugModeIsActive;
    if (debugModeIsActive) {
      gameObjects.forEach((gameObject) => {
        if (gameObject.body) {
          const rectangle = scene.add.rectangle(
            gameObject.getBounds().x,
            gameObject.getBounds().y,
            gameObject.width * gameObject.scaleX,
            gameObject.height * gameObject.scaleY
          );
          rectangle.setStrokeStyle(4, 0x00ff00);
          rectangle.setOrigin(0, 0);
          gameObject.internalType = 'Physic';

          gameObject.on('drag', () => {
            gameObject.coordinatesText.setPosition(
              gameObject.getBounds().x,
              gameObject.getBounds().y +
                gameObject.height * gameObject.scale +
                10
            );
            gameObject.debugBackground.setPosition(gameObject.x, gameObject.y);
            rectangle.setPosition(
              gameObject.getBounds().x,
              gameObject.getBounds().y
            );
            gameObject.coordinatesText.setText(
              `x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}\nwidth: ${gameObject.width.toFixed(0)}, height: ${gameObject.height.toFixed(0)}\nActionableObject Type: ${gameObject.internalType} - ${gameObject.type}`
            );
          });
        } else if (gameObject.isHitbox) {
          gameObject.isStroked = true;
          gameObject.strokeColor = '0xff0000';
          gameObject.lineWidth = 4;
          gameObject.internalType = 'Hitbox';
        }

        const coordinatesContent = `x: ${gameObject.x.toFixed(0)}, y: ${gameObject.y.toFixed(0)}\nwidth: ${gameObject.width.toFixed(0)}, height: ${gameObject.height.toFixed(0)}\nAO Type: ${gameObject.internalType} - ${gameObject.type}`;

        const coordinatesText = scene.add.text(
          gameObject.getBounds().x,
          gameObject.getBounds().y + gameObject.height * gameObject.scale + 10,
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
          0x0000ff,
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
      gameObjects.map((gameObject) => {
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
