import React from 'react'
import {connect} from 'react-redux'
import {getHoldings} from './modals/utils'
import {iex} from '../../socket.js'
import {
  clearPrices,
  getRoomData,
  setHoldings,
  setSymbol,
  getTransactions,
  fetchPortfolio,
  setStyles,
  fetchAllPortfolios,
  fetchMessages
} from '../../store/'

class SelectRoom extends React.Component {
  constructor(props) {
    super(props)
    this.changeRoom = this.changeRoom.bind(this)
  }

  async changeRoom(e) {
    const roomId = JSON.parse(e.target.value).id
    await this.props.clearPrices()
    await this.props.getRoomData(this.props.userId, roomId)
    await this.props.fetchPortfolio(this.props.room.id, this.props.userId)
    await this.props.getTransactions(this.props.portfolioForSockets.id)
    await this.props.fetchMessages(this.props.room.id)
    await this.props.fetchAllPortfolios(this.props.room.id)
    await this.props.setStyles(this.props.room.tickerQuery)
    clearInterval(this.props.intervalId)
    this.props.clearIntervalFromState()
    let symbols = Object.keys(this.props.previousStyles).join(',')
    iex.emit('subscribe', symbols)
    symbols = symbols.split(',')

    let symbol = symbols.length ? symbols[0] : ''
    await this.props.setSymbol(symbol)

    const holdings = getHoldings(
      this.props.portfolioForHoldings,
      this.props.transactions
    )

    this.props.setHoldings(holdings)
    await this.props.setIntervalFunc()
  }

  render() {
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    room: state.room.currentRoom,
    userId: state.user.currentUser,
    portfolioForSockets: state.room.portfolio,
    portfolioForHoldings: state.portfolio.portfolio,
    transactions: state.transaction.transactions,
    previousStyles: state.liveFeed.styles,
    rooms: state.rooms.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoomData: (userId, roomId) => dispatch(getRoomData(userId, roomId)),
    clearPrices: () => dispatch(clearPrices()),
    setHoldings: holdings => dispatch(setHoldings(holdings)),
    setSymbol: symbol => dispatch(setSymbol(symbol)),
    fetchPortfolio: (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setStyles: tickers => dispatch(setStyles(tickers)),
    fetchMessages: roomId => dispatch(fetchMessages(roomId)),
    fetchAllPortfolios: roomId => dispatch(fetchAllPortfolios(roomId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoom)
