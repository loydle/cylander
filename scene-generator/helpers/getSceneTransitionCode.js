function getSceneTransitionCode(event, sceneConfig) {
  if (!event.transition) return '';
  let cameraPosition = null;
  if (
    event?.transition?.camera?.position?.x &&
    event?.transition?.camera?.position?.y
  ) {
    cameraPosition = event?.transition?.camera?.position;
  } else if (event?.transition?.camera?.position?.actionableItemReference) {
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
         ? `this.cameras.main.pan(${cameraPosition.x}, ${cameraPosition.y});`
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

module.exports = getSceneTransitionCode;
