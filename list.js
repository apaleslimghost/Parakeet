var React = require('react');

module.exports = class List extends React.Component {
	items() {
		return this.props.items.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});
	}

	render() {
		return <table>
			<tbody>
			{this.items().map(
				item => <tr key={item._id}>
					<td>{item.payee}</td>
					<td>{item.amount}</td>
					<td>{item.date.slice(0, 10)}</td>
				</tr>
			)}
			</tbody>
		</table>
	}
}
