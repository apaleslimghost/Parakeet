import {app as electronApp, BrowserWindow} from 'electron';
import app from './server';
import {createServer} from 'http';
import socketServer from './update';
import defaults from 'lodash.defaults';
import {getPort} from 'portfinder';

var server = createServer();

class App {
  constructor(options) {
    this.options = defaults(options, {width:800, height:480});
  }

  init() {
    this.window = new BrowserWindow(this.options);
    this.window.loadURL(`http://localhost:${this.options.port}`);
    this.window.webContents.openDevTools();
    this.window.on('closed', () => {
      this.window = null;
    });
  }
}

getPort((e, port) => {
  if(e) throw e;

  server.on('request', app);
  server.listen(port, () => {
    console.log(`running on ${port}`);
    var a = new App({port});
    electronApp.on('ready', () => a.init());
    electronApp.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        electronApp.quit();
      }
    });

    electronApp.on('activate', function () {
      if (a.window === null) {
        a.init();
      }
    });
  });

  socketServer(server);
});
