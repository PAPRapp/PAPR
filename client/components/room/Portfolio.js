import React from 'react'
import {connect} from 'react-redux'
import {Pie} from '../'

const numberWithCommas = n => {
  const parts = n.toString().split('.')
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  )
}

class Portfolio extends React.Component {
  render() {
    let totalPortfolioValue = 0
    if (Object.keys(this.props.holdings).length) {
      totalPortfolioValue = this.props.holdings.Cash / 100
      Object.keys(this.props.holdings).forEach(symbol => {
        if (symbol !== 'Cash') {
          totalPortfolioValue +=
            this.props.holdings[symbol] * this.props.prices[symbol]
        }
      })
    }
    const {holdings, prices} = this.props
    const pieData = {children: [], style: {fillOpacity: 1}}

    const colors = [
      '#00417B',
      '#01A3E2',
      '#018CC9',
      '#0379B1',
      '#016BA7',
      '#004E89'
    ]

    Object.keys(holdings).forEach((symbol, i) => {
      if (!pieData.hasOwnProperty(symbol)) {
        if (symbol === 'Cash') {
          pieData.children.push({
            name: symbol,
            value: numberWithCommas((holdings[symbol] / 100).toFixed(2)),
            hex: colors[i],
            style: {fillOpacity: 1}
          })
        } else {
          pieData.children.push({
            name: symbol,
            value: prices[symbol] * holdings[symbol],
            hex: colors[i],
            style: {fillOpacity: 1}
          })
        }
      }
    })
    return (
      <div id="portfolio">
        {Object.keys(this.props.holdings).length ? (
          <Pie id="pie" data={pieData} />
        ) : (
          <div>Loading</div>
        )}
        <div id="portfolio-text">
          <div className="portfolio-item" id="portfolio-heading">
            <b>Total Value</b>
            <p>
              {totalPortfolioValue
                ? '$' + numberWithCommas(totalPortfolioValue.toFixed(2))
                : 'LOADING'}
            </p>
          </div>
          <div className="portfolio-item">
            <b>Cash</b>
            <p>
              ${numberWithCommas((this.props.holdings.Cash / 100).toFixed(2))}
            </p>
          </div>
          {Object.keys(this.props.holdings).length
            ? Object.keys(this.props.previousStyles).map(symbol => {
                return (
                  <div className="portfolio-item" key={symbol}>
                    <div>
                      <b>{symbol}</b>
                    </div>
                    <div>
                      <p>{this.props.holdings[symbol] || 0} Shares</p>
                    </div>
                  </div>
                )
              })
            : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    holdings: state.portfolio.holdings,
    previousStyles: state.liveFeed.styles,
    prices: state.liveFeed.prices
  }
}

export default connect(mapStateToProps)(Portfolio)
