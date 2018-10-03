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
      ticker: '',
      cash: 0
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
      await this.props.updatePortfolio(
        this.props.roomId,
        this.props.userId,
        this.state
      )
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      const portfolio = await this.props.fetchPortfolio(
        this.props.roomId,
        this.props.userId
      )
      await this.setState({
        price: this.props.liveFeed.prices[this.props.ticker.toUpperCase()],
        ticker: this.props.ticker,
        cash: portfolio.cash
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log(this.state.company, this.state.ticker)
    return (
      <div>
        <p>{this.props.ticker.toUpperCase()}</p>
        <h4>
          {this.props.liveFeed.prices[this.props.ticker.toUpperCase()]
            ? this.props.liveFeed.prices[
                this.props.ticker.toUpperCase()
              ].toFixed(2)
            : null}
        </h4>
        <p>Transaction Type:</p>
        <select name="type" onChange={this.handleChange}>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>
        <p>Quantity:</p>
        <select name="qty" onChange={this.handleChange}>
          {/* {if(for(let i = 1; i <= this.state.)} */}
          <option value="sell">SELL</option>
        </select>
        <button onClick={this.handleSubmit}>CONFIRM</button>
      </div>
    )
  }
}
const mapState = state => {
  return {
    userId: state.user.currentUser,
    roomId: state.room.id,
    liveFeed: state.liveFeed
  }
}

const mapDispatch = dispatch => {
  return {
    createTransaction: trade => dispatch(createTransaction(trade)),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    updatePortfolio: (roomId, userId, state) =>
      dispatch(updatePortfolio(roomId, userId, state))
  }
}

export default connect(mapState, mapDispatch)(Trade)
