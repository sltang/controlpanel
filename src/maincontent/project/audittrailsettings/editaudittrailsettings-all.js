import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgCheckbox from '../../../components/checkbox'
import classNames from 'classnames'
import EditAuditTrailSettingsReasons from './editaudittrailsettings-reasons'

const styles = theme => ({ 
  root: {
    flexGrow: 1,
  }
});

class EditAuditTrailSettingsAll extends Component {

  render() {
    const { classes, type, reasons, allowOwnReason, onDelete, onMoveUp,  onMoveDown, onSelect, onAddReason, onAllowOwnReason,
      reasonText, onReasonTextChange, selectedIndex } = this.props;
      return (        
        <div className={classes.root}>
          <EditAuditTrailSettingsReasons type={type} reasons={reasons} onDelete={onDelete} onMoveUp={onMoveUp} onMoveDown={onMoveDown} onSelect={onSelect}
            onAddReason={onAddReason} reasonText={reasonText} onReasonTextChange={onReasonTextChange} selectedIndex={selectedIndex} />
          <div className={classNames('form-row', 'align-items-center')}>
            <AgCheckbox checked={allowOwnReason[type]} onChange={e => onAllowOwnReason(e, type)} />
            <label htmlFor="methods" className={classNames('col-form-label')}>Allow users to type their own reason</label>
          </div>
        </div>
      );    
  }
  
}

EditAuditTrailSettingsAll.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditAuditTrailSettingsAll);
