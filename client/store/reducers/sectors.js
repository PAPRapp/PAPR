import axios from 'axios'

const GET_SECTORS = "GET_SECTORS"
const GET_TICKER = "GET_TICKER"

const gotSectors = (sectors) => ({type:GET_SECTORS, sectors})

const defaultState = {
  sectors: [],
  tickers: [],
}


const getTicker = tickers => ({type: GET_TICKER, tickers});

export const getSectors = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`https://api.iextrading.com/1.0/stock/market/sector-performance`)
      const filterData = res.data.map(info => info.name)
      dispatch(gotSectors(filterData))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getTickers = (sector) =>{
  const params = sector
  console.log(params)
  return async dispatch =>{
   try {
     const res = await axios.get(`https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=${params}`)
     dispatch(getTicker(res.data));
   } catch (error) {
    console.log(error)
   }
}
}


export default function(state = defaultState, action) {
  switch(action.type){
    case GET_SECTORS:
      return {...state, sectors: action.sectors}
    case GET_TICKER:
      return {...state, tickers: action.tickers}
    default:
      return state
  }
}
