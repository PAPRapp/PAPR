import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  createTransaction,
  fetchPortfolio,
  updatePortfolio
} from '../../../store/'

class Trade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'buy',
      qty: 0,
      price: 0,
      company: '',
      ticker: '',
      cash: 0,
      portfolio: {},
      message: '',
      insufficentFunds: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleChange(evt) {
    try {
      await this.setState({
        [evt.target.name]: evt.target.value
      })
      if (
        this.state.type === 'buy' &&
        this.state.qty *
          this.props.liveFeed.prices[this.props.ticker.toUpperCase()] *
          100 >
          this.state.cash
      ) {
        await this.setState({
          message: 'Insufficient Funds',
          insufficentFunds: true
        })
      } else if (
        this.state.type === 'sell' &&
        this.props.portfolio[this.props.ticker] < this.state.qty
      ) {
        await this.setState({
          message: 'Insufficient Shares',
          insufficentFunds: true
        })
      } else if (this.state.qty <= 0) {
        await this.setState({insufficentFunds: true})
      } else {
        await this.setState({insufficentFunds: false})
        await this.setState({message: ''})
      }
    } catch (error) {
      console.log(error)
    }
  }

  async handleSubmit() {
    try {
      const tradeInfo = {
        ticker: this.props.ticker,
        type: this.state.type,
        qty: this.state.qty,
        price:
          this.props.liveFeed.prices[this.props.ticker.toUpperCase()] * 100,
        company: '',
        cash: this.state.cash,
        portfolio: this.props.portfolio
      }
      await this.props.createTransaction(tradeInfo)
      await this.props.updatePortfolio(
        this.props.roomId,
        this.props.userId,
        tradeInfo
      )
      await this.setState({
        message: 'Transaction Successful'
      })
    } catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchPortfolio(this.props.roomId, this.props.userId)
      await this.setState({
        price:
          this.props.liveFeed.prices[this.props.ticker.toUpperCase()] * 100,
        ticker: this.props.ticker,
        cash: this.props.portfolio.cash,
        portfolio: this.props.portfolio
      })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
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
        <p>Portfollio Shares in {this.props.ticker.toUpperCase()}: </p>
        <h4>{this.props.portfolio[this.props.ticker] || '0'}</h4>
        <p>Portfollio Cash: </p>
        <h4>${(this.props.portfolio.cash / 100).toFixed(2)}</h4>
        <p>Transaction Type: </p>
        <select name="type" onChange={this.handleChange}>
          <option value="buy">BUY</option>
          <option value="sell">SELL</option>
        </select>
        <p>Quantity:</p>
        <input name="qty" onChange={this.handleChange} />
        <button
          type="submit"
          disabled={this.state.insufficentFunds}
          onClick={this.handleSubmit}
        >
          CONFIRM
        </button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    userId: state.user.currentUser,
    roomId: state.room.currentRoom.id,
    liveFeed: state.liveFeed,
    portfolio: state.portfolio.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createTransaction: trade => dispatch(createTransaction(trade)),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    updatePortfolio: (roomId, userId, state) =>
      dispatch(updatePortfolio(roomId, userId, state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)
