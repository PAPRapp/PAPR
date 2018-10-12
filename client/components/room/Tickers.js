import React from 'react'
import {connect} from 'react-redux'
import {setStyle} from '../../store'

class Tickers extends React.Component {
  render() {
    return (
      <div id="room-tickers">
        {Object.keys(this.props.prices).map(symbol => {
          let selected = {}
          if (this.props.symbol === symbol) {
            selected = {
              opacity: 1,
              fontWeight: 'bold',
              fontSize: '16px'
            }
          }
          const {lastPrices, prices, previousStyles} = this.props
          let color = previousStyles[symbol]
          if (lastPrices[symbol]) {
            if (prices[symbol] > lastPrices[symbol]) {
              color = '#1EC851'
              this.props.setStyle(symbol, color)
            } else if (prices[symbol] < lastPrices[symbol]) {
              color = '#9a1f11'
              this.props.setStyle(symbol, color)
            }
          }
          let style = {
            ...selected,
            backgroundColor: color
          }
          return (
            <div
              className="room-ticker"
              key={symbol}
              style={style}
              onClick={() => this.props.handleChange(symbol)}
            >
              <p>
                {symbol}: ${this.props.prices[symbol].toFixed(2)}
              </p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    symbol: state.liveFeed.symbol,
    prices: state.liveFeed.prices,
    lastPrices: state.liveFeed.lastPrices,
    previousStyles: state.liveFeed.styles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setStyle: (symbol, color) => dispatch(setStyle(symbol, color))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tickers)
