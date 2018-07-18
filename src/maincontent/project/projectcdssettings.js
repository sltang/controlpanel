import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import AuditTrailingSettings from './audittrailsettings';
import SampleCustomParameters from './samplecustomparameters';
import CompoundCustomParameters from './compoundcustomparameters';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    detailsItem: {
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit*3,
    },
    paper: {
        textAlign: 'left',
    },
    gutters: {
        paddingLeft: '0px'
    }
})

class ProjectCDSSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
    }

    handleAuditTrailingSettingsClick = event => {
        this.setState({ auditTrailingSettingsOpen: this.state.auditTrailingSettingsOpen === undefined || !this.state.auditTrailingSettingsOpen });
    }

    handleProjectOptionsClick = event => {
        this.setState({ projectOptionsOpen: this.state.projectOptionsOpen === undefined || !this.state.projectOptionsOpen });
    }

    handleChange = name => event => {
        this.setState({ [name]: this.state[name] === undefined || !this.state[name] });
    }

    render() {
        const { project, classes } = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Methods:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.paper}>{project.methods}</div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Sequences:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.paper}>{project.sequences}</div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Results:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.paper}>{project.results}</div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Sequence Templates:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.paper}>{project.sequenceTemplates}</div>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Report Templates:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <div className={classes.paper}>{project.reportTemplates}</div>
                    </Grid>
                </Grid>
                <List component="nav">
                    <ListItem button onClick={this.handleProjectOptionsClick} className={classes.gutters}>
                        {this.state.projectOptionsOpen ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Project Options" />
                    </ListItem>
                    <Collapse in={this.state.projectOptionsOpen} timeout="auto" unmountOnExit>
                        <Grid container spacing={8} className={classes.detailsItem}>
                            <Grid item xs={12} sm={12}>
                                <div className={classes.paper}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                            checked={this.state.allowPrinting?true:false}
                                            onChange={this.handleChange('allowPrinting')}
                                            value="allowPrinting"
                                            />
                                        }
                                        label="Allow printing of unsaved processing methods and results"
                                    />                                
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleAuditTrailingSettingsClick} className={classes.gutters}>
                        {this.state.auditTrailingSettingsOpen ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Audit Trail Settings" />
                    </ListItem>
                    <Collapse in={this.state.auditTrailingSettingsOpen} timeout="auto" unmountOnExit>
                        <AuditTrailingSettings project={project} />
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleChange('sampleCustomParams')} className={classes.gutters}>
                        {this.state.sampleCustomParams ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Sample Custom Parameters" />
                    </ListItem>
                    <Collapse in={this.state.sampleCustomParams} timeout="auto" unmountOnExit>
                        <SampleCustomParameters project={project} readOnly={true} />
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleChange('compoundCustomParams')} className={classes.gutters}>
                        {this.state.compoundCustomParams ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Compound Custom Parameters" />
                    </ListItem>
                    <Collapse in={this.state.compoundCustomParams} timeout="auto" unmountOnExit>
                        <CompoundCustomParameters project={project} readOnly={true} />
                    </Collapse>
                </List>
            </div>
        )
    }
}

ProjectCDSSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectCDSSettings);

