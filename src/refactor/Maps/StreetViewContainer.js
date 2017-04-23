import React from 'react';
import { WebView, ActivityIndicator, View, Modal } from 'react-native';
import Spinner from 'react-native-spinkit';


const style = {
	flex: 1, 
}

const style2 = {
  marginTop: 20,
  maxHeight: 500,
  width: 600,
  flex: 1
};

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

	render() {
		return (
     <View style={{flex:1, alignItems:'center', justifyContent:'space-between'}}>
			{ !this.state.isLoaded &&
				<Spinner
					type={'Wave'} 
					style={{marginTop:200, flex:1}} 
				/>
			}					 
			<WebView
				style={{flex:1, width:600}}
				source={{uri: 'https://tlpm.ca/streetview/' + this.props.data}}
				onLoad={this.onLoadComplete}
			/>
     </View>
		);
	}
}

export default StreetViewContainer;