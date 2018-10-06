import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {signOut, setPage, getRooms} from '../../store/'
// import PropTypes from 'prop-types'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut() {
    this.props.signOut()
    this.props.setPage('landing')
    setTimeout(() => this.props.history.push('/'), 100)
  }

  render() {
    return (
      <nav>
        <div id="nav-buttons">
          <button
            className="nav-button"
            onClick={async () => {
              await this.props.getRooms(this.props.userId)
              this.props.setPage('rooms')
            }}
          >
            ROOMS
          </button>
          <button
            className="nav-button"
            onClick={() => {
              this.props.setPage('profile')
            }}
          >
            PROFILE
          </button>

          <button
            className="nav-button"
            onClick={() => {
              this.props.setPage('settings')
            }}
          >
            SETTINGS
          </button>

          <button
            className="nav-button"
            onClick={() => {
              this.props.setPage('createroom')
            }}
          >
            CREATE ROOM
          </button>

          <button className="nav-button" onClick={this.handleSignOut}>
            LOG OUT
          </button>
        </div>
        <div id="nav-logo">
          <div>
            <img
              className="box"
              id="top-box"
              src="images/logo_top_box.svg"
              alt="PAPR Top Box"
            />
            <img
              className="box"
              id="middle-box"
              src="images/logo_middle_box.svg"
              alt="PAPR Middle Box"
            />
            <img
              className="box"
              id="bottom-box"
              src="images/logo_bottom_box.svg"
              alt="PAPR Bottom Box"
            />
          </div>
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
    getRooms: userId => dispatch(getRooms(userId))
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.currentUser
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
