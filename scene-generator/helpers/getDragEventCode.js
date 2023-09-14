function getDragEventCode(sceneHasOneOrMoreDraggableItems) {
  if (!sceneHasOneOrMoreDraggableItems) return '';
  return `this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
   gameObject.x = dragX;
   gameObject.y = dragY;
   if (gameObject.label) {
    gameObject.label.x = gameObject.getBounds()?.x + gameObject.getBounds()?.width / 2;
    gameObject.label.y = gameObject.getBounds()?.y - gameObject.getBounds()?.height / 2;
   }
 });`;
}

module.exports = getDragEventCode;
