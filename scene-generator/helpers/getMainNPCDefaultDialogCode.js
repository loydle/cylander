function getMainNPCDefaultDialogCode(dialog) {
  if (!dialog || !dialog?.content) return '';
  const content = dialog.content;
  const duration = dialog.duration || 3000;
  return `this.mainNPC?.showDialog(this.msg("mainNPC-dialog-content"), ${duration});`;
}

module.exports = getMainNPCDefaultDialogCode;
