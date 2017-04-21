import React from 'react';
import { ActivityIndicator, WebView, View, Text } from 'react-native';

class StreetViewContainer extends React.Component {
	// props.data is the customer ID
	static propTypes = {
		data: React.PropTypes.string.isRequired,
	}
	constructor(props){
		super(props);
		this.state = {
			isLoaded: false
		}
	}

	onLoadComplete = () => {
		this.setState({
			isLoaded: true
		});
	}

	// Note: there is apparently a bug with RN where the WebView cannot be wrapped inside of a View.
	// This prevents adding an ActivityIndicator loader to this page, so right now there is none.
	render() {
		return (
			<WebView
				source={{uri: 'https://tlpm.ca/streetview/' + this.props.data}}
				onLoadEnd={this.onLoadComplete}
			/>
		);
	}
}

export default StreetViewContainer;