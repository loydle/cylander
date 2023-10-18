# Scene Structure Documentation

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

### Types of actionable items

As of now there are three types of actionable items:

- Image

```json
{
  "name": "itemTypeImage", // (mandatory)
  "type": "image",// (mandatory)
  "label": { // (optional)
    "content": {
      "en": "text"
      }
  },
  "scale": 0.6, // (optional)
  "position": {
    "x": 120, // (mandatory)
    "y": 920 // (mandatory)
  },
  "image": {
    "url": "path/to/image.jpg" // (mandatory)
  },
  "origin": {  // (optional - The origin is the point within the object from which positioning and rotation are calculated. )
    "x": 0.5,
    "y": 0.5
  },
  "isDraggable": true, // (optional)
  "hasPhysicsEnabled": true, // (optional)
  "actions": []
}
```

- Hitbox
```json
{
  "name": "itemTypeHitbox", // (mandatory)
  "type": "hitbox", // (mandatory)
  "label": { // (optional)
    "content": {
      "en": "text"
      }
  },
  "backgroundColor": "0xfff00ff", // (optional)
  "scale": 1, // (optional)
  "position": {
    "x": 100, // (mandatory)
    "y": 200 // (mandatory)
  },
  "size": {
    "width": 40, // (mandatory)
    "height": 200 // (mandatory)
  },
  "origin": {  // (optional - The origin is the point within the object from which positioning and rotation are calculated. )
    "x": 0.5,
    "y": 0.5
  },
  "isDraggable": true, // (optional)
  "hasPhysicsEnabled": true, // (optional)
  "actions": []
}
```


- Text
```json
{
  "name": "itemTypeText", // (mandatory)
  "type": "text", // (mandatory)
  "text": {
  "content": {
      "en": "text"
      }, // (mandatory)
  "styles": {
    "font": "36px monospace", // (optional)
    "fill": "#ffffff", // (optional)
    "backgroundColor": "#333", // (optional)
    "padding": {
      "x": 10, // (optional)
      "y": 10 // (optional)
      }
    },
  },
  "scale": 1, // (optional)
  "position": {
    "x": 100, // (mandatory)
    "y": 200 // (mandatory)
  },
  "origin": {  // (optional - The origin is the point within the object from which positioning and rotation are calculated. )
    "x": 0.5,
    "y": 0.5
  },
  "isDraggable": true, // (optional)
  "hasPhysicsEnabled": true, // (optional)
  "actions": []
}
```

### Actions and Events
Each actionable item can have one or more actions, and each action can trigger one or more events. Events define what happens when the action is performed.

* Possible actions are listed here: [actionTypes.js](../scene-generator/actionTypes.js)
* Possible events are listed here: [eventTypes.js](../scene-generator/eventTypes.js)

## Main NPC (Optional)

The `mainNPC` object allows you to define properties and dialog for the main Non-Playable Character in the scene. The main NPC can be used in events to trigger dialog or animations.

