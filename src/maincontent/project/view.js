import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import ProjectProperties from './projectproperties';
import ProjectCDSSettings from './projectcdssettings';
import { withRouter } from 'react-router';
import * as projectService from '../../service/project';
import AgTabs from '../../components/tabs'
import AgButton from '../../components/button'

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
    fontSize: '20px'
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

class ViewProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleCopyClick = this.handleCopyClick.bind(this)
  }

  componentDidMount() {
    const { match } = this.props;
    let id = match.params.id;
    let projects;
    if (isNaN(id)) {
      projects = projectService.getByName(match.params.id);
    } else {
      projects = projectService.getById(match.params.id);
    }
    if (projects.length > 0) {
      this.setState({ project:projects[0] });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let projects;
      let id = this.props.match.params.id;
      if (isNaN(id)) {
        projects = projectService.getByName(id);
      } else {
        projects = projectService.getById(id);
      }
      if (projects.length > 0) {
        this.setState({ project:projects[0] });
      }
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleEditClick = event => {
    const { history:{ push }, match } = this.props;
    push('/project/edit/'+match.params.id);
  }

  handleCopyClick() {
    const { history:{ push }, match } = this.props;
    push('/project/copy/'+match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { project, value } = this.state;
    if (project === undefined) {
      return <div></div>;
    } else {
      return (        
        <div className={classes.root}>
          <div className={classes.head}>
            <div>{project.name}</div>
            <div>
              <AgButton type="primary" value="Edit" onClick={this.handleEditClick} />
              <AgButton type="primary" value="Copy" onClick={this.handleCopyClick} />
            </div>
          </div>
         <div position="static">
         <AgTabs onChange={this.handleChange} value={value}>        
            <Tab label="Properties" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}} />
            <Tab label="CDS Settings" disableRipple style={{textTransform:'none', outline:'none', backgroundColor:'#e1e3e5'}} />
         </AgTabs>
          {value === 0 && <TabContainer><ProjectProperties project={project} /></TabContainer>}
          {value === 1 && <TabContainer><ProjectCDSSettings project={project} /></TabContainer>}
          </div>
        </div>
      );
    }
  }

}

ViewProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ViewProject));
