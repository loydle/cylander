function getSetOriginCode(name, origin) {
  if (!origin || !name) return '';
  return `this.${name}.setOrigin(${origin?.x || 0}, ${origin?.y || 0});`;
}

module.exports = getSetOriginCode;
