import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as instrumentService from '../../service/instrument';
import AgCheckbox from '../../components/checkbox'
import AgButton from '../../components/button'
import { types } from './add'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  }
})

class EditInstrument extends Component {

  constructor(props) {
    super(props);   
    this.state = {}
  }

  componentDidMount() {
    const { match } = this.props;
    let instruments = instrumentService.getById(match.params.id);
    let projects = instrumentService.getAll()
    let projs = projects.filter(project => project.name === instruments[0].project)
    let projectId = projs.length > 0 ? projs[0].id : ''
    this.setState({
      instrument:instruments.length > 0 ? instruments[0] : {},
      disableAlwaysUseDefaultProject: instruments.length > 0 && instruments[0].project === '',
      projects,
      projectId
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let instruments = instrumentService.getById(this.props.match.params.id);
      this.setState({
        instrument:instruments.length > 0 ? instruments[0] : {},
        disableAlwaysUseDefaultProject: instruments.length > 0 && instruments[0].project === ''
      })
    }
  }

  handleChange = name => event => {
    let instrument = this.state.instrument;
    instrument[name] = event.target.checked ? event.target.checked:event.target.value;
    this.setState({
      instrument: instrument,
    });
  };

  handleDefaultProjectChange = event => {
    this.setState({disableAlwaysUseDefaultProject:event.target.value === ''})
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
    instrumentService.save(this.state.instrument);   
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
      return (
        <div>
          <div className={classes.root}>Edit {instrument.name}</div>
          <form>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="name" placeholder="Name" value={instrument.name} onChange={this.handleChange('name')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" value={instrument.desc}
                onChange={this.handleChange('desc')}></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="application" className="col-sm-2 col-form-label">Application</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="application" placeholder="Application" value={instrument.application} onChange={this.handleChange('application')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="controller" className="col-sm-2 col-form-label">Instrument controller</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="controller" placeholder="Instrument controller" value={instrument.controller} onChange={this.handleChange('controller')} />
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
                    {types.map((type, index) => {
                      return <option key={index} value={type}>{type}</option>
                    })}
                  </select>               
                </div>
            </div>
            <div className="form-group row">
              <label htmlFor="contact" className="col-sm-2 col-form-label">Contact</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" aria-describedby="contact" placeholder="Contact" value={instrument.contact} onChange={this.handleChange('contact')} />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="type" className="col-sm-2 col-form-label">Default project</label>
              <div className="col-sm-6">
                  <select
                    className="form-control"
                    value={projectId}
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
                  disabled={this.state.disableAlwaysUseDefaultProject}
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
      } else {
       return <div></div>
      }
  }

}

EditInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditInstrument));
