import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import RoomCards from './RoomCards'
import {getRooms} from '../store/room'

class RoomGallery extends Component {
  componentDidMount() {
    // this.props.fetchRooms()
  }

  render() {
    console.log(this.props.user)
    return (
      <div >
        {/* <RoomCards props={this.props.room}/> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: this.state.user,
    room: this.state.room
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRooms: (userId) => dispatch(getRooms(userId))
  }
}

export default connect(mapState, mapDispatch)(RoomGallery)
