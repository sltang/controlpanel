import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as locationService from '../../service/location.js'
import Location from './content'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  },
})

class AddLocation extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      location:{ name: '',desc: '' },
    }   
  }

  handleChange = name => event => {
    let location = this.state.location;
    location[name] = event.target.value;
    this.setState({
      location: location,
    });
  };

  handleOKClick = event => {
    const { location } = this.state;
    const { history:{ push } } = this.props;
    locationService.add(location);
    push('/locations');
  }

  handleCancelClick = event => {
    const { history:{ push } } = this.props;
    push('/locations');
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;
    return (
      <div>
        <div className={classes.root}>Add Location</div>
          <Location mylocation={location} handleChange={this.handleChange} handleOKClick={this.handleOKClick} handleCancelClick={this.handleCancelClick}/>
      </div>
    );
  }

}

AddLocation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(AddLocation));
