import * as Phaser from 'phaser';
import { gameConfig } from '../configs/gameConfig.js';
import { DefaultScene } from '../../dist/scenes/DefaultScene.js';
import { Scene1 } from '../../dist/scenes/Scene1.js';
import { Scene2 } from '../../dist/scenes/Scene2.js';
import { Scene3 } from '../../dist/scenes/Scene3.js';
import localization, { getLocale } from '../js/localization.js';
import { default_locale } from '../configs/localeConfig.js';

localization.locale = getLocale() || default_locale;

const config = {
  type: Phaser.AUTO,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {},
  },
  scene: [DefaultScene, Scene1, Scene2, Scene3],
};

const game = new Phaser.Game({ ...config, ...gameConfig });

function resizeGame() {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}

resizeGame();

window.addEventListener('resize', resizeGame);
