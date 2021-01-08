import React from 'react';
import './Panel-screen.scss';
import PropTypes from 'prop-types';


const PanelScreen = ({ 	inputSequence, isLocked, isActive, screenMessage, renderSequence }) => {
	
	return (
		<section className={`panel-screen ${isActive ? 'panel-screen--light-on' : 'panel-screen--light-off'}`}>
			<span className="panel-screen__status">{ isLocked ? 'Locked' : 'Unlocked' }</span>
			<span className="panel-screen__message">{ renderSequence(inputSequence) || screenMessage }</span>
		</section>
	);
};

PanelScreen.propTypes = {
	screenMessage: PropTypes.string.isRequired,
	inputSequence: PropTypes.string.isRequired,
	isLocked: PropTypes.bool.isRequired,
	isActive: PropTypes.bool.isRequired,
	renderSequence: PropTypes.func.isRequired,
};


export default PanelScreen;
