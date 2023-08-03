function getDragEventCode(sceneHasOneOrMoreDraggableItems) {
  if (!sceneHasOneOrMoreDraggableItems) return '';
  return `this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
   gameObject.x = dragX;
   gameObject.y = dragY;
 });`;
}

module.exports = getDragEventCode;
