var route = require('boulevard');

module.exports = route({
	'/': () => ({
		body: JSON.stringify({hello: "world"}),
		headers: {'content-type': 'application/json'}
	})
});
