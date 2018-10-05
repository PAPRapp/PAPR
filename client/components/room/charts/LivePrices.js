import React from 'react'
import {connect} from 'react-redux'

class LivePrices extends React.Component {
  render() {
    return (
      <div>
        {this.props.currentPrices
          ? Object.keys(this.props.currentPrices).map((symbol, i) => {
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor:
                      this.props.currentPrices[symbol] >
                      this.props.lastPrices[symbol]
                        ? '#1EC851'
                        : '#9a1f11',
                    margin: '5px 0px 5px 0px'
                  }}
                >
                  <p style={{margin: '5px'}}>{symbol}</p>
                  <p style={{margin: '5px'}}>
                    {this.props.currentPrices[symbol].toFixed(2)}
                  </p>
                </div>
              )
            })
          : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPrices: state.liveFeed.prices,
    lastPrices: state.liveFeed.lastPrices
  }
}

export default connect(mapStateToProps)(LivePrices)
