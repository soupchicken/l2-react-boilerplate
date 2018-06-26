import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from "react-apollo"
import { AppContainer } from 'react-hot-loader'
import configureStore from './config/configureStore'
import configureApolloClient from './config/configureApolloClient'
import App from './App'
import 'normalize.css/normalize.css'

declare global {
  interface Window {
    __INITIAL_STATE__:any,
    __APOLLO_STATE__:any,
    devToolsExtension:any
  }
}
const client = configureApolloClient(( window as Window ).__APOLLO_STATE__ );
const store = configureStore(( window as Window ).__INITIAL_STATE__ );
const NODE_ENV = store.getState().environment.NODE_ENV;

ReactDom[NODE_ENV === 'production' ? 'hydrate' : 'render'](
  <ApolloProvider client={ client }>
    <Provider store={ store }>
      <BrowserRouter>
      { NODE_ENV === 'production' ?
        // don't include AppContainer component in production
        // used for hot-reloads in webpack
        <App /> : <AppContainer><App/></AppContainer>}
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('App')
);
