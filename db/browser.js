var PouchDb = require('pouchdb');
var prefs = require('../prefs');
var db = new PouchDb('transactions')

db.replicate.from(prefs.transactionsDb, {live: true});

module.exports = db;
