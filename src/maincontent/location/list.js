import React from 'react';
import * as locationService from '../../service/location.js';
import MyTable from '../table';
import { withRouter } from 'react-router';

class ListLocation extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      type: {label:'Locations', name:'location'}
    };
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleClick = (id) => {    
    const { history:{ push } } = this.props;
    push('/location/edit/'+id);
  }

  componentDidMount() {
    let locations;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      locations = locationService.getById(match.params.id);
    } else {
      locations = locationService.getAll();
    }
    this.setState({ data:locations});
  }

  handleDelete(ids) {
    locationService.remove('location', ids)
    let locations = locationService.getAll();
    this.setState({ data:locations});
  }

  render() {
    const { columnData } = this.props;
    const { type, data } = this.state;
    return (
      <MyTable data={data} columnData={columnData} type={type} onClick={this.handleClick} handleDelete={this.handleDelete}/>
    );
  }
}

export default withRouter(ListLocation);
