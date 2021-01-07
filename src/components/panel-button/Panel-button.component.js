import React from 'react';
import './Panel-button.scss';
import PropTypes from 'prop-types';

const PanelButton = ( { buttonValue } ) => {
	return (
		<button className="panel-button" value={buttonValue} onClick={( (event) => console.log(event.target.value))}>{buttonValue}</button>
	);
};

PanelButton.propTypes = {
	buttonValue: PropTypes.any.isRequired
};

export default PanelButton;