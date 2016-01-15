import React from 'react';

module.exports = class App extends React.Component {
  render() {
    return <div>
      <nav><a href="/">home</a> <a href="/science">science</a> <a href="/groups">groups</a></nav>
      {this.props.children}
    </div>;
  }
};
