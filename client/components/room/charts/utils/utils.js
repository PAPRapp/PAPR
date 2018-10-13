// conditional date utility function for ydomain a-low Candle Chart
export const dateChange = pointA => {
  const currentDay = new Date()
  const today = currentDay.getDay()
  const weekHour = currentDay.getHours()
  if(today === 6 || today === 0 || weekHour >= 20 || weekHour < 9) {
    return pointA * 0.95
  } else {
    return pointA * 0.998
  }
 }


//dynamic pie chart data update util function
export const dynamicPiePrices = (portfolio, prices) => {
  const dynamicPortfolio = {}
  const cash = portfolio.CASH
  prices.forEach(price => {
    if(portfolio[price.symbol]) {
      dynamicPortfolio[price.symbol] = price.lastSalePrice * portfolio[price.symbol]
    }
  })
  dynamicPortfolio.CASH = cash
  return dynamicPortfolio
}


//pie chart data util function
export const pieTreeData = tickerInfo => {
  const initialData = {children: []}
  return tickerInfo.map(ticker => {
    initialData.children.push(ticker)
  })
}

//dynamic pie chart color util function
export const pieChartColorData = tickerInfo => {
  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7
    )
  return tickerInfo.map(ticker => {
    return {
      name: ticker.name,
      hex: randomColor(),
      value: ticker.price
    }
  })
}

//pie filtering out null data util function
export const piePriceFilter = values => {
  return values.filter(value => {
    if(value !== undefined) {
      return value.price
    }
  })
}


//piechart setting/matching initial values util function
export const pieValue = (tickers, selected) => {
  return tickers.children.map(ticker => {
    if(ticker.name === selected) {
      return {
        price: ticker.value
      }
    }
  })
}

//pie chart update util function
export const updateData = (data, key) => {
  if(data.children) {
    data.children.map(child => updateData(child, key))
  }
  data.style = {
    fillOpacity: key && !key[data.name] ? 0.2 : 1
  }

  return data
}

// candle stick creationg util function
export const monthlyQuad = tickerInfo => {
  return tickerInfo.map((ticker, i) => {
    const point = (ticker.open + ticker.close) / 2
    if (ticker !== undefined) {
      return {
        x: ticker.label,
        y: point,
        yHigh: ticker.high,
        yOpen: ticker.open,
        yClose: ticker.marketClose || ticker.close,
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
      dollar: ticker.marketClose || ticker.close
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
      y: ticker.marketClose || ticker.close
    }
  })
}

//line graph utility function for plotting data w/cross hair
export const graphCrossStock = tickerInfo => {
  const crossData = []
  return tickerInfo.map(ticker => {
    if (ticker.marketClose || ticker.close) {
      crossData.push({
        x: ticker.label,
        y: ticker.marketClose || ticker.close
      })
    }
    return crossData
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

