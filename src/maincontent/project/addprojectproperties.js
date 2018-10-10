import React, { Component } from 'react';
import EditProjectPropertiesContent from './editprojectproperties-content'

class AddProjectProperties extends Component {

    render() {
        const { project, handleChange } = this.props;

        return (
            <EditProjectPropertiesContent project={project} handleChange={handleChange} />
        )
    }
}

export default AddProjectProperties;

