import React from 'react';
import './Panel-screen-status.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PanelScreenStatus = ({ isLocked }) => {
	return (
		<span className="panel-screen__status">{ isLocked ? 'Locked' : 'Unlocked' }</span>
	);
};

PanelScreenStatus.propTypes = {
	isLocked: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
	return {
		isLocked: state.logic.isLocked
	}; 
};

export default connect(mapStateToProps)(PanelScreenStatus);