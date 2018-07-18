import React from 'react';
import * as dataService from '../../service/dataservice.js';
import EditColumns from './editcolumns';
import MyTable from '../table';
import { withRouter } from 'react-router';

class ListInstrument extends React.Component {
  constructor(props, context) {
    super(props, context);
    let instruments;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      instruments = dataService.getAllByLocation('instrument', match.params.id);
    } else {
      instruments = dataService.getAll('instrument');
    }

    this.state = {
      order: 'asc',
      orderBy: '',
      selected: [],
      data: instruments,
      filteredColumnData: this.props.columnData,
      page: 0,
      rowsPerPage: 5,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    // let instruments;
    // if (this.props.match.params.id !== prevProps.match.params.id) {
    //   if (this.props.match.params.id !== undefined) {
    //     instruments = dataService.getAllByLocation('instrument', this.props.match.params.id);
    //   } else {
    //     instruments = dataService.getAll('instrument');
    //   }      
    //   this.setState({ data:instruments});
    // }
  }

  componentDidMount() {
    let instruments;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      //console.log('match.params.id:'+match.params.id);
      instruments = dataService.getAllByLocation('instrument', match.params.id);//location
    } else {
      instruments = dataService.getAll('instrument');
    }
    this.setState({ data:instruments});
  }

  handleClick(id) {
    const { history:{ push }, type } = this.props;
    push('/'+type.name+'/view/'+id);
  }

  handleDelete = ids => {
    //console.log(ids)
    const { match, handleDeleteInstrument } = this.props;
    handleDeleteInstrument(ids);
    dataService.remove('instrument', ids);    
    let instruments;
    if (match.params.id !== undefined) {
      //console.log('match.params.id:'+match.params.id);
      instruments = dataService.getAllByLocation('instrument', match.params.id);//location
    } else {
      instruments = dataService.getAll('instrument');
    }
    this.setState({ data:instruments});    
  }

  handleColumnsChange = (checked) => {
    //console.log(checked)
    const { columnData } = this.props;
    let filteredColumnData = columnData.filter((_, index) => checked[index])
    this.setState({filteredColumnData: filteredColumnData});
  }

  render() {
    const { type,  columnData } = this.props;
    const { data, filteredColumnData } = this.state;
    return (
      <div>
        <EditColumns columnData={columnData} handleColumnsChange={this.handleColumnsChange}/>
        <MyTable data={data} columnData={filteredColumnData} type={type} onClick={this.handleClick} handleDelete={this.handleDelete} />
      </div>
    );
  }
}

export default withRouter(ListInstrument);
