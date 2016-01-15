import React from 'react';

var Groups = ({grouped}) => <ul>
    {Object.keys(grouped.recurring().named()).map(name => <li key={name}>{name}</li>)}
</ul>;

module.exports = Groups;
