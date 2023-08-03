function getSetScaleCode(name, scale) {
  if (!scale || !name) return '';
  return `this.${name}.setScale(${scale});`;
}

module.exports = getSetScaleCode;
