var PouchDb = require('pouchdb');
var db = new PouchDb(`${location.protocol}//${location.host}/_api/transactions`);

module.exports = db;
