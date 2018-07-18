import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import EditAuditTrailingSettings from './editaudittrailsettings';
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
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttons: {
        display: 'flex',
        marginTop: theme.spacing.unit * 5,
        justifyContent: 'flex-end'
    },
})

class AddProjectCDSSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            project: this.props.project,
        };
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
    }

    handleAuditTrailingSettingsClick = event => {
        this.setState({ auditTrailingSettingsOpen: this.state.auditTrailingSettingsOpen === undefined || !this.state.auditTrailingSettingsOpen });
    }

    // handleProjectOptionsClick = event => {
    //     this.setState({ projectOptionsOpen: this.state.projectOptionsOpen === undefined || !this.state.projectOptionsOpen });
    // }

    handleClick = name => event => {
        this.setState({ [name]: this.state[name] === undefined || !this.state[name] });
    }

    handleChange = name => event => {
         console.log(name + ", " + event.target.value)
        const { project } = this.state;
        project[name] = event.target.value;
        this.setState({
            project: project,
        });
    }

    render() {
        const { classes } = this.props;
        const { project } = this.state;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Methods:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="methods"
                            label=""
                            className={classes.textField}
                            value={project.methods?project.methods:''}
                            onChange={this.handleChange('methods')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Sequences:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="sequences"
                            label=""
                            className={classes.textField}
                            value={project.sequences?project.sequences:''}
                            onChange={this.handleChange('sequences')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Results:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="results"
                            label=""
                            className={classes.textField}
                            value={project.results?project.results:''}
                            onChange={this.handleChange('results')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Sequence Templates:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="results"
                            label=""
                            className={classes.textField}
                            value={project.sequenceTemplates?project.sequenceTemplates:''}
                            onChange={this.handleChange('sequenceTemplates')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <div className={classes.paper}>Report Templates:</div>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TextField
                            id="reportTemplates"
                            label=""
                            className={classes.textField}
                            value={project.reportTemplates?project.reportTemplates:''}
                            onChange={this.handleChange('reportTemplates')}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <List component="nav">
                    <ListItem button onClick={this.handleClick('projectOptions')} className={classes.gutters}>
                        {this.state.projectOptions ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Project Options" />
                    </ListItem>
                    <Collapse in={this.state.projectOptions} timeout="auto" unmountOnExit>
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
                    <ListItem button onClick={this.handleClick('auditTrailingSettings')} className={classes.gutters}>
                        {this.state.auditTrailingSettings ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Audit Trail Settings" />
                    </ListItem>
                    <Collapse in={this.state.auditTrailingSettings} timeout="auto" unmountOnExit>
                        <EditAuditTrailingSettings project={project} />
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleClick('sampleCustomParams')} className={classes.gutters}>
                        {this.state.sampleCustomParams ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Sample Custom Parameters" />
                    </ListItem>
                    <Collapse in={this.state.sampleCustomParams} timeout="auto" unmountOnExit>
                        <SampleCustomParameters project={project} />
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleClick('compoundCustomParams')} className={classes.gutters}>
                        {this.state.compoundCustomParams ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Compound Custom Parameters" />
                    </ListItem>
                    <Collapse in={this.state.compoundCustomParams} timeout="auto" unmountOnExit>
                        <CompoundCustomParameters project={project} />
                    </Collapse>
                </List>
                <div className={classes.buttons}>
                    <Button variant="outlined" className={classes.button} color="primary" onClick={this.handleOKClick}>
                    OK
                    </Button>
                    <Button variant="outlined" className={classes.button} color="secondary" onClick={this.handleCancelClick}>
                    Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

AddProjectCDSSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddProjectCDSSettings);

