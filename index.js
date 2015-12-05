var React = require('react');
var PouchDb = require('pouchdb');
var route = require('boulevard').withFourOhFour(function(req) {
	return {
		body: `${req.url} not found`,
		status: 404
	};
});

var Prefs = require('./prefsview');
var List = require('./list');
var prefs = require('./prefs');
var docs = require('./doc');

var db = new PouchDb(prefs.transactionsDb);

module.exports = route({
	'/': () => db.allDocs({include_docs: true}).then(docs).then(tx => <List items={tx} />)
});
