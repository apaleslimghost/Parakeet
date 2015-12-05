var React = require('react');
var route = require('boulevard').withFourOhFour(function(req) {
	return {
		body: `${req.url} not found`,
		status: 404
	};
});

var Prefs = require('./prefsview');
var List = require('./list');
var Science = require('./science');
var prefs = require('./prefs');
var docs = require('./doc');
var db = require('./db');

module.exports = route({
	'/': () => db.allDocs({include_docs: true}).then(docs).then(tx => <List items={tx} />),
	'/science': () => db.allDocs({include_docs: true}).then(docs).then(tx => <Science items={tx} />)
});
