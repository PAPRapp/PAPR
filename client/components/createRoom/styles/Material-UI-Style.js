import {emphasize} from '@material-ui/core/styles/colorManipulator'
import {createMuiTheme} from '@material-ui/core/styles'

export const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  label: {
    color: "white"
  },
  textFieldRoot:{
    color: "white"
  },
  textFieldInput:{
    color: "white"
  },
  menu: {
    width: 200
  },
  root: {
    flexGrow: 1,
    height: 250
  },
  button: {
    position: 'relative',
    left: '21vw',
    bottom: '3vh'
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
  }
})

export const createroommodalstyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: "none",
    width: theme.spacing.unit * 50,
    boxShadow: "none",
    padding: theme.spacing.unit * 4
  }
})

export const joinroommodalstyles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: "#394b59",
    display: 'flex',
    width: '50vw',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    justifyContent: "center"
  }
})


export const createroomtheme = createMuiTheme({
  multilineColor: {
    color: 'white'
  },
  overrides: {
    MuiFormLabel: {
      root: {
        color: '#FFFFFF',
        '&$focused': {
          color: '#FFFFFF'
        }
      },
      focused: {
        '&$focused': {
          color: '#FFFFFF'
        }
      }
    },
    MuiInputBase: {
      root: {
        color: '#FFFFFF'
      }
    },
    MuiFormHelperText: {
      root: {
        color: '#FFFFFF'
      }
    },
    MuiInput: {
      underline: {
        '&:after': {
          borderBottom: '2px solid #FFFFFF'
        }
      }
    }
  }
})

export const autocompleteformtheme = createMuiTheme({
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

