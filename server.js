var reactServer = require('@quarterto/react-server');
var server = require('@quarterto/promise-server');
var http = require('http');

require("babel/register");

var port = process.env.PORT || 3000;
var routes = reactServer
	.routeBundler('./index.js')
	.use('_api', require('./server-routes'));

http.createServer(
	server([routes].concat(reactServer.middleware), {})
).listen(port, console.log.bind(console, 'listening on', port));

