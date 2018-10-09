import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {getSectors, getTickers, postRoom} from '../../store/'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import {emphasize} from '@material-ui/core/styles/colorManipulator'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import classNames from 'classnames'
import Select from 'react-select'
import Button from '@material-ui/core/Button'
import './style.css'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  button: {
    position: "relative",
    left: '21vw',
    bottom: '3vh'
  }
})
function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function inputComponent({inputRef, ...props}) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
}

class CreateRoom extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      tickers: null,
      startingCash: '',
      sector: '',
      expiration: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeSector = this.handleChangeSector.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getSectors()
    this.setState({
      sector: this.props.sectors.sectors[0]
    })
    this.props.getTickers(this.state.sector)
  }

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

  handleChangeTickers = name => value => {
    this.setState({
      [name]: value
    })
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
    alert('Send out this link to invite users:\n' + invite)
  }

  render() {
    const sectors = this.props.sectors.sectors
    const {classes, theme} = this.props
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit'
        }
      })
    }
    return (
      <div className="form-wrapper">
        <div className="form-div">
          <form className={classes.container} onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              label="Room Name"
              required
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
            <TextField
              id="cash"
              label="Starting Cash"
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
              <TextField
                id="expiration"
                label="Expiration Date"
                type="date"
                required
                value={this.state.expiration}
                onChange={this.handleChange('expiration')}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
              />
            <TextField
              id="sector"
              select
              required
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
            <div className={classes.root}>
              <NoSsr>
                <Select
                  classes={classes}
                  styles={selectStyles}
                  textFieldProps={{
                    label: 'Label',
                    InputLabelProps: {
                      shrink: true
                    }
                  }}
                  options={this.props.sectors.tickers}
                  components={components}
                  value={this.state.multi}
                  onChange={this.handleChangeTickers('tickers')}
                  placeholder="Select multiple companies"
                  isMulti
                />
              </NoSsr>
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
        </div>
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

CreateRoom.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles, {withTheme: true})(CreateRoom)
)
