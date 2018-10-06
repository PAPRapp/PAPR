import React from 'react'
import {connect} from 'react-redux'

class TradeModal extends React.Component {
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

export default connect()(TradeModal)
