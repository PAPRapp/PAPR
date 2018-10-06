import React from 'react'
import {getRoomData, gotRoomData, setPage, getTransactions} from '../../store/'
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
                onClick={async evt => {
                  const roomId = JSON.parse(evt.target.value).id
                  await this.props.getRoomData(this.props.userId, roomId)
                  await this.props.getTransactions(this.props.portfolio.id)
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
    },
    getRoomData: async (userId, roomId) => {
      await dispatch(getRoomData(userId, roomId))
    },
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    }
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms.rooms,
    userId: state.user.currentUser,
    portfolio: state.room.portfolio
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomCards)
