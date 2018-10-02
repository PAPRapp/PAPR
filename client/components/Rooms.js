import React, {Component} from 'react'
import {connect} from 'react-redux'
import RoomCards from './RoomCards'
import {getRooms} from '../store/rooms'

class Rooms extends Component {
  async componentDidMount() {
    const userId = this.props.user.currentUser
    await this.props.fetchRooms(userId)
  }

  render() {
    return (
      <div>
        <RoomCards
          rooms={this.props.rooms}
          user={this.props.user}
          nav={this.props.nav}
        />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    rooms: state.rooms
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRooms: userId => dispatch(getRooms(userId))
  }
}

export default connect(mapState, mapDispatch)(Rooms)
