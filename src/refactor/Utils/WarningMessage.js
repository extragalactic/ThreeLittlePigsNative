import React from 'react';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import WarningIcon from 'material-ui/svg-icons/alert/warning';

import styleCSS from '../Style/customerDetailsStyles';

WarningMessage.propTypes = {
	message: React.PropTypes.string.isRequired
}

function WarningMessage (props) {
	return (
		<div>
			<WarningIcon color={"#FFEB3B"} style={{width:50, height:50}} />
			<div style={styleCSS.warningMessage}>{props.message}</div>
		</div> 		
	);
}

export default WarningMessage;