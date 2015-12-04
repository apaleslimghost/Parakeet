var React = require('react');

module.exports = class Test extends React.Component {
	state = {
		counter: 0
	};

	onClick() {
		this.setState({counter: this.state.counter + 1});
	}

	render() {
		return <div>
			<h1>Hello world!</h1>
			<h2>{this.state.counter}</h2>
			<button onClick={this.onClick.bind(this)}>Click</button>
		</div>;
	}
}
