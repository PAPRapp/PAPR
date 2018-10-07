import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import {volumeDate, dynamicBar, maxVol} from './utils/utils'
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  Hint
} from 'react-vis'
import { format } from 'd3-format'

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
      value
    })
  }

  removeValue() {
    this.setState({
      value: null
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
    //test data
    return (
      <div>
        <XYPlot
          xType="ordinal"
          stackBy="y"
          width={1000}
          height={250}
          animation
          yDomain={[0, vol]}
        >
          <XAxis hideTicks/>
          <YAxis tickFormat={tick => format('.2s')(tick)}/>
          <BarSeries
            cluster="2015"
            colorType="literal"
            data={volumePoints}
            onValueMouseOver={this.getValue}
            onValueMouseOut={this.removeValue}
          />
          {value ? (
            <Hint value={value}>
              <div className="rv-hint__content">{`Volume: ${value.y}`}</div>
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    )
  }
}
