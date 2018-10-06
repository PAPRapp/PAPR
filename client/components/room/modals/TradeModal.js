import React from 'react'
import {connect} from 'react-redux'
import {setSymbol, setQuantity} from '../../../store/'

const renderOptions = num => {
  const list = []
}

class TradeModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this)
  }
  handleSubmit() {}
  handleChangeSymbol(e) {
    this.props.setSymbol(e.target.value)
  }
  handleChangeQuanity(e) {
    this.props.setQuantity(e.target.value)
  }
  render() {
    const buyDisabled =
      this.props.cash < this.props.qty * this.props.prices[this.props.symbol]
    const sellDisabled = this.props.holdings[this.props.symbol] < this.props.qty

    const sharesAvailable = []
    for (let i = 1; i <= this.props.holdings[this.props.symbol]; i++) {
      sharesAvailable.push(i)
    }
    return (
      <div id="trade_modal">
        <select onChange={this.handleChangeSymbol} value={this.state.ticker}>
          {this.props.room.tickerQuery
            ? this.props.room.tickerQuery.map(ticker => {
                return (
                  <option key={ticker} value={ticker.toUpperCase()}>
                    {ticker.toUpperCase}
                  </option>
                )
              })
            : null}
        </select>
        <select onChange={this.handleChangeQuanity} value={this.state.qty}>
          {sharesAvailable.map(num => {
            return (
              <option key={num} value={num}>
                num
              </option>
            )
          })}
        </select>
        <p>Current Price: ${this.props.prices[this.props.symbol].toFixed(2)}</p>
        <p>Quantity: {this.state.qty} Shares</p>
        <p>
          Transaction Value: ${(
            this.state.qty * this.props.prices[this.props.symbol]
          ).toFixed(2)}
        </p>
        <input name="qty" onChange={this.handleChange} />

        <div id="trade_modal_buttons">
          <button
            disabled={buyDisabled}
            className="trade_button"
            onClick={this.handleSubmit}
          >
            Buy
          </button>
          <button
            disabled={sellDisabled}
            className="trade_button"
            onClick={this.handleSubmit}
          >
            Sell
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    room: state.room,
    prices: state.liveFeed.prices,
    symbol: state.liveFeed.symbol,
    holdings: state.portfolio.holdings,
    qty: state.liveFeed.quantity,
    cash: state.portfolio.cash
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSymbol: symbol => dispatch(setSymbol(symbol)),
    setQuantity: num => dispatch(setQuantity(num))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TradeModal)
