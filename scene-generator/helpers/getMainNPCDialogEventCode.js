function getMainNPCDialogEventCode(event) {
  if (!event || !event.dialog) return '';
  return `
   this.mainNPC.dialogContent = "${event.dialog?.content}";
   this.mainNPC.showDialog(this.mainNPC.dialogContent, ${
     event.dialog?.duration || 3000
   });
 `;
}

module.exports = getMainNPCDialogEventCode;
