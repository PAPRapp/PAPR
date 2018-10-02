import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHistory, getTicker} from '../store/chart'
import Charts from './Charts'
import LivePrices from './LivePrices'
import Trade from './Trade'

class Room extends Component {
  constructor() {
    super()
    this.state = {
      ticker: '',
      intervalId: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.show = this.show.bind(this)
    this.setIntervalFunc = this.setIntervalFunc.bind(this)
  }

  async setIntervalFunc() {
    let company = this.state.ticker
    let history = this.props.getHistory
    console.log('getting history')
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
    await this.setState({
      ticker: event.target.value
    })
    clearInterval(this.state.intervalId)
    this.setIntervalFunc()
  }
  show = () => {
    console.log(this.props.history)
  }

  async componentDidMount() {
    await this.props.getTicker(1)
    if (!this.state.intervalId) {
      await this.setState({
        ticker: this.props.companies[0]
      })
    }
    this.setIntervalFunc()
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    return (
      <div id="view-container">
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <div style={{marginBottom: '15px'}}>
            <select onChange={this.handleChange} value={this.state.ticker}>
              <option value="ibm">IBM</option>
              <option value="aapl">Apple</option>
              <option value="tsla">Tesla</option>
            </select>
          </div>
          <div
            id="room"
            style={{fontFamily: 'Helvetica Neue', display: 'flex'}}
          >
            <Charts style={{flex: 3}} />
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
              <LivePrices />
              <Trade props={this.state} style={{marginTop: '10px'}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    history: state.chart.history,
    companies: state.chart.companies,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    getHistory: ticker => dispatch(getHistory(ticker)),
    getTicker: id => dispatch(getTicker(id))
  }
}

export default connect(mapState, mapDispatch)(Room)
