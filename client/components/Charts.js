import React from 'react'
import {connect} from 'react-redux'
import BarGraph from './BarGraph'
import CandleChart from './CandleChart'
import LineGraph from './LineGraph'

class Charts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chart: 'line'
    }
    this.changeChart = this.changeChart.bind(this)
  }

  changeChart(e, str) {
    e.preventDefault()
    this.setState({
      chart: str
    })
  }

  render() {
    const {history} = this.props

    if (history.data) {
      const {chart} = this.state
      const historyFilter = history.data
        .filter(
          data =>
            data.high &&
            data.open &&
            data.close &&
            data.marketClose &&
            data.volume &&
            data.label &&
            data.low
        )
        .slice(-20)

      return (
        <div className="room-chart">
          <div className="chart-buttons">
            <button
              className="chart-button"
              onClick={e => this.changeChart(e, 'line')}
            >
              Line
            </button>
            <button
              className="chart-button"
              onClick={e => this.changeChart(e, 'bar')}
            >
              Bar
            </button>
            <button
              className="chart-button"
              onClick={e => this.changeChart(e, 'candle')}
            >
              Candle
            </button>
          </div>
          {chart === 'line' ? (
            <LineGraph info={historyFilter} />
          ) : chart === 'bar' ? (
            <BarGraph info={historyFilter} />
          ) : chart === 'candle' ? (
            <CandleChart info={historyFilter} />
          ) : null}
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    history: state.chart.history
  }
}

export default connect(mapStateToProps)(Charts)
