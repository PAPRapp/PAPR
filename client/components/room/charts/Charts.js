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
              onClick={e => this.changeChart(e, 'candle')}
            >
              Candle
            </button>
          </div>
          {chart === 'line' ? (
            <div>
              <LineGraph info={historyFilter} />
              <BarGraph info={historyFilter} />
            </div>
          ) : chart === 'candle' ? (
            <div>
              <CandleChart info={historyFilter} />
              <BarGraph info={historyFilter} />
            </div>
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
