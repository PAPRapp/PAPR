import React from 'react'
import fire from '../../firebase'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setPage, getUser, currentUser} from '../../store/'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: ''
}

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const {email, password} = this.state
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.currentUser(email)
        this.props.history.push('/home')
      })
      .catch(err => {
        this.setState({
          error: err
        })
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const {email, password, error} = this.state
    const isInvalid = password === '' || email === ''
    return (
      <div className="card">
        <div className="card-contents">
          <img
            id="card-logo"
            src="images/logo_with_text_no_borders.svg"
            alt="Logo"
          />
          <form className="input-fields">
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="EMAIL"
              className="card-input"
            />
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="PASSWORD"
              className="card-input"
            />
          </form>
          <div className="card-buttons">
            <button
              className="card-button"
              disabled={isInvalid}
              onClick={this.handleSubmit}
            >
              SIGN IN
            </button>
            <button
              className="card-button"
              onClick={() => this.props.setPage('landing')}
            >
              BACK
            </button>
          </div>
          <div className="error-message">{error && <p>{error.message}</p>}</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUser: () => dispatch(getUser()),
    currentUser: email => dispatch(currentUser(email)),
    setPage: page => dispatch(setPage(page))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SignIn))
