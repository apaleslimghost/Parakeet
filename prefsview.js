var React = require('react');
var ee = new (require('events').EventEmitter);

module.exports = class Prefs extends React.Component {
	constructor(props) {
		super(props);

		if(typeof props.store.on === 'function') {
			props.store.on('change', () => {
				this.setState(props.store);
			});
		}

		this.state = props.store;
	}

	change(key) {
		return (ev) => {
			console.log(key);
			this.props.store[key] = ev.target.value;
		};
	}

	prefKeys() {
		return Object.getOwnPropertyNames(this.props.store).filter(key => !(key in ee));
	}

	render() {
		return <div>
			{this.prefKeys().map(
				pref => <label key={pref}>{pref} <input value={this.state[pref]} onChange={this.change(pref)}/></label>
			)}
		</div>;
	}
};
