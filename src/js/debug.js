import * as Phaser from 'phaser';

function debug(scene) {
  const debugKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.INSERT);
  let debugModeIsActive = false;
  const gameObjects = scene.children.getChildren();

  debugKey.on('down', () => {
    debugModeIsActive = !debugModeIsActive;
    if (debugModeIsActive) {
      gameObjects.map(gameObject => {

            scene.input.enableDebug(gameObject, 0xff0000);
            gameObject.isStroked = true;
            gameObject.strokeColor = "0xff0000";
      })
    } else {
      gameObjects.map(gameObject => {
          gameObject.isStroked = false;
          scene.input.removeDebug(gameObject)
    })
    }
  });
}

export { debug }

