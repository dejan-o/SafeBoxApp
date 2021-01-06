import React from 'react';
import PannelButton from '../pannel-button/Pannel-button.component';
import './Pannel-buttons.scss';

const PannelButtons = () => {
	const values = [7, 8, 9, 4, 5, 6, 1, 2, 3, '*', 0, 'L'];

	return (
		<section className="pannel-buttons">
			{values.map( (element, index) => {
				return <PannelButton buttonValue={element} key={index} />;
			})}
		</section>
	);
};

export default PannelButtons;
