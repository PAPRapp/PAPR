import axios from 'axios'

const GET_SECTORS = "GET_SECTORS"
const GET_TICKER = "GET_TICKER"

const gotSectors = (sectors) => ({type:GET_SECTORS, sectors})

const defaultState = {
  sectors: [],
  tickers: [],
}


export const getSectors = () => {
  return async dispatch => {
    try {
      const res = await axios.get(`https://api.iextrading.com/1.0/stock/market/sector-performance`)
      // const data = res.data.filter(info => info.name)
      console.log("this is the API call", res.data)
      dispatch(gotSectors(res.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = defaultState, action) {
  switch(action.type){
    case GET_SECTORS:
      return {...state, sectors: [action.sectors]}
    default:
      return state
  }
}
