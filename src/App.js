import React from 'react';
import { Provider } from 'react-redux';
import './App.css';

/**
 * Importação do estado criado pelo redux
 */
import store from './store';

/**
 * Importação da view do jogo
 */
import Game from './views/Game'

export default function App() {
	return (
		<Provider store={store}>
			<Game />
		</Provider>
	);
}
