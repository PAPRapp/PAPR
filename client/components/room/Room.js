import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Charts,
  Trade,
  Leaderboard,
  Chat,
  Tickers,
  SelectRoom,
  LiveTV,
  Portfolio,
  News
} from '../'
import {iex} from '../../socket.js'
import {getHoldings} from './modals/utils'
import {
  clearPrices,
  getRoomData,
  getHistory,
  setHoldings,
  setSymbol,
  setTrade,
  getTransactions,
  fetchPortfolio,
  setStyle,
  setStyles,
  getNews,
  fetchMessages,
  fetchAllPortfolios
} from '../../store/'
import './style.scss'

class Room extends Component {
  constructor() {
    super()
    this.state = {
      intervalId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.setIntervalFunc = this.setIntervalFunc.bind(this)
    this.clearIntervalFromState = this.clearIntervalFromState.bind(this)
  }

  async setIntervalFunc() {
    const {symbol, roomId} = this.props
    this.props.getHistory(symbol)
    this.props.getNews(symbol)
    const callBack = (ticker, room, func, func2, func3) => {
      func2(ticker)
      func(ticker)
      func3(room)
    }
    const intervalId = setInterval(() => {
      callBack(
        symbol,
        roomId,
        this.props.getHistory,
        this.props.getNews,
        this.props.fetchAllPortfolios
      )
    }, 10000)
    await this.setState({
      intervalId: intervalId
    })
  }

  async handleChange(symbol) {
    await this.props.setSymbol(symbol)
    clearInterval(this.state.intervalId)
    this.setIntervalFunc()
  }

  async componentDidMount() {
    let symbols = this.props.room.tickerQuery.join(',')
    iex.emit('subscribe', symbols)
    symbols = symbols.split(',')
    if (!this.state.intervalId) {
      let symbol = this.props.room.tickerQuery
        ? this.props.room.tickerQuery[0]
        : ''
      await this.props.setSymbol(symbol)
    }
    await this.props.fetchPortfolio(this.props.room.id, this.props.userId)
    const holdings = getHoldings(
      this.props.portfolioForHoldings,
      this.props.transactions
    )
    this.props.setHoldings(holdings)
    await this.setIntervalFunc()
  }

  componentWillUnmount() {
    const symbols = this.props.room.tickerQuery.join(',')
    iex.emit('unsubscribe', symbols)
    this.props.clearPrices()
    clearInterval(this.state.intervalId)
  }

  async clearIntervalFromState() {
    await this.setState({
      intervalId: null
    })
  }

  render() {
    return (
      <div id="view-container">
        <div id="top-bar">
          <SelectRoom
            intervalId={this.state.intervalId}
            setIntervalFunc={this.setIntervalFunc}
            clearIntervalFromState={this.clearIntervalFromState}
          />
          <Tickers handleChange={this.handleChange} />
        </div>
        <div id="middle-bar">
          <div id="leader-board-tv">
            <Leaderboard />
            <LiveTV />
          </div>
          <Charts />
          <div id="personal-board">
            <Trade />
            <Portfolio />
          </div>
        </div>
        <div id="bottom-bar">
          <Chat />
          <News />
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
    userId: state.user.currentUser,
    portfolioForHoldings: state.portfolio.portfolio,
    portfolioForSockets: state.room.portfolio,
    holdings: state.portfolio.holdings,
    transactions: state.transaction.transactions,
    message: state.transaction.message,
    symbol: state.liveFeed.symbol,
    showTrade: state.room.trade,
    rooms: state.rooms.rooms,
    prices: state.liveFeed.prices,
    lastPrices: state.liveFeed.lastPrices,
    previousStyles: state.liveFeed.styles,
    news: state.chart.news,
    roomId: state.room.currentRoom.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHistory: ticker => dispatch(getHistory(ticker)),
    getRoomData: (userId, roomId) => dispatch(getRoomData(userId, roomId)),
    clearPrices: () => dispatch(clearPrices()),
    setHoldings: holdings => dispatch(setHoldings(holdings)),
    setSymbol: symbol => dispatch(setSymbol(symbol)),
    setTrade: () => dispatch(setTrade()),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setStyle: (symbol, color) => dispatch(setStyle(symbol, color)),
    setStyles: tickers => dispatch(setStyles(tickers)),
    getNews: ticker => dispatch(getNews(ticker)),
    fetchMessages: roomId => dispatch(fetchMessages(roomId)),
    fetchAllPortfolios: roomId => dispatch(fetchAllPortfolios(roomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)

{
  /* <div style={{display: 'flex', flexDirection: 'column'}}>
<div style={{marginBottom: '15px'}}>
  <select onChange={this.handleChange} value={this.props.symbol}>
    {this.props.room.tickerQuery
      ? this.props.room.tickerQuery.map(ticker => {
          let formattedTicker = ticker.toUpperCase()
          return (
            <option key={formattedTicker} value={formattedTicker}>
              {formattedTicker}
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
    <button
      style={{
        width: '100%',
        backgroundColor: '#228B22',
        color: 'white'
      }}
      onClick={this.handleTrade}
    >
      Trade
    </button>
    <TradeModal handleChange={this.handleChange} />
    <YouTube
      videoId="FdtQ2ZgLbEs"
      opts={opts}
      onReady={this._onReady}
    />
  </div>
</div>
</div> */
}
