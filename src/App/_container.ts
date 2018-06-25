import App from './App'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
