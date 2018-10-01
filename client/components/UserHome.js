import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {signOut, getUser} from '../store/user'
import NavBar from './NavBar'
import {withRouter} from 'react-router-dom'
import particleConfig from '../particle'
import Particles from 'react-particles-js'
import Rooms from './Rooms'
/**
 * COMPONENT
 */
class NavigationPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 'profile'
    }
    this.navToProfile = this.navToProfile.bind(this)
    this.navToSettings = this.navToSettings.bind(this)
    this.navToRooms = this.navToRooms.bind(this)
  }

  navToProfile() {
    this.setState({
      page: 'profile'
    })
  }

  navToSettings() {
    this.setState({
      page: 'settings'
    })
  }

  navToRooms() {
    this.setState({
      page: 'rooms'
    })
  }

  render() {
    return (
      <div id="user-home">
        <NavBar
          navToRooms={this.navToRooms}
          navToSettings={this.navToSettings}
          navToProfile={this.navToProfile}
        />
        <Particles className="particles-js" params={particleConfig} />
        {this.state.page === 'rooms' ? <Rooms /> : null}
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
