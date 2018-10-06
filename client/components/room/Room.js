import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Charts, LivePrices, Trade, TradeModal} from '../'
import {iex} from '../../socket.js'
import {getHoldings} from './modals/utils/'
import {
  clearPrices,
  getRoomData,
  getHistory,
  getTicker,
  setHoldings,
  setSymbol
} from '../../store/'
import './style.css'

class Room extends Component {
  constructor() {
    super()
    this.state = {
      intervalId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.show = this.show.bind(this)
    this.setIntervalFunc = this.setIntervalFunc.bind(this)
  }

  async setIntervalFunc() {
    let company = this.props.symbol
    let history = this.props.getHistory
    history(company)
    let callBack = function(ticker, func) {
      func(ticker)
    }
    let intervalId = setInterval(function() {
      callBack(company, history)
    }, 10000)

    await this.setState({
      intervalId: intervalId
    })
  }

  async handleChange(event) {
    this.setSymbol(event.target.value)
    clearInterval(this.state.intervalId)
    this.setIntervalFunc()
  }
  show = () => {
    console.log(this.props.history)
  }

  async componentDidMount() {
    const symbols = this.props.room.tickerQuery.join(',')
    iex.emit('subscribe', symbols)
    if (!this.state.intervalId) {
      await this.setState({
        ticker: this.props.room.tickerQuery
          ? this.props.room.tickerQuery[0]
          : ''
      })
    }
    const holdings = getHoldings(this.props.portfolio, this.props.transactions)
    this.props.setHoldings(holdings)
    this.setIntervalFunc()
  }

  componentWillUnmount() {
    const symbols = this.props.room.tickerQuery.join(',')
    iex.emit('unsubscribe', symbols)
    this.props.clearPrices()
    clearInterval(this.state.intervalId)
  }

  render() {
    return (
      <div id="view-container">
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{marginBottom: '15px'}}>
            <select onChange={this.handleChange} value={this.state.ticker}>
              {this.props.room.tickerQuery
                ? this.props.room.tickerQuery.map(ticker => {
                    return (
                      <option key={ticker} value={ticker}>
                        {ticker}
                      </option>
                    )
                  })
                : null}
            </select>
          </div>
          <div
            id="room"
            style={{fontFamily: 'Helvetica Neue', display: 'flex'}}
          >
            <Charts style={{flex: 3}} />
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
              <LivePrices />
              <TradeModal />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    history: state.chart.history,
    companies: state.chart.companies,
    room: state.room.currentRoom,
    user: state.user,
    portfolio: state.room.portfolio,
    transactions: state.transaction.transactions,
    symbol: state.liveFeed.symbol
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHistory: ticker => dispatch(getHistory(ticker)),
    getRoomData: () => dispatch(getRoomData()),
    clearPrices: () => dispatch(clearPrices()),
    setHoldings: holdings => dispatch(setHoldings(holdings)),
    setSymbol: symbol => dispatch(setSymbol(symbol))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
