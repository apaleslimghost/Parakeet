var React = require('react');
var route = require('@quarterto/boulevard-promise-server');

var Prefs = require('./prefsview');
var List = require('./list');
var Science = require('./science');
var prefs = require('./prefs');
var docs = require('./doc');
var db = require('./db');
var GroupedTransactions = require('budget-science');

module.exports = route({
	'/': () => db.allDocs({include_docs: true}).then(docs).then(tx => <List items={tx} />),
	'/science': () => db.allDocs({include_docs: true}).then(docs).then(tx => <Science items={tx} groups={GroupedTransactions.group(tx)} />)
});
