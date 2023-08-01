# Scene Structure Documentation

## Introduction

The `Scene.json` file is used to configure scenes in the game. It defines the background, actionable items, main NPC (Non-Playable Character), and their interactions. This documentation provides an overview of the structure and possible configurations for the `Scene.json` file.

## Structure of Scene.json

The `Scene.json` file has the following structure:

```json
{
  "background": {
    // Background configuration
  },
  "actionableItems": [
    // List of actionable items (interactive elements) in the scene
  ],
  "mainNPC": {
    // Main NPC configuration (optional)
  }
}
```

## Background Configuration

The `background` object defines the scene's background appearance. It can be configured in one of the following ways:

* Background Image:

```json
"background": {
  "image": {
    "fileName": "background-image.png"
  }
}
````

* Background Color:

```json
"background": {
  "color": "0xabcdef"
}
```

## Actionable Items

Actionable items are interactive elements that can be clicked, dragged, or collide with other elements in the scene. They are defined in the `actionableItems` array. Each actionable item has the following structure:

```json
{
  "name": "item1", // A unique identifier for the item
  "type": "image", // Type of the item: "image" or "text"
  "position": {
    "x": 100, // X-coordinate position of the item
    "y": 200 // Y-coordinate position of the item
  },
  "size": {
    "width": 50, // Width of the item (not used for text type)
    "height": 50 // Height of the item (not used for text type)
  },
  "text": {
    // Text configuration (only for type "text")
  },
  "image": {
    // Image configuration (only for type "image")
  },
  "isDraggable": true, // Set to true if the item is draggable (only for type "image")
  "hasPhysicsEnabled": true, // Set to true if physics is enabled for the item (only for type "image")
  "actions": [
    // List of events/actions associated with the item
  ]
}
```

### Text Actionable Item Configuration

For actionable items of type "text," the configuration will look like this:

```json
"text": {
  "content": "Hello, World!", // The text content
  "styles": {
    "fontFamily": "Arial",
    "fontSize": "24px",
    "color": "#ffffff"
  },
  "origin": 0.5, // Origin of the text (0.5 represents the center)
  "scale": 1 // Scale of the text
}
```

### Image Actionable Item Configuration

For actionable items of type "image," the configuration will look like this:

```json
"image": {
  "url": "path/to/image.png", // URL of the image
  "scale": 2 // Scale of the image
}
```

### Actions and Events
Each actionable item can have one or more actions, and each action can trigger one or more events. Events define what happens when the action is performed. Supported event types are:

* **mainNPCDialog**: Displays a dialog for the main NPC with specified content and duration.
* **sceneTransition**: Transitions to the specified scene with animation effects.
Refer to the provided test cases for examples of actionable item configurations and their corresponding events.

## Main NPC (Optional)

The `mainNPC` object allows you to define properties and dialog for the main Non-Playable Character in the scene. The main NPC can be used in events to trigger dialog or animations.

