import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AuditTrailingSettingsAll from './audittrailsettings/audittrailsetting-all';
import AuditTrailingSettingsMethod from './audittrailsettings/audittrailsetting-method';
import AuditTrailingSettingsSequence from './audittrailsettings/audittrailsettings-sequence';
import AuditTrailingSettingsResults from './audittrailsettings/audittrailsettings-results';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit*5,
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
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing.unit * 2,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'column-reverse',
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

class AuditTrailingSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount() {

  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, project } = this.props;
    const { value } = this.state;
    
      return (        
        <div className={classes.root}>
         <div position="static">
          <Tabs
              value={value}
              onChange={this.handleChange}
            >
              <Tab label="All" />
              <Tab label="Method" />
              <Tab label="Sequence" />
              <Tab label="Results" />
          </Tabs>
          {value === 0 && <TabContainer><AuditTrailingSettingsAll project={project} /></TabContainer>}
          {value === 1 && <TabContainer><AuditTrailingSettingsMethod project={project} /></TabContainer>}
          {value === 2 && <TabContainer><AuditTrailingSettingsSequence project={project} /></TabContainer>}
          {value === 3 && <TabContainer><AuditTrailingSettingsResults project={project} /></TabContainer>}
          </div>
        </div>
      );
    
  }

}

AuditTrailingSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailingSettings);
