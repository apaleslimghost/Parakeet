import {app, BrowserWindow} from 'electron';
import server from './server';
import defaults from 'lodash.defaults';
import {getPort} from 'portfinder';

class App {
  constructor(options) {
    this.options = defaults(options, {width:800, height:480});
  }

  init() {
    this.window = new BrowserWindow(this.options);
    this.window.loadURL(`http://localhost:${this.options.port}`);
    this.window.on('closed', () => {
      this.window = null;
    });
  }
}

getPort((e, port) => {
  if(e) throw e;
  global._port = port;
  server.listen(port, () => {
    console.log(`running on ${port}`);
    var a = new App({port});
    app.on('ready', () => a.init());
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', function () {
      if (a.window === null) {
        a.init();
      }
    });
  });
});
