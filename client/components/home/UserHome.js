import React from 'react'
import {connect} from 'react-redux'
import {signOut, getUser, joinRoom} from '../../store/'
import {Rooms, Room, CreateRoom, Navbar} from '../'
import {withRouter} from 'react-router-dom'
import particleConfig from '../../particle'
import Particles from 'react-particles-js'
import './style.scss'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  async componentDidMount() {
    console.log(this.props.hash)
    if (this.props.hash) {
      console.log(this.props.hash)
      await this.props.joinRoom(this.props.hash, this.props.userId)
    }
  }

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
    currentPage: state.currentPage,
    hash: state.hash
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser())
    },
    signOut: () => {
      dispatch(signOut())
    },
    joinRoom: async (hash, userId) => {
      await dispatch(joinRoom(hash, userId))
    }
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserHome)
)

/**
 * PROP TYPES
 */
