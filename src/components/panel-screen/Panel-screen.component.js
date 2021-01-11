import React from 'react';
import './Panel-screen.scss';
import PropTypes from 'prop-types';
import PanelScreenStatus from '../panel-screen-status/Panel-screen-status.component';
import PanelScreenMessage from '../panel-screen-message/Panel-screen-message.component';
import { connect } from 'react-redux';

const PanelScreen = ({ isActive }) => {
	
	return (
		<section className={`panel-screen ${isActive ? 'panel-screen--light-on' : 'panel-screen--light-off'}`}>
			<PanelScreenStatus />
			<PanelScreenMessage />
		</section>
	);
};

PanelScreen.propTypes = {
	isActive: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => {
	return {
		isActive: state.screen.isActive,
	};
};


export default connect(mapStateToProps)(PanelScreen);
