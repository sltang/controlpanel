import React, { Component, Fragment } from 'react';
import SortableList from './sortablelist';
import AgButton from '../../../components/button'


class EditAuditTrailSettingsReasons extends Component {

  render() {
    const { type, reasons, onDelete, onMoveUp,  onMoveDown, onSelect, onAddReason, 
      reasonText, onReasonTextChange, selectedIndex } = this.props;

      return (        
        <Fragment>
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="reason">Reason to be added</label>
              <input type="text" className="form-control" placeholder="Reason to add" value={reasonText[type]} onChange={e => onReasonTextChange(e, type)}/>
            </div>
              <div className="col-md-2" style={{paddingTop:'15px'}} >
              <AgButton type="primary" onClick={e => onAddReason(e, type)} value={'Add'} />
             </div>
          </div>

          <SortableList reasons={reasons} onDelete={onDelete} type={type}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onSelect={onSelect} 
              selectedIndex={selectedIndex}
          />

          
        </Fragment>
      );
    
  }

}


export default EditAuditTrailSettingsReasons;
