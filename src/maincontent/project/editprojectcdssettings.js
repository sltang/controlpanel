import React, { Component } from 'react';
import EditProjectCDSSettingsContent from './editprojectcdssettings-content'

class EditProjectCDSSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
            locations:{
                methods:"C:\\CDSProjects\\Project 1\\Methods",
                sequences:"C:\\CDSProjects\\Project 1\\Sequences",
                results:"C:\\CDSProjects\\Project 1\\Results",
                sequenceTemplates:"C:\\CDSProjects\\Project 1\\Sequence Templates",
                reportTemplates:"C:\\CDSProjects\\Project 1\\Report Templates",
            },
            browseFor:'',
            projectOptions:true,
            auditTrailingSettings:true,
            compoundCustomParams:false,
            sampleCustomParams:false 
        };
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleClick = name => event => {
        this.setState({ [name]: this.state[name] === undefined || !this.state[name] });
    }

    handleChange = name => event => {
        const { project } = this.state;
        project[name] = event.target.value;
        this.setState({
            project: project,
        });
    }

    handleLocationChange(type) {
        this.uploadInput.click()
        this.setState({browseFor:type})
    }

    handleUpload(browseFor, filename) {
        this.props.handleUpload(browseFor, filename)
    }

    render() {
        const { project, handleChange, locations } = this.props;
        return (
            <EditProjectCDSSettingsContent project={project} handleChange={handleChange} locations={locations} handleUpload={this.handleUpload}/>
            
        )
    }
}


export default EditProjectCDSSettings;

