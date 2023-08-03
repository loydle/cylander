function getMainNPCAnimationCode(animation) {
  if (!animation) return '';
  const options = Object.entries(animation.options)
    .map(
      ([key, value]) =>
        `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
    )
    .join(',');
  return `this.tweens.add({ targets: this.mainNPC?.mainNPCImage, ${options} });`;
}

module.exports = getMainNPCAnimationCode;
