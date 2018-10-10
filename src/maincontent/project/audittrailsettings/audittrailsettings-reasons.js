import React, { Component } from 'react';
import SortableList from './sortablelist';

class AuditTrailSettingsReasons extends Component {

  render() {
    const { reasons, readOnly } = this.props;
      return (      
          <SortableList reasons={reasons} readOnly={readOnly} />
      );    
  }

}

export default AuditTrailSettingsReasons;
