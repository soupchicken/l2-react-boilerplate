import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'

export default ( initialState ) => {
  const enhancer = compose(
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  );
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  );
    return store;
}
