import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Join extends React.Component {
  componentDidMount() {
    const hash = props.match.params.hash
    console.log('hash')
  }
  render() {
    return <h1>hey bitches</h1>
  }
}

export default withRouter(connect()(Join))
