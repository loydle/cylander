const getDragEventCode = require('../../../scene-generator/helpers/getDragEventCode.js');

describe('getDragEventCode', () => {
  it('should return an empty string when sceneHasOneOrMoreDraggableItems is false', () => {
    const sceneHasOneOrMoreDraggableItems = false;
    const result = getDragEventCode(sceneHasOneOrMoreDraggableItems);
    expect(result).toBe('');
  });

  it('should return the drag event listener code when sceneHasOneOrMoreDraggableItems is true', () => {
    const sceneHasOneOrMoreDraggableItems = true;
    const result = getDragEventCode(sceneHasOneOrMoreDraggableItems);
    const expectedCode = `this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
   gameObject.x = dragX;
   gameObject.y = dragY;
 });`;
    expect(result).toBe(expectedCode);
  });
});
