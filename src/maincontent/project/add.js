import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import AddProjectProperties from './addprojectproperties';
import AddProjectCDSSettings from './addprojectcdssettings';
import { withRouter } from 'react-router';
import * as projectService from '../../service/project.js';
import AgButton from '../../components/button'
import AgTabs from '../../components/tabs'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'row',
    justifyContent: 'space-between',
    fontSize:'20px'
  },
});

function TabContainer(props) {
  return (
    <div style={{ padding: 8 * 3 }}>
      {props.children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      project: {name:'', folderPath:'', desc:'', application:true, method:'', sequences:'', results:'', sequenceTemplates:'',
        reportTemplates:'', allowPrinting:false
      },
      locations:{
        methods:'',
        sequences:'',
        results:'',
        sequenceTemplates:'',
        reportTemplates:'',
      }
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleOKClick = this.handleOKClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  handleCancelClick() {
    const { history:{ push } } = this.props;
    push('/projects');
  }

  handleOKClick() {
    const{ project } = this.state
    projectService.add(project)
    const { history:{ push } } = this.props;
    push('/projects');
  }

  handleChange(event, name) {
    const { project } = this.state
    project[name] = event.target.checked ? event.target.checked : event.target.value
    this.setState({project})
  }

  handleUpload(browseFor, filename) {
    const { locations } = this.state
    locations[browseFor] = filename
    this.setState({locations})
  }

  render() {
    const { classes } = this.props;
    const { project, value, locations } = this.state;

    return ( 
      <Fragment>
        <div className={classes.root}>
          <div className={classes.head}>Create Project</div>
          <div position="static">
            <AgTabs
              value={value}
              onChange={this.handleTabChange}
            >
              <Tab label="Properties" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
              <Tab label="CDS Settings" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
            </AgTabs>
            {value === 0 && <TabContainer><AddProjectProperties project={project} handleChange={this.handleChange} /></TabContainer>}
            {value === 1 && <TabContainer><AddProjectCDSSettings project={project} handleChange={this.handleChange}
              locations={locations}
              handleUpload={this.handleUpload}
            /></TabContainer>}
          </div>
        </div>
        <div className="fixed-footer">
          <AgButton type="primary" value="OK" onClick={this.handleOKClick} />
          <AgButton type="secondary" value="Cancel" onClick={this.handleCancelClick} />
        </div>
      </Fragment>
    );
  }
  

}

AddProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AddProject));
