const { BrowserWindow, app, Menu } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 900
    });
    // mainWindow.loadFile("index.html");

    const prodPath = `file://${path.join(__dirname, '../build/index.html')}`;
    const devPath = 'http://localhost:3000/';

    const renderPath = isDev ? devPath : prodPath;

    mainWindow.loadURL(renderPath);

    mainWindow.webContents.openDevTools();

}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if(BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin") {
        app.quit();
    }
})

const template = [
  ...(process.platform === "darwin"
    ? [
        {
          label: app.name,
          submenu: [{ role: "about" }],
        },
      ]
    : []),
  {
    label: "My Menu",
    submenu: [{ role: "undo" }, { type: "separator" }, { role: "cut" }],
  },
  {
    role: "help",
    submenu: [{
        label: "Delta",
        click: async () => {
            const { shell } = await require("electron");
            shell.openExternal("https://delta.soal.io")
        }
    }]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);