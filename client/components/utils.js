export const graphStock = tickerInfo => {
  let d = new Date()
  return tickerInfo.map(ticker => {
    if (ticker.marketAverage > 0) {
      return {
        date: d.toISOString(ticker.date),
        Stock: ticker.marketAverage
      }
    }
  })
}

export const graphInfo = tickerInfo => {
  return tickerInfo.map(ticker => {
    return {
      x: ticker.label,
      y: ticker.marketClose
    }
  })
}
