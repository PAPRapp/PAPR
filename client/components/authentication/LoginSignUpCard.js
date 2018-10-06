import React from 'react'
import {withRouter} from 'react-router-dom'
import {setPage} from '../../store/'
import {connect} from 'react-redux'
import './style.css'

class LoginSignUpCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-contents">
          <img
            id="card-logo"
            src="/images/logo_with_text_no_borders.svg"
            alt="Logo"
          />
          <div className="card-buttons">
            <button
              className="card-button"
              onClick={() => this.props.setPage('signIn')}
            >
              SIGN IN
            </button>
            <button
              className="card-button"
              onClick={() => this.props.setPage('signUp')}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPage: page => dispatch(setPage(page))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(LoginSignUpCard))
