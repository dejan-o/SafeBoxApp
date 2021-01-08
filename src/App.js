import React from 'react';
import './App.scss';
import PanelScreenContainer from './components/panel-screen/Panel-screen.container';
import PanelButtons from './components/panel-buttons/Panel-buttons.component';
import SerialNumber from './components/serial-number/Serial-number.component';

function App() {


	return (
		<div className="panel">
			<PanelScreenContainer />
			<PanelButtons />
			<SerialNumber/>
		</div>);
}

export default App;
