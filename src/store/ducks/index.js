import { combineReducers } from 'redux';
import game from './game';

/**
 * Combina todos os reducers (ducks) em um objeto para o redux
 */
export default combineReducers({ game });
