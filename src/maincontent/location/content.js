import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AgButton from '../../components/button'
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    fontSize: '20px',
  },
  detailsItem: {
    paddingTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textFieldAlign: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  menu: {
    width: 500,
  },
  defaultProjectCheck: {
    marginLeft: theme.spacing.unit * 5,
  },
  button: {
    margin: theme.spacing.unit,
  },
  buttons: {
    display: 'flex',
    marginTop: theme.spacing.unit * 5,
    justifyContent: 'flex-end'
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    minWidth: 240,
  },
})

class Location extends Component {

  // constructor(props) {
  //   super(props);   
  //   this.state = {
  //     location:{ name: '',desc: '' },
  //   }  
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // componentDidMount() {
  //   const { match } = this.props;    
  //   let id = match.params.id;
  //   if (id) {
  //     let location = locationService.getById(id);   
  //     this.setState({ location: location });
  //   }
  // }

  // componentDidUpdate(prevProps) {   
  //   const { match } = this.props;
  //   let id = match.params.id;
  //   if (id !== prevProps.match.params.id) {
  //     let id = this.props.match.params.id;
  //     let location = locationService.getById(id);
  //     this.setState({ location: location });
  //   }
  // }

  // handleChange(event, name) {    
  //   if (event.target) {
  //     let location = this.state.location;
  //     location[name] = event.target.value;
  //     this.setState({
  //       location: location,
  //     });
  //   }
  // };

  // handleOKClick = event => {
  //   const { history:{ push }, match } = this.props;
  //   const { location } = this.state;
  //   let id = match.params.id;
  //   if (id) {
  //     locationService.update(location);
  //   } else {
  //     locationService.add(location);
  //   }
  //   push('/locations');   
  // }

  // handleCancelClick = event => {
  //   const { history:{ push } } = this.props;
  //   push('/locations');
  // }

  // handleDelete = event => {
  //   const { location } = this.state;
  //   locationService.remove(location.id);
  //   const { history:{ push } } = this.props;
  //   push('/locations');
  // }

  render() {
    const { mylocation, handleChange, handleOKClick, handleCancelClick } = this.props;
    
    return (
        <Fragment>
          <div className="form-group row align-items-center">
              <label htmlFor="name" className="col-sm-1 col-form-label">Name</label>
              <div className="col-sm-11">
                  <input type="text" className="form-control" aria-describedby="name" value={mylocation.name} onChange={e => handleChange(e, 'name')} />
              </div>                   
          </div>
          <div className="form-group row align-items-center">
              <label htmlFor="desc" className="col-sm-1 col-form-label">Description</label>
              <div className="col-sm-11">
                  <input type="text" className="form-control" aria-describedby="desc" value={mylocation.desc} onChange={e => handleChange(e, 'desc')} />
              </div>                   
          </div>
          <div className="form-group row align-items-right">
            <div className="col-sm-9"></div>
                <div className="col-sm-3">
                <AgButton type="primary" value="OK" onClick={handleOKClick} />
                <AgButton type="secondary" value="Cancel" onClick={handleCancelClick} />
            </div>
          </div>
        </Fragment>)
  }

}

Location.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(Location));

