import {createSettings, settingsItemStyle} from './settings.utils';
import localization from './localization';

function renderSettingsInvoker(scene) {
  return scene.add.text(1700, 50, 'Settings', settingsItemStyle)
}

function mainSettings(scene) {
  return createSettings(scene)
    .header('Game Settings')
    .menuItem('Language', 250 + (0 * 100), {navigateTo: () => languageSettings(scene)})
    .menuItem('Close', 400 + (0 * 100), {destroyOnClick: true})
}

function languageSettings(scene) {
  const setLocalization = (locale) => {
    localization.locale = locale;
    scene.scene.restart();
  };
  return createSettings(scene)
    .header('Select Language')
    .menuItem('English', 250 + (0 * 100), {onClick: () => setLocalization('en')})
    .menuItem('French', 250 + (1 * 100), {onClick: () => setLocalization('fr')})
    .menuItem('Dutch', 250 + (2 * 100), {onClick: () => setLocalization('nl')})
    .menuItem('Back', 400 + (3 * 100), {navigateTo: () => mainSettings(scene)})
}

function settings(scene) {
  const invoker = renderSettingsInvoker(scene);

  invoker.setInteractive();
  invoker.on('pointerup', () => mainSettings(scene));
}

export { settings };