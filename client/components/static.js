import React, {Component} from 'react'
import {graphInfo} from './utils'
import {LineChart} from 'react-easy-chart'

export default class Chart extends Component {
  render() {
    const graphData = graphInfo(this.props.val.data)
    return (
      <div>
        Stock Chart
        <LineChart
          xType={'text'}
          xTicks={6000}
          yTicks={60}
          axes
          grid
          verticalGrid
          interpolate={'cardinal'}
          width={1000}
          height={500}
          data={[graphData]}
        />
      </div>
    )
  }
}
