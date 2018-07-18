import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import * as locationService from '../../service/location.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  },
  detailsItem: {
    paddingTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldAlign: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  menu: {
    width: 500,
  },
  defaultProjectCheck: {
    marginLeft: theme.spacing.unit * 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    marginTop: theme.spacing.unit * 5,
    justifyContent: 'flex-end'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    minWidth: 240,
  },
})

class EditLocation extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      location:{ name: '',desc: '' },
      //hasInstruments: false,
    }   
  }

  componentDidMount() {
    const { match } = this.props;
    let id = match.params.id;
    console.log(id)
    let location = locationService.getById(id);
    //let instruments = instrumentService.getInstrumentsByLocationId(id);    
    this.setState({ location: location });//, hasInstruments: instruments.length>0})
  }

  componentDidUpdate(prevProps) {   
    const { match } = this.props;
    let id = match.params.id;
    if (id !== prevProps.match.params.id) {
      let id = this.props.match.params.id;
      let location = locationService.getById(id);
      //let instruments = instrumentService.getInstrumentsByLocationId(id);
      this.setState({ location: location });//, hasInstruments: instruments.length>0})
    }
  }

  handleChange = name => event => {
    let location = this.state.location;
    location[name] = event.target.value;
    this.setState({
      location: location,
    });
  };

  handleOKClick = event => {
    const { location } = this.state;
    const { handleEditLocation } = this.props;
    locationService.update(location);
    handleEditLocation(location);    
    //push('/instruments/' + this.state.location.name);
    //push('/instruments');
  }

  handleCancelClick = event => {
    const { history:{ push } } = this.props;
    push('/instruments');
  }

  handleDelete = event => {
    const { location } = this.state;
    //const { handleDeleteLocation } = this.props;
    locationService.remove(location.id);
    //console.log('deleting location');
    //handleDeleteLocation(location.id);
    const { history:{ push } } = this.props;
    push('/instruments');
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;
    //sconsole.log(hasInstruments)
    return (
      <div>
        <div className={classes.root}>Edit {location.name}</div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={location.name ? location.name:''}
            onChange={this.handleChange('name')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="desc"
            label="Description"
            className={classes.textFieldAlign}
            value={location.desc ? location.desc:''}
            onChange={this.handleChange('desc')}
            margin="normal"
            fullWidth
          />
          
        </form>
        <div className={classes.buttons}>
            <Button variant="outlined" className={classes.button} color="primary" onClick={this.handleOKClick}>
              OK
            </Button>
            <Button variant="outlined" className={classes.button} color="secondary" onClick={this.handleCancelClick}>
              Cancel
            </Button>
            
          </div>
      </div>
    );
  }

}

EditLocation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditLocation));
/*
{!hasInstruments ? 
            <Button variant="outlined" className={classes.button} color="secondary" onClick={this.handleDelete}>
              Delete
            </Button> : ''
            }
*/
