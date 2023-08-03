function getMainNPCImagePositionCode(position) {
  return `
   this.mainNPC?.mainNPCImage.setPosition(${
     position?.x || `this.mainNPC?.initialPosition?.x`
   }, ${position?.y || `this.mainNPC?.initialPosition?.y`});
 `;
}

module.exports = getMainNPCImagePositionCode;
