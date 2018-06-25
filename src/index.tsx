import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import configureStore from './config/store';
import App from './App'
import 'normalize.css/normalize.css'
import './App/_.scss'

declare global {
  interface Window { __INITIAL_STATE__:any }
}
const store = configureStore(( window as Window ).__INITIAL_STATE__ );
const NODE_ENV = store.getState().environment.NODE_ENV;

render(
  <Provider store={ store }>
    <BrowserRouter>
		{ NODE_ENV === 'production' ?
			// don't include AppContainer component in production
			// used for hot-reloads in webpack
			<App /> : <AppContainer><App/></AppContainer>}
    </BrowserRouter>
  </Provider>,
  document.getElementById('App')
);
