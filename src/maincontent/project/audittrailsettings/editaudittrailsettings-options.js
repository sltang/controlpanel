import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgCheckbox from '../../../components/checkbox'
import AgRadio from '../../../components/radio'
import AgDialog from '../../../components/dialog'

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

class EditAuditTrailSettingsOptions extends Component {

  render() {
    const { classes, type, allowOwnReason, onAllowOwnReason, autoEnableAuditTrail, onAutoEnableAuditTrail, prompt, onPromptChange, showModal, handleModal, dialog } = this.props;
        //reason to add and list reason can be extracted to a common base component
      return (   
        <Fragment>     
        <div className={classes.formRow}>
          <div>
              <AgCheckbox checked={allowOwnReason[type]} onChange={e => onAllowOwnReason(e, type)} />
          </div>
          <label htmlFor="reason" className="col-form-label">Allow users to type their own reason</label>
        </div>

        <div className={classes.formRow}>
          <div>
              <AgCheckbox checked={autoEnableAuditTrail[type]} onChange={e => handleModal(e, type)} disabled={autoEnableAuditTrail[type]}/>
          </div>
          <label htmlFor="auditTrail" className="col-form-label">Automatically enable audit trail</label>
        </div>


        <div>
            <div style={{display:'flex', flexDirection:'row', marginLeft:'45px', marginTop:'15px' }}>
              <AgRadio checked={prompt === 'prompt'} onChange={e => onPromptChange(e, type, 'prompt')} disabled={!autoEnableAuditTrail[type]}/>
              <div style={{marginLeft:'25px'}}>
                  <label htmlFor="prompt">
                    Prompt for reason when saving
                  </label>
                </div>
            </div>
          
            <div style={{display:'flex', flexDirection:'row', marginLeft:'45px', marginTop:'15px' }}>
                <AgRadio checked={prompt === 'noPrompt'} onChange={e => onPromptChange(e, type, 'noPrompt')} disabled={!autoEnableAuditTrail[type]}/>
                <div style={{marginLeft:'25px'}}>
                  <label htmlFor="noPrompt">
                    Do not prompt for reason
                  </label>
                </div>
            </div>          
        </div>

        <AgDialog showModal={showModal} handleCancel={e => handleModal(e, type)} 
        dialog={dialog}
        handleOk={e => {handleModal(e, type); onAutoEnableAuditTrail(e, type)}}/> 
          

        </Fragment>
      );
    
  }

}

EditAuditTrailSettingsOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAuditTrailSettingsOptions);
