import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSectors, getTickers, postRoom} from '../../store/'
import Autocomplete from 'react-autocomplete'
import './style.css'

class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      tickers: '',
      startingCash: '',
      sector: '',
      expiration: '',
      sectorTickers: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.addToSectorTicker = this.addToSectorTicker.bind(this)
    this.removeTicker = this.removeTicker.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getSectors()
    this.setState({
      sector: this.props.sectors.sectors[0]
    })
    this.props.getTickers(this.state.sector)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeSelecter = name => event => {
    this.setState({
      [name]: event.target.value
    })
    this.props.getTickers(event.target.value)
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    let name = this.state.name
    let startingCash = this.state.startingCash
    let tickers = this.state.sectorTickers
    let expiration = this.state.expiration
    let user = this.props.userId
    await this.props.postRoom({name, startingCash, tickers, expiration, user})
    let slice = window.location.href.slice(0,-4)
    let invite = slice + "rooms/join/" + this.props.slug
    alert("Send out this link to invite users:\n"  + invite)

  }

  addToSectorTicker(evt) {
    evt.preventDefault()
    let ticker = evt.target.value.toUpperCase()
    let check = this.props.sectors.tickers.find(symbol => {
      return symbol.symbol === ticker
    })
    if (check) {
      let removeDup = this.state.sectorTickers.filter(
        tickers => tickers !== ticker
      )
      let join = removeDup.concat(ticker)
      this.setState({
        sectorTickers: join
      })
    } else {
      alert('Ticker does not exists')
    }
  }

  removeTicker(evt) {
    evt.preventDefault()
    let ticker = evt.target.value.toUpperCase()
    let remove = this.state.sectorTickers.filter(tickers => tickers !== ticker)
    this.setState({
      sectorTickers: remove
    })
  }

  render() {
    const sectors = this.props.sectors.sectors
    return (
      <div className="CreatrRoomDiv">
        <div className="fourmCard">
          <form className="fourm" onSubmit={this.handleSubmit}>
          <div className="fourmdivide">
          <span>Room Name</span>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text"
              name="name"
              id="name"
            />
            <span>Starting Cash</span>
            <input
              type="number"
              placeholder="Min: 0"
              name="cash"
              id="cash"
              onChange={this.handleChange('startingCash')}
              value={this.state.startingCash}
            />
            <span>Expiration Date</span>
            <input
              type="date"
              id="expiration"
              name="expiration"
              onChange={this.handleChange('expiration')}
              value={this.state.expiration}
            />
          </div >
          <div className="fourmdivide">
          <span> Market Sectors </span>
            <select
              onChange={this.handleChangeSelecter('sector')}
              value={this.state.sector}
            >
              {sectors
                ? sectors.map(sector => {
                    return (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    )
                  })
                : null}
            </select>
            <span> SEARCH BAR Tickers By Sectors </span>
            <Autocomplete
              menuStyle={{
                borderRadius: '3px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '2px 0',
                fontSize: '10px',
                position: 'fixed',
                top: "30%",
                left: "35vw",
                overflow: 'auto',
                maxHeight: '50%'
              }}
              items={this.props.sectors.tickers}
              getItemValue={item => item.symbol}
              shouldItemRender={(item, value) =>
                item.symbol.toLowerCase().indexOf(value.toLowerCase()) > -1
              }
              renderItem={(item, isHighlighted) => (
                <div
                  style={{background: isHighlighted ? 'lightgray' : 'white'}}
                >
                  {item.symbol}
                </div>
              )}
              value={this.state.tickers}
              onChange={this.handleChange('tickers')}
              onSelect={val =>
                this.setState({
                  tickers: val
                })
              }
            />
            <button
              type="submit"
              value={this.state.tickers}
              onClick={event => {
                this.addToSectorTicker(event)
              }}
            >
              ADD
            </button>
            <div className="tickerBoxs">
            {this.state.sectorTickers.map(ticker => {
              return (
                <div key={ticker} className="tickerBox">
                  <div key={ticker}>{ticker}</div>
                  <button
                    type="submit"
                    value={ticker}
                    onClick={event => {
                      this.removeTicker(event)
                    }}
                  >
                    X
                  </button>
                </div>
              )
            })}
            </div>
          </div>
            <button
              className="submitButton"
              type="submit"
              value="Submit"
              name="submit"
            > Submit </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sectors: state.sectors,
    userId: state.user.currentUser,
    slug: state.rooms.slug
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSectors: () => dispatch(getSectors()),
    getTickers: sector => dispatch(getTickers(sector)),
    postRoom: data => dispatch(postRoom(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
