import React from 'react';
import { WebView, View } from 'react-native';
import Spinner from 'react-native-spinkit';
import { width, height } from 'react-native-dimension';

const styles = {
	view: {
		flex: 1, 
		alignItems: 'center', 
		justifyContent: 'space-between'
	},
	webview: {
		flex: 1, 
		width: width(100),
		height: height(100)
	},
	spinner: {
		flex: 1,
		marginTop: 200, 
	}
}
const BASE_URL = 'https://tlpm.ca';

class StreetViewContainer extends React.Component {
	static propTypes = {
		// props.data is the customer ID
		data: React.PropTypes.string.isRequired,
	}
	constructor(props){
		super(props);
		this.state = {
			isLoaded: false
		}
		this.custID = props.data;
		// this.custID = '58e998682d9c5601001e57ef';
	}

	onLoadComplete = () => {
		this.setState({
			isLoaded: true
		});
	}

	render() {	
		return (
     	<View style={styles.view}>
				{ !this.state.isLoaded &&
					<Spinner
						style={styles.spinner} 
						type={'Wave'} 
					/>
				}					 
				<WebView
					style={styles.webview}
					contentInset={{top: 50, left: 0, bottom: 0, right: 0}}
					source={{uri: BASE_URL + '/streetview/' + this.custID}}
					onLoad={this.onLoadComplete}
				/>
     </View>
		);
	}
}

export default StreetViewContainer;