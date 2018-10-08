import React from 'react'
import {connect} from 'react-redux'
import SignUp from './authentication/SignUp'
import SignIn from './authentication/SignIn'
import LoginInSignUpCard from './authentication/LoginSignUpCard'
import {withRouter} from 'react-router-dom'
import {currentUser} from '../store/'
import fire from '../firebase'

class LandingPage extends React.Component {
  async componentDidMount() {
    await fire.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.props.currentUser(user.email)
        this.props.history.push('/home')
      }
    })
  }

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

const mapDispatchToProps = dispatch => {
  return {
    currentUser: async email => dispatch(currentUser(email))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LandingPage)
)
