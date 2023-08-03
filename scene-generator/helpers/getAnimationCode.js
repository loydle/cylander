function getAnimationCode(name, animation) {
  if (!animation || !name) return '';
  return `
   this.tweens.add({
     targets: this.${name},
     ${Object.entries(animation?.options)
       .map(
         ([key, value]) =>
           `${key}: ${typeof value === 'string' ? `'${value}'` : value}`
       )
       .join(',')}
   });
 `;
}

module.exports = getAnimationCode;
