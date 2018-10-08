import React, {Component} from 'react'
import {LabelSeries, Sunburst, GradientDefs} from 'react-vis'
import {
  updateData,
  pieChartColorData,
  pieValue,
  piePriceFilter,
  dynamicPiePrices
} from './room/charts/utils/utils'
import {connect} from 'react-redux'
import {fetchPortfolio} from '../store/reducers/portfolio'

//bring functions under the class components and test it out
//grab data from state ex. this.state.portfolio and send that into dynamicPiePrices function along with live socket data from redux store
//send it into pieChartColorData to assign hex values and set up structure to push into the pieTreeData util func
//


// function getKeyPath(node) {
//   if (!node.parent) {
//     return ['root']
//   }

//   return [(node.data && node.data.name) || node.name].concat(
//     getKeyPath(node.parent)
//   )
// }

// // create empty children array and push result of object
// //will connect with live data Sunday/Monday
// const sampleData = {
//   children: [
//     {
//       name: 'CASH',
//       hex: '#66ff6e',
//       value: 1000,
//     },
//     {
//       name: 'AAPL',
//       hex: '#f96c6c',
//       value: 3300,
//     },
//     {
//       name: 'IBM',
//       hex: '#6cc3f9',
//       value: 10000,
//     },
//     {
//       name: 'MSFT',
//       hex: '#f9a26c',
//       value: 8000,
//     },
//     {
//       name: 'FB',
//       hex: '#926cf9',
//       value: 1300,
//     },
//     {
//       name: 'TSLA',
//       hex: '#f9f76c',
//       value: 3000,
//     },
//   ],
// };

// //sample portfolio
// const portfolio ={
//   'CASH': 10000,
//   'AAPL': 20,
//   'MSFT': 20,
//   'FB': 20,
//   'IBM': 20,
//   'AMD': 10
// }

// //sample socket simulation pricing
// const priceSim = [
//   {
//     symbol: 'AAPL',
//     lastSalePrice: Math.floor(Math.random() * 300)
//   },
//   {
//     symbol: 'MSFT',
//     lastSalePrice: Math.floor(Math.random() * 300)
//   },
//   {
//     symbol: 'FB',
//     lastSalePrice: Math.floor(Math.random() * 300)
//   },
//   {
//     symbol: 'IBM',
//     lastSalePrice: Math.floor(Math.random() * 300)
//   },
//   {
//     symbol: 'AMD',
//     lastSalePrice: Math.floor(Math.random() * 300)
//   },
// ]

// const dynamicPie = dynamicPiePrices(portfolio, priceSim)
// const initialData = updateData(sampleData, false)

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
  // function getKeyPath(node) {
  //   if (!node.parent) {
  //     return ['root']
  //   }

  //   return [(node.data && node.data.name) || node.name].concat(
  //     getKeyPath(node.parent)
  //   )
  // }

  // // create empty children array and push result of object
  // //will connect with live data Sunday/Monday
  // const sampleData = {
  //   children: [
  //     {
  //       name: 'CASH',
  //       hex: '#66ff6e',
  //       value: 1000,
  //     },
  //     {
  //       name: 'AAPL',
  //       hex: '#f96c6c',
  //       value: 3300,
  //     },
  //     {
  //       name: 'IBM',
  //       hex: '#6cc3f9',
  //       value: 10000,
  //     },
  //     {
  //       name: 'MSFT',
  //       hex: '#f9a26c',
  //       value: 8000,
  //     },
  //     {
  //       name: 'FB',
  //       hex: '#926cf9',
  //       value: 1300,
  //     },
  //     {
  //       name: 'TSLA',
  //       hex: '#f9f76c',
  //       value: 3000,
  //     },
  //   ],
  // };

  // //sample portfolio
  // const portfolio ={
  //   'CASH': 10000,
  //   'AAPL': 20,
  //   'MSFT': 20,
  //   'FB': 20,
  //   'IBM': 20,
  //   'AMD': 10
  // }

  // //sample socket simulation pricing
  // const priceSim = [
  //   {
  //     symbol: 'AAPL',
  //     lastSalePrice: Math.floor(Math.random() * 300)
  //   },
  //   {
  //     symbol: 'MSFT',
  //     lastSalePrice: Math.floor(Math.random() * 300)
  //   },
  //   {
  //     symbol: 'FB',
  //     lastSalePrice: Math.floor(Math.random() * 300)
  //   },
  //   {
  //     symbol: 'IBM',
  //     lastSalePrice: Math.floor(Math.random() * 300)
  //   },
  //   {
  //     symbol: 'AMD',
  //     lastSalePrice: Math.floor(Math.random() * 300)
  //   },
  // ]

  // const dynamicPie = dynamicPiePrices(portfolio, priceSim)
  // const initialData = updateData(sampleData, false)

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
      // create empty children array and push result of object
  //will connect with live data Sunday/Monday
  function getKeyPath(node) {
    if (!node.parent) {
      return ['root']
    }

    return [(node.data && node.data.name) || node.name].concat(
      getKeyPath(node.parent)
    )
  }
  const sampleData = {
    children: [
      {
        name: 'CASH',
        hex: '#66ff6e',
        value: 1000,
      },
      {
        name: 'AAPL',
        hex: '#f96c6c',
        value: 3300,
      },
      {
        name: 'IBM',
        hex: '#6cc3f9',
        value: 10000,
      },
      {
        name: 'MSFT',
        hex: '#f9a26c',
        value: 8000,
      },
      {
        name: 'FB',
        hex: '#926cf9',
        value: 1300,
      },
      {
        name: 'TSLA',
        hex: '#f9f76c',
        value: 3000,
      },
    ],
  };

  //sample portfolio
  const dumPort ={
    'CASH': 10000,
    'AAPL': 20,
    'MSFT': 20,
    'FB': 20,
    'IBM': 20,
    'AMD': 10
  }

  //sample socket simulation pricing
  const priceSim = [
    {
      symbol: 'AAPL',
      lastSalePrice: Math.floor(Math.random() * 300)
    },
    {
      symbol: 'MSFT',
      lastSalePrice: Math.floor(Math.random() * 300)
    },
    {
      symbol: 'FB',
      lastSalePrice: Math.floor(Math.random() * 300)
    },
    {
      symbol: 'IBM',
      lastSalePrice: Math.floor(Math.random() * 300)
    },
    {
      symbol: 'AMD',
      lastSalePrice: Math.floor(Math.random() * 300)
    },
  ]

  const dynamicPie = dynamicPiePrices(portfolio, priceSim)
  const initialData = updateData(sampleData, false)
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
                label: `${initialValue} $${(labelValue[0].price / 100).toFixed(2)}`,
                style: {
                  fontSize: '30px',
                  textAnchor: 'middle'
                }
              }
            ]}
          />
        )}
      </Sunburst>
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
