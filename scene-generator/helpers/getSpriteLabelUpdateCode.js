function getSpriteLabelUpdateCode(name, label) {
  if (!label || !name) return '';
  return `
    this.${name}.label.setPosition(this.${name}.x + (this.${name}.width / 2), this.${name}.y);
 `;
}

module.exports = getSpriteLabelUpdateCode;
