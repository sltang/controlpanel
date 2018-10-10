import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import AuditTrailSettingsAll from './audittrailsettings/audittrailsettings-all';
import AuditTrailSettingsMethod from './audittrailsettings/audittrailsettings-method';
import AuditTrailSettingsSequence from './audittrailsettings/audittrailsettings-sequence';
import AuditTrailSettingsResults from './audittrailsettings/audittrailsettings-results';
import AgTabs from '../../components/tabs'
//mport AgTab from '../../components/tabs'

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit*5,
    flexGrow: 1,
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

class AuditTrailSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      reasons: {
        all:[],
        method:[],
        sequence:[],
        results:[]
      },
      allowOwnReason:{
        all:false,
        method:false,
        sequence:false,
        results:false
      },
      autoEnableAuditTrail:{
        all:false,
        method:false,
        sequence:false,
        results:false
      }, 
      prompt:{
        all:false,
        method:false,
        sequence:false,
        results:false
      }
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, project } = this.props;
    const { value, reasons, allowOwnReason, autoEnableAuditTrail, prompt } = this.state;
    
      return (        
        <div className={classes.root}>
          <div position="static">
            <AgTabs onChange={this.handleChange} value={value}>
              <Tab label="All" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
              <Tab label="Method" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
              <Tab label="Sequence" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
              <Tab label="Results" disableRipple style={{ textTransform: 'none', outline: 'none', backgroundColor: '#e1e3e5' }} />
            </AgTabs>
            {value === 0 && <TabContainer><AuditTrailSettingsAll project={project} reasons={reasons.all} allowOwnReason={allowOwnReason.all} /></TabContainer>}
            {value === 1 && <TabContainer><AuditTrailSettingsMethod project={project} reasons={reasons.method}
              autoEnableAuditTrail={autoEnableAuditTrail.method}
              prompt={prompt.method}
              allowOwnReason={allowOwnReason.method} /></TabContainer>}
            {value === 2 && <TabContainer><AuditTrailSettingsSequence project={project} reasons={reasons.sequence}
              autoEnableAuditTrail={autoEnableAuditTrail.sequence}
              prompt={prompt.sequence}
              allowOwnReason={allowOwnReason.sequence} /></TabContainer>}
            {value === 3 && <TabContainer><AuditTrailSettingsResults project={project} reasons={reasons.results}
              autoEnableAuditTrail={autoEnableAuditTrail.results}
              prompt={prompt.results}
              allowOwnReason={allowOwnReason.results} /></TabContainer>}
          </div>
        </div>
      );
    
  }

}

AuditTrailSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailSettings);
