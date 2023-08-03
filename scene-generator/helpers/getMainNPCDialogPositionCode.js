function getMainNPCDialogPositionCode(mainNPC) {
  return `
 this.mainNPC?.moveTextPosition(${
   mainNPC?.position?.x || `this.mainNPC?.initialPosition?.x`
 }, ${
   mainNPC.dialog?.position?.top
     ? `${
         mainNPC?.position?.y || `this.mainNPC?.initialPosition?.y`
       } - this.mainNPC?.mainNPCImage?.height  + ${
         mainNPC.dialog?.position?.top
       }`
     : `${
         mainNPC?.position?.y || `this.mainNPC?.initialPosition?.y`
       } - this.mainNPC?.mainNPCImage?.height / 2`
 });
 `;
}

module.exports = getMainNPCDialogPositionCode;
