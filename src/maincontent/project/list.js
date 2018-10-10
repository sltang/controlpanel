import React from 'react';
import * as projectService from '../../service/project.js';
import MyTable from '../table';
import { withRouter } from 'react-router';

class ListProject extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      type: {label:'Projects', name:'project'}
    };
    this.handleDelete = this.handleDelete.bind(this)

  }

  componentWillReceiveProps(nextProps) {
    let projects;
    if (nextProps.location.pathname === '/projects') {
      projects = projectService.getAll();
    } else {
      projects = projectService.getById(nextProps.location.pathname.replace('/projects/', ''));

    }
    this.setState({ data:projects});
  }

  handleClick = (id) => {
    const { history:{ push } } = this.props;
    push('/project/view/'+id);
  }

  componentDidMount() {
    let projects;
    const { match } = this.props;
    if (match.params.id !== undefined) {
      projects = projectService.getById(match.params.id);
    } else {
      projects = projectService.getAll();
    }
    this.setState({ data:projects});
  }

  componentDidUpdate(prevProps) {
    const { history:{ push } } = this.props;
    if (this.props.match.params.id !== prevProps.match.params.id) {
      if (this.props.match.params.id !== undefined) { 
        push('/project/view/'+this.props.match.params.id);
      } else {
        let projects;
        projects = projectService.getAll();
        this.setState({ data:projects});
      }    
    } else if (this.state.data.length === 0) {
      push('/project/view/'+this.props.match.params.id);
    }
  }

  handleDelete(ids) {
    projectService.remove(ids)
    let projects = projectService.getAll();
    this.setState({ data:projects});
  }

  render() {
    const { columnData } = this.props;
    const { data, type } = this.state;
    return (
      <MyTable data={data} columnData={columnData} type={type} onClick={this.handleClick} handleDelete={this.handleDelete}/>
    );
  }
}

export default withRouter(ListProject);
