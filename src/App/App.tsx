import React from 'react'
import Backbone from 'backbone'
import clone from 'lodash/clone'
import __ from './_styles'
import { Query } from 'react-apollo'
import { example } from './_gql'
import MobileDetect from 'mobile-detect';
interface Props {}
interface State { isMobile:boolean, dispatcher:any, windowWidth:number }

class App extends React.Component<Props, State> {

  constructor(props){
    super(props);
    let md:any = {};
    let windowWidth = 0;
    if ( typeof window !== 'undefined' && window.navigator ){
      md = new MobileDetect(window.navigator.userAgent);
      windowWidth = window.outerWidth;
    }
    this.state = {
      isMobile: md.mobile && md.mobile() !== null,
      dispatcher: clone( Backbone.Events ),
      windowWidth
    }
  }
  componentDidMount(){
    this.getWindowWidth();
    window.addEventListener('resize', this.getWindowWidth )
  }
  getWindowWidth = () => {
    const windowWidth = window.outerWidth;
    this.setState({ windowWidth })
  }

  getChildContext(){
    const { dispatcher } = this.state;
    return { dispatcher }
  }

  render() {
    const { isMobile, windowWidth } = this.state;
    return ( isMobile || windowWidth && windowWidth < 420 ?
      <__.MobileApp>
        Mobile
      </__.MobileApp> :
      <__.App>
        <Query query={ example }>
           {({ loading, error, data }) => {
             if ( loading ) return <div>Loading</div>
             if ( error ) return <div>{ error }</div>
             return data.rates.map(({ currency, rate }) => (
              <div key={currency}>
                <p>{`${currency}: ${rate}`}</p>
              </div>
            ));
           }}
         </Query>
        Desktop
      </__.App>
    )

  }
}

export default App
