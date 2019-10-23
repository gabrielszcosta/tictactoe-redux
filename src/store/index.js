import { createStore } from 'redux';
import Reducers from './ducks';

/**
 * Cria o objeto que vai armazenas os estados da aplicação através do redux
 */
const store = createStore(Reducers);

export default store;
