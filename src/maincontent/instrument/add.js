import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as instrumentService from '../../service/instrument';
import * as projectService from '../../service/project';
import AgCheckbox from '../../components/checkbox'
import AgButton from '../../components/button'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
})

export const types = ['Agilent GC & GC/MS Systems', 'Agilent LC & LC/MS', 'Agilent AD System','Virtual Instruments']

class AddInstrument extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      alwaysUseDefaultProjectDisabled: true,
      instrument:{},// name: '',desc: '', application: 'OpenLab CDS', controller: 'CND8074VHW', type: '', contact: '', defaultProject: '',  alwaysUseDefaultProject:false},
      projects: []
    }
   
  }

  componentDidMount() {
    let projects = projectService.getAll()
    this.setState({projects})    
  }

  handleChange = name => event => {
    let instru = this.state.instrument;
    instru[name] = event.target.value || event.target.checked;
    this.setState({
      instrument: instru,
    });
  };

  handleDefaultProjectChange = event => {
    let instrument = this.state.instrument;
    if (event.target.value === '') {
      instrument.alwaysUseDefaultProject = false;
    }
    instrument.defaultProject = event.target.value;
    this.setState({
      instrument: instrument,
      alwaysUseDefaultProjectDisabled: event.target.value === ''
    });
  };

  handleOKClick = event => {
    const { history:{ push } } = this.props;
    instrumentService.add(this.state.instrument);
    push('/instruments');
  }

  handleCancelClick = event => {
    const { history:{ push } } = this.props;
    push('/instruments');
  }

  render() {
    const { classes } = this.props;
    const { instrument, alwaysUseDefaultProjectDisabled, projects } = this.state;
    return (
      <div>
        <div className={classes.root}>Create Instrument</div>
        <form>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="name" placeholder="Name" value={instrument.name ? instrument.name:''} onChange={this.handleChange('name')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" value={instrument.desc ? instrument.desc:''}
                onChange={this.handleChange('desc')}></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="application" className="col-sm-2 col-form-label">Application</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="application" placeholder="Application" value={instrument.application ? instrument.application:''} onChange={this.handleChange('application')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="controller" className="col-sm-2 col-form-label">Instrument controller</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="controller" placeholder="Instrument controller" value={instrument.controller ? instrument.controller:''} onChange={this.handleChange('controller')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="type" className="col-sm-2 col-form-label">Instrument type</label>
              <div className="col-sm-10">
                  <select
                    className="form-control"
                    value={instrument.type}
                    onChange={this.handleChange('type')}
                  >
                  <option value={''}></option>
                    {types.map((type, index) => {
                      return <option key={index} value={type}>{type}</option>
                    })}
                  </select>               
                </div>
            </div>
            <div className="form-group row">
              <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="contact" placeholder="Contact" value={instrument.contact ? instrument.contact:''} onChange={this.handleChange('contact')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="type" className="col-sm-2 col-form-label">Default project</label>
              <div className="col-sm-6">
                  <select
                    className="form-control"
                    value={instrument.defaultProject ? instrument.defaultProject:''}
                    onChange={this.handleDefaultProjectChange}
                  >
                    <option value={''}>None</option>
                    {projects.map(project => {
                      return <option key={project.id} value={project.id}>{project.name}</option>
                    })}
                  </select>               
              </div>
              <div className="col-sm-4">
                <AgCheckbox
                  disabled={alwaysUseDefaultProjectDisabled}
                  checked={instrument.alwaysUseDefaultProject ? instrument.alwaysUseDefaultProject : false}
                  onChange={this.handleChange('alwaysUseDefaultProject')}       
                />
                <label htmlFor="alwaysUseDefaultProject">always use default project with this instrument</label>
                </div>
            </div>
            <div className="form-group row">
              <div className="col-auto mr-auto">
              </div>
              <div className="col-auto">
                <AgButton type="primary" onClick={this.handleOKClick} value="OK" />
                <AgButton type="secondary" onClick={this.handleCancelClick} value="Cancel" />
              </div>
            </div>            
          </form>
      </div>
    );
  }

}

AddInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AddInstrument));
