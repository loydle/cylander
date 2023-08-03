const getMainNPCCode = require('../../../scene-generator/helpers/getMainNPCCode.js');
const getMainNPCDefaultDialogCode = require('../../../scene-generator/helpers/getMainNPCDefaultDialogCode.js');
const getMainNPCImagePositionCode = require('../../../scene-generator/helpers/getMainNPCImagePositionCode.js');
const getMainNPCDialogPositionCode = require('../../../scene-generator/helpers/getMainNPCDialogPositionCode.js');
const getMainNPCAnimationCode = require('../../../scene-generator/helpers/getMainNPCAnimationCode.js');

jest.mock('../../../scene-generator/helpers/getMainNPCDefaultDialogCode.js');
jest.mock('../../../scene-generator/helpers/getMainNPCImagePositionCode.js');
jest.mock('../../../scene-generator/helpers/getMainNPCDialogPositionCode.js');
jest.mock('../../../scene-generator/helpers/getMainNPCAnimationCode.js');

describe('getMainNPCCode', () => {
  beforeEach(() => {
    getMainNPCDefaultDialogCode.mockReturnValue('mockedDefaultDialogCode');
    getMainNPCImagePositionCode.mockReturnValue('mockedImagePositionCode');
    getMainNPCDialogPositionCode.mockReturnValue('mockedDialogPositionCode');
    getMainNPCAnimationCode.mockReturnValue('mockedAnimationCode');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return an empty string if mainNPC is not provided', () => {
    const mainNPC = undefined;
    const result = getMainNPCCode(mainNPC);
    expect(result.replace(/\s+/g, '')).toEqual('');
    expect(getMainNPCDefaultDialogCode).not.toHaveBeenCalled();
    expect(getMainNPCImagePositionCode).not.toHaveBeenCalled();
    expect(getMainNPCDialogPositionCode).not.toHaveBeenCalled();
    expect(getMainNPCAnimationCode).not.toHaveBeenCalled();
  });

  it('should return the correct code with all mainNPC properties provided', () => {
    const mainNPC = {
      create: jest.fn(),
      dialog: { content: 'Hello', duration: 5000 },
      position: { x: 100, y: 200 },
      animation: { options: { duration: 1000 } },
    };

    const result = getMainNPCCode(mainNPC);

    const expectedCode = `
      this.mainNPC?.create();
      mockedDefaultDialogCode
      mockedImagePositionCode
      mockedDialogPositionCode
      mockedAnimationCode
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
    expect(getMainNPCDefaultDialogCode).toHaveBeenCalledWith(mainNPC.dialog);
    expect(getMainNPCImagePositionCode).toHaveBeenCalledWith(mainNPC.position);
    expect(getMainNPCDialogPositionCode).toHaveBeenCalledWith(mainNPC);
    expect(getMainNPCAnimationCode).toHaveBeenCalledWith(mainNPC.animation);
  });
});
