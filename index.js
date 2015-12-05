var React = require('react');
var route = require('boulevard').withFourOhFour(function(req) {
	return {
		body: `${req.url} not found`,
		status: 404
	};
});
var Prefs = require('./prefsview.js');
var prefs = require('./prefs.js');

module.exports = route({
	'/'(req) {
		return <Prefs store={prefs} />;
	}
});
