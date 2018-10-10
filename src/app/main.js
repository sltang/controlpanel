import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from './appbar';
import MainContent from '../maincontent/router';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'flex-end',
     padding: '0 8px',
     ...theme.mixins.toolbar,
   },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
});

const types = {
  instruments : {label: 'Instruments', name: 'instrument'},
  projects: {label: 'Projects', name: 'project'},
  locations:  {label: 'Locations', name: 'location'},
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: {},//types['instruments'],
    };
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  handleTypeChange(type) {
    this.setState({type:types[type]});
  }

  render() {
    const { classes } = this.props;
    const { type } = this.state;
    return (
      <div className={classes.root}>
        <AppBar onTypeChange={this.handleTypeChange} />
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <MainContent type={type} />
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(Main));
