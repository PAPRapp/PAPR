import React, {Component} from 'react'
import axios from 'axios'
import  {
  XYPlot,
  LineMarkSeries
} from 'react-vis'

export default class Crypto extends Component {
  constructor(props) {
    super(props)

    this.state = {
      crypto: []
    }
  }

  async componentDidMount() {
    const response = await axios.get('https://api.iextrading.com/1.0/stock/market/crypto')
    this.setState({
      crypto: response.data
    })
  }

  render() {
    const { crypto } = this.state
    return crypto.length ? (
      <div></div>
    ) : <div>Loading</div>
  }
}
