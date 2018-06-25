import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers'

export default ( initialState ) => {
  const enhancer = compose(
    // applyMiddleware( thunkMiddleware ),
    // applyMiddleware(client.middleware()),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  );
  const store = createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  );
    return store;
}
