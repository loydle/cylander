function getLabelCode(name, label, labelStyles) {
  if (!label || !name) return '';
  return `
    this.${name}.label = this.add.text(
     this.${name}.getBounds()?.x + (this.${name}.getBounds()?.width / 2), this.${name}.getBounds()?.y - this.${name}.getBounds()?.height / 2, "${
       label.content
     }",
     ${JSON.stringify(labelStyles)}
   ).setOrigin(0.5);
 `;
}

module.exports = getLabelCode;
