import React from 'react';

var Collapse = props => <details>
      <summary>{props.title}</summary>
      {props.children}
</details>;

module.exports = Collapse;
