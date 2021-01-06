import React from 'react';
import './App.scss';
import PannelScreen from './components/pannel-screen/Pannel-screen.component';
import PannelButtons from './components/pannel-buttons/Pannel-buttons.component';
import SerialNumber from './components/serial-number/Serial-number.component';

function App() {
	return (
		<div className="pannel">
			<PannelScreen/>
			<PannelButtons/>
			<SerialNumber/>
		</div>);
}

export default App;
