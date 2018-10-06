import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import {graphStock, dynamicLine, minPrice, maxPrice} from './utils/utils'
import {XYPlot, LineMarkSeries, XAxis, YAxis, Hint} from 'react-vis'

export default class LineGraph extends Component {
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
    const dataPoints = graphStock(info)
    const minMax = dynamicLine(info)
    const low = minPrice(minMax)
    const high = maxPrice(minMax)
    return dataPoints ? (
      <XYPlot
        animation
        yDomain={[low.dollar * 0.998, high.dollar]}
        width={1000}
        height={400}
        xType="ordinal"
      >
        <XAxis tickeLabelAngle={-70} />
        <YAxis />
        <LineMarkSeries
          style={{
            strokeWidth: '2px'
          }}
          lineStyle={{stroke: '#228B22'}}
          markStyle={{stroke: 'none'}}
          data={dataPoints}
          onValueMouseOver={this.getValue}
          onValueMouseOut={this.removeValue}
          size={0}
        />
        {value ? (
          <Hint
            value={value}
            style={{
              fontSize: 20,
              text: {
                display: 'none'
              },
              value: {
                color: 'green'
              }
            }}
          >
            <div className="rv-hint__content">{`${value.x} $${value.y}`}</div>
          </Hint>
        ) : null}
      </XYPlot>
    ) : (
      <div>Loading</div>
    )
  }
}
