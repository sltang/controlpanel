import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
})

const types = ['Agilent GC & GC/MS Systems', 'Agilent LC & LC/MS', 'Agilent AD System','Virtual Instruments']

// const projects = [
//   { value: 'None', label: '' },
//   { value: 'Project 1', label: 'Project 1' },
//   { value: 'Project 2', label: 'Project 2' },
// ]

class EditInstrument extends Component {

  constructor(props) {
    super(props);   
    this.state = {}
  }

  componentDidMount() {
    const { match } = this.props;
    let instruments = dataService.getById('instrument', match.params.id);
    let projects = dataService.getAll('project')
    let projs = projects.filter(project => project.name === instruments[0].project)
    let projectId = projs.length > 0 ? projs[0].id : ''
    this.setState({
      instrument:instruments.length > 0 ? instruments[0] : {},
      alwaysUseDefaultProject: instruments.length > 0 && instruments[0].project === '',
      projects,
      projectId
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let instruments = dataService.getById('instrument', this.props.match.params.id);
      this.setState({
        instrument:instruments.length > 0 ? instruments[0] : {},
        alwaysUseDefaultProject: instruments.length > 0 && instruments[0].project === ''
      })
    }
  }

  handleChange = name => event => {
    let instrument = this.state.instrument;
    instrument[name] = event.target.value;
    this.setState({
      instrument: instrument,
    });
  };

  handleDefaultProjectChange = event => {
    this.setState({alwaysUseDefaultProject:event.target.value === ''})
    let instrument = this.state.instrument;
    let projs = this.state.projects.filter(project => project.id === event.target.value)
    let projectName = projs.length > 0 ? projs[0].name : ''
    instrument.project = projectName;
    this.setState({
      instrument: instrument,
      projectId:event.target.value
    });
  };

  handleOKClick = event => {
    const { history:{ push } } = this.props;
    dataService.save('instrument',this.state.instrument);   
    push('/instruments'); 
  }

  handleCancelClick = event => {
    const { history:{ push }, match } = this.props;
    push('/instrument/view/'+match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { instrument, projects, projectId } = this.state;    
    if (instrument !== undefined) {
      //console.log(projectId)
      return (
        <div>
          <div className={classes.root}>Edit {instrument.name}</div>
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
              value={this.state.instrument.desc}
              onChange={this.handleChange('desc')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="application"
              label="Application"
              className={classes.textFieldAlign}
              readOnly
              value={this.state.instrument.application}
              margin="normal"
              fullWidth
            />
            <TextField
              id="controller"
              label="Instrument controller"
              className={classes.textFieldAlign}
              readOnly
              value={this.state.instrument.controller}
              margin="normal"
              fullWidth
            />
            <TextField
              id="select-type"
              select
              label="Instrument type"  
              className={classes.textField}          
              value={this.state.instrument.type}
              onChange={this.handleChange('type')}
              SelectProps={{
                MenuProps: {
                  native: 'true',
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              {types.map((type, index) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="contact"
              label="Contact"
              className={classes.textFieldAlign}
              value={this.state.instrument.contact === undefined ? '':this.state.instrument.contact}
              onChange={this.handleChange('contact')}
              margin="normal"
              fullWidth
            />
            <TextField
              id="select-project"
              select
              label="Default project"            
              value={projectId}
              className={classes.textField}
              onChange={this.handleDefaultProjectChange}
              SelectProps={{
                MenuProps: {
                  native: 'true',
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              <MenuItem value={''}>None</MenuItem>
              {projects.map(project => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={this.state.alwaysUseDefaultProject}
                  checked={this.state.defaultProjectChecked}
                  onChange={this.handleChange('defaultProject')}
                  value="defaultProjectChecked"
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
      } else {
       return <div></div>
      }
  }

}

EditInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditInstrument));
