import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddProjectProperties from './addprojectproperties';
import AddProjectCDSSettings from './addprojectcdssettings';
import { withRouter } from 'react-router';
import * as dataService from '../../service/dataservice.js';

const styles = theme => ({
  root: {

    flexGrow: 1,

  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: theme.spacing.unit * 2,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'row',
    justifyContent: 'space-between',
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
      }
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let projects = dataService.getById('project', match.params.id);
    if (projects.length > 0) {
     this.setState({ project:projects[0] });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleCancelClick = event => {
    const { history:{ push }, match } = this.props;
    push('/project/view/'+match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { project, value } = this.state;

    return (        
      <div className={classes.root}>
        <div className={classes.head}>Create Project</div>
        <div position="static">
        <Tabs
            value={value}
            onChange={this.handleChange}
          >
            <Tab label="Properties" />
            <Tab label="CDS Settings" />
        </Tabs>
        {value === 0 && <TabContainer><AddProjectProperties project={project} /></TabContainer>}
        {value === 1 && <TabContainer><AddProjectCDSSettings project={project} /></TabContainer>}
        </div>
      </div>
    );
  }
  

}

AddProject.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AddProject));
/*
        {value === 0 && <TabContainer><AddProjectProperties project={project} /></TabContainer>}
        {value === 1 && <TabContainer><EditProjectCDSSettings project={project} /></TabContainer>}
        */