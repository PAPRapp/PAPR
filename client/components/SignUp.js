import React from 'react'
import fire from '../firebase'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: ''
}

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(event) {
    const change = {}
    change[event.target.name] = event.target.value
    await this.setState(change)
  }

  handleSubmit(e) {
    e.preventDefault()
    const {email, passwordOne} = this.state
    fire
      .auth()
      .createUserWithEmailAndPassword(email, passwordOne)
      .then(async u => {
        await axios.post('/api/users', {email})
        this.setState(INITIAL_STATE)
        fire
          .auth()
          .signInWithEmailAndPassword(email, passwordOne)
          .then(() => {
            this.props.history.push('/home')
          })
          .catch(err => {
            this.setState({
              error: err
            })
          })
      })
      .catch(error => {
        this.setState({
          error: error
        })
      })
  }

  render() {
    const {email, passwordOne, passwordTwo, error} = this.state

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || email === ''

    return (
      <div className="card">
        <div className="card-contents">
          <img id="card-logo" src="logo_with_text_no_borders.svg" alt="Logo" />
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
              name="passwordOne"
              onChange={this.handleChange}
              value={this.state.password}
              placeholder="PASSWORD"
              className="card-input"
            />
            <input
              type="password"
              name="passwordTwo"
              onChange={this.handleChange}
              placeholder="VERIFY PASSWORD"
              className="card-input"
            />
          </form>
          <div className="card-buttons">
            <button
              disabled={isInvalid}
              id="sign-up"
              className="card-button"
              onClick={this.handleSubmit}
            >
              SUBMIT
            </button>
            <button className="card-button" onClick={this.props.handleBack}>
              BACK
            </button>
          </div>
          <div className="error-message">{error && <p>{error.message}</p>}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(connect()(SignUp))
