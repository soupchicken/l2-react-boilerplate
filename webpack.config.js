const path = require('path')

const buildWebpackConfig = function( env ) {
  console.log(env, 'THIS IS ENVIRONMENT');
  var webpack_config = require( path.join(__dirname, 'cfg/' + env ) );
  return webpack_config;
}

module.exports = buildWebpackConfig( process.env.NODE_ENV || 'local' )
