import React, {Component} from 'react'
import {LabelSeries, Sunburst} from 'react-vis'
import {updateData, pieChartData, pieValue, piePriceFilter} from './utils'
import {connect} from 'react-redux'
import {fetchPortfolio} from '../store/portfolio'

function getKeyPath(node) {
  if (!node.parent) {
    return ['root']
  }

  return [(node.data && node.data.name) || node.name].concat(
    getKeyPath(node.parent)
  )
}

// create empty children array and push result of object
const sampleData = {
  children: [
    {
      name: 'CASH',
      hex: '#32CD32',
      value: 1000
    },
    {
      name: 'AAPL',
      hex: '#12939A',
      value: 3300
    },
    {
      name: 'IBM',
      hex: '#0e0393',
      value: 10000
    },
    {
      name: 'MSFT',
      hex: '#ad4602',
      value: 8000
    },
    {
      name: 'FB',
      hex: '#1de362',
      value: 1300
    },
    {
      name: 'TSLA',
      hex: '#b51503',
      value: 3000
    }
  ]
}

const initialData = updateData(sampleData, false)

class SunBurst extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: initialData,
      initialValue: 'CASH',
      clicked: false,
      portfolio: {}
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchPortfolio(this.props.roomId, this.props.userId)
      await this.setState({
        portfolio: this.props.portfolio
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const {clicked, data, initialValue} = this.state
    const portfolio = pieValue(sampleData, initialValue)
    const {tickers} = this.props
    console.log('THESE ARE TICKERS', tickers)
    const labelValue = piePriceFilter(portfolio)
    const {price} = labelValue
    console.log('THIS IS PRICE', price)
    const portfolioShares = this.state.portfolio
    console.log('THIS IS THE PORTFOLIO', portfolioShares)
    return (
      <div>
        <Sunburst
          animation
          hideRootNode
          onValueMouseOver={node => {
            if (clicked) {
              return
            }
            const path = getKeyPath(node).reverse()
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true
              return res
            }, {})
            this.setState({
              initialValue: path[path.length - 1],
              data: updateData(initialData, pathAsMap)
            })
          }}
          onValueMouseOut={() =>
            clicked
              ? () => {}
              : this.setState({
                  initialValue: false,
                  data: updateData(initialData, false)
                })
          }
          onValueClick={() => this.setState({clicked: !clicked})}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5'
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={300}
          width={350}
        >
          {initialValue && (
            <LabelSeries
              data={[
                {
                  x: 0,
                  y: 0,
                  label: `${initialValue} ${labelValue[0].price}`,
                  style: {
                    fontSize: '30px',
                    textAnchor: 'middle'
                  }
                }
              ]}
            />
          )}
        </Sunburst>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    tickers: state.liveFeed.prices,
    userId: state.user.currentUser,
    roomId: state.room.currentRoom.id,
    portfolio: state.portfolio.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio: (roomId, userId) => dispatch(fetchPortfolio(roomId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SunBurst)
