import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import {graphCrossStock, dynamicLine, minPrice, maxPrice} from './utils/utils'
import {XYPlot, LineMarkSeries, XAxis, YAxis, Crosshair} from 'react-vis'

export default class LineGraph extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crossHair: []
    }
  }

  render() {
    const {crossHair} = this.state
    const {info} = this.props
    const dataPoints = graphCrossStock(info)
    const minMax = dynamicLine(info)
    const low = minPrice(minMax)
    const high = maxPrice(minMax)
    return crossHair ? (
      <XYPlot
        animation
        onMouseLeave={() => {
          this.setState({crossHair: []})
        }}
        yDomain={[low.dollar * 0.998, high.dollar]}
        width={1000}
        height={400}
        xType="ordinal"
      >
        <XAxis />
        <YAxis />
        <LineMarkSeries
          style={{
            strokeWidth: '2px'
          }}
          lineStyle={{stroke: '#228B22'}}
          markStyle={{stroke: 'none'}}
          onNearestXY={(value, {index}) => {
            this.setState({crossHair: dataPoints.map(coord => coord[index])})
          }}
          data={dataPoints[0]}
          size={0}
        />
        {crossHair[0] ? (
          <Crosshair
            values={crossHair}
            titleFormat={data => ({title: 'Date', value: data[0].x})}
            itemsFormat={data => [{title: 'Price', value: data[1].y}]}
            style={{line: {backgroundColor: '#808080'}}}
          />
        ) : null}
      </XYPlot>
    ) : (
      <div>Loading</div>
    )
  }
}
