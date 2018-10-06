export const monthlyQuad = tickerInfo => {
  return tickerInfo.map((ticker, i) => {
    const point = (ticker.open + ticker.close) / 2
    if (ticker !== undefined) {
      return {
        x: ticker.label,
        y: point,
        yHigh: ticker.high,
        yOpen: ticker.open,
        yClose: ticker.close,
        yLow: ticker.low,
        color:
          i > 1
            ? ticker.close > tickerInfo[i - 1].close ? '#1EC851' : '#9a1f11'
            : '#1EC851'
      }
    }
  })
}

//price points util function for line graph
export const dynamicLine = tickerInfo => {
  return tickerInfo.map(ticker => {
    return {
      dollar: ticker.marketClose
    }
  })
}

//max price util function for line graph
export const maxPrice = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.dollar > curr.dollar ? prev : curr
  })
}

//min price util function for line graph
export const minPrice = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.dollar < curr.dollar ? prev : curr
  })
}

//volume points util function for bar graph
export const dynamicBar = tickerInfo => {
  return tickerInfo.map(ticker => {
    return {
      vol: ticker.volume
    }
  })
}

//min volume util function for bar graph
export const minVol = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.vol < curr.vol ? prev : curr
  })
}

//max volume util function for bar graph
export const maxVol = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.vol > curr.vol ? prev : curr
  })
}

// x, y coordinates util function for candle stick chart
export const dynamic = tickerInfo => {
  return tickerInfo.map(ticker => {
    if (ticker.low && ticker.high) {
      return {
        a: ticker.low,
        b: ticker.high
      }
    }
  })
}

//min val util function for ydomain candle chart
export const minPoint = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.a < curr.a ? prev : curr
  })
}

//max val util function for ydomain candle chart
export const maxPoint = tickerPoints => {
  return tickerPoints.reduce((prev, curr) => {
    return prev.b > curr.b ? prev : curr
  })
}

//util function to convert date to ISO
export const graphIso = tickerInfo => {
  let d = new Date()
  return tickerInfo.map(ticker => {
    return {
      date: d.toISOString(ticker.date),
      AAPL: ticker.close
    }
  })
}

export const graphInfo = tickerInfo => {
  return tickerInfo.data.map(ticker => {
    return {
      x: ticker.label,
      y: ticker.marketClose
    }
  })
}

//line graph utility function for plotting data
export const graphStock = tickerInfo => {
  // let d = new Date();
  return tickerInfo.map(ticker => {
    if (ticker.close) {
      return {
        // date: d.toISOString(ticker.date),
        x: ticker.label,
        y: ticker.close
      }
    }
  })
}

//volume util func
export const volumeDate = tickerInfo => {
  return tickerInfo.map((ticker, i) => {
    if (ticker.volume !== undefined) {
      return {
        x: ticker.label,
        y: ticker.volume,
        color:
          i > 1
            ? ticker.volume > tickerInfo[i - 1].volume ? '#1EC851' : '#9a1f11'
            : '#1EC851'
      }
    }
  })
}

// trade tracker util function
export const diffTrades = trades => {
  const tradeObj = {}
}

//trade win-loss util function
export const winLoss = updatedPnl => {
  let loss = 0
  let win = 0
}
//trade PNL util function
export const pnl = (bought, sold, sellQty) => {
  let sellQtyClone = sellQty
  const boughtClone = bought
  const soldClone = sold
  let i = 0
  while (sellQtyClone > 0) {
    boughtClone[i].sold = soldClone[i].sell
    sellQtyClone--
    i++
  }
  return boughtClone
}

// total sell count util function
export const sellQty = sells => {
  return Object.keys(sells).reduce((prev, key) => {
    return prev + sells[key].sQuantity
  }, 0)
}

//trades bought util function
export const bought = tradeConfirmations => {
  return tradeConfirmations.filter(trades => trades.buy)
}

//trades sold util function
export const sold = tradeConfirmations => {
  return tradeConfirmations.filter(trades => trades.sell)
}

export const yAxis = {
  axis: {
    y: {
      min: 0,
      max: 200
    }
  }
}
