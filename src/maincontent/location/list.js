import React from 'react';
import * as dataService from '../../service/dataservice.js';
import MyTable from '../table';
import { withRouter } from 'react-router';

class ListLocation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 5,
    };


  }

  // componentWillReceiveProps(nextProps) {
  //   let locations;
  //   //console.log(nextProps.location.pathname);
  //   if (nextProps.location.pathname === '/locations') {
  //     locations = dataService.getAll('location');
  //   } else {
  //     locations = dataService.getById('location', nextProps.location.pathname.replace('/locations/', ''));

  //   }
  //   this.setState({ data:locations});
  // }

  handleClick = (id) => {    
    const { history:{ push }, type } = this.props;
    push('/'+type.name+'/edit/'+id);
  }

  componentDidMount() {
    let locations;
    const { match } = this.props;
    //console.log(this.props.location.pathname);
    //console.log('match.params.id:'+match.params.id);
    if (match.params.id !== undefined) {
      //console.log('match.params.id:'+match.params.id);
      locations = dataService.getById('location', match.params.id);//location
    } else {
      locations = dataService.getAll('location');
    }
    this.setState({ data:locations});
  }

  componentDidUpdate(prevProps) {    
    const { history:{ push }, type } = this.props;
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.params.id !== undefined) { 
        push('/'+type.name+'/edit/'+this.props.match.params.id);
      } else {
        let locations = dataService.getAll('location');
        this.setState({ data:locations});
      }    
    } else if (this.state.data.length === 0) {
      push('/'+type.name+'/edit/'+this.props.match.params.id);
    }
  }

  render() {
    const { type,  columnData } = this.props;
    const { data } = this.state;
    return (
      <MyTable data={data} columnData={columnData} type={type} onClick={this.handleClick} />
    );
  }
}

export default withRouter(ListLocation);
