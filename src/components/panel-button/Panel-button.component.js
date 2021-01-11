import React from 'react';
import './Panel-button.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleKeyPress } from '../../redux/safeBoxLogic/logicActions';
import { handleKeyClick } from './utils';

const PanelButton = ( { buttonValue, handleKeyPress, isConfirmed } ) => {
	return (
		<button className="panel-button" value={buttonValue} onClick={(event) => handleKeyClick(event)(isConfirmed, handleKeyPress)}>{buttonValue}</button>
	);
};

PanelButton.propTypes = {
	buttonValue: PropTypes.any.isRequired,
	handleKeyPress: PropTypes.func.isRequired,
	isConfirmed: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleKeyPress: (key) => dispatch(handleKeyPress(key))
	};
};

const mapStateToProps = (state) => {
	return {
		isConfirmed: state.logic.isConfirmed
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(PanelButton);