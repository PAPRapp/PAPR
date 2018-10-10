import React, {Component} from 'react'
import NoSsr from '@material-ui/core/NoSsr'
import Select from 'react-select'
import PropTypes from 'prop-types'
import {withStyles, createMuiTheme} from '@material-ui/core/styles'
import styles from './styles/Material-UI-Style'
import components from './autoCompleteFunctions/AutoCompleteComponents'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import './styles/style.css'

const mui = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        color: '#FFFFFF'
      }
    },
    MuiTypography: {
      colorTextSecondary: {
        color: '#FFFFFF'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#FFFFFF'
      }
    }
  },
  palette: {
    primary: {
      main: '#FFFFFF'
    }
  },
  inputSearchStyleText: {
    color: '#FFFFFF'
  }
})

class AutoCompleteForm extends Component {
  render() {
    const {classes, theme} = this.props
    const companies = this.props.companies
    const tickers = this.props.tickers
    const selectStyles = {
      input: base => ({
        ...base,
        color: '#FFFFFF',
        '& input': {
          font: 'inherit',
        }
      })
    }
    return (
      <NoSsr>
        <MuiThemeProvider theme={mui}>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              label: 'Label',
              InputLabelProps: {
                shrink: true
              }
            }}
            options={companies}
            components={components}
            value={tickers}
            onChange={this.props.handleChangeCompanies('tickers')}
            placeholder="Select multiple companies"
            isMulti
          />
        </MuiThemeProvider>
      </NoSsr>
    )
  }
}

AutoCompleteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, {withTheme: true})(AutoCompleteForm)
