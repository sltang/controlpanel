import React, { Component } from 'react';
import ActivityLogTable from '../activitylogtable'

  const activityLog = [
    {
      dateTime: '2018-09-20 15:48:37-07:00', user:'SYSTEM (SYSTEM)', description: 'Instrument "Instrument Location 1 Instrument 1" was unlocked', 
      details:{
        controller : 'CND8084VHW', level: 'Info', subsystem: 'Instrument Management', details: 'Instrument "Instrument Location 1 Instrument 1" was unlocked'
      }
    },
    {
        dateTime: '2018-09-21 15:48:37-07:00', user:'User 1', description: 'Instrument "Instrument Location 1 Instrument 1" was changed', 
        details:{
          controller : 'CND8084VHW', level: 'Info', subsystem: 'Instrument Management', details: 'Instrument "Instrument Location 1 Instrument 1" was changed'
        }
      }
  ]

class InstrumentActivityLogTable extends Component {

    constructor(props) {
      super(props);
      this.state = {
        activityLog:[],
      };
    }

    componentDidMount() {
        this.setState({activityLog : activityLog})
    }

    render() {
        const { activityLog } = this.state
        return (
            <ActivityLogTable activityLog={activityLog} />
        )
    }
}
  
export default InstrumentActivityLogTable;