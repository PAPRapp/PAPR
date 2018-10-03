import React, {Component} from 'react'
import Axios from 'axios'
import {getRoomData, gotRoomData} from '../store/room'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class RoomCards extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    evt.preventDefault()
    const userId = this.props.user.currentUser
    const roomId = evt.target.value
    console.log({userId, roomId})
    this.props.getRoomData({userId, roomId})
  }

  render() {
    return this.props.rooms ? (
      <div className="roomGallery">
        {this.props.rooms.map(room => {
          let exp = new Date(room.exp).getDate()
          let currentDate = new Date().getDate()
          return (
            <div className="roomCard" key={room.id}>
              <div className="cardTitle"> {room.name} </div>
              <div className="expiration"> {exp - currentDate} Days Left </div>
              <div className="activeRoom">Active: {room.active.toString()}</div>
              <Link to="" refresh="true">
                <button
                  className="enterRoom"
                  value={JSON.stringify(room)}
                  onClick={evt => {
                    this.props.gotRoomData(JSON.parse(evt.target.value))
                    this.props.nav(evt, 'room')
                  }}
                >
                  Enter Room
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    ) : (
      <div> Loading </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoomData: content => {
      dispatch(getRoomData(content))
    },
    gotRoomData: room => {
      dispatch(gotRoomData(room))
    }
  }
}

export default connect(null, mapDispatchToProps)(RoomCards)
