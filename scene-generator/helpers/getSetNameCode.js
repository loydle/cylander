function getSetNameCode(name) {
  if (!name) throw Error('Actionable Item name is missing.');
  return `this.${name}.name = "${name}";`;
}

module.exports = getSetNameCode;
