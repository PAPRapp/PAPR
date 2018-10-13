import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import {volumeDate, dynamicBar, maxVol} from './utils/utils'
import {
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  Hint,
  FlexibleXYPlot
} from 'react-vis'
import {format} from 'd3-format'

export default class BarGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      useCanvas: false
    }
    this.getValue = this.getValue.bind(this)
    this.removeValue = this.removeValue.bind(this)
  }

  getValue(value) {
    this.setState({
      value,
    })
  }

  removeValue() {
    this.setState({
      value: null,
    })
  }
  render() {
    const {useCanvas, value} = this.state
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries
    const {info} = this.props
    const volumePoints = volumeDate(info)
    const minMax = dynamicBar(info)
    const high = maxVol(minMax)
    const {vol} = high

    return (
      <FlexibleXYPlot animation xType="ordinal" stackBy="y" yDomain={[0, vol]} >
        <XAxis hideTicks animation={false} />
        <YAxis
          animation
          style={{
            text: {
              fill: 'white',
              fontWeight: 200,
              fontSize: '10px',
              fontFamily: 'Helvetica'
            }
          }}
          tickFormat={tick => format('.2s')(tick)}
        />
        <BarSeries
          cluster="2015"
          colorType="literal"
          data={volumePoints}
          onValueMouseOver={this.getValue}
          onValueMouseOut={this.removeValue}
        />
        {value ? (
          <Hint value={value}>
            <div className="rv-hint__content">{`Volume: ${format('.2s')(
              value.y
            )}`}</div>
          </Hint>
        ) : null}
      </FlexibleXYPlot>

    )
  }
}
