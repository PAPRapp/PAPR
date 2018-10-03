import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {signOut} from '../store'
import {withRouter} from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
    // this.handleSettings = this.handleSettings.bind(this)
    // this.handleProfile = this.handleProfile.bind(this)
    // this.handleRooms = this.handleRooms.bind(this)
  }
  handleSignOut() {
    this.props.signOut()
    setTimeout(() => this.props.history.push('/'), 100)
  }
  render() {
    return (
      <nav>
        <div id="nav-buttons">
          <button className="nav-button" onClick={(e) => {
            e.preventDefault()
            this.props.nav(e, 'rooms')
          }}>
            ROOMS
          </button>
          <button className="nav-button" onClick={(e) => {
            e.preventDefault()
            this.props.nav(e, 'profile')
          }}>
            PROFILE
          </button>

          <button className="nav-button" onClick={(e) => {
            e.preventDefault()
            this.props.nav(e, 'settings')
          }}>
            SETTINGS
          </button>

          <button className="nav-button" onClick={(e) => {
             e.preventDefault()
            this.props.nav(e, 'createroom')
                }}>
                Create Room
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
              src="logo_top_box.svg"
              alt="PAPR Top Box"
            />
            <img
              className="box"
              id="middle-box"
              src="logo_middle_box.svg"
              alt="PAPR Middle Box"
            />
            <img
              className="box"
              id="bottom-box"
              src="logo_bottom_box.svg"
              alt="PAPR Bottom Box"
            />
          </div>
        </div>
      </nav>
    )
  }
}

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: Object.keys(state.user).length
//   }
// }

const mapDispatch = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default withRouter(connect(null, mapDispatch)(NavBar))

// {isLoggedIn ? (
//   <div>
//     {/* The navbar will show these links after you log in */}
//     <Link to="/home">Home</Link>
//     <a href="#" onClick={handleClick}>
//       Logout
//     </a>
//     <Link to="/Room">Room</Link>
//   </div>
// ) : (
//   <div>
//     {/* The navbar will show these links before you log in */}
//     <Link to="/login">Login</Link>
//     <Link to="/signup">Sign Up</Link>
//     <Link to="/Room">Room</Link>
//   </div>
// )}
