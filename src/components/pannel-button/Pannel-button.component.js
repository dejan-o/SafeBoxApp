import React from 'react';
import './Pannel-button.scss';

const PannelButton = ( { buttonValue } ) => {
	return (
		<button className="pannel-button" value={buttonValue} onClick={( (event) => console.log(event.target.value))}>{buttonValue}</button>
	);
};

export default PannelButton;