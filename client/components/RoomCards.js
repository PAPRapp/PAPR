import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button, Card, Elevation} from '@blueprintjs/core'

const RoomCards = (props) => {
  const {id} = this.props
  return (
    <div >
      <Card interactive={true} elevation={Elevation.FOUR}>
        <h5>
          <a href="#">Room Name</a>
        </h5>
        <p>Room Summary</p>
        <Link to={`room/${id}`}>
          <Button>Enter Room</Button>
        </Link>
      </Card>
    </div>
  )
}

export default RoomCards
