import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import defaultState from './default';
import rootReducer from '../reducers';

const buildStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    {
      ...defaultState,
      ...preloadedState
    },
    applyMiddleware(reduxThunk)
  );
  

  return store;
};

export default buildStore;