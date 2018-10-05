import React from 'react'
import {getRoomData, gotRoomData, setPage} from '../../store/'
import {connect} from 'react-redux'
import './style.css'

class RoomCards extends React.Component {
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
              <button
                className="enterRoom"
                value={JSON.stringify(room)}
                onClick={evt => {
                  this.props.gotRoomData(JSON.parse(evt.target.value))
                  this.props.setPage('room')
                }}
              >
                Enter Room
              </button>
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
    gotRoomData: room => {
      dispatch(gotRoomData(room))
    },
    setPage: page => {
      dispatch(setPage(page))
    }
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCards)
