import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSectors} from '../store/sectors'

class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      tickers: '',
      users: '',
      cash: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount(){
    await this.props.getSectors()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="CreatrRoomDiv">
        {/* <div className="fourmCard">
          <form className="fourm" onSubmit={this.handleSubmit}>
            <span>Room Name</span>
            <input  onChange={this.handleChange("name")} value={this.state.name} className="inputStyle" type="text" name="name" id="name"  />
            <span>Company Tickers</span>
            <input onChange={this.handleChange("ticker")} value={this.state.tickers}  className="inputStyle" type="text" name="tickers"/>
            <span>Users</span>
            <input onChange={this.handleChange("ticker")} className="inputStyle" type="text" name="users" value="" />
            <span>Starting Cash</span>
            <input className="inputStyle" type="text" name="cash" value="" />
            <input className="inputStyle" type="submit" value="Submit" />
          </form>
          </div> */}
      </div>
    )
  }
}

const mapState = (state) => {
 return{
   sectors: state.sectors
 }
}

const mapDispatch = (dispatch) => {
  return{
    getSectors: () => dispatch(getSectors)
  }
}

export default connect(mapState, mapDispatch)(CreateRoom)
