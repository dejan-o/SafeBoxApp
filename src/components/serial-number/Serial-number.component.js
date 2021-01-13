import React from 'react';
import './Serial-number.scss';
import { serialNumber } from 'constants.js';

const SerialNumber = () => {
	return (
		<div className="serial-number">
            S / N: {serialNumber}
		</div>
	);
};

export default SerialNumber;