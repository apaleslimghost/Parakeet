var React = require('react');
var GroupedTransactions = require('budget-science');
var formatCurrency = require('./format-currency');

var keyToProp = (obj, prop) => Object.keys(obj).map(key => (obj[key][prop] = key, obj[key]));

module.exports = class Science extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			grouped: GroupedTransactions.group(props.items)
		};
	}

	recurring() {
		return keyToProp(this.state.grouped.recurring().named(), 'name');
	}

	render() {
		return <div>
			<ul>
				{this.recurring().map(group => <li key={group.name}>{group.name} {formatCurrency(group.perMonth)}</li>)}
			</ul>
			{formatCurrency(this.recurring().reduce((s, g) => s + g.perMonth, 0))}
		</div>;
	}
}
