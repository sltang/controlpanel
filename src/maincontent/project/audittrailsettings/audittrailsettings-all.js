import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AuditTrailSettingsReasons from './audittrailsettings-reasons'
import AgCheckbox from '../../../components/checkbox'

const styles = theme => ({ 
  root: {
    flexGrow: 1,
  },
  formRow: {
    display:'flex', 
    alignItems:'center'
  }
});

class AuditTrailSettingsAll extends Component {

  render() {
    const { classes, reasons, allowOwnReason } = this.props;
    
      return (        
        <div className={classes.root}>
          <AuditTrailSettingsReasons reasons={reasons} readOnly={true} />
          <div className={classes.formRow}>
            <div>
                <AgCheckbox checked={allowOwnReason} disabled/>
            </div>
            <label htmlFor="methods" className="col-form-label">Allow users to type their own reason</label>
          </div>
        </div>
      );
    
  }

}

AuditTrailSettingsAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailSettingsAll);
