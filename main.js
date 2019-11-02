const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');

let win;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
};

ipcMain.on('send-output', (event, arg) => {
    try {
        if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

        const d = new Date();
        const dateFormat = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}.${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}`
        fs.writeFileSync(`./logs/${dateFormat}.txt`, arg);
    
        event.reply('send-response', 'Arquivo salvo com sucesso');
    } catch (err) {
        event.reply('send-response', 'Um erro ocorreu ao tentar salvar o arquivo');
    }
})

app.on('ready', createWindow);
