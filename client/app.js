import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getUser} from './store/'
import particleConfig from './particle'
import Particles from 'react-particles-js'
import {Room, UserHome, LandingPage} from './components/'

class App extends React.Component {
  render() {
    if (!this.props.user) {
      return (
        <React.Fragment>
          <Particles className="particles-js" params={particleConfig} />
          <LandingPage />
        </React.Fragment>
      )
    } else {
      return (
        <Switch>
          <Route path="/" component={UserHome} />
          <Route path="/home" component={UserHome} />
          <Route
            path="/:anything"
            render={() => (
              <Particles className="particles-js" params={particleConfig} />
            )}
          />
          <Route path="/rooms" component={Room} />
        </Switch>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
