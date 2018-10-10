import React, {Component} from 'react'
import CreateRoomForm from './CreateRoomForm'

class CreateRoom extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="messagediv">
          <span className="noroommessage">
            Currently no rooms listed, please create a room.
          </span>
        </div>
        <CreateRoomForm />
      </React.Fragment>
    )
  }
}

export default CreateRoom
