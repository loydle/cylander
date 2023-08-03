const getMainNPCDialogEventCode = require('../../../scene-generator/helpers/getMainNPCDialogEventCode.js');

describe('getMainNPCDialogEventCode', () => {
  it('should return an empty string if event is not provided', () => {
    const event = undefined;
    const result = getMainNPCDialogEventCode(event);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return an empty string if event has no dialog', () => {
    const event = {};
    const result = getMainNPCDialogEventCode(event);
    expect(result.replace(/\s+/g, '')).toEqual('');
  });

  it('should return the correct code if event has a dialog', () => {
    const event = {
      dialog: {
        content: 'Hello, this is a dialog content.',
        duration: 5000,
      },
    };
    const result = getMainNPCDialogEventCode(event);

    const expectedCode = `
      this.mainNPC.dialogContent = "${event.dialog.content}";
      this.mainNPC.showDialog(this.mainNPC.dialogContent, ${event.dialog.duration});
    `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
