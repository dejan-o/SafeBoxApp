import React from 'react';
import './Panel-button.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleKeyPress } from '../../redux/actions';

const PanelButton = ( { buttonValue, handleKeyPress } ) => {
	

	return (
		<button className="panel-button" value={buttonValue} onClick={handleKeyPress}>{buttonValue}</button>
	);
};

PanelButton.propTypes = {
	buttonValue: PropTypes.any.isRequired,
	handleKeyPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleKeyPress: (event) => dispatch(handleKeyPress(event.target.value))
	};
};




export default connect(null, mapDispatchToProps)(PanelButton);