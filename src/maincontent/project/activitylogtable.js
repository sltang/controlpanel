import React, { Component } from 'react';
import ActivityLogTable from '../activitylogtable'

const activityLog = [
    {
        dateTime: '2018-09-23 15:48:37-07:00', user: 'SYSTEM (SYSTEM)', description: 'Project "Project 1" was changed',
        details: {
            controller: 'CND8084VHW', level: 'Info', subsystem: 'Project Management', details: '"Description" changed from "" "My Project desc"'
        }
    },
    {
        dateTime: '2018-09-23 16:48:37-07:00', user: 'User 1', description: 'Project "Project 1" was changed',
        details: {
            controller: 'CND8084VHW', level: 'Info', subsystem: 'Project Management', details: '"Description" changed from "My Project desc" "My new Project desc"'
        }
    }
]

class ProjectActivityTable extends Component {

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

  
export default ProjectActivityTable;