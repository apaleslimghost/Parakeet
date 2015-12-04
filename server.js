var reactServer = require('@quarterto/react-server');
var server = require('@quarterto/promise-server');
var http = require('http');

require("babel/register");

var port = process.env.PORT || 3000;

http.createServer(server([
	reactServer.routeBundler('./index.js'),
].concat(reactServer.middleware), {}))
.listen(port, console.log.bind(console, 'listening on', port));

