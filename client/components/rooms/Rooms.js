import React, {Component} from 'react'
import {connect} from 'react-redux'
import {RoomCards} from '../'
import {getRooms} from '../../store'

class Rooms extends Component {
  render() {
    return (
      <div>
        <RoomCards />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRooms: userId => dispatch(getRooms(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms)
