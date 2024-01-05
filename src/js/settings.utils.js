export const createSettings = (scene) => {
    const sceneObjects = [];
    const destroySceneObjects = () => {
        sceneObjects.forEach(sceneObject => sceneObject.destroy(true))
        sceneObjects.length = 0;
    }

    const overlay = createSettingsOverlay(scene);
    sceneObjects.push(overlay);

    const builder = {
        header: headerText => {
            const header = createSettingsHeader(scene)(headerText);
            sceneObjects.push(header);
            return builder;
        },
        menuItem: (
            menuItemText, 
            positionY, 
            { onClick, navigateTo, destroyOnNavigate = true, destroyOnClick = false }, 
            style = settingsItemStyle) => {
            const menuItem = createSettingsMenuItem(scene)(menuItemText, positionY, style);
            if (onClick) {
                menuItem.on('pointerup', onClick);
            }
            if (navigateTo) {
                menuItem.on('pointerup', () => {
                    if (destroyOnNavigate) {
                        destroySceneObjects();
                    }
                    navigateTo();
                });
            }
            if (destroyOnClick) {
                menuItem.on('pointerup', () => {
                    destroySceneObjects();
                })
            }
            
            sceneObjects.push(menuItem);
            return builder;
        }
    }

    return builder;
}

const createSettingsOverlay = scene => {
    const menuBackground = scene.add.rectangle(scene.cameras.main.centerX, scene.cameras.main.centerY, 1500, 1000, 0x1b1e1e)
    menuBackground.setOrigin(0.5, 0.5);
    return menuBackground;
}

const createSettingsHeader = scene => headerText => {
    const settingsHeader = scene.add.text(
        scene.cameras.main.centerX, 
        100, 
        headerText, 
        {...settingsItemStyle, font: '64px monospace'}
        );
        settingsHeader.setOrigin(0.5, 0);
        return settingsHeader;
}

const createSettingsMenuItem = scene => (menuItemText, positionY, style) => {
    const settingsMenuItem = scene.add.text(
        scene.cameras.main.centerX, 
        positionY, 
        menuItemText, 
        style
        );
        settingsMenuItem.setOrigin(0.5, 0);
        settingsMenuItem.setInteractive();
        return settingsMenuItem;
}

export const settingsItemStyle = {
    font: '36px monospace',
    fill: '#ffffff',
    backgroundColor: '#333',
    padding: { x: 10, y: 10 },
  };