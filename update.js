import updateDb from 'stepford-api/update';
import pick from 'lodash.pick';
import {Server as WebsocketServer} from 'ws';
import db from './db';

module.exports = server => new WebsocketServer({server, path: '/_update'}).on('connection', ws => {
	ws.on('message', data => {
		updateDb(db, Object.assign(pick(data, [
			'sortcode',
			'account',
			'securityCode',
			'memorableName',
			'birthPlace',
			'lastSchool',
			'firstSchool',
			'memorableDate'
		]), {
			log: msg => ws.send({msg})
		})).then(() => {
			ws.send({done: true});
		}).catch(error => {
			ws.send({error});
		});
	});
});
