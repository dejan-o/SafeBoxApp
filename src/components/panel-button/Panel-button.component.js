import React from 'react';
import './Panel-button.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleKeyPress } from '../../redux/actions';

const PanelButton = ( { buttonValue, handleKeyPress } ) => {
	
	function handleKeyClick(event){
		handleKeyPress(event.target.value);
	}

	return (
		<button className="panel-button" value={buttonValue} onClick={handleKeyClick}>{buttonValue}</button>
	);
};

PanelButton.propTypes = {
	buttonValue: PropTypes.any.isRequired,
	handleKeyPress: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleKeyPress: (key) => dispatch(handleKeyPress(key))
	};
};




export default connect(null, mapDispatchToProps)(PanelButton);