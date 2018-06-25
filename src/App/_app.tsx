import React from 'react'
import Backbone from 'backbone'
import _ from 'lodash'
import MobileDetect from 'mobile-detect';
interface Props {}
interface State { isMobile:boolean, dispatcher:any }

class App extends React.Component<Props, State> {

  constructor(props){
    super(props);
    let md:any = {};
    if ( typeof window !== 'undefined' && window.navigator )
      md = new MobileDetect(window.navigator.userAgent);
    this.state = {
      isMobile: md.mobile && md.mobile() !== null,
      dispatcher: _.clone(Backbone.Events)
    }
  }

  getChildContext(){
    const { dispatcher, isMobile } = this.state;
    return {
      isMobile,
      dispatcher
    }
  }

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
};

export default App
