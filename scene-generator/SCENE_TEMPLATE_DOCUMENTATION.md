# Scene Template Documentation

To create new scenes or modify existing ones, use JSON-based scene templates. The scene generator will use these templates to automatically generate scene classes.

## Scene Template Structure

The scene template consists of the following properties:

- `title` (string): The title of the scene.
- `backgroundImage` (string): URL of the background image for the scene (optional).
- `actionableItems` (array): An array of actionable items (objects) present in the scene.
- `robot` (object): Details about the robot character present in the scene (optional).

## Actionable Item Properties

Each actionable item in the `actionableItems` array has the following properties:

- `name` (string): The name of the item.
- `type` (string): The type of the item. It can be "image" or "hitbox".
- `position` (object): The position of the item on the scene (e.g., `{ "x": 100, "y": 200 }`).
- `actions` (array): An array of actions that can be performed on the item (e.g., click, drag).
- `animation` (object): Animation options for the item (optional). This property allows you to add animations to the item, such as scaling, rotating, or fading.

For "image" type items:

- `image` (object): The image properties for the item (optional).
  - `url` (string): The URL or file path to the image.
  - `scale` (number): The scale factor for the image (optional). This property allows you to resize the image.

For "hitbox" type items:

- `size` (object): The width and height of the item (e.g., `{ "width": 100, "height": 200 }`).
- `backgroundColor` (string): The background color of the item.

## Robot Properties

The robot object contains details about the robot character (if present in the scene):

- `defaultDialog` (string): The default dialog to display when the robot character appears.
- `dialogMargin` (object): Margin for the robot's dialog box (optional).
- `position` (object): The position of the robot character on the scene (e.g., `{ "x": 100, "y": 200 }`).
- `animation` (object): Animation options for the robot character (optional).
