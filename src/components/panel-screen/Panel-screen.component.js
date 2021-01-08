import React from 'react';
import './Panel-screen.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setScreenMessage, resetInputSequence, setIsLocked, setBoxCode, setScreenActive } from '../../redux/actions';
import { screenMessages } from '../../constants';

const PanelScreen = ({ screenMessage, inputSequence, isLocked, setScreenMessage, resetInputSequence, setIsLocked, setBoxCode, boxCode, setScreenActive, isActive }) => {

	React.useEffect( () => {
		if(inputSequence && !isActive)
			setScreenActive(true);

		const timeoutId = setTimeout( () => {
			if(inputSequence){
				if(inputSequence.length === 6){
					if(!isLocked){
						setBoxCode(inputSequence);
						resetInputSequence();
						setScreenMessage(screenMessages.locking);
						setTimeout(() => {
							setIsLocked();
							setScreenMessage(screenMessages.ready);
							setTimeout( () => {
								setScreenMessage(screenMessages.blank);
							}, 500);
						}, 3000);
					}
					else{
						if(inputSequence === boxCode){
							resetInputSequence();
							setScreenMessage(screenMessages.unlocking);
							setTimeout(() => {
								setBoxCode('');
								setIsLocked();
								setScreenMessage(screenMessages.ready);
								setTimeout( () => {
									setScreenMessage(screenMessages.blank);
								}, 500);
							}, 3000);

						}
						else{
							resetInputSequence();
							setScreenMessage(screenMessages.error);
							setTimeout( () => {setScreenMessage(screenMessages.blank);}, 1000);
						}		
					}
				}
				else {
					resetInputSequence();
					setScreenMessage(screenMessages.error);
					setTimeout( () => {setScreenMessage(screenMessages.blank);}, 1000);
				}
			}
		}, 1200);

		

		return () => {
			clearTimeout(timeoutId);
		};


	}, [inputSequence]);


	//disabling screen light if system is inactive for 5s
	React.useEffect( () => {
		const activeId = setTimeout( () => {
			if(isActive)
				setScreenActive(false);
		}, 5000);

		return () => clearTimeout(activeId);
	}, [isLocked, isActive, inputSequence, screenMessage]);


	return (
		<section className={`panel-screen ${isActive ? 'light-on' : 'light-off'}`}>
			<span className="panel-screen__left">{ isLocked ? 'Locked' : 'Unlocked' }</span>
			<span className="panel-screen__main">{ inputSequence || screenMessage }</span>
		</section>
	);
};

PanelScreen.propTypes = {
	screenMessage: PropTypes.string.isRequired,
	inputSequence: PropTypes.string.isRequired,
	isLocked: PropTypes.bool.isRequired,
	setScreenMessage: PropTypes.func.isRequired,
	resetInputSequence: PropTypes.func.isRequired,
	setIsLocked: PropTypes.func.isRequired,
	setBoxCode: PropTypes.func.isRequired,
	boxCode: PropTypes.string.isRequired,
	isActive: PropTypes.bool.isRequired,
	setScreenActive: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
	return {
		screenMessage: state.screenMessage,
		inputSequence: state.inputSequence,
		isLocked: state.isLocked,
		boxCode: state.code,
		isActive: state.isActive,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setScreenMessage: (msg) => dispatch(setScreenMessage(msg)),
		resetInputSequence: () => dispatch(resetInputSequence()),
		setIsLocked: () => dispatch(setIsLocked()),
		setBoxCode: (code) => dispatch(setBoxCode(code)),
		setScreenActive: (payload) => dispatch(setScreenActive(payload)), 
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelScreen);
