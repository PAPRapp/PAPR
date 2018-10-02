import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getHistory, getTicker} from '../store/chart'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import CandleChart from './CandleChart'

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
    await this.props.getTicker(this.props.user.id)
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
    const {history} = this.props

    if (history.data) {
      const historyFilter = history.data.filter(
        data =>
          data.high &&
          data.open &&
          data.close &&
          data.marketClose &&
          data.volume &&
          data.label &&
          data.low
      )
      return (
        <div>
          <select onChange={this.handleChange} value={this.state.ticker}>
            <option value="ibm">IBM</option>
            <option value="aapl">Apple</option>
            <option value="tsla">Tesla</option>
          </select>
          <button onClick={this.show}>Clickme</button>
          <LineGraph info={historyFilter} />
          <BarGraph info={historyFilter} />
          <CandleChart info={historyFilter} />
        </div>
      )
    } else {
      return <div>loading</div>
    }
  }
}

const mapState = state => {
  return {
    history: state.chart.history,
    companies: state.chart.companies,
  }
}

const mapDispatch = dispatch => {
  return {
    getHistory: ticker => dispatch(getHistory(ticker)),
  }
}

export default connect(mapState, mapDispatch)(Room)
