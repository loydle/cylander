# Cylander - Point and Click Web Based Game

Web-based point and click game aimed at raising awareness about cybersecurity threats. The game allows players to interact with objects and solve puzzles to progress through different scenes.

## Note

This project is currently in development and is a first draft aimed at testing the technology and mechanics of the game. It is not a final product and may undergo significant changes and improvements in the future.


## Installation

1. Clone the repository: `git clone https://github.com/loydle/cylander.git`
2. Navigate to the project folder: `cd cylander`
3. Install dependencies: `npm install`

## Scene Generator (Under Progress)

The scene generator is a script that automatically generates scene classes for the game based on scene templates defined in JSON format. It uses the Phaser game framework and allows for easy creation of scenes with interactive elements, background images, and robot dialogues.

### Scene Template Documentation

For detailed documentation on the scene templates and their properties, please refer to the [Scene Template Documentation](./scene-generator/SCENE_TEMPLATE_DOCUMENTATION.md).

### Usage

1. Define scene templates in JSON format in the 'scenes-requierments' directory.
2. Run the generator script: `npm run generate:all`
3. The scene classes will be automatically generated and saved to the 'src/js/scenes' directory.

## How to Play

- Start the development server: `npm start`
- Click on objects to interact with them.

## Technologies Used

- [Phaser](https://phaser.io/): A fast and free open-source framework for Canvas and WebGL-powered browser games.

