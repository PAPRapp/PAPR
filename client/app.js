import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import {getUser, setHash, setPage} from './store/'
import particleConfig from './particle'
import Particles from 'react-particles-js'
import {Room, UserHome, LandingPage} from './components/'

class App extends React.Component {
  componentDidMount() {
    const url = window.location.href
    if (url.match(/join\/(.*$)/g)) {
      const hash = url.match(/join\/(.*$)/g)[0].split('/')[1]
      if (hash.length) {
        this.props.setHash(hash)
      }
    }
  }
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
        <React.Fragment>
          <Particles className="particles-js" params={particleConfig} />
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    currentPage: state.currentPage
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    setHash: hash => dispatch(setHash(hash)),
    setPage: page => dispatch(setPage(page))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
