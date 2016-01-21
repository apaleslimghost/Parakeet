import React from 'react';
import WebSocket from 'ws';
import prefs from './prefs';

module.exports = class Updater extends React.Component {
  state = {
    running: false,
    message: 'loading'
  };

  constructor(props) {
    super(props);
    this.socket = new WebSocket(`ws://${location.host}/_update`);
    console.log(this.socket);
    this.socket.addEventListener('message', data => {
      if(data.done) this.setState({
        running: false,
        message: 'loading'
      });

      if(data.error) alert(data.error.toString());

      if(data.msg) this.setState({message: msg});
    });
  }

  start() {
    this.socket.send(prefs);
    this.setState({running: true});
  }

  render() {
    if(this.state.running) return <div>
      <img src="http://www.ajaxload.info/cache/ff/ff/ff/00/00/00/1-1.gif"/>
      {this.state.message}
    </div>;

    return <button onClick={this.start.bind(this)}>Update</button>;
  }
};
