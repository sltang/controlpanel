import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuditTrailSettingsReasons from './audittrailsettings-reasons'
import AuditTrailSettingsOptions from './audittrailsettings-options'

const styles = theme => ({ 
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit*4}px`,
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

class AuditTrailSettingsSequence extends Component {

  render() {
    const { classes, reasons, allowOwnReason, autoEnableAuditTrail, prompt  } = this.props;
    
      return (        
        <div className={classes.root}>   
          <AuditTrailSettingsReasons reasons={reasons} readOnly={true} /> 
          <AuditTrailSettingsOptions allowOwnReason={allowOwnReason} autoEnableAuditTrail={autoEnableAuditTrail} prompt={prompt} />       
        </div>
      );
    
  }

}

AuditTrailSettingsSequence.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailSettingsSequence);
