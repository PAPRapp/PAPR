import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {getSectors, getTickers, postRoom} from '../../store'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './styles/style.css'
import AutoCompleteForm from './AutoCompleteForm'
import JoinRoomModal from './JoinRoomModal'
import {styles, createroomtheme} from './styles/Material-UI-Style'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'

class CreateRoomForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      tickers: null,
      startingCash: '',
      sector: '',
      expiration: '',
      url: '',
      open: false,

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSector = this.handleChangeSector.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeCompanies = this.handleChangeCompanies.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  async componentDidMount() {
    await this.props.getSectors()
    this.setState({
      sector: this.props.sectors.sectors[0]
    })
    this.props.getTickers(this.state.sector)
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeSector = name => event => {
    this.setState({
      [name]: event.target.value
    })
    this.props.getTickers(event.target.value)
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    let name = this.state.name
    let startingCash = this.state.startingCash
    let tickers = this.state.tickers.map(ticker => ticker.value)
    let expiration = this.state.expiration
    let user = this.props.userId
    await this.props.postRoom({name, startingCash, tickers, expiration, user})
    let slice = window.location.href.slice(0, -4)
    let invite = slice + 'rooms/join/' + this.props.slug
    this.setState({
      url: invite,
      open: true,
      name: '',
      tickers: null,
      startingCash: '',
      sector: '',
      expiration: '',
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleChangeSector = name => event => {
    this.setState({
      [name]: event.target.value
    })
    this.props.getTickers(event.target.value)
  }

  handleSubmit = async evt => {
    evt.preventDefault()
    let name = this.state.name
    let startingCash = this.state.startingCash
    let tickers = this.state.tickers.map(ticker => ticker.value)
    let expiration = this.state.expiration
    let user = this.props.userId
    await this.props.postRoom({name, startingCash, tickers, expiration, user})
    let slice = window.location.href.slice(0, -4)
    let invite = slice + 'rooms/join/' + this.props.slug
    this.setState({
      url: invite,
      open: true,
      name: '',
      tickers: null,
      startingCash: '',
      sector: '',
      expiration: '',
    })
  }

  handleChangeCompanies = name => value => {
    this.setState({
      [name]: value
    })
  }

  handleChangeCompanies = name => value => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const sectors = this.props.sectors.sectors
    const tickers = this.props.sectors.tickers
    const rendermodal = this.state.open
    const {classes} = this.props
    return (
      <div className="form-div">
      {rendermodal ? <JoinRoomModal url={this.state.url} handleClose={this.handleClose} state={this.state.open} />: null}
        <form className={classes.container} onSubmit={this.handleSubmit}>
          <MuiThemeProvider theme={createroomtheme}>
            <TextField
              id="name"
              label="Room Name"
              required
              className={classes.textField}
              InputLabelProps={{
                FormLabelClasses: {
                  root: classes.formLabelRoot,
                  focused: classes.formLabelFocused
                }
              }}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="cash"
              label="Starting Cash"
              InputProps={{
                className: classes.colorText
              }}
              required
              value={this.state.cash}
              onChange={this.handleChange('startingCash')}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              margin="normal"
            />
            <span className="expiration">
              <TextField
                id="expiration"
                label="Expiration Date"
                type="date"
                InputProps={{
                  className: classes.colorText
                }}
                required
                value={this.state.expiration}
                onChange={this.handleChange('expiration')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </span>
            <TextField
              id="sector"
              select
              required
              InputProps={{
                className: classes.colorText
              }}
              label="Market Sector"
              className={classes.textField}
              value={this.state.sector}
              onChange={this.handleChangeSector('sector')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText="Please select your sector of the market"
              margin="normal"
            >
              {sectors
                ? sectors.map(sector => {
                    return (
                      <option key={sector} value={sector}>
                        {sector}
                      </option>
                    )
                  })
                : null}
            </TextField>
          </MuiThemeProvider>
          <div className={classes.root}>
            <AutoCompleteForm
              companies={tickers}
              tickers={this.state.tickers}
              handleChangeCompanies={this.handleChangeCompanies}
            />
          </div>
          <Button type="submit" variant="contained" className={classes.button}>
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sectors: state.sectors,
    userId: state.user.currentUser,
    slug: state.rooms.slug
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSectors: () => dispatch(getSectors()),
    getTickers: sector => dispatch(getTickers(sector)),
    postRoom: data => dispatch(postRoom(data))
  }
}

CreateRoomForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CreateRoomForm)
)
