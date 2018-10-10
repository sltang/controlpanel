import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import EditProjectProperties from './editprojectproperties';
import EditProjectCDSSettings from './editprojectcdssettings';
import { withRouter } from 'react-router';
import * as projectService from '../../service/project'
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
  }
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

class EditProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let projects = projectService.getById(match.params.id);
    if (projects.length > 0) {
     this.setState({ 
        project:projects[0],
        locations:{
          methods:"C:\\CDSProjects\\Project 1\\Methods",
          sequences:"C:\\CDSProjects\\Project 1\\Sequences",
          results:"C:\\CDSProjects\\Project 1\\Results",
          sequenceTemplates:"C:\\CDSProjects\\Project 1\\Sequence Templates",
          reportTemplates:"C:\\CDSProjects\\Project 1\\Report Templates",
        }    
      });
    }
    this.handleOKClick = this.handleOKClick.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleTabChange = (event, value) => {
    this.setState({ value });
  }

  handleOKClick() {
    const { history:{ push } } = this.props;
    push('/projects');
  }

  handleCancelClick() {
    const { history:{ push }, match } = this.props;
    push('/project/view/'+match.params.id);
  }

  handleChange(event , name) {
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
    if (project === undefined) {
      return <div></div>;
    } else {
      return (  
        <Fragment>
          <div className={classes.root}>

            <div className={classes.head}>
              <div>{project.name}</div>
            </div>
            <div position="static">
              <AgTabs
                value={value}
                onChange={this.handleTabChange}
              >
                <Tab label="Properties" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
                <Tab label="CDS Settings" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
              </AgTabs>
              {value === 0 && <TabContainer><EditProjectProperties project={project} handleChange={this.handleChange} /></TabContainer>}
              {value === 1 && <TabContainer><EditProjectCDSSettings project={project} locations={locations}
                handleUpload={this.handleUpload}
                handleChange={this.handleChange} /></TabContainer>}

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

}

EditProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditProject));
