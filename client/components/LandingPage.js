import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import {auth} from '../store'
import fire from '../firebase'
import SignUp from './SignUp'
import SignIn from './SignIn'
import LoginInSignUpCard from './LoginSignUpCard'
import {withRouter} from 'react-router-dom'
import {Redirect} from 'react-router'

const INITIAL_STATE = {
  signIn: false,
  singUp: false
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.handleBack = this.handleBack.bind(this)
    this.showSignIn = this.showSignIn.bind(this)
    this.showSignUp = this.showSignUp.bind(this)
  }

  handleBack() {
    this.setState({
      signUp: false,
      signIn: false
    })
  }

  async showSignIn() {
    await this.setState({
      signIn: true
    })
  }

  async showSignUp() {
    await this.setState({
      signUp: true
    })
  }
  render() {
    if (!this.state.signIn && !this.state.signUp) {
      return (
        <LoginInSignUpCard
          showSignIn={this.showSignIn}
          showSignUp={this.showSignUp}
        />
      )
    } else if (this.state.signIn) {
      return <SignIn handleBack={this.handleBack} />
    } else if (this.state.signUp) {
      return <SignUp handleBack={this.handleBack} />
    }
  }
}

export default withRouter(LandingPage)
