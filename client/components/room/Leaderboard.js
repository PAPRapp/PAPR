import React, {Component} from 'react'
import {connect} from 'react-redux'
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
  fetchAllPortfolios,
  setStyle,
  setStyles
} from '../../store/'
import './style.scss'

class Leaderboard extends Component {
  constructor() {
    super()
    this.state = {
      intervalId: null
    }
  }

  async setIntervalFunc() {
    let intervalId = setInterval(async () => {
      await fetchAllPortfolios(this.props.room.id)
    }, 10000)

    await this.setState({
      intervalId: intervalId
    })
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
    this.props.fetchAllPortfolios(this.props.room.id)
    this.setIntervalFunc()
  }

  componentWillUnmount() {
    const symbols = this.props.room.tickerQuery.join(',')
    iex.emit('unsubscribe', symbols)
    this.props.clearPrices()
    clearInterval(this.state.intervalId)
  }

  render() {
    let color = true
    this.props.portfolios.map(portfolio => {
      let value = portfolio.cash / 100
      for (let key in portfolio) {
        if (
          key !== 'cash' &&
          key !== 'userEmail' &&
          key !== 'user' &&
          key !== 'value'
        ) {
          value += portfolio[key] * this.props.prices[key.toUpperCase()]
        } else if (key === 'userEmail') {
          portfolio[key] = portfolio[key].split('@')[0]
        }
      }
      portfolio.value = value
    })

    function compare(a, b) {
      if (a.value < b.value) return 1
      if (a.value > b.value) return -1
      return 0
    }

    this.props.portfolios.sort(compare)
    return (
      <div id="leader-board">
        <p>LEADERBOARD</p>
        {this.props.portfolios.map(portfolio => {
          let backgroundColor
          if (color) {
            color = !color
            backgroundColor = '#656a6d54'
          } else {
            color = !color
            backgroundColor = 'transparent'
          }
          return (
            <div
              key={portfolio.userId}
              id="leader-board-item"
              style={{backgroundColor: backgroundColor}}
            >
              <p id="leader-board-user" style={{textAlign: 'right'}}>
                {portfolio.userEmail.toUpperCase()}
              </p>
              <p
                id="leader-board-value"
                style={{textAlign: 'left'}}
              >{`$${portfolio.value.toFixed(2)}`}</p>
            </div>
          )
        })}
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
    portfolios: state.portfolio.portfolios,
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
    setSymbol: symbol => dispatch(setSymbol(symbol)),
    setTrade: () => dispatch(setTrade()),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    fetchAllPortfolios: roomId => dispatch(fetchAllPortfolios(roomId)),
    getTransactions: portfolioId => dispatch(getTransactions(portfolioId)),
    setStyle: (symbol, color) => dispatch(setStyle(symbol, color)),
    setStyles: tickers => dispatch(setStyles(tickers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard)
