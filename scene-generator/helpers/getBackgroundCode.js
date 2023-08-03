function getBackgroundCode(background, sceneName) {
  if (!background) return '';
  if (background?.image) {
    return `this.add.image(0, 0, "background-${sceneName.toLowerCase()}").setOrigin(0);`;
  } else if (background?.color) {
    return `this.cameras.main.setBackgroundColor(${background?.color});`;
  }
  return '';
}

module.exports = getBackgroundCode;
