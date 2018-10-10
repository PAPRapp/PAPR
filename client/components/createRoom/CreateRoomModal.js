import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import CreateRoom from './CreateRoomForm'
import {createroommodalstyles} from './styles/Material-UI-Style'
import getModalStyleFunc from './utils/ModalComponent'

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
          <div style={getModalStyleFunc()} className={classes.paper}>
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

export default withStyles(createroommodalstyles)(CreateRoomModal)
