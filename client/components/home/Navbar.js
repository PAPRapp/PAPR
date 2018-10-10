import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {
  signOut,
  setPage,
  getRooms,
  getUser,
  joinRoom,
  getRoomData,
  setStyles,
  fetchPortfolio,
  getTransactions
} from '../../store/'
import CreateRoomModal from '../createRoom/CreateRoomModal'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }

    this.handleSignOut = this.handleSignOut.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSignOut() {
    this.props.signOut()
    this.props.setPage('landing')
    setTimeout(() => this.props.history.push('/'), 100)
  }

  render() {
    const renderModal = this.state.open
    return (
      <nav>
        <div id="nav-buttons">
          <button
            className="nav-button"
            onClick={async () => {
              this.props.setPage('room')
            }}
          >
            ROOMS
          </button>

          {/* <button
            className="nav-button"
            onClick={() => {
              this.props.setPage('profile')
            }}
          >
            PROFILE
          </button> */}

          {/* <button
            className="nav-button"
            onClick={() => {
              this.props.setPage('settings')
            }}
          >
            SETTINGS
          </button> */}

          <button className="nav-button" onClick={this.handleOpen}>
            CREATE ROOM
          </button>
          {renderModal ? (
            <CreateRoomModal
              handleClose={this.handleClose}
              state={this.state.open}
            />
          ) : null}
          <button className="nav-button" onClick={this.handleSignOut}>
            LOG OUT
          </button>
        </div>
        <div>
          <img id="nav-logo" src="/images/logo_without_text_no_borders.svg" />
        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut())
    },
    setPage: page => {
      dispatch(setPage(page))
    },
    getRooms: userId => dispatch(getRooms(userId)),
    getUser: () => {
      dispatch(getUser())
    },
    joinRoom: async (hash, userId) => {
      await dispatch(joinRoom(hash, userId))
    },
    getRoomData: async (userId, roomId) =>
      dispatch(getRoomData(userId, roomId)),
    setStyles: tickers => dispatch(setStyles(tickers)),
    fetchPortfolio: async (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setHoldings: holdings => dispatch(setHoldings(holdings))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
