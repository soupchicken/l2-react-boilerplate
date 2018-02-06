import React from 'react'
import Backbone from 'backbone'
import _ from 'lodash'
import MobileDetect from 'mobile-detect';

const App = React.createClass({

  getInitialState(){
    let md = {};
    if ( typeof window !== 'undefined' && window.navigator )
      md = new MobileDetect(window.navigator.userAgent);
    return {
      isMobile: md.mobile && md.mobile() !== null,
      dispatcher: _.clone(Backbone.Events)
    }
  },

  getChildContext(){
    const { dispatcher, isMobile } = this.state;
    return {
      isMobile,
      dispatcher
    }
  },

  render() {
    const { isMobile } = this.state;
    if ( isMobile ){
      return (
        <div id="MobileApp">THIS IS A MOBILE APP</div>
      );
    } else {
      return (
        <div id="App">THIS IS A WEBAPP</div>
      );
    }
  }
});

App.contextTypes = {
  router: React.PropTypes.object
};

App.childContextTypes = {
  dispatcher: React.PropTypes.object.isRequired,
  isMobile: React.PropTypes.bool.isRequired
};

export default App
