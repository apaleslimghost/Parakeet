var React = require('react');
var GroupedTransactions = require('budget-science');
var formatCurrency = require('./format-currency');
var sum = require('lodash.sum');
var groupBy = require('lodash.groupby');

const WEEKS_PER_MONTH = 4.348125;

function startOfWeek(date) {
	var start = new Date(date);
	start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
	return start;
}

function last27th(date) {
	var start = new Date(date);
	if(start.getDate() < 27) {
		start.setMonth(start.getMonth() - 1);
	}
	start.setDate(27);
	return start;
}

var keyToProp = (obj, prop) => Object.keys(obj).map(key => (obj[key][prop] = key, obj[key]));

module.exports = class Science extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: GroupedTransactions.group(props.items)
		};
	}

	componentWillUpdate() {
		this._recurring = null;
	}

	recurring() {
		return this._recurring || (this._recurring = keyToProp(this.state.grouped.recurring().named(), 'name'));
	}

	notRecurring(tx) {
		return !this.recurring().some(group => {
			return group.transactions.some(t2 => t2._id === tx._id);
		});
	}

	thisMonth() {
		var twentySeventh = last27th(new Date());
		return this.props.items.filter(tx => 
			new Date(tx.date) >= twentySeventh && this.notRecurring(tx)
		);
	}

	byWeek() {
		return groupBy(
			this.thisMonth(),
			tx => startOfWeek(tx.date)
		);
	}

	render() {
		var byWeek = this.byWeek();

		return <div>
			<ul>
				{this.recurring().map(group => <li key={group.name}>{group.name} {formatCurrency(group.perMonth)}</li>)}
			</ul>
			{formatCurrency(this.state.grouped.sumRecurring() / WEEKS_PER_MONTH * 0.75)} per week

			{Object.keys(byWeek).map(week => <div key={week}>
				<h2>{week}</h2>
				<ul>
					{byWeek[week].map(tx => <li key={tx._id}>{tx.payee} {formatCurrency(tx.amount)}</li>)}
				</ul>
					{formatCurrency(sum(byWeek[week], 'amount'))}
			</div>)}

		</div>;
	}
}
