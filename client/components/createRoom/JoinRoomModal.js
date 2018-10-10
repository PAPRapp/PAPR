import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {joinroommodalstyles} from './styles/Material-UI-Style'
import getModalStyleFunc from './utils/ModalComponent'

class JoinRoomModal extends React.Component {
  constructor(){
    super()
    this.state={
      copied: false
    }
    this.onCopy = this.onCopy.bind(this)
  }

  onCopy = () => {
    this.setState({copied: true});
  };

  render() {
    const {classes} = this.props
    const url = this.props.url
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.state}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyleFunc()} className={classes.paper}>
            <div className="joinroommodal">
              <h2>
                Send out this unqiue room URL for users to join your room !
              </h2>
              <CopyToClipboard onCopy={this.onCopy} text={this.props.url}>
                <span className="url">{url}</span>
              </CopyToClipboard>
              <span>Click the link to copy</span>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

JoinRoomModal.propTypes = {
  classes: PropTypes.object
}

export default withStyles(joinroommodalstyles)(JoinRoomModal)
