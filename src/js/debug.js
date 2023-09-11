import * as Phaser from 'phaser';

const KEY_WIREFRAME = Phaser.Input.Keyboard.KeyCodes.W;
const KEY_DRAW = Phaser.Input.Keyboard.KeyCodes.D;
const KEY_CLEAN_DRAW = Phaser.Input.Keyboard.KeyCodes.C;
let drawing = false;

function getMainTitleContent(isWireframeActive, isDrawActive) {
  const infoLines = [];

  if (isWireframeActive) {
    infoLines.push('Wireframe Mode Active');
  }

  if (isDrawActive) {
    infoLines.push('Draw Mode Active');
    infoLines.push('(Press "C" to clean the screen, "D" to deactivate)');
  }

  return infoLines.join('\n');
}

function createText(scene, x, y, content, style) {
  return scene.add.text(x, y, content, style);
}

function createDebugText(scene, x, y, content, style) {
  const debugText = createText(scene, x, y, content, style);
  debugText.visible = false;
  return debugText;
}

function getDebugInfoContent(object) {
  return `x: ${object.x.toFixed(0)}, y: ${object.y.toFixed(
    0
  )}\nwidth: ${object.width.toFixed(0)}, height: ${object.height.toFixed(0)}`;
}

function getDebugInfoStyle() {
  return {
    fontFamily: 'Consolas',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#000',
    padding: 16,
  };
}

function bringToBack(...objects) {
  objects.forEach((obj) => {
    obj.setDepth(0);
  });
}
function bringToFront(...objects) {
  objects.forEach((obj) => {
    obj.setDepth(999);
  });
}

function showObjects(...objects) {
  objects.forEach((obj) => {
    obj.visible = true;
  });
}

function hideObjects(...objects) {
  objects.forEach((obj) => {
    obj.visible = false;
  });
}

function destroyObjects(...objects) {
  objects.forEach((obj) => {
    obj.destroy();
  });
}

function setupDrawMode(scene, drawnRectanglesArray) {
  let startDrawingPoint;
  let currentRectangle;

  scene.input.on('pointerdown', function startDrawing(pointer) {
    currentRectangle = null;
    drawing = true;
    startDrawingPoint = { x: pointer.x, y: pointer.y };
  });

  scene.input.on('pointermove', function updateDrawing(pointer) {
    if (drawing) {
      const width = Math.abs(pointer.x - startDrawingPoint.x);
      const height = Math.abs(pointer.y - startDrawingPoint.y);
      const rectX = Math.min(pointer.x, startDrawingPoint.x) + width / 2;
      const rectY = Math.min(pointer.y, startDrawingPoint.y) + height / 2;

      if (currentRectangle) {
        destroyObjects(currentRectangle);
      }

      currentRectangle = scene.add.rectangle(rectX, rectY, width, height);
      currentRectangle.setStrokeStyle(4, 0x00ff00);
    }
  });

  scene.input.on('pointerup', function stopDrawing() {
    if (drawing && currentRectangle) {
      const rect = currentRectangle;
      const x = Number(rect.x.toFixed(0));
      const y = Number(rect.y.toFixed(0));
      const width = Number(rect.width.toFixed(0).replace('-', ''));
      const height = Number(rect.height.toFixed(0).replace('-', ''));
      const hoverBackgroundColor = 0x0000ff;
      const hoverBackgroundAlpha = 0.4;
      rect.debugInfoContent = createDebugText(
        scene,
        rect.getBounds().x,
        rect.getBounds().y + rect.height * rect.scale + 10,
        getDebugInfoContent(rect),
        getDebugInfoStyle()
      );

      rect.setInteractive();
      rect.hoverBackground = scene.add.rectangle(
        rect.x,
        rect.y,
        rect.width,
        rect.height,
        hoverBackgroundColor,
        hoverBackgroundAlpha
      );

      rect.on('pointerover', () => {
        bringToFront(rect.hoverBackground, rect.debugInfoContent, rect);
        showObjects(rect.hoverBackground, rect.debugInfoContent);
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
        bringToBack(rect.hoverBackground, rect.debugInfoContent, rect);
        hideObjects(rect.hoverBackground, rect.debugInfoContent);
      });

      drawnRectanglesArray.push(currentRectangle);
    }
    drawing = false;
  });
}

function setupWireframeMode(scene, gameObjects) {
  gameObjects.forEach((gameObject) => {
    console.log(gameObject);
    if (gameObject.isHitbox || gameObject.body) {
      const x = gameObject.x;
      const y = gameObject.y;
      const width = gameObject.width * gameObject.scaleX;
      const height = gameObject.height * gameObject.scaleY;
      const wireframeStrokeWidth = 4;
      const wireframeStrokeColor = 0x00ffff;
      const debugInfoContentPadding = 10;
      const hoverBackgroundColor = 0x0000ff;
      const hoverBackgroundAlpha = 0.4;

      gameObject.wireframe = scene.add.rectangle(x, y, width, height);
      gameObject.wireframe.setStrokeStyle(
        wireframeStrokeWidth,
        wireframeStrokeColor
      );
      gameObject.wireframe.setOrigin(gameObject.originX, gameObject.originY);

      gameObject.debugInfoContent = createDebugText(
        scene,
        gameObject.getBounds().x,
        gameObject.getBounds().y +
          gameObject.height * gameObject.scale +
          debugInfoContentPadding,
        getDebugInfoContent(gameObject),
        getDebugInfoStyle()
      );

      gameObject.hoverBackground = scene.add.rectangle(
        gameObject.x,
        gameObject.y,
        width,
        height,
        hoverBackgroundColor,
        hoverBackgroundAlpha
      );

      bringToBack(
        gameObject.hoverBackground,
        gameObject.wireframe,
        gameObject.debugInfoContent
      );
      hideObjects(gameObject.debugInfoContent, gameObject.hoverBackground);

      gameObject.on('pointerover', () => {
        console.info(gameObject);
        bringToFront(
          gameObject.hoverBackground,
          gameObject.wireframe,
          gameObject.debugInfoContent
        );
        showObjects(
          gameObject.hoverBackground,
          gameObject.wireframe,
          gameObject.debugInfoContent
        );
      });

      gameObject.on('pointerout', () => {
        bringToBack(
          gameObject.hoverBackground,
          gameObject.wireframe,
          gameObject.debugInfoContent
        );
        hideObjects(gameObject.debugInfoContent, gameObject.hoverBackground);
      });
      if (gameObject.body) {
        gameObject.on('drag', () => {
          drawing = false;
          gameObject.debugInfoContent.setPosition(
            gameObject.getBounds().x,
            gameObject.getBounds().y +
              gameObject.height * gameObject.scale +
              debugInfoContentPadding
          );

          gameObject.hoverBackground.setPosition(gameObject.x, gameObject.y);
          gameObject.wireframe.setPosition(gameObject.x, gameObject.y);
          gameObject.debugInfoContent.setText(getDebugInfoContent(gameObject));
        });
      }
    }
  });
}

function debug(scene) {
  const wireframeKey = scene.input.keyboard.addKey(KEY_WIREFRAME);
  const drawKey = scene.input.keyboard.addKey(KEY_DRAW);
  const cleanDrawKey = scene.input.keyboard.addKey(KEY_CLEAN_DRAW);

  let isWireframeModeActive = false;
  let isDrawModeActive = false;

  const drawnRectanglesArray = [];
  const gameObjects = scene.children.getChildren();

  const mainTitleStyle = {
    color: '#72FE00',
    fontSize: 22,
  };

  const debugTitle = createText(scene, 30, 30, '', mainTitleStyle);

  drawKey.on('down', () => {
    drawnRectanglesArray.forEach((rectangle) => {
      rectangle.visible = true;
    });
    cleanDrawKey.on('down', () => {
      drawnRectanglesArray.forEach((rectangle) => {
        destroyObjects(
          rectangle.debugInfoContent,
          rectangle.hoverBackground,
          rectangle
        );
      });
      drawnRectanglesArray.length = 0;
    });

    isDrawModeActive = !isDrawModeActive;

    if (isDrawModeActive) {
      debugTitle.setText(
        getMainTitleContent(isWireframeModeActive, isDrawModeActive)
      );
      setupDrawMode(scene, drawnRectanglesArray);
    } else {
      debugTitle.setText(
        getMainTitleContent(isWireframeModeActive, isDrawModeActive)
      );
      drawnRectanglesArray.forEach((rectangle) => {
        hideObjects(
          rectangle,
          rectangle.debugInfoContent,
          rectangle.hoverBackground
        );
      });
      scene.input.off('pointerdown');
      scene.input.off('pointerup');
      scene.input.off('pointermove');
    }
  });

  wireframeKey.on('down', () => {
    isWireframeModeActive = !isWireframeModeActive;
    if (isWireframeModeActive) {
      debugTitle.setText(
        getMainTitleContent(isWireframeModeActive, isDrawModeActive)
      );
      setupWireframeMode(scene, gameObjects);
    } else {
      debugTitle.setText(
        getMainTitleContent(isWireframeModeActive, isDrawModeActive)
      );
      gameObjects.forEach((gameObject) => {
        if (gameObject.wireframe) {
          destroyObjects(
            gameObject.wireframe,
            gameObject.hoverBackground,
            gameObject.debugInfoContent
          );
          gameObject.off('pointerover');
          gameObject.off('pointerout');
        }
      });
    }
  });
}

export { debug };
