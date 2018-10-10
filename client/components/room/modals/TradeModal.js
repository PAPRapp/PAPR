import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from './utils/'
import {
  setSymbol,
  setQuantity,
  fetchPortfolio,
  setHoldings,
  getTransactions
} from '../../../store/'
import axios from 'axios'

class TradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
  }
  async handleSubmit(e) {
    const transactionObj = {
      qty: this.props.qty,
      price: this.props.prices[this.props.symbol] * 100,
      type: e.target.name,
      ticker: this.props.symbol,
      portfolioId: this.props.portfolioId,
      holdings: this.props.holdings,
      userId: this.props.userId,
      roomId: this.props.room.id
    }
    console.log(this.props.portfolioId)
    const {data} = await axios.post('/api/transaction', transactionObj)
    await this.setState({
      message: data.message
    })
    if (this.state.message === 'Transaction confirmed') {
      await this.props.getTransactions(this.props.portfolioId)
      await this.props.fetchPortfolio(this.props.room.id, this.props.userId)
      const holdings = getHoldings(
        this.props.portfolio,
        this.props.transactions
      )
      this.props.setHoldings(holdings)
    }
  }

  handleChangeSymbol(e) {
    if (this.state.message) {
      this.setState({
        message: null
      })
    }
    this.props.setSymbol(e.target.value)
  }
  handleChangeQuantity(e) {
    if (this.state.message) {
      this.setState({
        message: null
      })
    }
    if (!isNaN(e.target.value)) {
      this.props.setQuantity(e.target.value)
    }
  }
  render() {
    const buyDisabled =
      this.props.holdings.Cash / 100 <
        Number(this.props.qty) * this.props.prices[this.props.symbol] ||
      Number(this.props.qty) < 0
    const sellDisabled =
      !this.props.holdings[this.props.symbol] ||
      this.props.holdings[this.props.symbol] < Number(this.props.qty) ||
      Number(this.props.qty) < 0

    return (
      <div
        id="trade_modal"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: '90%',
          height: '95%',
          paddingLeft: '5vw',
          paddingRight: '5vw'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '30%'
          }}
        >
          {/* <div
          className="trade-info"
          style={{width: '30%', display: 'flex', alignItems: 'center'}}
        > */}
          {this.props.prices[this.props.symbol] ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'space-between',
                width: '100%',
                height: '60%',
                color: 'white'
              }}
            >
              <div className="trade-info-text">
                <b>Total Value</b>
                <p style={{margin: '12%'}}>
                  ${(
                    this.props.qty * this.props.prices[this.props.symbol]
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          ) : null}
          <input
            type="text"
            onChange={this.handleChangeQuantity}
            value={this.props.qty}
            className="trade-input"
            placeholder="Enter Quantity"
          />
        </div>
        <div
          id="trade-buttons"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px 0px 10px 0px',
            height: '60%',
            width: '30%'
          }}
        >
          <button
            disabled={buyDisabled}
            className="trade-button"
            onClick={this.handleSubmit}
            style={{width: '100%'}}
            name="buy"
          >
            BUY
          </button>
          <button
            disabled={sellDisabled}
            className="trade-button"
            onClick={this.handleSubmit}
            style={{width: '100%'}}
            name="sell"
          >
            SELL
          </button>
          {this.state.message ? (
            <div className="error-message">
              <p>{this.state.message}</p>
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    room: state.room.currentRoom,
    prices: state.liveFeed.prices,
    symbol: state.liveFeed.symbol,
    holdings: state.portfolio.holdings,
    qty: state.liveFeed.quantity,
    cash: state.portfolio.portfolio.Cash,
    portfolioId: state.room.portfolio.id,
    transactions: state.transaction.transactions,
    userId: state.user.currentUser,
    portfolio: state.portfolio.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSymbol: symbol => dispatch(setSymbol(symbol)),
    setQuantity: num => dispatch(setQuantity(num)),
    fetchPortfolio: async (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setHoldings: holdings => dispatch(setHoldings(holdings))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeModal)
