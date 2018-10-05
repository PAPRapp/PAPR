import React from 'react'
import {connect} from 'react-redux'
import SignUp from './authentication/SignUp'
import SignIn from './authentication/SignIn'
import LoginInSignUpCard from './authentication/LoginSignUpCard'
import {withRouter} from 'react-router-dom'

class LandingPage extends React.Component {
  render() {
    if (this.props.currentPage === 'landing') {
      return <LoginInSignUpCard />
    } else if (this.props.currentPage === 'signIn') {
      return <SignIn />
    } else if (this.props.currentPage === 'signUp') {
      return <SignUp />
    }
  }
}

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage
  }
}

export default withRouter(connect(mapStateToProps)(LandingPage))
