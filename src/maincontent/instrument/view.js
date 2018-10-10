import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import { withRouter } from 'react-router';
import ActivityLogTable from './activitylogtable';
import * as instrumentService from '../../service/instrument';
import * as projectService from '../../service/project';
import AgButton from '../../components/button'
import classNames from 'classnames'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 2,
    fontSize: '20px'
  },
  start: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4,
    fontSize:'1rem'
  },
  button: {
    margin: theme.spacing.unit,
    width: '140px'
  },
  activityLog: {
    marginLeft: theme.spacing.unit * 3,
  },
  collapseExpandIcon: {
    fontSize: '18px',
  },
  formRow:{
    margin:'10px 10px 10px 64px'
  }
});

class ViewInstrument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      projectId: 1,
      projectName: '',
      selectedProjectName: '',
      projects: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let instruments = instrumentService.getById(match.params.id);
    let projects = projectService.getAll()
    if (instruments.length > 0) {
      this.setState({ data:instruments[0], projects, projectName:instruments[0].project});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let instruments = instrumentService.getById(this.props.match.params.id);
      if (instruments.length > 0) {
        this.setState({ data:instruments[0]});
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = event  => {
    if (event.target.value !== this.state.projectName) {
      this.setState({ open: true, selectedProjectName: event.target.value });
    }
  };

  handleChange = name => event => {
    this.setState({ open: true });
  };

  handleOkClose = event => {
    this.setState({ open: false, projectName: this.state.selectedProjectName});
  }

  handleStatusClick = event => {
    this.setState({ statusOpen: this.state.statusOpen === undefined || !this.state.statusOpen });
  }

  handleDetailsClick = event => {
    this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
  }

  handleActivityLogClick = event => {
    this.setState({ activityLogOpen: this.state.activityLogOpen === undefined || !this.state.activityLogOpen });
  }

  handleEditClick = event => {
    const { history:{ push }, match } = this.props;
    push('/instrument/edit/'+match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { data, activityLogOpen } = this.state;
    if (data !== undefined) {
    return (
      <div>
        <div className={classes.head}><div>{data['name']}</div><div>{data['status']}</div></div>
        <div className={classes.start}>Start Instrument</div>
        <form>
          <div className={classNames('form-group', 'row', 'align-items-center', classes.formRow)}>

            <label htmlFor="name" className="col-sm-2 col-form-label">Project</label>
            <div className="col-sm-4">
              <select
                className="form-control"
                value={this.state.projectName}
                onChange={this.handleClickOpen}
              >
                {this.state.projects.map((proj) =>
                  <option key={proj.id} value={proj.name}>{proj.name}</option>
                )}
              </select>
            </div>
            <div className="col-sm-6">
            {data['status'] === 'Not Connected' ?
              <AgButton type="secondary" value="Launch" disabled /> :
              <AgButton type="secondary" value="Launch" />}
              <AgButton type="secondary" value="Launch Offline"  />
              <AgButton type="secondary" value="Edit" onClick={this.handleEditClick}/>
              <AgButton type="secondary" value="Lock" />
            </div>
          </div>

          <div className={classes.start} onClick={this.handleStatusClick}>
            {this.state.statusOpen ? <span className={classNames('ol-icon-font', 'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Status</span> :
              <span className={classNames('ol-icon-font', 'icon-node-expanded', classes.collapseExpandIcon)}>&nbsp;Status</span>}
          </div>
          <Collapse in={!this.state.statusOpen} timeout="auto" unmountOnExit>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              Instrument has no status information
              {/* <label htmlFor="status" className="col-sm-3 col-form-label">Instrument has no status information</label> */}
            </div>
          </Collapse>            

          <div className={classes.start} onClick={this.handleDetailsClick}>            
              {this.state.detailsOpen ? <span className={classNames('ol-icon-font', 'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Details</span> :
                <span className={classNames('ol-icon-font', 'icon-node-expanded', classes.collapseExpandIcon)}>&nbsp;Details</span>}
          </div>
          <Collapse in={!this.state.detailsOpen} timeout="auto" unmountOnExit>
            <div className={classNames('form-group', 'row', 'align-items-center', classes.formRow)}>
              <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" value={data['description']}></textarea>
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Location</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="location" value={data['location']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Created by</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="createdBy" value={data['createdBy']?data['createdBy']:'SYSTEM'}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Creation date</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="created" value={data['created']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Last configured by</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="lastConfiguredBy" value={data['lastConfiguredBy']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Last configured date/time</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="lastConfigured" value={data['lastConfigured']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Last modified by</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="lastModifiedBy" value={data['lastModifiedBy']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Last modified date/time</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="lastModified" value={data['lastModified']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Application</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="application" value={data['application']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Instrument controller</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="controller" value={data['controller']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Instrument type</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="type" value={data['type']}  />
              </div>
            </div>
            <div className="form-group row" style={{margin:'10px 10px 10px 64px'}}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Id</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="id" value={data['id']}  />
              </div>
            </div>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <label htmlFor="name" className="col-sm-2 col-form-label">Owner contact information</label>
              <div className="col-sm-10">
                <input readOnly style={{backgroundColor:'#fff'}} type="text" className="form-control" aria-describedby="contact" value={data['contact']}  />
              </div>
            </div>
          </Collapse>
          <div className={classes.start} onClick={this.handleActivityLogClick}>            
              {activityLogOpen ? <span className={classNames('ol-icon-font', 'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Activity Log (last 7 days)</span> :
                <span className={classNames('ol-icon-font', 'icon-node-expanded', classes.collapseExpandIcon)}>&nbsp;Activity Log (last 7 days)</span>}
          </div>
          <Collapse in={!activityLogOpen} timeout="auto" unmountOnExit>
            <div className={classNames('form-group', 'row', classes.formRow)}>
              <div className="col-sm-12">
                <ActivityLogTable />
              </div>
            </div>
          </Collapse>         
        </form>        
      </div>
    ) } else {
      return <div></div>
    }
  }

}

ViewInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ViewInstrument));
