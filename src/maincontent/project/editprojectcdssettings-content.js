import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

import EditAuditTrailSettings from './editaudittrailsettings';
import SampleCustomParameters from './samplecustomparameters';
import CompoundCustomParameters from './compoundcustomparameters';
import AgButton from '../../components/button'
import AgCheckbox from '../../components/checkbox'
import classNames from 'classnames'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: theme.spacing.unit*3,
    },
    heading:{
        fontSize:'20px', marginLeft:'10px'
    }
})

class EditProjectCDSSettingsContent extends Component {

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

    handleUpload() {
        const { browseFor } = this.state
        const filename = this.uploadInput.files[0].name
        this.props.handleUpload(browseFor, filename)
    }

    render() {
        const { classes, project, handleChange, locations } = this.props;
        const { projectOptions, auditTrailingSettings, sampleCustomParams, compoundCustomParams } = this.state;
        return (
            <div className={classes.root}>
                <input type="file" style={{display:'none'}} ref={el => this.uploadInput = el} onChange={this.handleUpload}/>
                <div className="form-group row align-items-center">
                    <label htmlFor="methods" className="col-sm-2 col-form-label">Methods</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" aria-describedby="methods" value={locations.methods} onChange={e => this.handleLocationChange('methods')} />
                    </div>
                    <div className="col-sm-2">               
                        <AgButton type="primary" value="Browse" onClick={e => this.handleLocationChange('methods')} />
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <label htmlFor="sequences" className="col-sm-2 col-form-label">Sequences</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" aria-describedby="sequences" value={locations.sequences} onChange={e => this.handleLocationChange('sequences')} />
                    </div>
                    <div className="col-sm-2">
                        <AgButton type="primary" value="Browse" onClick={e => this.handleLocationChange('sequences')} />
                    </div>
                </div>
                <div className="form-group row align-items-center">
                    <label htmlFor="results" className="col-sm-2 col-form-label">Results</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" aria-describedby="results" value={locations.results} onChange={e => this.handleLocationChange('results')} />
                    </div>
                    <div className="col-sm-2">
                        <AgButton type="primary" value="Browse" onClick={e => this.handleLocationChange('results')} />
                    </div>
                </div> 
                <div className="form-group row align-items-center">
                    <label htmlFor="sequenceTemplates" className="col-sm-2 col-form-label">Sequence Templates</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" aria-describedby="sequenceTemplates" value={locations.sequenceTemplates} onChange={e => this.handleLocationChange('sequenceTemplates')} />
                    </div>
                    <div className="col-sm-2">
                        <AgButton type="primary" value="Browse" onClick={e => this.handleLocationChange('sequenceTemplates')} />
                    </div>
                </div>              
                <div className="form-group row align-items-center">
                    <label htmlFor="reportTemplates" className="col-sm-2 col-form-label">Report Templates</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" aria-describedby="reportTemplates" value={locations.reportTemplates} onChange={e => this.handleLocationChange('reportTemplates')} />
                    </div>
                    <div className="col-sm-2">
                        <AgButton type="primary" value="Browse" onClick={e => this.handleLocationChange('reportTemplates')} />
                    </div>
                </div>
                <div onClick={this.handleClick('projectOptions')}>
                    <span className={classNames('ol-icon-font', projectOptions ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}><span className={classes.heading}>Project Options</span></span>
                </div>
                <Collapse in={projectOptions} timeout="auto" unmountOnExit>
                    <div className={classNames('form-row', 'align-items-center')}>                        
                        <AgCheckbox checked={project.allowPrinting?true:false} onChange={e => handleChange(e, 'allowPrinting')} />                       
                        <label htmlFor="methods" className={classNames('col-form-label')}>Allow printing of unsaved processing methods and results</label>
                    </div>
                </Collapse>
                <div onClick={this.handleClick('auditTrailingSettings')}>
                    <span className={classNames('ol-icon-font', auditTrailingSettings ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}><span className={classes.heading}>Audit Trail Settings</span></span>
                </div>
                <Collapse in={auditTrailingSettings} timeout="auto" unmountOnExit>
                    <EditAuditTrailSettings project={project} />
                </Collapse>
                <div onClick={this.handleClick('sampleCustomParams')}>
                    <span className={classNames('ol-icon-font', sampleCustomParams ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}><span className={classes.heading}>Sample Custom Parameters</span></span>
                </div>
                <Collapse in={sampleCustomParams} timeout="auto" unmountOnExit>
                    <SampleCustomParameters project={project} />
                </Collapse>
                <div onClick={this.handleClick('compoundCustomParams')}>
                    <span className={classNames('ol-icon-font', compoundCustomParams ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}><span className={classes.heading}>Compound Custom Parameters</span></span>
                </div>
                <Collapse in={compoundCustomParams} timeout="auto" unmountOnExit>
                    <CompoundCustomParameters project={project} />
                </Collapse>
            </div>
        )
    }
}

EditProjectCDSSettingsContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditProjectCDSSettingsContent);

