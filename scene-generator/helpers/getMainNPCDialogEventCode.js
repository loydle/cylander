function getMainNPCDialogEventCode(event, name, actionType, index) {
  if (!event || !event.dialog) return '';
  return `
   this.mainNPC.dialogContent = this.msg("${name}-${actionType}-npcDialog-${index}");
   this.mainNPC.showDialog(this.mainNPC.dialogContent, ${
     event.dialog?.duration || 3000
   });
 `;
}

module.exports = getMainNPCDialogEventCode;
