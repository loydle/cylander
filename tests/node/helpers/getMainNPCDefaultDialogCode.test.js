const getMainNPCDefaultDialogCode = require('../../../scene-generator/helpers/getMainNPCDefaultDialogCode.js');

describe('getMainNPCDefaultDialogCode', () => {
  it('should return an empty string if dialog is not provided', () => {
    const dialog = undefined;
    const result = getMainNPCDefaultDialogCode(dialog);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code with dialog content and default duration', () => {
    const dialog = {
      content: 'Hello, this is a default dialog.',
    };
    const result = getMainNPCDefaultDialogCode(dialog);
    const expectedCode = `this.mainNPC?.showDialog("Hello, this is a default dialog.", 3000);`;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });

  it('should return the correct code with dialog content and specified duration', () => {
    const dialog = {
      content: 'Hello, this is a custom dialog with duration.',
      duration: 5000,
    };
    const result = getMainNPCDefaultDialogCode(dialog);
    const expectedCode = `this.mainNPC?.showDialog("Hello, this is a custom dialog with duration.", 5000);`;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });

  it('should return the correct code with empty dialog content and default duration', () => {
    const dialog = {
      content: '',
    };
    const result = getMainNPCDefaultDialogCode(dialog);
    const expectedCode = `this.mainNPC?.showDialog("", 3000);`;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });

  it('should return the correct code with no duration specified', () => {
    const dialog = {
      content: 'Dialog without specified duration.',
    };
    const result = getMainNPCDefaultDialogCode(dialog);
    const expectedCode = `this.mainNPC?.showDialog("Dialog without specified duration.", 3000);`;
    expect(result.replace(/\s+/g, '')).toEqual(expectedCode.replace(/\s+/g, ''));
  });
});
