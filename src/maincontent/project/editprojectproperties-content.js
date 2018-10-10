import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgCheckbox from '../../components/checkbox';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit*3,
    },
})

class EditProjectPropertiesContent extends Component {

    render() {
        const { classes, handleChange, project } = this.props;
        return (
            <div className={classes.root}>
                <div className="form-group row align-items-center">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" aria-describedby="name" value={project.name} onChange={e => handleChange(e, 'name')} />
                    </div>                   
                </div>
                <div className="form-group row align-items-center">
                    <label htmlFor="folderPath" className="col-sm-2 col-form-label">Project folder path</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" aria-describedby="folderPath" value={project.folderPath} onChange={e => handleChange(e, 'folderPath')} />
                    </div>                   
                </div>
                <div className="form-group row align-items-center">
                    <label htmlFor="desc" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" aria-describedby="desc" value={project.desc} onChange={e => handleChange(e, 'desc')} />
                    </div>                   
                </div>
                <div className="form-group row align-items-center">
                    <label htmlFor="application" className="col-sm-2 col-form-label">Applications</label>
                    <div className="col-sm-10" style={{marginLeft:'-16px'}}>
                        <AgCheckbox checked disabled />
                        OpenLab CDS
                    </div>                   
                </div>
            </div>
        )
    }
}

EditProjectPropertiesContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProjectPropertiesContent);

