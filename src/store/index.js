import { createStore } from 'redux';
import Reducers from './ducks';

const store = createStore(Reducers);

export default store;
