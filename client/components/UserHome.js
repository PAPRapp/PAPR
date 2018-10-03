import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {signOut, getUser} from '../store/user'
import NavBar from './NavBar'
import {withRouter} from 'react-router-dom'
import particleConfig from '../particle'
import Particles from 'react-particles-js'
import Rooms from './Rooms'
import Room from './Room'
import Createroom from './Createroom'

/**
 * COMPONENT
 */
class NavigationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'profile'
    }
    this.nav = this.nav.bind(this)
  }

  nav(e, str) {
    this.setState({
      page: str
    })
  }

  render() {
    return (
      <div id="user-home">
        <NavBar nav={this.nav} />
        <Particles className="particles-js" params={particleConfig} />
        {this.state.page === 'rooms' ? <Rooms nav={this.nav} /> : null}
        {this.state.page === 'room' ? <Room /> : null}
        {this.state.page === 'createroom' ? <Createroom /> : null}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser())
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
}
export default withRouter(connect(null, mapDispatchToProps)(NavigationPage))

/**
 * PROP TYPES
 */
