# Cylander - Point and Click Web Based Game

Web-based point and click game aimed at raising awareness about cybersecurity threats. The game allows players to interact with objects and solve puzzles to progress through different scenes.

## Note

This project is currently in development and is a first draft aimed at testing the technology and mechanics of the game. It is not a final product and may undergo significant changes and improvements in the future.


## Installation

1. Clone the repository: `git clone https://github.com/loydle/cylander.git`
2. Navigate to the project folder: `cd cylander`
3. Install dependencies: `npm install`
4. Generate scenes: `npm run generate:all`
5. Start the server: `npm run start`

## Scene Generator (Under Progress)

The scene generator is a script that automatically generates scene classes for the game based on scene templates defined in JSON format. It uses the Phaser game framework and allows for easy creation of scenes with interactive elements, background images, and MainNPC dialogues.

### Usage

1. Define scene templates in JSON format in the 'scenes-requierments' directory.
2. Run the generator script: `npm run generate:all`
3. The scene classes will be automatically generated and saved to the 'src/js/scenes' directory.
4. To add a new scene, follow these steps:
   * Create a new scene requirement file in JSON format and place it in the 'scenes-requierments' directory.
   *  Define the scene configuration in the JSON file, specifying the background, actionable items, and MainNPC dialogues as needed.
   *  Run the generator script by executing `npm run generate:all` in the terminal.
   *  The scene generator script will automatically process the JSON file and generate a new scene class based on the defined template.
   *  The newly created scene class will be saved to the 'src/js/scenes' directory with the appropriate name based on the JSON file.
   *  To use the new scene in the game, open the 'game.js' file and import the newly generated scene class using the appropriate import statement. For example: `import { NewScene } from './scenes/NewScene.js';`
   *  Add the new scene to the game's scene configuration by appending it to the 'updateScene' array in 'game.js'. For example: updateScene: [DefaultScene, Scene1, Scene2, NewScene],
   *  The new scene is now ready to be used and can be accessed and triggered in the game according to the defined configuration.


### Documentation

For detailed instructions on how to structure a new scene, please refer to the [Scene Structure Documentation](docs/scene-structure-documentation.md).

## How to Play

- Start the development server: `npm start`
- Click on objects to interact with them.

## Technologies Used

- [Phaser](https://phaser.io/): A fast and free open-source framework for Canvas and WebGL-powered browser games.

