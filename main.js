const electron = require('electron');

// const mainMenuTemplate = require('./src/menuTemplates/mainMenuTemplate');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let isMac;

// Test OS plateform Windows || Mac
(function() {
  isMac = process.platform === 'darwin' ? true : false;
  console.log('OS Plateform:', process.platform);
})();

const shortcuts = {
  quit: isMac ? 'Command+Q' : 'Ctrl+Q'
};

// Build Main menu from template
const mainMenu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      {
        label: 'Add item'
      },
      {
        label: 'Clear items'
      },
      {
        label: 'Quit',
        accelerator: shortcuts.quit,
        click() {
          app.quit();
        }
      }
    ]
  }
]);

function createWindow() {
  // Create new window
  mainWindow = new BrowserWindow({});

  // Load html
  mainWindow.loadFile('mainWindow.html');

  // Build menu from template
  // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  // Insert menu
  Menu.setApplicationMenu(mainMenu);

  // Emitted when the window is closed.
  mainWindow.on('closed', () => (mainWindow = null));
}

// Listen for the app to be ready
app
  .on('ready', createWindow)
  .on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (isMac) {
      app.quit();
    }
  })
  .on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainMenu === null) {
      createWindow();
    }
  });
