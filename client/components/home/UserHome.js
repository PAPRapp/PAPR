import React from 'react'
import {connect} from 'react-redux'
import {
  signOut,
  getUser,
  joinRoom,
  getRooms,
  getRoomData,
  setStyles,
  setPage
} from '../../store/'
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
    if (this.props.hash) {
      await this.props.joinRoom(this.props.hash, this.props.userId)
    }
    await this.props.getRooms(this.props.userId)
    if (this.props.rooms.length) {
      let room = this.props.rooms[0]
      await this.props.getRoomData(this.props.userId, room.id)
      await this.props.setStyles(this.props.currentRoom.tickerQuery)
      this.props.setPage('room')
    }else{
      this.props.setPage('createroom')
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Particles className="particles-js" params={particleConfig} />
        {this.props.currentPage === 'rooms' ? <Rooms /> : null}
        {this.props.currentPage === 'room' ? <Room /> : null}
        {this.props.currentPage === 'createroom' ? <CreateRoom /> : null}
      </React.Fragment>
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
    hash: state.hash,
    rooms: state.rooms.rooms,
    currentRoom: state.room.currentRoom
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
    },
    getRooms: async userId => dispatch(getRooms(userId)),
    getRoomData: async (userId, roomId) =>
      dispatch(getRoomData(userId, roomId)),
    setStyles: tickers => dispatch(setStyles(tickers)),
    setPage: page => dispatch(setPage(page))
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserHome)
)

/**
 * PROP TYPES
 */
