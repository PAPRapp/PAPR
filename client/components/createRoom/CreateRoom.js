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
      cash: '',
      sector: '',
      exp: '',
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

  handleSubmit = evt => {
    evt.preventDefault()
    let name = this.state.name
    let cash = this.state.name
    let tickers = this.state.sectorTickers
    let exp = this.state.exp
    this.props.postRoom({name, cash, tickers, exp})
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
    const menuStyle = {
      borderRadius: '3px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0',
      fontSize: '90%',
      position: 'fixed',
      overflow: 'auto',
      maxHeight: '50%'
    }
    return (
      <div className="CreatrRoomDiv">
        <div className="fourmCard">
          <form className="fourm" onSubmit={this.handleSubmit}>
            <span>Room Name</span>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              className="inputStyle"
              type="text"
              name="name"
              id="name"
            />
            <span>Starting Cash</span>
            <input
              className="inputStyle"
              type="number"
              placeholder="Min: 0"
              name="cash"
              id="cash"
              onChange={this.handleChange('cash')}
              value={this.state.cash}
            />
            <span>Expiration Date</span>
            <input
              type="date"
              id="exp"
              name="exp"
              onChange={this.handleChange('exp')}
              value={this.state.exp}
            />
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
            {this.state.sectorTickers.map(ticker => {
              return (
                <div key={ticker}>
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
            <button
              className="inputStyle"
              type="submit"
              value="Submit"
              name="submit"
            />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sectors: state.sectors,
    userId: state.user.currentUser.id
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
