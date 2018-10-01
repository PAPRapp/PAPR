import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import {getUser} from './store/user'
import UserHome from './components/UserHome'
import Room from './components/Room'
// import {Redirect} from 'react-router'
import particleConfig from './particle'
import Particles from 'react-particles-js'
import NavBar from './components/NavBar'

class App extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    if (!this.props.user) {
      return (
        <React.Fragment>
          <Particles className="particles-js" params={particleConfig} />
          <LandingPage />
        </React.Fragment>
      )
    } else if (typeof this.props.user === 'object') {
      return (
        <Switch>
          <Route path="/" component={UserHome} />
          <Route path="/home" component={UserHome} />
        </Switch>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
