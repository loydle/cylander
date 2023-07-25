import * as Phaser  from 'phaser';
import { DefaultScene } from './DefaultScene.js';
import { Scene2 } from './Scene2.js';

const config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    scene: [DefaultScene, Scene2], // Add both scene classes to the scene configuration
};

const game = new Phaser.Game(config);
