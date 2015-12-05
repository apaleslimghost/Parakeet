var React = require('react');
var GroupedTransactions = require('budget-science');

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
		return <ul>
			{this.recurring().map(group => <li key={group.name}>{group.name}</li>)}
		</ul>;
	}
}
