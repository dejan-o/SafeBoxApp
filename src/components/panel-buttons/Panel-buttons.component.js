import React, { useEffect } from 'react';
import PanelButton from 'components/panel-button/Panel-button.component';
import './Panel-buttons.scss';
import { connect } from 'react-redux';
import { buttonValues } from 'constants.js';
import { handleKeyPress } from 'redux/safeBoxLogic/logicActions';
import { PropTypes } from 'prop-types';
import { handleKeyboardInput } from './utils';

const PanelButtons = ({ handleKeyPress, isConfirmed }) => {
	const buttons = buttonValues;


	//setting document event listener
	useEffect( () => {
		document.addEventListener('keypress', (event) => handleKeyboardInput(event)(isConfirmed, handleKeyPress));

		return () => document.removeEventListener('keypress', handleKeyboardInput);
	}, [handleKeyboardInput]);

	
	return (
		<section className="panel-buttons">
			{buttons.map( (button) => {
				return <PanelButton buttonValue={button.value} key={button.id}/>;
			})}
		</section>
	);
};

PanelButtons.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(PanelButtons);
