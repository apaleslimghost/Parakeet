var React = require('react');
var route = require('boulevard');

module.exports = route({
	'/'(req) {
		return <h1>It works!</h1>
	}
});
