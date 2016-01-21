import React from 'react';
import Collapse from './collapse';
import Prefs from './prefsview';
import Updater from './updater';
import prefs from './prefs';

module.exports = class App extends React.Component {
  render() {
    return <div>
      <nav><a href="/">home</a> <a href="/science">science</a> <a href="/groups">groups</a></nav>
      <Collapse title="Settings"><Prefs store={prefs} /></Collapse>
      {process.browser ? <Updater /> : []}
      {this.props.children}
    </div>;
  }
};
