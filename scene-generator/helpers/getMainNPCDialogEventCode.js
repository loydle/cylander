function getMainNPCDialogEventCode(event) {
  if (!event || !event.dialog) return '';
  const { content, duration } = event.dialog;
  return `
   this.mainNPC.showDialog(${JSON.stringify(content)}[localization.locale], ${duration || 3000});
 `;
}

module.exports = getMainNPCDialogEventCode;
