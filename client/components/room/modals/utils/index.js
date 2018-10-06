/* Utility function that gets the user's current holdings for that room and
returns it in an object ex. {IBM: 30, GE: 45, FB: 4} */
export const getHoldings = (portfolio, transactions) => {
  //Initializes the holdings object that will be returned
  const holdings = {}
  //Attaches the user's cash to the holdings object (cash is a field in portfolio)
  holdings.cash = portfolio.cash
  //Maps over the transactions defined above
  transactions.forEach(element => {
    /*If the ticker does not currently exist on the holdings object, add it and either
    set the initial value to a negative or a positive dependent on whether or not the
    transaction was a sell order or a buy order*/
    if (!holdings[element.ticker]) {
      holdings[element.ticker] =
        element.type === 'buy' ? element.qty : -element.qty
    } else if (element.type === 'buy') {
      /*If the ticker exists, and the order is a buy, add the quantity to the
      value associated with that key*/
      holdings[element.ticker] += element.qty
    } else {
      /*If the ticker exists, and the order is a sell, subtract the quantity
      from the value associated with that key*/
      holdings[element.ticker] -= element.qty
    }
  })
  return holdings
}
