import React, {Component} from 'react'
import Axios from 'axios';
import {getRoomData} from '../store/room'
import {connect} from 'react-redux'

class RoomCards extends Component {
 constructor(){
   super()
   this.handleChange = this.handleChange.bind(this)
 }

 handleChange(evt){
  evt.preventDefault()
  const userId = this.props.user.currentUser
  const roomId = evt.target.value
  console.log(userId, roomId)
  getRoomData({userId, roomId})
 }

 render(){

  return this.props.rooms[0] ? (
    <div className="roomGallery">
      {this.props.rooms.map(room => {
        let exp = new Date(room.exp).getDate()
        let currentDate = new Date().getDate()
        return(
          <div className="roomCard" key={room.id} >
            <div className="cardTitle">  {room.name} </div>
            <div className="experation">  {exp - currentDate} Days Left </div>
            <div className="activeRoom">  Active: {room.active.toString()} </div>
            <button className="enterRoom" value={room.id} onClick={(evt) => {this.handleChange(evt)}}> Enter Room</button>
          </div>
        )})}
    </div>

  ) : <div> Loading </div>
}
}

const mapDispatchToProps = dispatch => {
  return {
    getRoomData: (content) => {
      dispatch(getRoomData(content))
    }
  }
}

export default connect(null,mapDispatchToProps)(RoomCards)
