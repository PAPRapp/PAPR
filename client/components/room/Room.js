import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Charts, LivePrices, Trade, TradeModal, Pie} from '../'
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
  setStyles
} from '../../store/'
import './style.scss'
import YouTube from 'react-youtube'

class Room extends Component {
  constructor() {
    super()
    this.state = {
      intervalId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.show = this.show.bind(this)
    this.setIntervalFunc = this.setIntervalFunc.bind(this)
    this.handleTrade = this.handleTrade.bind(this)
    this.changeRoom = this.changeRoom.bind(this)
  }

  async setIntervalFunc() {
    let symbol = this.props.symbol
    let history = this.props.getHistory
    history(symbol)
    let callBack = function(ticker, func) {
      func(ticker)
    }
    let intervalId = setInterval(() => {
      callBack(symbol, history)
    }, 10000)

    await this.setState({
      intervalId: intervalId
    })
  }

  handleTrade() {
    this.props.setTrade()
  }

  async handleChange(symbol) {
    await this.props.setSymbol(symbol)
    clearInterval(this.state.intervalId)
    this.setIntervalFunc()
  }

  show = () => {
    console.log(this.props.history)
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
    // await this.props.fetchPortfolio(this.props.room.id, this.props.userId)
    // const holdings = getHoldings(
    //   this.props.portfolioForHoldings,
    //   this.props.transactions
    // )
    // this.props.setHoldings(holdings)
    this.setIntervalFunc()
  }

  componentWillUnmount() {
    const symbols = this.props.room.tickerQuery.join(',')
    iex.emit('unsubscribe', symbols)
    this.props.clearPrices()
    clearInterval(this.state.intervalId)
  }

  async changeRoom(e) {
    const roomId = JSON.parse(e.target.value).id
    await this.props.clearPrices()
    await this.props.getRoomData(this.props.userId, roomId)
    await this.props.setStyles(this.props.room.tickerQuery)
    await this.props.fetchPortfolio(this.props.room.id, this.props.userId)
    await this.props.getTransactions(this.props.portfolioForSockets.id)
    clearInterval(this.state.intervalId)
    await this.setState({
      intervalId: null
    })
    let symbols = Object.keys(this.props.previousStyles).join(',')
    iex.emit('subscribe', symbols)
    symbols = symbols.split(',')
    if (!this.state.intervalId) {
      let symbol = symbols.length ? symbols[0] : ''
      await this.props.setSymbol(symbol)
    }
    const holdings = getHoldings(
      this.props.portfolioForHoldings,
      this.props.transactions
    )
    this.props.setHoldings(holdings)
    this.setIntervalFunc()
  }
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    let totalPortfolioValue = 0
    if (Object.keys(this.props.holdings).length) {
      totalPortfolioValue = this.props.holdings.Cash / 100
      Object.keys(this.props.holdings).forEach(symbol => {
        if (symbol !== 'Cash') {
          totalPortfolioValue +=
            this.props.holdings[symbol] * this.props.prices[symbol]
        }
      })
    }

    const colors = [
      '#00417B',
      '#01A3E2',
      '#018CC9',
      '#0379B1',
      '#016BA7',
      '#004E89',
    ]

    const {holdings, prices} = this.props
    const pieData = {children: [], style: {fillOpacity: 1}}

    Object.keys(holdings).forEach((symbol, i) => {
      if (!pieData.hasOwnProperty(symbol)) {
        if (symbol === 'Cash') {
          pieData.children.push({
            name: symbol,
            value: holdings[symbol],
            hex: colors[i],
            style: {fillOpacity: 1}
          })
        } else {
          pieData.children.push({
            name: symbol,
            value: prices[symbol] * holdings[symbol],
            hex: colors[i],
            style: {fillOpacity: 1}
          })
        }
      }
    })

    return (
      <div id="view-container">
        <div id="top-bar">
          <select id="room-drop-down" onChange={async e => this.changeRoom(e)}>
            {this.props.rooms.map(room => {
              if (room.active) {
                return (
                  <option
                    key={room.id}
                    value={JSON.stringify(room)}
                    className="room-drop-down"
                  >
                    {room.name}
                  </option>
                )
              }
            })}
          </select>
          <div id="room-tickers">
            {Object.keys(this.props.prices).map(symbol => {
              let selected = {}
              if (this.props.symbol === symbol) {
                selected = {
                  opacity: 1,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }
              }
              const {lastPrices, prices, previousStyles} = this.props
              let color = previousStyles[symbol]
              if (lastPrices[symbol]) {
                if (prices[symbol] > lastPrices[symbol]) {
                  color = '#1EC851'
                  this.props.setStyle(symbol, color)
                } else if (prices[symbol] < lastPrices[symbol]) {
                  color = '#9a1f11'
                  this.props.setStyle(symbol, color)
                }
              }
              let style = {
                ...selected,
                backgroundColor: color
              }
              return (
                <div
                  className="room-ticker"
                  key={symbol}
                  style={style}
                  onClick={() => this.handleChange(symbol)}
                >
                  <p>
                    {symbol}: ${this.props.prices[symbol].toFixed(2)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div id="middle-bar">
          <div id="leader-board-tv">
            <div id="leader-board">
              <p>LEADER BOARD</p>
            </div>
            <div id="tv">
              <YouTube
                videoId="FdtQ2ZgLbEs"
                opts={opts}
                onReady={this._onReady}
              />
            </div>
          </div>
          <Charts />
          {/* <div id="charts">
            <div id="line-chart">
              <p>LINE CHART</p>
            </div>
            <div id="bar-chart">
              <p>BAR CHART</p>
            </div>
          </div> */}
          <div id="personal-board">
            <div id="buy-sell">
              <b
                style={{
                  justifySelf: 'flex-start',
                  alignSelf: 'flex-start',
                  postion: 'relative',
                  margin: '5px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  top: 0
                }}
              >
                {this.props.symbol}
              </b>
              <TradeModal />
            </div>
            <div id="portfolio">
            {console.log(pieData)}
              {Object.keys(this.props.holdings).length ? <Pie id="pie" data={pieData} /> : <div>Loading</div> }
            <div id="portfolio-text">
              <div>
                <b>Portfolio Value: </b> ${totalPortfolioValue.toFixed(2)}
              </div>
              {Object.keys(this.props.holdings).length
                ? Object.keys(this.props.holdings).map(symbol => {
                    if (symbol === 'Cash') {
                      return (
                        <div key={symbol}>
                          <b>
                            {symbol}: ${this.props.holdings[symbol] / 100}
                          </b>
                        </div>
                      )
                    } else {
                      return (
                        <div key={symbol}>
                          <b>
                            {symbol}: {this.props.holdings[symbol]} Shares
                          </b>
                        </div>
                      )
                    }
                  })
                : null}
              </div>
            </div>
          </div>
        </div>
        <div id="bottom-bar">
          <div id="news">
            <div className="article">
              <div className="title">
                <p>NEWS</p>
              </div>
              <div className="sentiment">
                <p>SENTIMENT</p>
              </div>
            </div>
            <div className="article">
              <div className="title">
                <p>NEWS</p>
              </div>
              <div className="sentiment">
                <p>SENTIMENT</p>
              </div>
            </div>
            <div className="article">
              <div className="title">
                <p>NEWS</p>
              </div>
              <div className="sentiment">
                <p>SENTIMENT</p>
              </div>
            </div>
            <div className="article">
              <div className="title">
                <p>NEWS</p>
              </div>
              <div className="sentiment">
                <p>SENTIMENT</p>
              </div>
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
    userId: state.user.currentUser,
    portfolioForHoldings: state.portfolio.portfolio,
    portfolioForSockets: state.room.portfolio,
    holdings: state.portfolio.holdings,
    transactions: state.transaction.transactions,
    symbol: state.liveFeed.symbol,
    showTrade: state.room.trade,
    rooms: state.rooms.rooms,
    prices: state.liveFeed.prices,
    lastPrices: state.liveFeed.lastPrices,
    previousStyles: state.liveFeed.styles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHistory: ticker => dispatch(getHistory(ticker)),
    getRoomData: (userId, roomId) => dispatch(getRoomData(userId, roomId)),
    clearPrices: () => dispatch(clearPrices()),
    setHoldings: holdings => dispatch(setHoldings(holdings)),
    setSymbol: async symbol => dispatch(setSymbol(symbol)),
    setTrade: () => dispatch(setTrade()),
    fetchPortfolio: async (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setStyle: (symbol, color) => dispatch(setStyle(symbol, color)),
    setStyles: tickers => dispatch(setStyles(tickers))
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
