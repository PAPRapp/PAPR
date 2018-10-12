import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from './utils/'
import {
  setSymbol,
  setQuantity,
  fetchPortfolio,
  setHoldings,
  getTransactions,
  createTransaction,
  clearMessage
} from '../../../store/'
import axios from 'axios'

const numberWithCommas = n => {
  const parts = n.toString().split('.')
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  )
}

class Trade extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
  }
  async handleSubmit(e) {
    e.preventDefault()
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
    await this.props.createTransaction(transactionObj)
    if (this.props.message === 'Transaction confirmed') {
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
    if (this.props.message) {
      this.props.clearMessage()
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
      <div id="buy-sell">
        <b
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            justifySelf: 'flex-start',
            alignSelf: 'flex-start',
            postion: 'relative',
            width: '83%',
            margin: '5px',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
          }}
        >
          <p id="symbol">
            {this.props.symbol} ${this.props.prices[this.props.symbol]
              ? numberWithCommas(
                  this.props.prices[this.props.symbol].toFixed(2)
                )
              : null}
          </p>

          {this.props.message ? <p>{this.props.message}</p> : null}
        </b>
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
                  <p style={{margin: '3% 12% 3% 12%'}}>
                    ${numberWithCommas(
                      (
                        this.props.qty * this.props.prices[this.props.symbol]
                      ).toFixed(2)
                    )}
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
              type="submit"
            >
              BUY
            </button>
            <button
              disabled={sellDisabled}
              className="trade-button"
              onClick={this.handleSubmit}
              style={{width: '100%'}}
              name="sell"
              type="submit"
            >
              SELL
            </button>
          </div>
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
    portfolio: state.portfolio.portfolio,
    message: state.transaction.message
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
    setHoldings: holdings => dispatch(setHoldings(holdings)),
    createTransaction: transactionObj =>
      dispatch(createTransaction(transactionObj)),
    clearMessage: () => dispatch(clearMessage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trade)
