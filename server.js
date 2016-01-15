import express from 'express';
import reactServer from '@quarterto/react-server';
import server from '@quarterto/promise-server';
import stepfordApi from 'stepford-api';

var routes = reactServer.routeBundler('./routes.js');

var app = express();
app.use('/_api', stepfordApi);
app.use(server([routes, ...reactServer.middleware]));

export default app;
