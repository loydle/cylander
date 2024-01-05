function getMainNPCDefaultDialogCode(dialog) {
  if (!dialog || !dialog?.content) return '';
  const content = JSON.stringify(dialog.content);
  const duration = dialog.duration || 3000;
  return `
  this.mainNPC?.showDialog(${content}[localization.locale], ${duration});`;
}

module.exports = getMainNPCDefaultDialogCode;
