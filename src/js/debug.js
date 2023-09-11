import * as Phaser from 'phaser';

function getDebugObjectInfoContentString(object) {
  return `x: ${object.x.toFixed(0)}, y: ${object.y.toFixed(
    0
  )}\nwidth: ${object.width
    .toFixed(0)
    .replace('-', '')}, height: ${object.height.toFixed(0).replace('-', '')}`;
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
  const wireframeKey = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.W
  );
  const drawKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  const cleanDrawKey = scene.input.keyboard.addKey(
    Phaser.Input.Keyboard.KeyCodes.C
  );

  let wireframeModeIsActive = false;
  let drawModeIsActive = false;

  const drawnRectanglesArray = [];
  const gameObjects = scene.children.getChildren();

  function getMainTitleContent() {
    let wireframeActive = wireframeModeIsActive
      ? `Wireframe Mode Active\nPress "${String.fromCharCode(
          wireframeKey.keyCode
        )}" to deactivate.\n\n`
      : '';
    let drawActive = drawModeIsActive
      ? `Draw Mode Active\nPress "${String.fromCharCode(
          cleanDrawKey.keyCode
        )}" to clean the screen.\nPress "${String.fromCharCode(
          drawKey.keyCode
        )}" to deactivate.\n\n`
      : '';

    return `${wireframeActive}${drawActive}`;
  }

  let mainTitle = scene.add.text(30, 30, getMainTitleContent(), {
    color: '#72FE00',
    fontSize: 22,
  });

  function updateDebugMenuInfo() {
    mainTitle.setText(getMainTitleContent());
  }

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
      currentRectangle = null;
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
        if (currentRectangle) {
          const rect = currentRectangle;
          const x = Number(rect.x.toFixed(0));
          const y = Number(rect.y.toFixed(0));
          const width = Number(rect.width.toFixed(0).replace('-', ''));
          const height = Number(rect.height.toFixed(0).replace('-', ''));

          rect.coordinatesText = scene.add.text(
            rect.getBounds().x,
            rect.getBounds().y + rect.height * rect.scale + 10,
            getDebugObjectInfoContentString(rect),
            getDebugObjectInfoStyle()
          );
          rect.isDrawing = true;
          rect.setInteractive();
          rect.hoverBackground = scene.add.rectangle(
            rect.x,
            rect.y,
            rect.width * rect.scaleX,
            rect.height * rect.scaleY,
            0x0000ff,
            0.4
          );

          rect.coordinatesText.visible = false;
          rect.hoverBackground.visible = false;
          rect.on('pointerover', () => {
            rect.hoverBackground.setDepth(999);
            rect.coordinatesText.setDepth(999);
            rect.setDepth(999);
            rect.coordinatesText.visible = true;
            rect.hoverBackground.visible = true;
            console.log(rect);
            console.info(`          {
              "name": "actionableObject",
              "type": "",
              "position": { "x": ${x}, "y": ${y} },
              "size": {
                "width": ${width},
                "height": ${height}
              },
              "actions": [],
            }`);
          });
          rect.on('pointerout', () => {
            rect.hoverBackground.setDepth(0);
            rect.coordinatesText.setDepth(0);
            rect.setDepth(0);
            rect.coordinatesText.visible = false;
            rect.hoverBackground.visible = false;
            rect.coordinatesText.bringToTop = false;
          });
          drawnRectanglesArray.push(currentRectangle);
        }
        drawing = false;
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
      updateDebugMenuInfo();
      drawMode(scene);
    } else {
      updateDebugMenuInfo();
      drawnRectanglesArray.forEach((rectangle) => {
        rectangle.visible = false;
        rectangle.coordinatesText.visible = false;
      });
      scene.input.off('pointerdown');
      scene.input.off('pointerup');
      scene.input.off('pointermove');
    }
  });

  wireframeKey.on('down', () => {
    wireframeModeIsActive = !wireframeModeIsActive;
    if (wireframeModeIsActive) {
      updateDebugMenuInfo();
      gameObjects.forEach((gameObject) => {
        if (gameObject.isHitbox || gameObject.body) {
          gameObject.wireframe = scene.add.rectangle(
            gameObject.getBounds().x,
            gameObject.getBounds().y,
            gameObject.width * gameObject.scaleX,
            gameObject.height * gameObject.scaleY
          );
          gameObject.wireframe.setStrokeStyle(4, 0x00ffff);
          gameObject.wireframe.setOrigin(0, 0);

          gameObject.coordinatesText = scene.add.text(
            gameObject.getBounds().x,
            gameObject.getBounds().y +
              gameObject.height * gameObject.scale +
              10,
            getDebugObjectInfoContentString(gameObject),
            getDebugObjectInfoStyle()
          );

          gameObject.hoverBackground = scene.add.rectangle(
            gameObject.x,
            gameObject.y,
            gameObject.width * gameObject.scaleX,
            gameObject.height * gameObject.scaleY,
            0x0000ff,
            0.4
          );
          gameObject.hoverBackground.setDepth(0);
          gameObject.wireframe.setDepth(0);
          gameObject.coordinatesText.setDepth(0);
          gameObject.coordinatesText.visible = false;
          gameObject.hoverBackground.visible = false;

          gameObject.on('pointerover', () => {
            console.log(gameObject);
            gameObject.hoverBackground.setDepth(999);
            gameObject.wireframe.setDepth(999);
            gameObject.coordinatesText.setDepth(999);
            gameObject.coordinatesText.visible = true;
            gameObject.hoverBackground.visible = true;
            gameObject.wireframe.visible = true;
          });

          gameObject.on('pointerout', () => {
            gameObject.hoverBackground.setDepth(0);
            gameObject.wireframe.setDepth(0);
            gameObject.coordinatesText.setDepth(0);
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
              wireframe.setPosition(
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
    } else {
      updateDebugMenuInfo();
      gameObjects.forEach((gameObject) => {
        if (gameObject.wireframe) {
          gameObject.wireframe.destroy();
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
