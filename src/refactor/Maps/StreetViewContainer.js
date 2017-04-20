import React from 'react';
import { WebView } from 'react-native';

function StreetViewContainer (props) {

	const custid = props.data;

	return (
		<WebView
			source={{uri: 'https://tlpm.ca/streetview/' + custid}}
		/>
	);
}

export default StreetViewContainer;