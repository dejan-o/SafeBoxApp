import React from 'react';
import './Panel-screen-message.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { renderSequence } from './utils';

const PanelScreenMessage = ( { inputSequence, message } ) => {
	return (
		<span className="panel-screen__message">{ renderSequence(inputSequence) || message }</span>
	);
};

PanelScreenMessage.propTypes = {
	inputSequence: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
	return {
		inputSequence: state.logic.inputSequence,
		message: state.screen.message,
	}; 
};

export default connect(mapStateToProps)(PanelScreenMessage);