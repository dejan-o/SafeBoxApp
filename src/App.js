import React from 'react';
import './style/App.scss';
import PanelScreen from 'components/panel-screen/Panel-screen.component';
import PanelButtons from 'components/panel-buttons/Panel-buttons.component';
import SerialNumber from 'components/serial-number/Serial-number.component';

function App() {
	return (
		<div className="panel">
			<PanelScreen />
			<PanelButtons />
			<SerialNumber/>
		</div>);
}

export default App;
