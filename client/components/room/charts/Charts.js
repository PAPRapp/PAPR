import React from 'react'
import {connect} from 'react-redux'
import {BarGraph, CandleChart, LineGraph} from '../../'

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
            (data.marketClose || data.close) &&
            data.volume &&
            data.label &&
            data.low
        )
        .slice(-20)

      return (
        <div id="room-charts">
          <div className="chart-buttons">
            <button
              className="chart-button"
              onClick={e => this.changeChart(e, 'line')}
            >
              Line
            </button>
            <button
              className="chart-button"
              onClick={e => this.changeChart(e, 'candle')}
            >
              Candle
            </button>
          </div>
          {chart === 'line' ? (
            <div id="top-chart">
              <LineGraph id="line-chart" info={historyFilter} />
            </div>
          ) : chart === 'candle' ? (
            <div id="top-chart">
              <CandleChart id="line-chart" info={historyFilter} />
            </div>
          ) : null}
          <div id="bottom-chart">
            <BarGraph id="bar-chart" info={historyFilter} />
          </div>
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
