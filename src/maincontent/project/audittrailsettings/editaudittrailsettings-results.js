import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditAuditTrailSettingsReasons from './editaudittrailsettings-reasons'
import EditAuditTrailSettingsOptions from './editaudittrailsettings-options'

const styles = theme => ({ 
  root: {
    flexGrow: 1,
  }
});

class EditAuditTrailSettingsResults extends Component {

  render() {
    const { classes, type, reasonText, onReasonTextChange, reasons, allowOwnReason, onDelete, onMoveUp,  onMoveDown, onSelect, onAddReason, 
      onAllowOwnReason, autoEnableAuditTrail, onAutoEnableAuditTrail, prompt, onPromptChange, selectedIndex, showModal, handleModal, dialog } = this.props;
  
    return (        
      <div className={classes.root}>
        <EditAuditTrailSettingsReasons type={type} reasons={reasons} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onSelect={onSelect} 
        onAddReason={onAddReason} reasonText={reasonText} onReasonTextChange={onReasonTextChange} selectedIndex={selectedIndex}/>
        <EditAuditTrailSettingsOptions type={type} allowOwnReason={allowOwnReason} onAllowOwnReason={onAllowOwnReason} autoEnableAuditTrail={autoEnableAuditTrail}
        onAutoEnableAuditTrail={onAutoEnableAuditTrail} prompt={prompt} onPromptChange={onPromptChange} showModal={showModal} 
        handleModal={handleModal} dialog={dialog} />               
        </div>
      );
    
  }

}

EditAuditTrailSettingsResults.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAuditTrailSettingsResults);
