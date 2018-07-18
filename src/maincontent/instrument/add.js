import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import * as dataService from '../../service/dataservice.js';

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

const types = [
  {
    value: 'Agilent GC & GC/MS Systems',
    label: 'Agilent GC & GC/MS Systems',
  },
  {
    value: 'Agilent LC & LC/MS',
    label: 'Agilent LC & LC/MS',
  },
  {
    value: 'Agilent AD System',
    label: 'Agilent AD System',
  },
  {
    value: 'Virtual Instruments',
    label: 'Virtual Instruments',
  },
]

const projects = [
  { value: '', label: 'None' },
  { value: 'Project 1', label: 'Project 1' },
  { value: 'Project 2', label: 'Project 2' },
]

class AddInstrument extends Component {

  constructor(props) {
    super(props);
    //const { match } = this.props;
    //let instruments = dataService.getById('instrument', match.params.id);    
    this.state = {
      alwaysUseDefaultProjectDisabled: true,
      instrument:{ name: '',desc: '', application: 'OpenLab CDS', controller: 'CND8074VHW', type: '', contact: '', defaultProject: '',  alwaysUseDefaultProject:false},
    }
   
  }

  componentDidMount() {
    
  }

  handleChange = name => event => {
    let instru = this.state.instrument;
    instru[name] = event.target.value || event.target.checked;
    this.setState({
      instrument: instru,
    });
  };

  handleDefaultProjectChange = event => {
    //if (event) {
      
        //this.setState({alwaysUseDefaultProject:event.target.value === 'None'})
        //this.state.instrument.project = event.target.value;
        let instrument = this.state.instrument;
        if (event.target.value === '') {
          instrument.alwaysUseDefaultProject = false;
        }
        instrument.defaultProject = event.target.value;
        this.setState({
          instrument: instrument,
          alwaysUseDefaultProjectDisabled: event.target.value === ''
        });
      //}
    //}
  };

  handleOKClick = event => {
    //console.log(this.state.instrument);
    const { history:{ push } } = this.props;
    dataService.add('instrument', this.state.instrument);
    push('/instruments');
  }

  handleCancelClick = event => {
    const { history:{ push } } = this.props;
    push('/instruments');
  }

  render() {
    const { classes } = this.props;
    const { instrument, alwaysUseDefaultProjectDisabled } = this.state;
    return (
      <div>
        <div className={classes.root}>Create Instrument</div>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={instrument.name}
            onChange={this.handleChange('name')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="desc"
            label="Description"
            className={classes.textFieldAlign}
            multiline
            rows="4"
            value={instrument.desc}
            onChange={this.handleChange('desc')}
            margin="normal"
            fullWidth
          />
          <TextField
            id="application"
            label="Application"
            className={classes.textFieldAlign}
            readOnly
            value={instrument.application}
            margin="normal"
            fullWidth
          />
           <TextField
            id="controller"
            label="Instrument controller"
            className={classes.textFieldAlign}
            readOnly
            value={instrument.controller}
            margin="normal"
            fullWidth
          />
          <TextField
            id="select-type"
            select
            label="Instrument type"  
            className={classes.textField}          
            value={instrument.type}
            onChange={this.handleChange('type')}
            SelectProps={{
              MenuProps: {
                native: 'true',
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {types.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="contact"
            label="Contact"
            className={classes.textFieldAlign}
            value={instrument.contact === undefined ? '':instrument.contact}
            onChange={this.handleChange('contact')}
            margin="normal"
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="defaultProject">Default Project</InputLabel>
            <Select
              value={instrument.defaultProject}
              onChange={this.handleDefaultProjectChange}
              inputProps={{
              name: 'Default Project',
              id: 'defaultProject',
              }}
              >
              {projects.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                disabled={alwaysUseDefaultProjectDisabled}
                checked={instrument.alwaysUseDefaultProject}
                onChange={this.handleChange('alwaysUseDefaultProject')}
                className={classes.defaultProjectCheck}
              />
            }
            label="Always use default project with this instrument"
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

AddInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AddInstrument));
