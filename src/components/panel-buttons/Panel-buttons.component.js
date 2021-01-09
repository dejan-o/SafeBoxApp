import React from 'react';
import PanelButton from '../panel-button/Panel-button.component';
import './Panel-buttons.scss';
import { connect } from 'react-redux';
import { buttonValues } from '../../constants';
import { handleKeyPress } from '../../redux/actions';
import { PropTypes } from 'prop-types';

const PanelButtons = ({ handleKeyPress, screenMessage }) => {
	const buttons = buttonValues;

	//Helper function for handling keyboard inputs
	function handleKeyboardInput(event){
		if(screenMessage)
			return;
		const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'L', '*'];
		if(validKeys.includes(event.key))
			handleKeyPress(event.key);
	}

	//setting document event listener
	React.useEffect( () => {
		document.addEventListener('keypress', handleKeyboardInput);

		return () => document.removeEventListener('keypress', handleKeyboardInput);
	}, [screenMessage]);

	
	return (
		<section className="panel-buttons">
			{buttons.map( (value, index) => {
				return <PanelButton buttonValue={value} key={index}/>;
			})}
		</section>
	);
};

PanelButtons.propTypes = {
	handleKeyPress: PropTypes.func.isRequired,
	screenMessage: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleKeyPress: (key) => dispatch(handleKeyPress(key))
	};
};

const mapStateToProps = (state) => {
	return {
		screenMessage: state.screenMessage
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelButtons);
