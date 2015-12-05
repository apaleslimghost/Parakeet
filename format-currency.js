var numeral = require('numeral');
numeral.language('en-gb', require('numeral/languages/en-gb'));
numeral.language('en-gb');

module.exports = n => numeral(n).format('$0,0.00');
