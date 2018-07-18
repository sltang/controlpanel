import React from 'react';
import * as dataService from '../../service/dataservice.js';
import MyTable from '../table';
import { withRouter } from 'react-router';

class ListProject extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    let projects;
    //console.log(nextProps.location.pathname);
    if (nextProps.location.pathname === '/projects') {
      projects = dataService.getAll('project');
    } else {
      projects = dataService.getById('project', nextProps.location.pathname.replace('/projects/', ''));

    }
    this.setState({ data:projects});
  }

  handleClick = (id) => {
    const { history:{ push }, type } = this.props;
    //console.log('/'+type.name+'/view/'+id);
    push('/'+type.name+'/view/'+id);
  }

  componentDidMount() {
    let projects;
    const { match } = this.props;
    //console.log(this.props.location.pathname);
    //console.log('match.params.id:'+match.params.id);
    if (match.params.id !== undefined) {
      //console.log('match.params.id:'+match.params.id);
      projects = dataService.getById('project', match.params.id);//location
    } else {
      projects = dataService.getAll('project');
    }
    this.setState({ data:projects});
  }

  componentDidUpdate(prevProps) {
    //console.log(this.props.match.params.id)
    //console.log(prevProps.match.params.id)
    const { history:{ push }, type } = this.props;
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.params.id !== undefined) { 
        //console.log('/'+type.name+'/view/'+this.props.match.params.id);
        push('/'+type.name+'/view/'+this.props.match.params.id);
      } else {
        let projects;
        projects = dataService.getAll('project');
        this.setState({ data:projects});
      }    
    } else if (this.state.data.length === 0) {
      push('/'+type.name+'/view/'+this.props.match.params.id);
    }
  }

  render() {
    const { type,  columnData } = this.props;
    const { data } = this.state;
    //console.log(data);
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    //console.log(columnData);
    return (
      <MyTable data={data} columnData={columnData} type={type} onClick={this.handleClick} />
    );
  }
}

export default withRouter(ListProject);
