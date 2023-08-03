function getMainNPCDefaultDialogCode(dialog) {
  if (!dialog) return '';
  const content = dialog.content ?? '';
  const duration = dialog.duration || 3000;
  return `this.mainNPC?.showDialog("${content}", ${duration});`;
}

module.exports = getMainNPCDefaultDialogCode;
