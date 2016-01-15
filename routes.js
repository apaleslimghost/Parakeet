var React = require('react');
var route = require('@quarterto/boulevard-promise-server');

var Prefs = require('./prefsview');
var List = require('./list');
var Science = require('./science');
var Groups = require('./groups');
var Wrapper = require('./wrapper');
var prefs = require('./prefs');
var docs = require('./doc');
var db = require('./db');
var GroupedTransactions = require('budget-science');

var getTx = () => db.allDocs({include_docs: true}).then(docs);

var routes = route({
	'/': () => getTx().then(tx => <List items={tx} />),
	'/science': () => getTx().then(tx => <Science items={tx} groups={GroupedTransactions.group(tx)} />),
	'/groups': () => getTx().then(GroupedTransactions.group).then(grouped => <Groups grouped={grouped} />)
});

var wrapped = (...args) => Promise.resolve().then(() => routes(...args)).then(result =>
	React.isValidElement(result) ? <Wrapper>{result}</Wrapper> : result
);

wrapped.add = routes.add;

module.exports = wrapped;
