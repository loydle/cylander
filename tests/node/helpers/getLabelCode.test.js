const getLabelCode = require('../../../scene-generator/helpers/getLabelCode.js');

describe('getLabelCode', () => {
  it('should return an empty string if label or name is falsy', () => {
    const name = 'someName';
    const label = null;
    const labelStyles = { fontSize: '16px', color: '#ffffff' };
    const result = getLabelCode(name, label, labelStyles);
    expect(result).toEqual('');
  });

  it('should return the correct code for valid label and name', () => {
    const name = 'someName';
    const label = { content: 'Hello, World!' };
    const labelStyles = { fontSize: '16px', color: '#ffffff' };
    const result = getLabelCode(name, label, labelStyles);

    const expectedCode = `
    this.someName.label = this.add.text(this.someName.getBounds()?.x + (this.someName.getBounds()?.width / 2), this.someName.getBounds()?.y - this.someName.getBounds()?.height / 2, "Hello, World!",
    {"fontSize":"16px","color":"#ffffff"}
  ).setOrigin(0.5);
   `;
    expect(result.replace(/\s+/g, '')).toEqual(
      expectedCode.replace(/\s+/g, '')
    );
  });
});
