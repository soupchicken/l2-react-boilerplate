import Express from 'express';
import router from './router';
import webpack from 'webpack'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import request from 'request';
const app = new Express();
const port = 3000, redirectPort = 3001;
const NODE_ENV = process.env.NODE_ENV;
if( NODE_ENV === 'local' ){
  const config = require(`./cfg/local`)
  const compiler = webpack( config );
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require( 'webpack-hot-middleware');
  app.use(
    webpackDevMiddleware( compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }));
  app.use( webpackHotMiddleware( compiler ))
}

const compress = require('compression');
const http = require('http');
app.use( compress() );
app.use( cookieParser() );
app.use( bodyParser.urlencoded({ extended:false }) );
app.use( bodyParser.json({ limit:'1mb' }) );
app.use( router() );

// Get App Components, Providers
import React from 'react';
import configureStore from './src/config/configureStore'
import configureApolloClient from './src/config/configureApolloClient'
import { StaticRouter, Route } from 'react-router-dom';
import { ApolloProvider, getDataFromTree, renderToStringWithData } from "react-apollo";
import { AppContainer } from 'react-hot-loader'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { Provider } from 'react-redux'
import App from './src/App/index.ts';

app.use( handleRequest );

function handleRequest( req, res ){
  const context = {};
  const initialState = { environment:{ NODE_ENV }};
  const client = configureApolloClient()
  const store = configureStore( initialState );
  const sheet = new ServerStyleSheet();

  if ( NODE_ENV === 'local' ){
    // Send HTML without any server side rendering
    // No what I'd prefer to do, but a styled-components bug prevents Hot reloads...
    // TODO: Figure out why styled-component classes are being scrambled to fix local env SSR
    const html = renderHTML('', {}, '', '')
    res.status(200).send( html );
  } else {
    // Render Server Side
    // Bootstrap App by calling route-specific Apollo Queries via a promise
    const InitializedApp =
      React.createElement( ApolloProvider, { client },
        React.createElement( Provider, { store },
          React.createElement( StaticRouter, { location:req.url, context }, // React Router ServerSide wrap
              React.createElement( Route, { path:'/', component:App })
    )))
    // Let React Apollo do the heavy lifting to hydrate app data and return html
    renderToStringWithData( InitializedApp ).then( content => {
      if ( context.redirectUrl ){
        res.redirect( 302, '/' );
      } else {
        const html = renderHTML( content, store.getState(), client.extract(), sheet.getStyleTags() )
        res.status(200).send( html );
      }
    })
  }


}


function renderHTML( content, initialState, apolloState, stylesheet ) {
  return `
    <!doctype html>
    <html lang="en" xml:lang="en">
      <head>
        <title>L2 Boilerplate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta name="description" content="L2 Boilerplate"/>
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" rel="stylesheet" />
        <link rel="icon" type="img/ico" href="/images/favicon.ico"/>
        ${ stylesheet }
      </head>
      <body>
        <div id="App">${ content }</div>
        <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify( initialState ) }
          window.__APOLLO_STATE__ = ${ JSON.stringify( apolloState ) }
        </script>
        <script src="/build/app.js"></script>
      </body>
    </html>
    `
}


app.listen( port, ( error ) => {
  error ?
    console.error( error ) :
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen( redirectPort );
