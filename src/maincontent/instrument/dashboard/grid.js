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

class InstrumentGrid extends Component {

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
        
            <Grid container spacing={16} className={classes.detailsItem}>

              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument Card 1</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument Card 2</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument Card 3</div>
              </Grid>
              <Grid item xs={12} sm={3}>
                <div className={classes.paper}>Instrument Card 4</div>
              </Grid>

          </Grid>
        
      </div>
    );
  }

}

InstrumentGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(InstrumentGrid));
