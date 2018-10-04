import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createTransaction} from '../store/transaction'
import {fetchPortfolio, updatePortfolio} from '../store/portfolio'

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
      console.log('QTY: ', this.state.qty)
      console.log('CURRENT SHARES: ', this.props.portfolio[this.props.ticker])
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
      console.log('PORTFOLIO ========> ', this.props.portfolio)
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
    // const maxBuyArray = () => {
    //   let arr = []
    //   const maxBuy = this.state.cash / this.state.price
    //   for (let i = 1; i <= maxBuy; i++) {
    //     arr.push(i)
    //   }
    //   return arr
    // }

    // const maxSellArray = () => {
    //   let arr = []
    //   const maxSell = this.state.portfolio[this.state.ticker]
    //   for (let i = 1; i <= maxSell; i++) {
    //     arr.push(i)
    //   }
    //   return arr
    // }
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
        {/* <select name="qty" onChange={this.handleChange}>
          {this.state.type === 'buy'
            ? maxBuyArray().map(num => {
                return <option key={num}>num</option>
              })
            : maxSellArray().map(num => {
                return <option key={num}>num</option>
              })}
        </select> */}
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
const mapState = state => {
  return {
    userId: state.user.currentUser,
    roomId: state.room.id,
    liveFeed: state.liveFeed,
    portfolio: state.portfolio.portfolio
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
