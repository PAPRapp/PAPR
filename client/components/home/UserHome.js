import React from 'react'
import {connect} from 'react-redux'
import {signOut, getUser} from '../../store/'
import {Rooms, Room, CreateRoom, Navbar} from '../'
import {withRouter} from 'react-router-dom'
import particleConfig from '../../particle'
import Particles from 'react-particles-js'
import './style.scss'

/**
 * COMPONENT
 */
class NavigationPage extends React.Component {
  render() {
    return (
      <div id="user-home">
        <Navbar nav={this.nav} />
        <Particles className="particles-js" params={particleConfig} />
        {this.props.currentPage === 'rooms' ? <Rooms /> : null}
        {this.props.currentPage === 'room' ? <Room /> : null}
        {this.props.currentPage === 'createroom' ? <CreateRoom /> : null}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    userId: state.user.currentUser,
    currentPage: state.currentPage
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavigationPage)
)

/**
 * PROP TYPES
 */
