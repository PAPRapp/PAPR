import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import RoomCards from './RoomCards'

class RoomGallery extends Component {
  componentDidMount() {
    this.props.fetchRooms()
  }

  render() {
    return (
      <div >
        <RoomCards props={this.props.room}/>
      </div>
    )
  }
}

const mapState = state => {
  return {
    room: this.state.room
  }
}

const mapDispatch = dispatch => {
  return {
    fetchRooms: () => dispatch(getRooms())
  }
}

export default connect(mapState, mapDispatch)(RoomGallery)
