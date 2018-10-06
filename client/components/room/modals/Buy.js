import React from 'react'
import {connect} from 'react-redux'

class Buy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      qty: '',
      price: '',
      type: '',
      ticker: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit() {}
  handleChange() {}
  render() {}
}

const mapStateToProps = state => {
  return {
    userId: state.user.userId
  }
}

export default connect(mapStateToProps)(Buy)
