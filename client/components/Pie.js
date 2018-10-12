import React, {Component} from 'react'
import {
  LabelSeries,
  Sunburst,
  makeVisFlexible,
  DiscreteColorLegend
} from 'react-vis'
import {connect} from 'react-redux'
import {fetchPortfolio} from '../store/reducers/portfolio'

const numberWithCommas = n => {
  const parts = n.toString().split('.')
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  )
}

const FlexibleSunburst = makeVisFlexible(Sunburst)

class SunBurst extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Cash',
      value: props.holdings.Cash,
      highlight: false
    }
    this.getValue = this.getValue.bind(this)
    this.removeValue = this.removeValue.bind(this)
    this.highlightValue = this.highlightValue.bind(this)
  }

  // componentDidMount() {
  //   const {holdings, prices} = this.props
  //   const data = {children: [], style: {fillOpacity: 1}}
  //   const colors = [
  //     '#00417B',
  //     '#01A3E2',
  //     '#018CC9',
  //     '#0379B1',
  //     '#016BA7',
  //     '#004E89'
  //   ]
  //   if (Object.keys(holdings).length > 0) {
  //     Object.keys(holdings).forEach((symbol, i) => {
  //       if (!data.hasOwnProperty(symbol)) {
  //         if (symbol === 'Cash') {
  //           data.children.push({
  //             name: symbol,
  //             value: (holdings[symbol] / 100).toFixed(2),
  //             hex: colors[i],
  //             style: {fillOpacity: 1}
  //           })
  //         } else {
  //           data.children.push({
  //             name: symbol,
  //             value: (prices[symbol] * holdings[symbol]).toFixed(2),
  //             hex: colors[i],
  //             style: {fillOpacity: 1}
  //           })
  //         }
  //       }
  //     })
  //     this.getValue(data.children[0])
  //   }
  // }

  getValue(value) {
    this.setState({
      value: `${numberWithCommas(value.value)}`,
      name: value.name
    })
  }

  removeValue() {
    this.setState({
      value: null,
      name: null
    })
  }

  highlightValue(highlight) {
    this.setState({
      highlight: !highlight
    })
  }

  render() {
    let {holdings, prices, data} = this.props
    const {value, name, highlight} = this.state
    // const data = {children: [], style: {fillOpacity: 1}}
    // const colors = [
    //   '#00417B',
    //   '#01A3E2',
    //   '#018CC9',
    //   '#0379B1',
    //   '#016BA7',
    //   '#004E89'
    // ]

    if (Object.keys(holdings).length > 0) {
      // Object.keys(holdings).forEach((symbol, i) => {
      //   if (!data.hasOwnProperty(symbol)) {
      //     if (symbol === 'Cash') {
      //       data.children.push({
      //         name: symbol,
      //         value: (holdings[symbol] / 100).toFixed(2),
      //         hex: colors[i],
      //         style: {fillOpacity: 1}
      //       })
      //     } else {
      //       data.children.push({
      //         name: symbol,
      //         value: (prices[symbol] * holdings[symbol]).toFixed(2),
      //         hex: colors[i],
      //         style: {fillOpacity: 1}
      //       })
      //     }
      //   }
      // })
      return (
        <div id="pie">
          <FlexibleSunburst
            width={300}
            animation
            hideRootNode
            onValueMouseOver={this.getValue}
            // onValueMouseOut={this.removeValue}
            onClick={this.highlightValue}
            // style={{
            //   stroke: highlight ? 'white' : null,
            //   strokeOpacity: 0.3,
            //   strokeWidth: 8.0
            // }}
            colorType="literal"
            getSize={d => d.value}
            getColor={d => d.hex}
            data={data}
            padAngle={0.015}
          >
            {/* <DiscreteColorLegend height={200} width={300} items={}/> */}
            {value ? (
              <LabelSeries
                data={[
                  {
                    x: 0,
                    y: 8,
                    label: `${name}`,
                    style: {
                      fontSize: '20px',
                      textAnchor: 'middle'
                    }
                  },
                  {
                    x: 0,
                    y: -17,
                    label: `$${numberWithCommas(
                      name === 'Cash'
                        ? numberWithCommas((holdings[name] / 100).toFixed(2))
                        : numberWithCommas(
                            (holdings[name] * prices[name]).toFixed(2)
                          )
                    )}`,
                    style: {
                      fontSize: '20px',
                      textAnchor: 'middle'
                    }
                  }
                ]}
              />
            ) : null}
          </FlexibleSunburst>
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    prices: state.liveFeed.prices,
    userId: state.user.currentUser,
    roomId: state.room.currentRoom.id,
    tickers: state.room.currentRoom.tickerQuery,
    portfolio: state.portfolio.portfolio,
    holdings: state.portfolio.holdings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio: (roomId, userId) => dispatch(fetchPortfolio(roomId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SunBurst)
