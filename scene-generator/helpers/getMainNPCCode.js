const getMainNPCDefaultDialogCode = require('./getMainNPCDefaultDialogCode.js');
const getMainNPCImagePositionCode = require('./getMainNPCImagePositionCode.js');
const getMainNPCDialogPositionCode = require('./getMainNPCDialogPositionCode.js');
const getMainNPCAnimationCode = require('./getMainNPCAnimationCode.js');

function getMainNPCCode(mainNPC) {
  if (!mainNPC) return '';
  return `
    this.mainNPC?.create();
    ${getMainNPCDefaultDialogCode(mainNPC?.dialog)}
    ${getMainNPCImagePositionCode(mainNPC?.position)}
    ${getMainNPCDialogPositionCode(mainNPC)}
    ${getMainNPCAnimationCode(mainNPC?.animation)}
  `;
}

module.exports = getMainNPCCode;
