import { createStore } from 'redux';

import reducers, { initialState } from './reducers';

let store = createStore(
  reducers,
  initialState,
)
export default store;