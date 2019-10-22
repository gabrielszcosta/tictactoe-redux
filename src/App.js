import React from 'react';
import { Provider } from 'react-redux';
import './App.css';

import store from './store';

import Game from './views/Game'

export default function App() {
	// return(<Game/>)
	return (
		<Provider store={store}>
			<Game/>
		</Provider>
	);
}
