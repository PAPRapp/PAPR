import React, {Component} from 'react'
import '../../../../node_modules/react-vis/dist/style.css'
import {graphCrossStock, dynamicLine, minPrice, maxPrice} from './utils/utils'
import {
  LineMarkSeries,
  XAxis,
  YAxis,
  FlexibleXYPlot,
  Crosshair
} from 'react-vis'

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
      <FlexibleXYPlot
        animation
        onMouseLeave={() => {
          this.setState({crossHair: []})
        }}
        yDomain={[low.dollar * 0.998, high.dollar]}
        xType="ordinal"
      >
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
        <LineMarkSeries
          style={{
            strokeWidth: '2px'
          }}
          lineStyle={{stroke: '#1EC851'}}
          markStyle={{stroke: '#1EC851'}}
          data={dataPoints[0]}
          onNearestX={(value, {index}) => {
            this.setState({crossHair: dataPoints.map(coord => coord[index])})
          }}
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
      </FlexibleXYPlot>
    ) : (
      <div>Loading</div>
    )
  }
}
