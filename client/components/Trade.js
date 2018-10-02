import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createTransaction} from '../store/transaction'
import {fetchPortfolio, updatePortfolio} from '../store/portfolio'

class Trade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      qty: 0,
      price: 0,
      company: '',
      ticker: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(evt) {
    try {
      await this.setState({
        [evt.target.name]: evt.target.value
      })
    } catch (error) {
      console.log(error)
    }
  }

  async handleSubmit() {
    try {
      await this.props.createTransaction(this.state)
      await this.props.updatePortfolio(this.props.roomId, this.props.userId)
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    await this.setState({
      price: this.props.props.price,
      company: this.props.props.company,
      ticker: this.props.props.ticker
    })
    await fetchPortfolio()
  }

  render() {
    return (
      <div>
        <h3>{this.state.company}</h3>
        <p>{this.state.ticker}</p>
        <h4>{this.state.price}</h4>
        <p>Transaction Type:</p>
        <select name="type" onChange={this.handleChange}>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>
        <p>Quantity:</p>
        <input />
        <button onClick={this.handleSubmit}>CONFIRM</button>
      </div>
    )
  }
}
const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    createTransaction: trade => dispatch(createTransaction(trade)),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    updatePortfolio: (roomId, userId) =>
      dispatch(updatePortfolio(roomId, userId))
  }
}

export default connect(mapState, mapDispatch)(Trade)
