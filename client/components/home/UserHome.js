import React from 'react'
import {connect} from 'react-redux'
import {
  signOut,
  getUser,
  joinRoom,
  getRooms,
  getRoomData,
  setStyles,
  setPage,
  fetchPortfolio,
  getTransactions,
  setHoldings
} from '../../store/'
import {getHoldings} from '../room/modals/utils'
import {Rooms, Room, CreateRoom, Navbar} from '../'
import {withRouter} from 'react-router-dom'
import particleConfig from '../../particle'
import Particles from 'react-particles-js'
import './style.scss'
/**
 * COMPONENT
 */
class UserHome extends React.Component {
  async componentDidMount() {
    if (this.props.hash) {
      await this.props.joinRoom(this.props.hash, this.props.userId)
    }
    await this.props.getRooms(this.props.userId)
    if (this.props.rooms.length) {
      let room = this.props.rooms[0]
      await this.props.getRoomData(this.props.userId, room.id)
      await this.props.setStyles(room.tickerQuery)
      console.log('room id', room.id)
      console.log('user id', this.props.userId)
      await this.props.fetchPortfolio(room.id, this.props.userId)
      console.log('portfolio id', this.props.portfolioForHoldings.id)
      await this.props.getTransactions(this.props.portfolioForHoldings.id)
      const holdings = await getHoldings(
        this.props.portfolioForHoldings,
        this.props.transactions
      )
      this.props.setHoldings(holdings)
      this.props.setPage('room')
    } else {
      this.props.setPage('createroom')
    }
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Particles className="particles-js" params={particleConfig} />
        {this.props.currentPage === 'rooms' ? <Rooms /> : null}
        {this.props.currentPage === 'room' ? <Room /> : null}
        {this.props.currentPage === 'createroom' ? <CreateRoom /> : null}
      </React.Fragment>
    )
  }
}
/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    userId: state.user.currentUser,
    currentPage: state.currentPage,
    hash: state.hash,
    rooms: state.rooms.rooms,
    currentRoom: state.room.currentRoom,
    portfolioForHoldings: state.portfolio.portfolio,
    transactions: state.transaction.transactions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUser: () => {
      dispatch(getUser())
    },
    signOut: () => {
      dispatch(signOut())
    },
    joinRoom: async (hash, userId) => {
      await dispatch(joinRoom(hash, userId))
    },
    getRooms: async userId => dispatch(getRooms(userId)),
    getRoomData: async (userId, roomId) =>
      dispatch(getRoomData(userId, roomId)),
    setStyles: tickers => dispatch(setStyles(tickers)),
    setPage: page => dispatch(setPage(page)),
    fetchPortfolio: async (roomId, userId) =>
      dispatch(fetchPortfolio(roomId, userId)),
    getTransactions: async portfolioId => {
      await dispatch(getTransactions(portfolioId))
    },
    setHoldings: holdings => dispatch(setHoldings(holdings))
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserHome)
)
/**
 * PROP TYPES
 */
