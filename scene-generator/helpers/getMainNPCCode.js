const getMainNPCDefaultDialogCode = require('./getMainNPCDefaultDialogCode.js');
const getMainNPCImagePositionCode = require('./getMainNPCImagePositionCode.js');
const getMainNPCDialogPositionCode = require('./getMainNPCDialogPositionCode.js');
const getMainNPCAnimationCode = require('./getMainNPCAnimationCode.js');
const getHasPhysicsCode = require('./getHasPhysicsCode.js');
const getSetInteractiveCode = require('./getSetInteractiveCode.js');

function getMainNPCCode(mainNPC) {
  if (!mainNPC) return '';
  return `
    this.mainNPC?.create();
    ${getMainNPCDefaultDialogCode(mainNPC?.dialog)}
    ${getMainNPCImagePositionCode(mainNPC?.position)}
    ${getMainNPCDialogPositionCode(mainNPC)}
    ${getMainNPCAnimationCode(mainNPC?.animation)}
    ${getHasPhysicsCode('mainNPC?.mainNPCImage', true)}
    ${getSetInteractiveCode('mainNPC?.mainNPCImage')}
    `;
}

module.exports = getMainNPCCode;
