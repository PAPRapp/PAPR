import React, {Component} from 'react'
import RTChart from 'react-rt-chart'
import {graphStock} from './utils'

export default class Graph extends Component {
  componentDidMount() {
    setInterval(() => this.forceUpdate(), 1000)
  }
  render() {
    let chart = {
      axis: {
        y: {min: 50, max: 250}
      },
      point: {
        show: true
      }
    }

    // var data = {
    //   date: new Date(),
    //   Stock: Math.random()
    // }

    const {val} = this.props
    const num = this.props.val.data
    const graphData = graphStock(num)

    const points = graphData.map(graph => {
      console.log("THIS IS GRAPHY", graph)
    })

    return (
      <div>
        <RTChart chart={chart} fields={['Stock']} data={graphData.pop()} />
      </div>
    )
  }
}
