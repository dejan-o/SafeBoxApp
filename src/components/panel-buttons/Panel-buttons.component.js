import React from 'react';
import PanelButton from '../panel-button/Panel-button.component';
import './Panel-buttons.scss';

const PanelButtons = () => {
	const values = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];

	return (
		<section className="panel-buttons">
			{values.map( (element, index) => {
				return <PanelButton buttonValue={element} key={index} />;
			})}
		</section>
	);
};

export default PanelButtons;
