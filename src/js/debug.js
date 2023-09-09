import * as Phaser from 'phaser';

function getDebugObjectInfoContentString(object) {
  return `x: ${object.x.toFixed(0)}, y: ${object.y.toFixed(
    0
  )}\nwidth: ${object.width.toFixed(0)}, height: ${object.height.toFixed(0)}`;
}

function getDebugObjectInfoStyle() {
  return {
    fontFamily: 'Arial',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    visible: false,
    backgroundColor: '#000',
    padding: 12,
  };
}

function debug(scene) {
  const debugKey = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.CTRL
  );
  const drawKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  const cleanDrawKey = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.C
  );

  let debugModeIsActive = false;
  let drawModeIsActive = false;

  const drawnRectanglesArray = [];
  const gameObjects = scene.children.getChildren();

  function getMainTitleDebugContent() {
    let debugActive = debugModeIsActive
      ? `Debug Mode Active\nPress "CTRL" to deactivate Debug Mode\n\n`
      : '';
    let drawActive = drawModeIsActive
      ? `Draw Mode Active\nPress "${String.fromCharCode(
          cleanDrawKey.keyCode
        )}" to clean the screen.\nPress "${String.fromCharCode(
          drawKey.keyCode
        )}" to deactivate Draw Mode.\n\n`
      : '';

    return `${debugActive}${drawActive}`;
  }
  let mainTitle = scene.add.text(30, 30, getMainTitleDebugContent(), {
    color: '#72FE00',
    fontSize: 22,
  });

  let drawing = false;
  function drawMode(scene) {
    let startDrawingPoint;
    let currentRectangle;

    scene.input.on('pointerdown', startDrawing);
    scene.input.on('pointerup', stopDrawing);
    scene.input.on('pointermove', updateDrawing);

    if (drawnRectanglesArray.length !== 0) {
      drawnRectanglesArray.forEach((rectangle) => {
        rectangle.visible = true;
        rectangle.coordinatesText.visible = true;
      });
    }
    function startDrawing(pointer) {
      drawing = true;
      startDrawingPoint = { x: pointer.x, y: pointer.y };
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
          height
        );
        currentRectangle.setStrokeStyle(4, 0x00ff00);
        currentRectangle.setOrigin(0.5, 0.5);
      }
    }

    function stopDrawing() {
      if (drawing) {
        currentRectangle.coordinatesText = scene.add.text(
          currentRectangle.getBounds().x,
          currentRectangle.getBounds().y +
            currentRectangle.height * currentRectangle.scale +
            10,
          getDebugObjectInfoContentString(currentRectangle),
          getDebugObjectInfoStyle()
        );
        drawnRectanglesArray.push(currentRectangle);
        drawing = false;
        currentRectangle = null;
      }
    }
  }

  drawKey.on('down', () => {
    cleanDrawKey.on('down', () => {
      drawnRectanglesArray.forEach((rectangle) => {
        rectangle.coordinatesText.destroy();
        rectangle.destroy();
      });
      drawnRectanglesArray.length = 0;
    });

    drawModeIsActive = !drawModeIsActive;
    if (drawModeIsActive) {
      mainTitle.setText(getMainTitleDebugContent());
      drawMode(scene);
    } else {
      mainTitle.setText(getMainTitleDebugContent());
      drawnRectanglesArray.forEach((rectangle) => {
        rectangle.visible = false;
        rectangle.coordinatesText.visible = false;
      });
      scene.input.off('pointerdown');
      scene.input.off('pointerup');
      scene.input.off('pointermove');
    }
  });

  debugKey.on('down', () => {
    debugModeIsActive = !debugModeIsActive;
    if (debugModeIsActive) {
      gameObjects.forEach((gameObject) => {
        if (gameObject.isHitbox || gameObject.body) {
          const rectangleDebugLine = scene.add.rectangle(
            gameObject.getBounds().x,
            gameObject.getBounds().y,
            gameObject.width * gameObject.scaleX,
            gameObject.height * gameObject.scaleY
          );
          rectangleDebugLine.setStrokeStyle(4, 0x00ff00);
          rectangleDebugLine.setOrigin(0, 0);

          const coordinatesText = scene.add.text(
            gameObject.getBounds().x,
            gameObject.getBounds().y +
              gameObject.height * gameObject.scale +
              10,
            getDebugObjectInfoContentString(gameObject),
            getDebugObjectInfoStyle()
          );

          const hoverBackgroundRectangle = scene.add.rectangle(
            gameObject.x,
            gameObject.y,
            gameObject.width * gameObject.scaleX,
            gameObject.height * gameObject.scaleY,
            0x0000ff,
            0.4
          );
          hoverBackgroundRectangle.setDepth(999);
          gameObject.coordinatesText = coordinatesText;
          gameObject.hoverBackground = hoverBackgroundRectangle;
          gameObject.rectangleDebugLine = rectangleDebugLine;
          gameObject.coordinatesText.visible = false;
          gameObject.hoverBackground.visible = false;

          gameObject.on('pointerover', () => {
            console.log(gameObject);
            gameObject.coordinatesText.visible = true;
            gameObject.hoverBackground.visible = true;
            gameObject.rectangleDebugLine.visible = true;
          });

          gameObject.on('pointerout', () => {
            gameObject.coordinatesText.visible = false;
            gameObject.hoverBackground.visible = false;
          });
          if (gameObject.body) {
            gameObject.internalType = 'Physic';

            gameObject.on('drag', () => {
              drawing = false;
              gameObject.coordinatesText.setPosition(
                gameObject.getBounds().x,
                gameObject.getBounds().y +
                  gameObject.height * gameObject.scale +
                  10
              );
              gameObject.hoverBackground.setPosition(
                gameObject.x,
                gameObject.y
              );
              rectangleDebugLine.setPosition(
                gameObject.getBounds().x,
                gameObject.getBounds().y
              );
              gameObject.coordinatesText.setText(
                getDebugObjectInfoContentString(gameObject)
              );
            });
          } else if (gameObject.isHitbox) {
            gameObject.internalType = 'Hitbox';
          }
        }
      });
      mainTitle.setText(getMainTitleDebugContent());
    } else {
      mainTitle.setText(getMainTitleDebugContent());
      gameObjects.forEach((gameObject) => {
        if (gameObject.rectangleDebugLine) {
          gameObject.rectangleDebugLine.destroy();
          gameObject.hoverBackground.destroy();
          gameObject.coordinatesText.destroy();
          gameObject.off('pointerover');
          gameObject.off('pointerout');
        }
      });
    }
  });
}

export { debug };
