import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as locationService from '../../service/location.js';
import Location from './content'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  }
})

class EditLocation extends Component {

  constructor(props) {
    super(props);   
    this.state = {
      location:{ name: '',desc: '' },
    }  
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { match } = this.props;    
    let id = match.params.id;
    if (id) {
      let location = locationService.getById(id);   
      this.setState({ location: location });
    }
  }

  handleChange(event, name) {    
    if (event.target) {
      let location = this.state.location;
      location[name] = event.target.value;
      this.setState({
        location: location,
      });
    }
  };

  handleOKClick = event => {
    const { history:{ push }, match } = this.props;
    const { location } = this.state;
    let id = match.params.id;
    if (id) {
      locationService.update(location);
    } else {
      locationService.add(location);
    }
    push('/locations');   
  }

  handleCancelClick = event => {
    const { history:{ push } } = this.props;
    push('/locations');
  }

  handleDelete = event => {
    const { location } = this.state;
    locationService.remove(location.id);
    const { history:{ push } } = this.props;
    push('/locations');
  }

  render() {
    const { classes } = this.props;
    const { location } = this.state;
    
    return (
      <div>
        <div className={classes.root}>Edit location {location.name}</div>    
          <Location mylocation={location} handleChange={this.handleChange} handleOKClick={this.handleOKClick} handleCancelClick={this.handleCancelClick}/>
      </div>)
  }

}

EditLocation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(EditLocation));
