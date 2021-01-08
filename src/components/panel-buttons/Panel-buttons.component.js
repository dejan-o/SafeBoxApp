import React from 'react';
import PanelButton from '../panel-button/Panel-button.component';
import './Panel-buttons.scss';
import { buttonValues } from '../../constants';

const PanelButtons = () => {
	const buttons = buttonValues;
	
	return (
		<section className="panel-buttons">
			{buttons.map( (value, index) => {
				return <PanelButton buttonValue={value} key={index}/>;
			})}
		</section>
	);
};




export default PanelButtons;
