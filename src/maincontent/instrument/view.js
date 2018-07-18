import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router';
import MyTable from '../table';
import * as dataService from '../../service/dataservice.js';

const ActivityLogColumnData = [
  { id: 'dateTime', numeric: false, disablePadding: true, label: 'Date/Time' },
  { id: 'user', numeric: false, disablePadding: false, label: 'User' },
  { id: 'desc', numeric: false, disablePadding: false, label: 'Description' },
];

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: theme.spacing.unit,
    minWidth: 240,
    marginLeft: theme.spacing.unit * 10

  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 2,
  },
  start: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 4
  },
  button: {
    margin: theme.spacing.unit,
  },
  nested: {
    marginLeft: theme.spacing.unit * 5,
  },
  detailsItem: {
    marginLeft: theme.spacing.unit * 10,
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  paper: {
    textAlign: 'left',
  },
  activityLog: {
    marginLeft: theme.spacing.unit * 3,
  }
});

class ViewInstrument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      projectId: 1,
      projectName: 'Project 1',
      selectedProjectId: 1,
      projects: [{id:1, name:'Project 1'}, {id:2, name:'Project 2'}],
      data: []
    };
  }

  componentDidMount() {
    const { match } = this.props;
    let instruments = dataService.getById('instrument', match.params.id);
    if (instruments.length > 0) {
      this.setState({ data:instruments[0]});
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let instruments = dataService.getById('instrument', this.props.match.params.id);
      if (instruments.length > 0) {
        this.setState({ data:instruments[0]});
      }
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = event  => {
    if (event.target.value !== this.state.projectId ) {
      this.setState({ open: true, selectedProjectId: event.target.value });
    }
  };

  handleChange = name => event => {
    this.setState({ open: true });
  };

  handleOkClose = event => {
    this.setState({ open: false, projectId: this.state.selectedProjectId});
  }

  handleStatusClick = event => {
    this.setState({ statusOpen: this.state.statusOpen === 'undefined' || !this.state.statusOpen });
  }

  handleDetailsClick = event => {
    this.setState({ detailsOpen: this.state.detailsOpen === undefined || !this.state.detailsOpen });
  }

  handleActivityLogClick = event => {
    this.setState({ activityLogOpen: this.state.activityLogOpen === 'undefined' || !this.state.activityLogOpen });
  }

  handleEditClick = event => {
    const { history:{ push }, match } = this.props;
    push('/instrument/edit/'+match.params.id);
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    return (
      <div>
        <div className={classes.head}><div>{data['name']}</div><div>{data['status']}</div></div>
        <div className={classes.start}>Start Instrument</div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="project">Project</InputLabel>
          <Select
            value={this.state.projectId}
            onChange={this.handleClickOpen}
            inputProps={{
              name: 'project',
              id: 'project',
            }}
          >
            {this.state.projects.map(proj =>
              <MenuItem key={proj.id} value={proj.id}>{proj.name}</MenuItem>
            )}
          </Select>
          <div>
            <Button variant="outlined" color="primary" className={classes.button}>
              Launch
            </Button>
            <Button variant="outlined" className={classes.button}>
              Launch Offline
            </Button>
            <Button variant="outlined" className={classes.button} onClick={this.handleEditClick}>
              Edit
            </Button>
            <Button variant="outlined" className={classes.button}>
              Lock
            </Button>
          </div>
          

          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={this.state.open}
            onClose={this.handleClose}
          >
            <DialogTitle>Are you sure to change the project?</DialogTitle>

            <DialogContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleOkClose} color="primary">
                Ok
              </Button>

            </DialogActions>
          </Dialog>
        </FormControl>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleStatusClick}>
            {this.state.statusOpen ? <ExpandLess /> : <ExpandMore />}
            <ListItemText inset primary="Status" />            
          </ListItem>
          <Collapse in={this.state.statusOpen} timeout="auto" unmountOnExit>
            <div className={classes.detailsItem}>Instrument has no status information</div>
          </Collapse>
        </List>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleDetailsClick}>
            {this.state.detailsOpen ? <ExpandLess /> : <ExpandMore />}
            <ListItemText inset primary="Details" />            
          </ListItem>
          <Collapse in={this.state.detailsOpen} timeout="auto" unmountOnExit>
            <Grid container spacing={16} className={classes.detailsItem}>

              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Description:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.description?this.state.data.description:''}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Location:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.location?this.state.data.location:''}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Created by:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.createdBy?this.state.data.createdBy:'SYSTEM'}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Creation date:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.created?this.state.data.created:''}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Last configured by:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.lastConfiguredBy?this.state.data.lastConfiguredBy:''}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Last configured date/time:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.lastConfigured?this.state.data.lastConfigured:'2018-05-23 15:50:33-07:00'}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Application:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.application}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument controller:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.controller}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument type:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.type}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Id:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}>{this.state.data.id}</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Owner contact information:</div>
              </Grid>
              <Grid item xs={12} sm={9}>
                <div className={classes.paper}></div>
              </Grid>

            </Grid>
          </Collapse>
        </List>
        <List
          component="nav"
        >
          <ListItem button onClick={this.handleActivityLogClick}>
            {this.state.activityLogOpen ? <ExpandLess /> : <ExpandMore />}
            <ListItemText inset primary="Activity Log (last 7 days)" />            
          </ListItem>
          <div className={classes.detailsItem}>             
            <Collapse in={this.state.activityLogOpen} timeout="auto" unmountOnExit>
              <MyTable data={[]} columnData={ActivityLogColumnData} type={{}} noSelected="true" />
            </Collapse>        
        </div>
        </List>
        
      </div>
    );
  }

}

ViewInstrument.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ViewInstrument));
