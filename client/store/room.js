import axios from 'axios'

const GET_ROOM = "GET_ROOM"

const gotRooms = () => ({type: GET_ROOM})

const defaultRooms = {
  history:{},
  companies:['ibm','appl','tsla'],
}
