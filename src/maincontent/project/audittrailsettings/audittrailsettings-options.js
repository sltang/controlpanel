import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgCheckbox from '../../../components/checkbox'
import AgRadio from '../../../components/radio'

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
    marginBottom: theme.spacing.unit,
    display: '-webkit-flex',
    '-webkit-flex-direction': 'row',
    alignItems: 'flex-end',    
  },
  formRow: {
    display:'flex', 
    alignItems:'center'
  }

});

class AuditTrailSettingsOptions extends Component {

  render() {
    const { classes, allowOwnReason, autoEnableAuditTrail, prompt } = this.props;
      return (   
        <Fragment>     
        <div className={classes.formRow}>
          <div>
              <AgCheckbox checked={allowOwnReason} disabled />
          </div>
          <label htmlFor="reason" className="col-form-label">Allow users to type their own reason</label>
        </div>

        <div className={classes.formRow}>
          <div>
              <AgCheckbox checked={autoEnableAuditTrail} disabled/>
          </div>
          <label htmlFor="auditTrail" className="col-form-label">Automatically enable audit trail</label>
        </div>


        <div>
            <div style={{display:'flex', flexDirection:'row', marginLeft:'45px', marginTop:'15px' }}>
              <AgRadio checked={prompt === 'prompt'} disabled />
              <div style={{marginLeft:'25px'}}>
                  <label htmlFor="prompt">
                    Prompt for reason when saving
                  </label>
                </div>
            </div>
          
            <div style={{display:'flex', flexDirection:'row', marginLeft:'45px', marginTop:'15px' }}>
                <AgRadio checked={prompt === 'noPrompt'} disabled />
                <div style={{marginLeft:'25px'}}>
                  <label htmlFor="noPrompt">
                    Do not prompt for reason
                  </label>
                </div>
            </div>          
        </div>         

        </Fragment>
      );
    
  }

}

AuditTrailSettingsOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuditTrailSettingsOptions);
