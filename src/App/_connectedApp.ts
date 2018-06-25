import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import App from './_app'

const mapStateToProps = function( state, ownProps ){
  return {
    state
  }
}

const mapDispatchToProps = function( dispatch ){
  return {}
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps
  )( App )
