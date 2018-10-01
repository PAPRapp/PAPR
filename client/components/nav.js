import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Navbar = ({handleClick, isLoggedIn}) => (
  <nav>
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
        <img id="logo-text" src="logo_just_text.svg" alt="PAPR Logo" />
      </div>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

export default connect()(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

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
