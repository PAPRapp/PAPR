import React from 'react'
import {withRouter} from 'react-router-dom'

class LoginSignUpCard extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-contents">
          <img id="card-logo" src="logo_with_text_no_borders.svg" alt="Logo" />
          <div className="card-buttons">
            <button className="card-button" onClick={this.props.showSignIn}>
              SIGN IN
            </button>
            <button className="card-button" onClick={this.props.showSignUp}>
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(LoginSignUpCard)
