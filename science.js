var React = require('react');
var formatCurrency = require('./format-currency');
var sum = require('lodash.sum');

const DAYS_PER_YEAR   = 365 + 1/4 - 1/100 + 1/400;
const WEEKS_PER_YEAR  = DAYS_PER_YEAR / 7;
const WEEKS_PER_MONTH = WEEKS_PER_YEAR / 12;

var Science = props => <div>
			<ul>
				{props.groups.recurring().groups.map(group => <li key={group.name}>{group.name} {formatCurrency(group.perMonth)}</li>)}
			</ul>
			{formatCurrency(props.groups.sumRecurring() / WEEKS_PER_MONTH * 0.75)} per week

{Object.keys(props.groups.byWeek()).map(week => <div key={week}>
				<h2>{week}</h2>
				<ul>
				{props.groups.byWeek()[week].map(tx => <li key={tx._id}>{tx.payee} {formatCurrency(tx.amount)}</li>)}
				</ul>
				{formatCurrency(sum(props.groups.byWeek()[week], 'amount'))}
			</div>)}
</div>;

module.exports = Science;
