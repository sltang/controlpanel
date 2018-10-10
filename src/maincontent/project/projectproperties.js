import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import classNames from 'classnames'
import ProjectActivityLogTable from './activitylogtable'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    detailsItem: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit*3,
    },
    formRow:{
        paddingLeft:'60px'
    },
    collapseExpandIcon: {
        fontSize: '18px',
    },
})

class ProjectProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activityLogOpen:true,
            detailsOpen:true
        };
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: !this.state.detailsOpen });
    }

    handleActivityLogClick = event => {
        this.setState({ activityLogOpen: !this.state.activityLogOpen });
    }

    render() {
        const { project, classes } = this.props;
        const {detailsOpen, activityLogOpen } = this.state
        return (
            <div>
                <div className={classNames('form-group', 'row')}>
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" rows="4" value={project.name}></input>
                    </div>
                </div>
                <div className={classNames('form-group', 'row')}>
                    <label htmlFor="name" className="col-sm-2 col-form-label">Project folder path</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" value={project.folderPath}></input>
                    </div>
                </div>
                <div className={classNames('form-group', 'row', 'align-items-center')}>
                    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                    <div className="col-sm-10">
                        <textarea disabled className="form-control" rows="4" value={project.desc}></textarea>
                    </div>
                </div>
                <div onClick={this.handleDetailsClick}>            
                    <span className={classNames('ol-icon-font', detailsOpen ?'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Details</span> 
                </div>
                <Collapse in={detailsOpen} timeout="auto" unmountOnExit>
                    <div className={classNames('form-group', 'row')}>
                    <label htmlFor="projectId" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Project Id</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" value={project.id}></input>
                    </div>
                    </div>
                    <div className={classNames('form-group', 'row')}>
                    <label htmlFor="created" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Created</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" value={project.folderPath}></input>
                    </div>              
                    </div>
                    <div className={classNames('form-group', 'row')}>
                    <label htmlFor="modified" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Modified</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" value={project.modified}></input>
                    </div> 
                    </div>
                    <div className={classNames('form-group', 'row')}>
                    <label htmlFor="modifiedBy" className={classNames('col-sm-2', 'col-form-label', classes.formRow)}>Modified by</label>
                    <div className="col-sm-10">
                        <input disabled type="text" className="form-control" value={project.modifiedBy}></input>
                    </div> 
                    </div>
                </Collapse>
                <div onClick={this.handleActivityLogClick}>            
                    <span className={classNames('ol-icon-font', activityLogOpen?'icon-node-expanded':'icon-node-collapsed', classes.collapseExpandIcon)}>&nbsp;Activity Log (last 7 days)</span> 
                </div>
                <Collapse in={activityLogOpen} timeout="auto" unmountOnExit>
                    <div className="col-sm-12" style={{marginLeft:'28px'}}>
                        <ProjectActivityLogTable />
                    </div>                   
                </Collapse> 
            </div>
        )
    }
}

ProjectProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectProperties);

