const sceneConfig = require('../../src/configs/sceneConfig.json');

function getSpriteLabelCode(name, label, labelStyles = sceneConfig?.labelStyles) {
  if (!label || !name) return '';
  return `
    this.${name}.label = this.add.text(
     this.${name}.x + (this.${name}.width / 2), this.${name}.y - this.${name}.height / 2, "${
       label.content
     }",
     ${JSON.stringify(labelStyles)}
   ).setOrigin(0.5);
 `;
}

module.exports = getSpriteLabelCode;
