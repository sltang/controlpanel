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
import { ActivityLogColumnData } from '../columndata';
import MyTable from '../table';

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

class ProjectProperties extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleDetailsClick = event => {
        this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
    }

    handleActivityLogClick = event => {
        this.setState({ activityLogOpen: this.state.activityLogOpen === undefined || !this.state.activityLogOpen });
    }

    render() {
        const { project, classes } = this.props;
        return (
            <div>
                <Grid container spacing={8}>
                    <Grid item xs={4}>
                        <div className={classes.paper}>Name:</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={classes.paper}>{project.name ? project.name : ''}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.paper}>Project folder path:</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={classes.paper}>{project.folderPath}</div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={classes.paper}>Description:</div>
                    </Grid>
                    <Grid item xs={8}>
                    <TextField
                        id="desc"
                        label=""
                        multiline
                        rows="4"
                        value={project.desc}
                        margin="normal"
                        fullWidth
                        readOnly
                    />
                    </Grid>
                </Grid>
                <List component="nav">
                    <ListItem button onClick={this.handleDetailsClick} className={classes.gutters}>
                        {this.state.detailsOpen ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Details" />
                    </ListItem>
                    <Collapse in={this.state.detailsOpen} timeout="auto" unmountOnExit>
                        <Grid container spacing={8} className={classes.detailsItem}>
                            <Grid item xs={4}>
                                <div className={classes.paper}>Project ID:</div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className={classes.paper}>{project.id}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.paper}>Created:</div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className={classes.paper}>{project.createDate}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.paper}>Modified:</div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className={classes.paper}>{project.modified}</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className={classes.paper}>Modified by:</div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className={classes.paper}>{project.modifiedBy}</div>
                            </Grid>
                        </Grid>
                    </Collapse>
                </List>
                <List component="nav">
                    <ListItem button onClick={this.handleActivityLogClick} className={classes.gutters}>
                        {this.state.activityLogOpen ? <ExpandLess /> : <ExpandMore />}
                        <ListItemText inset primary="Activity Log (last 7 days)" />
                    </ListItem>
                    <Collapse in={this.state.activityLogOpen} timeout="auto" unmountOnExit>
                        <MyTable data={[]} columnData={ActivityLogColumnData} type={{}} noSelected="true" />
                    </Collapse>
                </List>
            </div>
        )
    }
}

ProjectProperties.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProjectProperties);

