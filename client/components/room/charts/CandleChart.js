import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import CandleStick from './utils/CandleFunc'
import {XAxis, YAxis, FlexibleXYPlot, Hint} from 'react-vis'
import {monthlyQuad, dynamic, minPoint, maxPoint} from './utils/utils'

export default class CandleChart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: null
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
    const {value} = this.state
    const {info} = this.props
    const candlePoints = monthlyQuad(info)
    const minMax = dynamic(info)
    const low = minPoint(minMax)
    const high = maxPoint(minMax)
    const {a} = low
    const {b} = high

    return (
      <FlexibleXYPlot animation yDomain={[a * 0.998, b]} xType="ordinal">
        <XAxis
          style={{
            text: {
              fill: 'white',
              fontWeight: 200,
              fontSize: '10px',
              fontFamily: 'Helvetica'
            }
          }}
        />
        <YAxis
          style={{
            text: {
              fill: 'white',
              fontWeight: 200,
              fontSize: '10px',
              fontFamily: 'Helvetica'
            }
          }}
        />
        <CandleStick
          colorType="literal"
          opacityType="literal"
          stroke="#808080"
          data={candlePoints}
          onValueMouseOver={this.getValue}
          onValueMouseOut={this.removeValue}
        />
        {value ? (
          <Hint value={value}>
            <div className="rv-hint__content">
              {`High: ${value.yHigh} Open: ${value.yOpen} Close: ${
                value.yClose
              } Low: ${value.yLow}`}
            </div>
          </Hint>
        ) : null}
      </FlexibleXYPlot>

    )
  }
}
