import React from 'react'
import {connect} from 'react-redux'
import {postMessage, fetchMessages, writeMessage} from '../../store/'

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.fetchMessages(this.props.roomId)
    } catch (error) {
      console.log(error)
    }
    const messageBody = document.querySelector('.chat-messages')
    messageBody.scrollTop = messageBody.scrollHeight
  }
  handleChange(e) {
    this.props.writeMessage(e.target.value)
  }

  async handleSubmit(e) {
    e.preventDefault()
    const {roomId, userId, content} = this.props
    try {
      await this.props.postMessage(roomId, userId, content)
      const messageBody = document.querySelector('.chat-messages')
      messageBody.scrollTop = messageBody.scrollHeight
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div id="chat">
        <div
          className="chat-room"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column'
          }}
        >
          <div className="chat-messages" style={{flex: 1}}>
            {this.props.messages.map((message, i) => {
              return (
                <div
                  key={i}
                  className="message"
                  style={
                    {
                      // display: 'row',
                      // justifyContent: 'space-between',
                      // alignItems: 'center',
                      // size: '14px',
                      // height: '90%',
                      // minHeight: '90%'
                    }
                  }
                >
                  <b>
                    {message.username}: {message.content}
                  </b>
                </div>
              )
            })}
          </div>
          <div
            className="chat-input"
            style={{display: 'flex', width: '100%', height: '10%'}}
          >
            <input
              type="text"
              onChange={this.handleChange}
              value={this.props.content}
            />
            <button
              type="submit"
              className="chat-button"
              onClick={this.handleSubmit}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    roomId: state.room.currentRoom.id,
    userId: state.user.currentUser,
    content: state.message.newMessageEntry,
    messages: state.message.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMessage: (roomId, userId, content) =>
      dispatch(postMessage(roomId, userId, content)),
    fetchMessages: roomId => dispatch(fetchMessages(roomId)),
    writeMessage: content => dispatch(writeMessage(content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
