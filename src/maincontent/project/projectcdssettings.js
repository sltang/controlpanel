import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import AuditTrailSettings from './audittrailsettings';
import SampleCustomParameters from './samplecustomparameters';
import CompoundCustomParameters from './compoundcustomparameters';
import classNames from 'classnames'
import AgCheckbox from '../../components/checkbox'

const styles = theme => ({
    root: {
        marginLeft: theme.spacing.unit*3,
        flexGrow: 1,
    },
    collapseExpandIcon: {
        fontSize: '18px',
    },
})

class ProjectCDSSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project:{
                locations:{
                    methods:"C:\\CDSProjects\\Project 1\\Methods",
                    sequences:"C:\\CDSProjects\\Project 1\\Sequences",
                    results:"C:\\CDSProjects\\Project 1\\Results",
                    sequenceTemplates:"C:\\CDSProjects\\Project 1\\Sequence Templates",
                    reportTemplates:"C:\\CDSProjects\\Project 1\\Report Templates",
                }
            },
            fileOptionsOpen:true,
            projectOptionsOpen:true,
            detailsOpen:true,
            auditTrailSettingsOpen:true,
            sampleCustomParams:false,
            compoundCustomParams:false
        };
    }

    handleFileOptionsClick = event => {
        this.setState({ fileOptionsOpen: !this.state.fileOptionsOpen });
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: !this.state.detailsOpen });
    }

    handleAuditTrailSettingsClick = event => {
        this.setState({ auditTrailSettingsOpen: !this.state.auditTrailSettingsOpen });
    }

    handleProjectOptionsClick = event => {
        this.setState({ projectOptionsOpen: !this.state.projectOptionsOpen });
    }

    handleChange = name => event => {
        console.log(name)
        this.setState({ [name]:!this.state[name] });
    }

    render() {
        const { classes } = this.props;
        const { project, fileOptionsOpen, projectOptionsOpen, auditTrailSettingsOpen, sampleCustomParams, compoundCustomParams } = this.state

        return (
            <div>                
                <div onClick={this.handleFileOptionsClick}>
                    <span className={classNames('ol-icon-font', fileOptionsOpen ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;File Options</span>
                </div>
                <Collapse in={fileOptionsOpen} timeout="auto" unmountOnExit>
                    <div className={classes.root}>
                        <div className="form-group row align-items-center">
                            <label htmlFor="methods" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Methods</label>
                            <div className="col-sm-10">
                                {project.locations.methods}
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <label htmlFor="methods" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Sequences</label>
                            <div className="col-sm-10">
                                {project.locations.sequences}
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <label htmlFor="methods" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Results</label>
                            <div className="col-sm-10">
                                {project.locations.results}
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <label htmlFor="methods" className={classNames('col-sm-2', 'col-form-label')}>Sequence Templates</label>
                            <div className="col-sm-10">
                                {project.locations.sequenceTemplates}
                            </div>
                        </div>
                        <div className="form-group row align-items-center">
                            <label htmlFor="methods" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Report Templates</label>
                            <div className="col-sm-10">
                                {project.locations.reportTemplates}
                            </div>
                        </div>
                    </div>
                </Collapse>
                <div onClick={this.handleProjectOptionsClick}>
                    <span className={classNames('ol-icon-font', projectOptionsOpen ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Project Options</span>
                </div>
                <Collapse in={projectOptionsOpen} timeout="auto" unmountOnExit>
                    <div className={classNames('form-row', 'align-items-center', classes.root)}>
                        <AgCheckbox disabled checked={project.allowPrinting ? project.allowPrinting : false} />
                        <label htmlFor="methods" className={classNames('col-form-label')}>Allow printing of unsaved processing methods and results</label>
                    </div>
                </Collapse>
                
                <div onClick={this.handleChange('auditTrailSettingsOpen')}>
                    <span className={classNames('ol-icon-font', auditTrailSettingsOpen ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Audit Trail Settings</span>
                </div>
                <Collapse in={auditTrailSettingsOpen} timeout="auto" unmountOnExit>
                    <AuditTrailSettings project={project} />
                </Collapse>
                
                <div onClick={this.handleChange('sampleCustomParams')}>
                    <span className={classNames('ol-icon-font', sampleCustomParams ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Sample Custom Paramters</span> :
                </div>
                <Collapse in={sampleCustomParams} timeout="auto" unmountOnExit>
                    <SampleCustomParameters project={project} readOnly={true} />
                </Collapse>
                
                <div onClick={this.handleChange('compoundCustomParams')}>
                    <span className={classNames('ol-icon-font', compoundCustomParams ? 'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Compound Custom Paramters</span> :
                </div>
                <Collapse in={compoundCustomParams} timeout="auto" unmountOnExit>
                    <CompoundCustomParameters project={project} readOnly={true} />
                </Collapse>
                
            </div>
        )
    }
}

ProjectCDSSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCDSSettings);

