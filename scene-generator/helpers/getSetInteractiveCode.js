function getSetInteractiveCode(name) {
  if (name === 'input' || !name) return '';
  return `this.${name}.setInteractive();`;
}

module.exports = getSetInteractiveCode;
