import React, { Component } from 'react';
import EditProjectCDSSettingsContent from './editprojectcdssettings-content'

class AddProjectCDSSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
        };
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

    render() {
        const { locations, handleChange, handleUpload } = this.props;
        const { project } = this.state;
        return (
            <EditProjectCDSSettingsContent project={project} handleChange={handleChange} locations={locations} handleUpload={handleUpload}/>
        )
    }
}

export default AddProjectCDSSettings;

