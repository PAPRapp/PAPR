import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CreateRoom from './CreateRoom'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
})

class CreateRoomModal extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.state}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <CreateRoom />
          </div>
        </Modal>
      </div>
    )
  }
}

CreateRoomModal.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(CreateRoomModal)
